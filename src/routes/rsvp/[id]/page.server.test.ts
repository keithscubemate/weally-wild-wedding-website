import { describe, it, expect, vi, beforeEach } from 'vitest';
import { eq } from 'drizzle-orm';
import type { TestDb } from '../../../test/helpers/db';
import { createTestDb } from '../../../test/helpers/db';
import { guest, party } from '$lib/server/db/schema';
import type { Party, Guest } from '$lib/server/db/schema';

// testDb is assigned in beforeEach; the getter ensures the mock always
// reflects the current instance rather than a stale reference.
let testDb: TestDb;

vi.mock('$lib/server/db', () => ({
    get db() {
        return testDb;
    }
}));

// Imported after the mock is registered so they pick up testDb.
const { load, actions } = await import('./+page.server');

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

function makeFormRequest(fields: Record<string, string | string[]>) {
    const formData = new FormData();
    for (const [key, val] of Object.entries(fields)) {
        if (Array.isArray(val)) {
            val.forEach((v) => formData.append(key, v));
        } else {
            formData.append(key, val);
        }
    }
    return new Request('http://localhost', { method: 'POST', body: formData });
}

async function seedParty(db: TestDb, overrides: Partial<{ finalized: number; notes: string }> = {}) {
    const partyId = crypto.randomUUID();
    await db.insert(party).values({ id: partyId, name: 'Test Party', ...overrides });
    return partyId;
}

async function seedGuests(db: TestDb, partyId: string, names: string[]) {
    const guests = names.map((name) => ({ id: crypto.randomUUID(), name, party_id: partyId }));
    await db.insert(guest).values(guests);
    return guests;
}

// -------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------

beforeEach(async () => {
    testDb = await createTestDb();
});

describe('load', () => {
    it('returns party and guests for a valid id', async () => {
        const partyId = await seedParty(testDb);
        await seedGuests(testDb, partyId, ['Alice', 'Bob']);

        const result = await load({ params: { id: partyId } } as any) as { party: Party; guests: Guest[] };

        expect(result.party.id).toBe(partyId);
        expect(result.guests).toHaveLength(2);
        expect(result.guests.map((g) => g.name)).toEqual(expect.arrayContaining(['Alice', 'Bob']));
    });

    it('throws 404 for an unknown party id', async () => {
        await expect(load({ params: { id: 'no-such-id' } } as any)).rejects.toMatchObject({
            status: 404
        });
    });
});

describe('actions.default', () => {
    it('updates attendance, notes, and finalizes the party', async () => {
        const partyId = await seedParty(testDb);
        const [alice, bob] = await seedGuests(testDb, partyId, ['Alice', 'Bob']);

        const result = await actions.default({
            request: makeFormRequest({
                party_id: partyId,
                party_name: 'Test Party',
                attending: [alice.id], // only Alice is attending
                notes: 'no shellfish please',
                finalize: '1'
            })
        } as any);

        expect(result).toEqual({ success: true });

        const updatedParty = await testDb.query.party.findFirst({ where: eq(party.id, partyId) });
        expect(updatedParty?.finalized).toBe(1);
        expect(updatedParty?.notes).toBe('no shellfish please');

        const updatedGuests = await testDb.query.guest.findMany({
            where: eq(guest.party_id, partyId)
        });
        expect(updatedGuests.find((g) => g.id === alice.id)?.is_rsvp).toBe(1);
        expect(updatedGuests.find((g) => g.id === bob.id)?.is_rsvp).toBe(0);
    });

    it('sets all guests to not-attending when no attending[] values are submitted', async () => {
        const partyId = await seedParty(testDb);
        const [alice] = await seedGuests(testDb, partyId, ['Alice']);

        // Pre-mark Alice as attending so we can confirm the update flips it
        await testDb.update(guest).set({ is_rsvp: 1 }).where(eq(guest.id, alice.id));

        await actions.default({
            request: makeFormRequest({ party_id: partyId, party_name: 'Test Party', notes: '' })
            // no 'attending' key → getAll returns []
        } as any);

        const updated = await testDb.query.guest.findFirst({ where: eq(guest.id, alice.id) });
        expect(updated?.is_rsvp).toBe(0);
    });

    it('throws 404 when the party does not exist', async () => {
        await expect(
            actions.default({
                request: makeFormRequest({ party_id: 'ghost-id', party_name: 'Ghost Party' })
            } as any)
        ).rejects.toMatchObject({ status: 404 });
    });

    it('returns 409 when the party is already finalized', async () => {
        const partyId = await seedParty(testDb, { finalized: 1 });

        const result = await actions.default({
            request: makeFormRequest({ party_id: partyId, party_name: 'Test Party' })
        } as any);

        expect(result).toMatchObject({ status: 409 });
    });
});

// -------------------------------------------------------------------
// Security
// -------------------------------------------------------------------

describe('security', () => {
    it('cannot mark a guest from a different party as attending', async () => {
        const ownPartyId = await seedParty(testDb);
        await seedGuests(testDb, ownPartyId, ['Alice']);

        const victimPartyId = await seedParty(testDb);
        const [victim] = await seedGuests(testDb, victimPartyId, ['Victim']);

        // Attacker submits their own party_id but slips in a guest ID from the victim party
        await actions.default({
            request: makeFormRequest({
                party_id: ownPartyId,
                party_name: 'Test Party',
                attending: [victim.id],
                notes: ''
            })
        } as any);

        const victimGuest = await testDb.query.guest.findFirst({
            where: eq(guest.id, victim.id)
        });
        expect(victimGuest?.is_rsvp).toBe(0);
    });

    it('does not store an arbitrary integer when finalize is a non-boolean value', async () => {
        const partyId = await seedParty(testDb);
        await seedGuests(testDb, partyId, ['Alice']);

        await actions.default({
            request: makeFormRequest({
                party_id: partyId,
                party_name: 'Test Party',
                notes: '',
                finalize: '999'
            })
        } as any);

        const updated = await testDb.query.party.findFirst({ where: eq(party.id, partyId) });
        expect(updated?.finalized).toBeLessThanOrEqual(1);
    });
});

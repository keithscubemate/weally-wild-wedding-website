import { db } from '$lib/server/db';
import { guest, party, } from '$lib/server/db/schema';
import type { Guest } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const party_id = params.id;

    const the_party = await db.query.party.findFirst({
        where: eq(party.id, party_id)
    });

    if (!the_party) {
        error(404, 'party not found');
    }

    const guests: Guest[] = await db.query.guest.findMany({
        where: eq(guest.party_id, party_id)
    });

    return {
        party: the_party,
        guests: guests
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const party_id = data.get('party_id')?.toString() ?? '';
        const party_name = data.get('party_name')?.toString() ?? '';

        const the_party = await db.query.party.findFirst({
            where: eq(party.id, party_id)
        });

        if (!the_party) {
            error(404, { message: `Party ${party_name} [${party_id}] not found.` });
        }

        if (the_party.finalized) {
            return fail(409, {
                message: `Party ${party_name} [${party_id}] is already finalized.`
            });
        }

        const finalized = Math.min(Number(data.get('finalize') ?? '0'), 1);
        const notes = data.get('notes')?.toString() ?? '';

        await db
            .update(party)
            .set({
                notes,
                finalized
            })
            .where(and(eq(party.finalized, 0), eq(party.id, party_id)));

        const guest_ids: string[] = await db.query.guest
            .findMany({
                columns: { id: true },
                where: eq(guest.party_id, party_id)
            })
            .then((res) => res.map((rec) => rec.id));

        const given_attendings = data.getAll('attending').map((d) => d.toString());
        const attendings = given_attendings.filter((id) => guest_ids.find((other) => other == id));
        const not_attend = guest_ids.filter((id) => !attendings.find((other) => other == id));

        const attend_queries = attendings.map((id) =>
            db.update(guest).set({ is_rsvp: 1 }).where(eq(guest.id, id))
        );
        const not_queries = not_attend.map((id) =>
            db.update(guest).set({ is_rsvp: 0 }).where(eq(guest.id, id))
        );

        const queries = [...attend_queries, ...not_queries];

        // Promise drizzle that our shape is right
        const gq = queries as [(typeof queries)[number], ...(typeof queries)[number][]];

        await db.batch(gq);

        return { success: true };
    }
};

import { db } from '$lib/server/db';
import { guest, party, type Guest } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
    const party_id = params.id;

    const the_party = await db.query.party.findFirst({
        where: eq(party.id, party_id)
    });

    const guests: Guest[] = await db.query.guest.findMany({
        where: eq(guest.party_id, party_id)
    });

    return {
        party: the_party,
        guests: guests
    };
};

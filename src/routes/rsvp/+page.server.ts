import { db } from '$lib/server/db';
import { party, type Party } from '$lib/server/db/schema';

export async function load() {
    const parties: Party[] = await db.select().from(party);
    return {
        parties
    }
}

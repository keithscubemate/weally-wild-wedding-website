import { db } from "$lib/server/db";
import { guest, party, type Guest, type Party } from "$lib/server/db/schema";
import { sql } from "drizzle-orm";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ params }) => {
    const party_id = params.id;

    const parties: Party[] = await db.select()
        .from(party)
        .where(sql`${party.id} = ${party_id}`)
        .limit(1);

    const this_party = parties[0];

    const guests: Guest[] = await db.select()
        .from(guest)
        .where(sql`${guest.party_id} = ${party_id}`);

    return {
        party: this_party,
        guests: guests,
    };
}

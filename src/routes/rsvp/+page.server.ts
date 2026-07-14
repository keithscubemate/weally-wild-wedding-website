import { db } from '$lib/server/db';
import { type Party } from '$lib/server/db/schema';

export async function load() {
	const parties: Party[] = await db.query.party.findMany();
	return {
		parties
	};
}

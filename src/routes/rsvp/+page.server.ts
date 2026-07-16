import { db } from '$lib/server/db';
import { guest, party } from '$lib/server/db/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { like, sql, eq } from 'drizzle-orm';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        console.log(data);

        const first = data.get('firstName')?.toString() ?? '';
        const last = data.get('lastName')?.toString() ?? '';
        const f = '%' + first + '%';
        const l = '%' + last + '%';
        const fal = '%' + first + '%' + last + '%';

        const score_query = sql<number>`
                sum(
                    (${like(guest.name, f)}) +
                    (${like(guest.name, l)}) +
                    (${like(guest.name, fal)})
                )
            `.as('score');

        const parties = await db
            .select({
                id: party.id,
                name: party.name,
                finalized: party.finalized,
                score: score_query,
                guestNames: sql<string>`group_concat(${guest.name}, ',')`.as(`guest_names`)
            })
            .from(party)
            .innerJoin(guest, eq(party.id, guest.party_id))
            .groupBy(party.id)
            .having(sql`score > 0`)
            .orderBy(sql`score desc`);

        if (parties.length == 0) {
            fail(404, { message: 'No party was found with the first and last name provided.' });
        }

        console.log(parties);

        return {
            success: true,
            parties: [
                ...parties.map((p) => ({
                    ...p,
                    guestNames: p.guestNames.split(',')
                }))
            ]
        };
    }
};

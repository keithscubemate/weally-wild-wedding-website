import { db } from '$lib/server/db';
import { guest, party } from '$lib/server/db/schema';
import type { Actions } from '@sveltejs/kit';
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

        const ids = await db
            .select({
                id: party.id,
                name: party.name,
                score: score_query,
            })
            .from(party)
            .innerJoin(guest, eq(party.id, guest.party_id))
            .groupBy(party.id)
            .having(sql`score > 0`)
            .orderBy(sql`score desc`);

        console.log(ids);

        return { success: true };
    }
};

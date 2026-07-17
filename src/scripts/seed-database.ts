import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from '../lib/server/db/schema';

const env = process.env;

const config =
    env.DB_MODE == 'local'
        ? { url: env.DATABASE_URL! }
        : {
            url: env.TURSO_DB_URL!,
            authToken: env.TURSO_DB_AUTH_TOKEN
        };
const client = createClient(config);
const db = drizzle(client, { schema });

const foo = Bun.file("data/guest_list.csv");
const text = await foo.text();
const lines = text.split('\n').filter(l => l).map(l => l.split(',')).slice(1);

const name_i = 0;
const child_i = 3;
const party_i = 4;

interface KindaGuest {
    name: string,
    adult: boolean,
    party: string,
};

const people: KindaGuest[] = lines.map(l => ({
    name: l[name_i],
    adult: l[child_i] == 'FALSE',
    party: l[party_i],
}));

const groups: Record<string, KindaGuest[]> = {}
for (const p of people) {
    const val = groups[p.party]
    groups[p.party] = [...(val ? val : []), p];
}

for (const p in groups) {
    const gs = groups[p]
    const par = await db.insert(schema.party).values({ name: p }).returning();

    const pid = par[0].id;

    await db.insert(schema.guest).values(
        gs.map(g => ({
            name: g.name,
            adult: g.adult,
            party_id: pid,
        }))
    );
}

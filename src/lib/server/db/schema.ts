import type { InferSelectModel } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const party = sqliteTable('party', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    finalized: integer('finalized').notNull().default(0),
    notes: text('notes')
});

export const guest = sqliteTable('guest', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    party_id: text('party_id').references(() => party.id, { onDelete: 'cascade' }),
    is_rsvp: integer('is_rsvp').notNull().default(0),
    is_adult: integer('is_adult').default(1)
});

export type Party = InferSelectModel<typeof party>;
export type Guest = InferSelectModel<typeof guest>;

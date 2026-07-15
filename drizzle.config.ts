import { defineConfig } from 'drizzle-kit';

if (!process.env.TURSO_DB_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
    schema: './src/lib/server/db/schema.ts',
    out: './migrations',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.TURSO_DB_URL,
        authToken: process.env.TURSO_DB_AUTH_TOKEN
    },
    verbose: true,
    strict: true
});

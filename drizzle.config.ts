import { defineConfig } from 'drizzle-kit';

export default process.env.DB_MODE == 'local' ?
    defineConfig({
        schema: './src/lib/server/db/schema.ts',
        dialect: 'sqlite',
        dbCredentials: {
            url: process.env.DATABASE_URL!,
        },
        verbose: true,
        strict: true
    }) :
    defineConfig({
        schema: './src/lib/server/db/schema.ts',
        dialect: 'turso',
        dbCredentials: {
            url: process.env.TURSO_DB_URL!,
            authToken: process.env.TURSO_DB_AUTH_TOKEN!
        },
        verbose: true,
        strict: true
    });

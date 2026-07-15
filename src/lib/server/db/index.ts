import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const config =
    env.DB_MODE == 'local'
        ? {
              url: env.DATABASE_URL!
          }
        : {
              url: env.TURSO_DB_URL!,
              authToken: env.TURSO_DB_AUTH_TOKEN
          };

const client = createClient(config);

export const db = drizzle(client, { schema });

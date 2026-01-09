import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

let client;
let db;

export function getDb() {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  if (!client) {
    const DATABASE_URL = env.DATABASE_URL;

    const isLocal = /(?:^|@)(localhost|127\.0\.0\.1)(?::\d+)?/i.test(
      DATABASE_URL
    );

    client = postgres(
      DATABASE_URL,
      isLocal ? {} : { ssl: 'require' }
    );

    // DEBUG (puedes quitarlo luego)
    try {
      const u = new URL(DATABASE_URL);
      console.log('[DB] host:', u.hostname, 'db:', u.pathname.slice(1));
    } catch {
      console.warn('[DB] DATABASE_URL inválido');
    }
  }

  if (!db) {
    db = drizzle(client, { schema });
  }

  return db;
}

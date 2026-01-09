import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

const DATABASE_URL = env.DATABASE_URL;

// Detecta si es local
const isLocal =
	!!DATABASE_URL && /(?:^|@)(localhost|127\.0\.0\.1)(?::\d+)?/i.test(DATABASE_URL);

// Tipo correcto del DB de Drizzle
type DB = ReturnType<typeof drizzle>;

// Declaramos db una sola vez
let db: DB | null = null;

// Solo conectar en runtime (no en build)
if (!building && DATABASE_URL) {
	const client = postgres(DATABASE_URL, isLocal ? {} : { ssl: 'require' });
	db = drizzle(client, { schema });
}

// Solo en runtime exigimos DATABASE_URL
if (!building && !DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

export { db };

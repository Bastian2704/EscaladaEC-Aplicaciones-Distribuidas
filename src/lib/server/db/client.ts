import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const DATABASE_URL = env.DATABASE_URL;
if (!DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

// Detecta si es local
const isLocal = /(?:^|@)(localhost|127\.0\.0\.1)(?::\d+)?/i.test(DATABASE_URL);

// Azure / proveedores gestionados → SSL requerido
const client = postgres(
	DATABASE_URL,
	isLocal ? {} : { ssl: 'require' }
);

export const db = drizzle(client, { schema });

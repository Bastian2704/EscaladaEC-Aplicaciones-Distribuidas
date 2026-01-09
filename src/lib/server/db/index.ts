import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { getSql } from './client';

let db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
	if (db) return db;

	db = drizzle(getSql(), { schema });
	return db;
}

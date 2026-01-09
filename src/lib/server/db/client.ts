import postgres from 'postgres';
import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not set');
}

const isLocal = /(?:^|@)(localhost|127\.0\.0\.1)(?::\d+)?/i.test(env.DATABASE_URL);

export const sql = postgres(
	env.DATABASE_URL,
	isLocal ? {} : { ssl: 'require' }
);

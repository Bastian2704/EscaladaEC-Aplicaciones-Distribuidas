import postgres from 'postgres';
import { env } from '$env/dynamic/private';

let sql: ReturnType<typeof postgres> | null = null;

export function getSql() {
	if (sql) return sql;

	if (!env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not set');
	}

	const isLocal = /(?:^|@)(localhost|127\.0\.0\.1)(?::\d+)?/i.test(env.DATABASE_URL);

	sql = postgres(
		env.DATABASE_URL,
		isLocal ? {} : { ssl: 'require' }
	);

	return sql;
}

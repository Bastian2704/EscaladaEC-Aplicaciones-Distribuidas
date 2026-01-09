import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db';
import { users, sessions } from '$lib/server/db/schema';

export const lucia = new Lucia(new DrizzlePostgreSQLAdapter(db, sessions, users), {
	sessionCookie: {
		name: 'session',
		attributes: {
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production'
		}
	},
	getUserAttributes: (attrs) => ({
		email: attrs.email,
		role: attrs.role
	})
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: { email: string; role: 'user' | 'admin' };
	}
}

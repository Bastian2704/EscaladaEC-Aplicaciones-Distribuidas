import type { Actions, PageServerLoad } from './$types';
import { lucia } from '$lib/server/auth/lucia';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { hash } from 'argon2';
import { redirect, fail } from '@sveltejs/kit';
import { eq, or } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/area');
	}

	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		if (locals.user) {
			return fail(400, {
				message: 'Ya tienes una sesión iniciada.'
			});
		}
		const data = await request.formData();
		const email = String(data.get('email') ?? '')
			.toLowerCase()
			.trim();
		const password = String(data.get('password') ?? '');
		const username = String(data.get('username') ?? '');
		const age = String(data.get('age') ?? '');
		if (!email || password.length < 8 || !username || !age)
			return fail(400, { message: 'Datos inválidos' });

		const exists = await db.query.users.findFirst({
			where: or(eq(users.email, email), eq(users.username, username))
		});
		if (exists) return fail(400, { message: 'Email o usuario ya registrado' });

		const passwordHash = await hash(password);
		const [u] = await db.insert(users).values({ email, username, age, passwordHash }).returning();
		const session = await lucia.createSession(u.id, {});
		const cookie = lucia.createSessionCookie(session.id);
		cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: '/' });
		throw redirect(303, '/area');
	}
};

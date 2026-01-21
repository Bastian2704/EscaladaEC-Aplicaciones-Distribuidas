import { db } from '$lib/server/db';
import { grade } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Status } from '$lib/contants/constants';
import type { Actions, PageServerLoad } from './$types';

function assertOwnerOrAdmin(user: { id: string; role: string }, item: { publishedBy: string }) {
	if (user.role === 'admin') return;
	if (item.publishedBy !== user.id) throw error(403, 'No autorizado');
}

export const load: PageServerLoad = async (event) => {
	const user = requireUser(event);
	const { areaId, sectorId, climbId, gradeId } = event.params;

	const [item] = await db.select().from(grade).where(eq(grade.id, gradeId));
	if (!item) throw error(404);

	assertOwnerOrAdmin(user, item);

	return { item, areaId, sectorId, climbId, gradeId };
};

export const actions: Actions = {
	save: async (event) => {
		const u = requireUser(event);

		const { gradeId } = event.params;

		const [item] = await db.select().from(grade).where(eq(grade.id, gradeId));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		const data = await event.request.formData();
		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();
		const difficultyLevel = Number(data.get('difficultyLevel') ?? '');
		const accomplished = Boolean(data.get('accomplished') ?? '');
		const status = String(data.get('status') ?? '');

		if (!gradeSystem || !value || !difficultyLevel || !accomplished)
			return fail(400, { message: 'Datos inválidos' });

		await db
			.update(grade)
			.set({ gradeSystem, value, difficultyLevel, accomplished, status })
			.where(eq(grade.id, gradeId));
		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		const u = requireUser(event);
		const { gradeId } = event.params;

		const [item] = await db.select().from(grade).where(eq(grade.id, gradeId));
		if (!item) throw error(404);

		assertOwnerOrAdmin(u, item);

		await db.update(grade).set({ status: Status.deleted }).where(eq(grade.id, gradeId));
		throw redirect(303, event.url.pathname);
	}
};

import { db } from '$lib/server/db';
import { area } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/auth/guards';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Status } from '$lib/contants/constants';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);
	const { areaId } = event.params;
	if (!areaId) throw error(400, 'Falta areaId');

	const [item] = await db.select().from(area).where(eq(area.id, areaId));
	if (!item) throw error(404);

	return { item, areaId };
};

export const actions: Actions = {
	save: async (event) => {
		requireAdmin(event);
		const { areaId } = event.params;
		if (!areaId) throw error(400, 'Falta areaId');

		const [item] = await db.select().from(area).where(eq(area.id, areaId));
		if (!item) throw error(404);

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const province = String(data.get('province') ?? '').trim();
		const city = String(data.get('city') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const latitude = Number(data.get('latitude') ?? '');
		const longitude = Number(data.get('longitude') ?? '');
		const status = String(data.get('status') ?? '');

		if (!province || !city || !description) return fail(400, { message: 'Datos inválidos' });

		await db
			.update(area)
			.set({ name, province, city, description, latitude, longitude, status })
			.where(eq(area.id, areaId));
		throw redirect(303, '/area');
	},
	softDelete: async (event) => {
			requireAdmin(event);
			const { areaId } = event.params;
			const user = event.locals.user;
	
			await db
				.update(area)
				.set({
					status: Status.deleted,
					updatedAt: new Date(),
					deletedAt: new Date(),
					updatedBy: user?.id
				})
				.where(eq(area.id, areaId));
	
			throw redirect(303, event.url.pathname);
		},
};

import { db } from '$lib/server/db';
import { climb } from '$lib/server/db/schema';
import { requireAdmin } from '$lib/server/auth/guards';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { Status } from '$lib/contants/constants';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	requireAdmin(event);
	const { areaId, sectorId, climbId } = event.params;

	const [item] = await db.select().from(climb).where(eq(climb.id, climbId));
	if (!item) throw error(404);

	return { item, areaId, sectorId, climbId };
};

export const actions: Actions = {
	save: async (event) => {
		requireAdmin(event);

		const { climbId } = event.params;

		const [item] = await db.select().from(climb).where(eq(climb.id, climbId));
		if (!item) throw error(404);

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const category = String(data.get('category') ?? '').trim();
		const climbType = String(data.get('climbType') ?? '').trim();
		const requiredEquipment = String(data.get('requiredEquipment') ?? '').trim();
		const status = String(data.get('status') ?? '');

		if (!name || !category || !climbType || !requiredEquipment)
			return fail(400, { message: 'Datos inválidos' });

		await db
			.update(climb)
			.set({ name, category, climbType, requiredEquipment, status })
			.where(eq(climb.id, climbId));
		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const { climbId } = event.params;

		const [item] = await db.select().from(climb).where(eq(climb.id, climbId));
		if (!item) throw error(404);

		await db.update(climb).set({ status: Status.deleted }).where(eq(climb.id, climbId));
		throw redirect(303, event.url.pathname);
	}
};

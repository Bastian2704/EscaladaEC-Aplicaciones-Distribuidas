import { db } from '$lib/server/db';
import { climb, sector } from '$lib/server/db/schema';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import {
	isValidCategory,
	isValidType,
	Status
} from '$lib/contants/constants';
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { areaId, sectorId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';
	const offset = (page - 1) * PAGE_SIZE;

	const items = await db
		.select()
		.from(climb)
		.where(eq(climb.sectorId, sectorId))
		.limit(PAGE_SIZE)
		.offset(offset);
	const sectorInfo = await db.select().from(sector).where(eq(sector.id, sectorId));

	return {
		items,
		page,
		status,
		sectorId,
		areaId,
		sectorInfo,
	};
};
export const actions: Actions = {
	createClimb: async (event) => {
		requireAdmin(event);
		const { sectorId } = event.params;
		const user = event.locals.user;
		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const categoryGroup = String(data.get('category') ?? '').trim();
		const climbType = String(data.get('climbType') ?? '').trim();
		const requiredEquipment = String(data.get('requiredEquipment') ?? '').trim();
		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();


		if (!name || !categoryGroup || !climbType || !requiredEquipment) {
			return fail(400, {
				message: 'Nombre del Climb, Categoria, Tipo de Escalada Y Equipo Requerido son Obligatorias'
			});
		}

		if (!isValidCategory(categoryGroup)) {
			console.log(categoryGroup);
			return fail(400, { message: 'Categoría inválida.' });
		}
		if (!isValidType(categoryGroup, climbType)) {
			return fail(400, { message: 'El tipo no corresponde a la categoría seleccionada.' });
		}

		await db.insert(climb).values({
			sectorId,
			userId: user?.id,
			name,
			category: categoryGroup,
			climbType,
			gradeSystem,
			value,
			requiredEquipment,
			status: 'active',
			createdAt: new Date(),
			updatedAt: new Date(),
			createdBy: user?.id,
			updatedBy: user?.id
		} as any);

		return { success: true, message: `Climb: ${name}, creado correctamente.` };
	},

	suspend: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const user = event.locals.user;
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db
			.update(climb)
			.set({ status: Status.suspended, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const user = event.locals.user;
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await db
			.update(climb)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const user = event.locals.user;
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db
			.update(climb)
			.set({
				status: Status.deleted,
				updatedAt: new Date(),
				updatedBy: user?.id,
				deletedAt: new Date()
			})
			.where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const user = event.locals.user;
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await db
			.update(climb)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(climb.id, id));

		throw redirect(303, event.url.pathname);
	}
};

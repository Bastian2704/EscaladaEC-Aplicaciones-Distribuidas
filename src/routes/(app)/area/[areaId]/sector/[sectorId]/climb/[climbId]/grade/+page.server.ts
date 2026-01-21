import { db } from '$lib/server/db';
import { grade, climb } from '$lib/server/db/schema';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import { fail, redirect } from '@sveltejs/kit';
import { eq, and } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { isValidGradeSystem, isValidGradeSystemValue, Status } from '$lib/contants/constants';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { areaId, sectorId, climbId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';
	const offset = (page - 1) * PAGE_SIZE;

	const items = await db
		.select()
		.from(grade)
		.where(and(eq(grade.climbId, climbId)))
		.limit(PAGE_SIZE)
		.offset(offset);

	const climbInfo = await db.select().from(climb).where(eq(climb.id, climbId));

	return {
		items,
		page,
		status,
		sectorId,
		areaId,
		climbId,
		climbInfo
	};
};
export const actions: Actions = {
	createGrade: async (event) => {
		requireUser(event);
		const { climbId } = event.params;
		const user = event.locals.user;
		const data = await event.request.formData();
		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();
		const difficultyLevel = Number(data.get('difficultyLevel') ?? '');
		const accomplished = Boolean(data.get('accomplished') ?? '');
		const climbCategory = String(data.get('climbCategory') ?? '');

		if (!gradeSystem || !value || !difficultyLevel) {
			return fail(400, {
				message: 'Sistema de Grado, Valor y Dificultad Percibida son Obligatorias'
			});
		}
		if (!isValidGradeSystem(climbCategory, gradeSystem)) {
			return fail(400, { message: 'Sistema de grado inválido.' });
		}
		if (!isValidGradeSystemValue(climbCategory, gradeSystem, value)) {
			return fail(400, { message: 'Valor de grado no coincide con el sistema seleccionado.' });
		}
		if (!Number.isFinite(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 10) {
			return fail(400, { message: 'La dificultad percibida debe estar entre 1 y 10.' });
		}

		await db.insert(grade).values({
			climbId,
			userId: user?.id,
			gradeSystem,
			value,
			difficultyLevel,
			accomplished,
			status: Status.active,
			createdAt: new Date(),
			updatedAt: new Date(),
			publishedBy: user?.id,
			updatedBy: user?.id
		} as any);

		return { success: true, message: `Grado creado correctamente.` };
	},

	suspend: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });
		const user = event.locals.user;

		await db
			.update(grade)
			.set({ status: Status.suspended, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(grade.id, id));

		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });
		const user = event.locals.user;

		await db
			.update(grade)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(grade.id, id));

		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });
		const user = event.locals.user;

		await db
			.update(grade)
			.set({ status: Status.deleted, updatedAt: new Date(), deletedAt: new Date(), updatedBy: user?.id })
			.where(eq(grade.id, id));

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });
		const user = event.locals.user;

		await db
			.update(grade)
			.set({ status: Status.active, updatedAt: new Date(), updatedBy: user?.id })
			.where(eq(grade.id, id));

		throw redirect(303, event.url.pathname);
	}
};

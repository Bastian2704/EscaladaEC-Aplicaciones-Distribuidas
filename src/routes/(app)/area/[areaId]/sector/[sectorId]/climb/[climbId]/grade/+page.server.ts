import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';


const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { areaId, sectorId, climbId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const statusQuery = url.searchParams.get('status');
	const status = parseStatus(statusQuery, 'active');


	const gradeService = ServiceFactory.create('grade');
	const items = await gradeService.listGrades({
		climbId,
		page,
		pageSize: PAGE_SIZE,
		status
	});

	const climbService = ServiceFactory.create('climb');
	const climbInfo = await climbService.getClimbHeader(climbId);

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
		const user = requireUser(event);
		const { climbId } = event.params;

		const data = await event.request.formData();

		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();
		const difficultyLevel = Number(data.get('difficultyLevel') ?? '');
		const accomplished = data.get('accomplished') === 'on';
		const climbCategory = String(data.get('climbCategory') ?? '').trim();

		if (!gradeSystem || !value || !Number.isFinite(difficultyLevel) || !climbCategory) {
			return fail(400, {
				message: 'Sistema de Grado, Valor y Dificultad Percibida son Obligatorias'
			});
		}

		try {
			const gradeService = ServiceFactory.create('grade');
			await gradeService.createGrade(
				{
					climbId,
					climbCategory,
					gradeSystem,
					value,
					difficultyLevel,
					accomplished
				},
				{ id: user.id, role: user.role }
			);

			return { success: true, message: `Grado creado correctamente.` };
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error creando grado';
			return fail(400, { message });
		}
	},

	suspend: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		const gradeService = ServiceFactory.create('grade');
		await gradeService.changeStatus(id, 'suspended', { id: admin.id, role: admin.role });

		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		const gradeService = ServiceFactory.create('grade');
		await gradeService.changeStatus(id, 'active', { id: admin.id, role: admin.role });

		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		const gradeService = ServiceFactory.create('grade');
		await gradeService.softDelete(id, { id: admin.id, role: admin.role });

		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		const admin = requireAdmin(event);
		const data = await event.request.formData();
		const id = String(data.get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		const gradeService = ServiceFactory.create('grade');
		await gradeService.restore(id, { id: admin.id, role: admin.role });

		throw redirect(303, event.url.pathname);
	}
};

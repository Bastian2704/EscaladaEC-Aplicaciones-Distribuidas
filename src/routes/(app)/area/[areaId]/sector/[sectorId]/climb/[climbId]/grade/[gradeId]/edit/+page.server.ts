import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireUser } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

export const load: PageServerLoad = async (event) => {
	const user = requireUser(event);
	const { areaId, sectorId, climbId, gradeId } = event.params;

	const gradeService = ServiceFactory.create('grade');
	const item = await gradeService.getGradeForEdit(gradeId, { id: user.id, role: user.role });

	return { item, areaId, sectorId, climbId, gradeId };
};

export const actions: Actions = {
	save: async (event) => {
		const user = requireUser(event);
		const { gradeId } = event.params;

		const data = await event.request.formData();
		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();
		const difficultyLevel = Number(data.get('difficultyLevel') ?? '');
		const accomplished = data.get('accomplished') === 'on';
		const status = parseStatus(data.get('status'), 'active');

		if (!gradeSystem || !value || !Number.isFinite(difficultyLevel)) {
			return fail(400, { message: 'Datos inválidos' });
		}

		try {
			const gradeService = ServiceFactory.create('grade');

			await gradeService.updateGrade(
				gradeId,
				{
					gradeSystem,
					value,
					difficultyLevel,
					accomplished,
					status
					// Si luego quieres revalidar contra categoría, pasa climbCategory aquí.
				},
				{ id: user.id, role: user.role }
			);

			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error guardando grade';
			return fail(400, { message });
		}
	},

	softDelete: async (event) => {
		const user = requireUser(event);
		const { gradeId } = event.params;

		const gradeService = ServiceFactory.create('grade');

		try {
			await gradeService.ownerSoftDelete(gradeId, { id: user.id, role: user.role });

			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error eliminando grade';
			return fail(400, { message });
		}
	}
};

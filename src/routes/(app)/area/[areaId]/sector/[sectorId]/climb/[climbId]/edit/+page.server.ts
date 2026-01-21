import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

export const load: PageServerLoad = async (event) => {
	const admin = requireAdmin(event);
	const { areaId, sectorId, climbId } = event.params;

	const climbService = ServiceFactory.create('climb');
	const item = await climbService.getClimbForEdit(climbId, admin);

	return { item, areaId, sectorId, climbId };
};

export const actions: Actions = {
	save: async (event) => {
		const admin = requireAdmin(event);
		const { climbId } = event.params;

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const category = String(data.get('category') ?? '').trim();
		const climbType = String(data.get('climbType') ?? '').trim();
		const requiredEquipment = String(data.get('requiredEquipment') ?? '').trim();
		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();

		const status = parseStatus(data.get('status'), 'active');

		if (!name || !category || !climbType || !requiredEquipment || !gradeSystem || !value) {
			return fail(400, { message: 'Datos inválidos' });
		}

		try {
			await ServiceFactory.create('climb').updateClimb(
				climbId,
				{
					name,
					category,
					climbType,
					requiredEquipment,
					gradeSystem,
					value,
					status
				},
				admin
			);

			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error guardando climb';
			return fail(400, { message });
		}
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const { climbId } = event.params;

		try {
			await ServiceFactory.create('climb').softDelete(climbId, admin);
			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error eliminando climb';
			return fail(400, { message });
		}
	}
};

import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

export const load: PageServerLoad = async (event) => {
	const admin = requireAdmin(event);
	const { areaId, sectorId } = event.params;

	const sectorService = ServiceFactory.create('sector');
	const item = await sectorService.getSectorForEdit(sectorId, admin);

	return { item, areaId, sectorId };
};

export const actions: Actions = {
	save: async (event) => {
		const admin = requireAdmin(event);
		const { sectorId } = event.params;

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const orientation = String(data.get('orientation') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();
		const status = parseStatus(data.get('status'), 'active');

		if (!name || !orientation || !description) {
			return fail(400, { message: 'Datos inválidos' });
		}

		try {
			await ServiceFactory.create('sector').updateSector(
				sectorId,
				{
					name,
					orientation,
					description,
					status
				},
				admin
			);

			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error guardando sector';
			return fail(400, { message });
		}
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const { sectorId } = event.params;

		try {
			await ServiceFactory.create('sector').softDelete(sectorId, admin);
			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error eliminando sector';
			return fail(400, { message });
		}
	}
};

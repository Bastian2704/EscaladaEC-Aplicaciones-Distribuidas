import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

export const load: PageServerLoad = async (event) => {
	const admin = requireAdmin(event);
	const { areaId } = event.params;

	const item = await ServiceFactory.create('area').getAreaForEdit(areaId, admin);
	return { item, areaId };
};

export const actions: Actions = {
	save: async (event) => {
		const admin = requireAdmin(event);
		const { areaId } = event.params;

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const province = String(data.get('province') ?? '').trim();
		const city = String(data.get('city') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();

		const latitude = Number(data.get('latitude'));
		const longitude = Number(data.get('longitude'));

		const status = parseStatus(data.get('status'), 'active');

		if (!name || !province || !city || !description) return fail(400, { message: 'Datos inválidos' });
		if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
			return fail(400, { message: 'Latitud/Longitud inválidas' });
		}

		try {
			await ServiceFactory.create('area').updateArea(
				areaId,
				{ name, province, city, description, latitude, longitude, status },
				admin
			);

			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error guardando área';
			return fail(400, { message });
		}
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const { areaId } = event.params;

		try {
			await ServiceFactory.create('area').softDelete(areaId, admin);
			throw redirect(303, event.url.pathname);
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error eliminando área';
			return fail(400, { message });
		}
	}
};

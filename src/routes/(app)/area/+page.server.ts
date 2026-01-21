import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const statusQuery = url.searchParams.get('status');
	const status = parseStatus(statusQuery, 'active');

	const areaService = ServiceFactory.create('area');
	const items = await areaService.listAreas({ page, pageSize: PAGE_SIZE, status });

	return { items, page, status };
};

export const actions: Actions = {
	createArea: async (event) => {
		const admin = requireAdmin(event);

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const province = String(data.get('province') ?? '').trim();
		const city = String(data.get('city') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();

		const latitude = Number(data.get('latitude'));
		const longitude = Number(data.get('longitude'));

		if (!name || !province || !city || !description) {
			return fail(400, { message: 'Nombre, provincia, ciudad y descripción son obligatorios' });
		}
		if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
			return fail(400, { message: 'Latitud/Longitud inválidas' });
		}

		try {
			await ServiceFactory.create('area').createArea(
				{ name, province, city, description, latitude, longitude },
				admin
			);

			return { success: true, message: `Área ${name} creada correctamente.` };
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error creando área';
			return fail(400, { message });
		}
	},

	suspend: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await ServiceFactory.create('area').changeStatus(id, 'suspended', admin);
		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await ServiceFactory.create('area').changeStatus(id, 'active', admin);
		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await ServiceFactory.create('area').softDelete(id, admin);
		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await ServiceFactory.create('area').restore(id, admin);
		throw redirect(303, event.url.pathname);
	}
};

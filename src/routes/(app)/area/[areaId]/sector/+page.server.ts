import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { areaId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const statusQuery = url.searchParams.get('status');
	const status = parseStatus(statusQuery, 'active');

	const sectorService = ServiceFactory.create('sector');
	const items = await sectorService.listSectors({
		areaId,
		page,
		pageSize: PAGE_SIZE,
		status
	});
	const areaService = ServiceFactory.create('area');
	const areaInfo = await areaService.getAreaHeader(areaId);

	return {
		items,
		areaInfo,
		page,
		status,
		areaId
	};
};

export const actions: Actions = {
	createSector: async (event) => {
		const admin = requireAdmin(event);
		const { areaId } = event.params;

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const orientation = String(data.get('orientation') ?? '').trim();
		const description = String(data.get('description') ?? '').trim();

		if (!name || !orientation || !description) {
			return fail(400, { message: 'Nombre, orientación y descripción son obligatorios' });
		}

		try {
			await ServiceFactory.create('sector').createSector(
				{
					areaId,
					name,
					orientation,
					description
				},
				admin
			);

			return { success: true, message: `Sector ${name} creado correctamente.` };
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error creando sector';
			return fail(400, { message });
		}
	},

	suspend: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await ServiceFactory.create('sector').changeStatus(id, 'suspended', admin);
		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await ServiceFactory.create('sector').changeStatus(id, 'active', admin);
		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await ServiceFactory.create('sector').softDelete(id, admin);
		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await ServiceFactory.create('sector').restore(id, admin);
		throw redirect(303, event.url.pathname);
	}
};

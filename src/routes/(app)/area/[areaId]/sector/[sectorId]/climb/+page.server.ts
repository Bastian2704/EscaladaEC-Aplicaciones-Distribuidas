import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireUser, requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';
import { parseStatus } from '$lib/server/domain/parsers';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	requireUser(event);

	const { areaId, sectorId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));

	const statusQuery = url.searchParams.get('status');
	const status = parseStatus(statusQuery, 'active');

	const climbService = ServiceFactory.create('climb');
	const items = await climbService.listClimbs({
		sectorId,
		page,
		pageSize: PAGE_SIZE,
		status
	});

	const sectorService = ServiceFactory.create('sector');
	const sectorInfo = await sectorService.getSectorHeader(sectorId);

	return {
		items,
		page,
		status,
		sectorId,
		areaId,
		sectorInfo
	};
};

export const actions: Actions = {
	createClimb: async (event) => {
		const admin = requireAdmin(event);
		const { sectorId } = event.params;

		const data = await event.request.formData();
		const name = String(data.get('name') ?? '').trim();
		const category = String(data.get('category') ?? '').trim();
		const climbType = String(data.get('climbType') ?? '').trim();
		const requiredEquipment = String(data.get('requiredEquipment') ?? '').trim();
		const gradeSystem = String(data.get('gradeSystem') ?? '').trim();
		const value = String(data.get('value') ?? '').trim();

		if (!name || !category || !climbType || !requiredEquipment || !gradeSystem || !value) {
			return fail(400, {
				message:
					'Nombre del Climb, Categoria, Tipo de Escalada, Sistema/Valor y Equipo Requerido son obligatorios'
			});
		}

		try {
			const climbService = ServiceFactory.create('climb');

			await climbService.createClimb(
				{
					sectorId,
					name,
					category,
					climbType,
					gradeSystem,
					value,
					requiredEquipment
				},
				{ id: admin.id, role: admin.role }
			);

			return { success: true, message: `Climb: ${name}, creado correctamente.` };
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error creando climb';
			return fail(400, { message });
		}
	},

	suspend: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await ServiceFactory.create('climb').changeStatus(id, 'suspended', admin);
		throw redirect(303, event.url.pathname);
	},

	resume: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'Sin id' });

		await ServiceFactory.create('climb').changeStatus(id, 'active', admin);
		throw redirect(303, event.url.pathname);
	},

	softDelete: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await ServiceFactory.create('climb').softDelete(id, admin);
		throw redirect(303, event.url.pathname);
	},

	restore: async (event) => {
		const admin = requireAdmin(event);
		const id = String((await event.request.formData()).get('id') ?? '');
		if (!id) return fail(400, { message: 'No se ha enviado un ID' });

		await ServiceFactory.create('climb').restore(id, admin);
		throw redirect(303, event.url.pathname);
	}
};

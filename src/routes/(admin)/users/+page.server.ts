import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { requireAdmin } from '$lib/server/auth/guards';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';

const PAGE_SIZE = 10;

export const load: PageServerLoad = async (event) => {
	const admin = requireAdmin(event);

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const role = url.searchParams.get('role') ?? 'all';
	const status = url.searchParams.get('status') ?? 'all';

	const userService = ServiceFactory.create('user');
	const items = await userService.listUsers(
		{ page, pageSize: PAGE_SIZE, role, status },
		{ id: admin.id, role: admin.role }
	);

	return { user: admin, items, page, role, status };
};

export const actions: Actions = {
	createUser: async (event) => {
		const admin = requireAdmin(event);

		const data = await event.request.formData();
		const email = String(data.get('email') ?? '').toLowerCase().trim();
		const password = String(data.get('password') ?? '');
		const username = String(data.get('username') ?? '').trim();
		const age = String(data.get('age') ?? '').trim();
		const role = String(data.get('role') ?? 'user').toLowerCase();

		try {
			const userService = ServiceFactory.create('user');
			await userService.createUser(
				{ email, password, username, age, role },
				{ id: admin.id, role: admin.role }
			);

			return { success: true, message: `Usuario ${email} creado correctamente como ${role}` };
		} catch (e) {
			const message = e instanceof Error ? e.message : 'Error creando usuario';
			return fail(400, { message });
		}
	},

	setRole: async (event) => {
  const admin = requireAdmin(event);
  const data = await event.request.formData();
  const id = String(data.get('id') ?? '');
  const newRole = String(data.get('role') ?? '');

  if (!id) return fail(400, { message: 'Datos inválidos' });

  const userService = ServiceFactory.create('user');
  await userService.setRole(id, newRole, { id: admin.id, role: admin.role });

  throw redirect(303, '/users');
},

suspend: async (event) => {
  const admin = requireAdmin(event);
  const data = await event.request.formData();
  const id = String(data.get('id') ?? '');
  if (!id) return fail(400, { message: 'Sin id' });

  const userService = ServiceFactory.create('user');
  await userService.suspend(id, { id: admin.id, role: admin.role });

  throw redirect(303, '/users');
},

resume: async (event) => {
  const admin = requireAdmin(event);
  const data = await event.request.formData();
  const id = String(data.get('id') ?? '');
  if (!id) return fail(400, { message: 'Sin id' });

  const userService = ServiceFactory.create('user');
  await userService.resume(id, { id: admin.id, role: admin.role });

  throw redirect(303, '/users');
},

softDelete: async (event) => {
  const admin = requireAdmin(event);
  const data = await event.request.formData();
  const id = String(data.get('id') ?? '');
  if (!id) return fail(400, { message: 'Sin id' });

  const userService = ServiceFactory.create('user');
  await userService.softDelete(id, { id: admin.id, role: admin.role });

  throw redirect(303, '/users?status=deleted');
}

};

import { error } from '@sveltejs/kit';
import type { SessionUser } from '$lib/server/domain/types';
import { parseRole, parseStatus } from '$lib/server/domain/parsers';
import type { IUserRepository, Role, UserRow } from '$lib/server/repositories/user.repository';
import type { ISessionManager } from './sessionManager';
import { AdminUserBuilder } from '$lib/server/domain/user/adminUserBuilder';

type ListUsersInput = {
	page: number;
	pageSize: number;
	role?: string;
	status?: string;
};

type CreateUserInput = {
	email: string;
	password: string;
	username: string;
	age: string;
	role: string;
};

export class UserService {
	constructor(
		private readonly repo: IUserRepository,
		private readonly sessions: ISessionManager
	) {}

	private assertAdmin(user: SessionUser) {
		if (user.role !== 'admin') throw error(403, 'Forbidden');
	}

	private ensureNotSelf(currentUserId: string, targetId: string) {
		if (currentUserId === targetId) throw error(400, 'No puedes modificarte a ti mismo');
	}

	private async assertNotLastAdminIfDemoting(targetUserId: string) {
		const target = await this.repo.findById(targetUserId);
		if (!target) throw error(404, 'Usuario no encontrado');
		if (target.role !== 'admin') return;

		const admins = await this.repo.countActiveAdmins();
		if (admins <= 1) throw error(400, 'No puedes quitar el último admin del sistema');
	}

    async listUsers(input: ListUsersInput, admin: SessionUser): Promise<UserRow[]> {
	this.assertAdmin(admin);

	const role =
		!input.role || input.role === 'all'
			? 'all'
			: parseRole(input.role);

	const status =
		!input.status || input.status === 'all'
			? 'all'
			: parseStatus(input.status);

	return this.repo.list({
		page: input.page,
		pageSize: input.pageSize,
		role,
		status
	});
}



	async createUser(input: CreateUserInput, admin: SessionUser): Promise<void> {
		this.assertAdmin(admin);

		const role: Role = parseRole(input.role);

		const exists = await this.repo.findByEmail(input.email.toLowerCase().trim());
		if (exists) throw error(400, 'Ya existe un usuario con ese email');

		const row = await new AdminUserBuilder()
			.fromInput({
				email: input.email,
				password: input.password,
				username: input.username,
				age: input.age,
				role
			})
			.validate()
			.build();

		await this.repo.insert(row);
	}

	async setRole(targetId: string, newRoleRaw: string, admin: SessionUser): Promise<void> {
		this.assertAdmin(admin);
		this.ensureNotSelf(admin.id, targetId);

		const newRole = parseRole(newRoleRaw);

		if (newRole !== 'admin') {
			await this.assertNotLastAdminIfDemoting(targetId);
		}

		await this.repo.updateRole(targetId, { role: newRole, updatedAt: new Date() });
	}

	async suspend(targetId: string, admin: SessionUser): Promise<void> {
		this.assertAdmin(admin);
		this.ensureNotSelf(admin.id, targetId);
		await this.assertNotLastAdminIfDemoting(targetId);

		await this.repo.updateStatus(targetId, { status: 'suspended', updatedAt: new Date(), deletedAt: null });
		await this.sessions.invalidateUserSessions(targetId);
	}

	async resume(targetId: string, admin: SessionUser): Promise<void> {
		this.assertAdmin(admin);
		await this.repo.updateStatus(targetId, { status: 'active', updatedAt: new Date(), deletedAt: null });
	}

	async softDelete(targetId: string, admin: SessionUser): Promise<void> {
		this.assertAdmin(admin);
		this.ensureNotSelf(admin.id, targetId);
		await this.assertNotLastAdminIfDemoting(targetId);

		await this.repo.updateStatus(targetId, {
			status: 'deleted',
			updatedAt: new Date(),
			deletedAt: new Date()
		});

		await this.sessions.invalidateUserSessions(targetId);
	}
}

import type { users } from '$lib/server/db/schema';
import type { Status } from '$lib/server/domain/types';

type UserSelect = typeof users.$inferSelect;

export type Role = 'user' | 'admin';

export type UserRow = Omit<UserSelect, 'role' | 'status'> & {
	role: Role;
	status: Status;
};

export type NewUserRow = typeof users.$inferInsert;

export type ListUsersParams = {
	page: number;
	pageSize: number;
	role?: Role | 'all';
	status?: Status | 'all';
};

export type UpdateRolePayload = {
	role: Role;
	updatedAt: Date;
};

export type UpdateStatusPayload = {
	status: Status;
	updatedAt: Date;
	deletedAt: Date | null;
};

export interface IUserRepository {
	list(params: ListUsersParams): Promise<UserRow[]>;
	findById(id: string): Promise<UserRow | null>;
	findByEmail(email: string): Promise<UserRow | null>;
	countActiveAdmins(): Promise<number>;

	insert(row: NewUserRow): Promise<UserRow>;
	updateRole(id: string, payload: UpdateRolePayload): Promise<void>;
	updateStatus(id: string, payload: UpdateStatusPayload): Promise<void>;
}

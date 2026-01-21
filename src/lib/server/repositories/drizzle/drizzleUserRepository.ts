import { and, eq, isNull, isNotNull } from 'drizzle-orm';
import { users } from '$lib/server/db/schema';
import type { db as appDb } from '$lib/server/db';
import { parseRole, parseStatus } from '$lib/server/domain/parsers';

import type {
	IUserRepository,
	UserRow,
	ListUsersParams,
	NewUserRow,
	UpdateRolePayload,
	UpdateStatusPayload
} from '../user.repository';

type UserSelect = typeof users.$inferSelect;

export class DrizzleUserRepository implements IUserRepository {
	constructor(private readonly db: typeof appDb) {}

	private mapRow(row: UserSelect): UserRow {
		return {
			...row,
			role: parseRole(row.role),
			status: parseStatus(row.status)
		};
	}

	async list(params: ListUsersParams): Promise<UserRow[]> {
		const { page, pageSize, role = 'all', status = 'active' } = params;
		const offset = (Math.max(1, page) - 1) * pageSize;

		const whereParts = [];

		// role filter
		if (role !== 'all') whereParts.push(eq(users.role, role));

		/**
		 * status filter (real):
		 * - active/suspended -> status = X AND deletedAt IS NULL
		 * - deleted          -> status = 'deleted' AND deletedAt IS NOT NULL
		 * - all              -> no status filter
		 */
		if (status !== 'all') {
			if (status === 'deleted') {
				whereParts.push(eq(users.status, 'deleted'));
				whereParts.push(isNotNull(users.deletedAt));
			} else {
				whereParts.push(eq(users.status, status));
				whereParts.push(isNull(users.deletedAt));
			}
		}

		const where = whereParts.length ? and(...whereParts) : undefined;

		const rows = await this.db.select().from(users).where(where).limit(pageSize).offset(offset);

		return rows.map((r) => this.mapRow(r));
	}

	async findById(id: string): Promise<UserRow | null> {
		const [row] = await this.db.select().from(users).where(eq(users.id, id));
		return row ? this.mapRow(row) : null;
	}

	async findByEmail(email: string): Promise<UserRow | null> {
		const [row] = await this.db.select().from(users).where(eq(users.email, email));
		return row ? this.mapRow(row) : null;
	}

	async countActiveAdmins(): Promise<number> {
		// admins activos = role admin, status active, y no deletedAt
		const rows = await this.db
			.select({ id: users.id })
			.from(users)
			.where(and(eq(users.role, 'admin'), eq(users.status, 'active'), isNull(users.deletedAt)));

		return rows.length;
	}

	async insert(row: NewUserRow): Promise<UserRow> {
		const [created] = await this.db.insert(users).values(row).returning();
		return this.mapRow(created);
	}

	async updateRole(id: string, payload: UpdateRolePayload): Promise<void> {
		await this.db
			.update(users)
			.set({
				role: payload.role,
				updatedAt: payload.updatedAt
			})
			.where(eq(users.id, id));
	}

	async updateStatus(id: string, payload: UpdateStatusPayload): Promise<void> {
		await this.db
			.update(users)
			.set({
				status: payload.status,
				updatedAt: payload.updatedAt,
				deletedAt: payload.deletedAt
			})
			.where(eq(users.id, id));
	}
}

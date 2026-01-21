import { eq } from 'drizzle-orm';
import { parseStatus } from '$lib/server/domain/parsers';
import { area } from '$lib/server/db/schema';
import type { db as appDb } from '$lib/server/db';
import type {
	IAreaRepository,
	AreaRow,
	ListAreasParams,
	NewAreaRow,
	AreaStatusPayload,
	AreaUpdatePayload
} from '../area.repository';

type AreaSelect = typeof area.$inferSelect;

export class DrizzleAreaRepository implements IAreaRepository {
	constructor(private readonly db: typeof appDb) {}

	private mapRow(row: AreaSelect): AreaRow {
		return { ...row, status: parseStatus(row.status) };
	}

	async findById(id: string): Promise<AreaRow | null> {
		const [row] = await this.db.select().from(area).where(eq(area.id, id));
		return row ? this.mapRow(row) : null;
	}

	async list(params: ListAreasParams): Promise<AreaRow[]> {
		const { page, pageSize } = params;
		const offset = (Math.max(1, page) - 1) * pageSize;

		// (Luego: aquí puedes filtrar por status si quieres)
		const rows = await this.db.select().from(area).limit(pageSize).offset(offset);

		return rows.map((r) => this.mapRow(r));
	}

	async insert(newArea: NewAreaRow): Promise<AreaRow> {
		const [created] = await this.db.insert(area).values(newArea).returning();
		return this.mapRow(created);
	}

	async updateDetails(id: string, payload: AreaUpdatePayload): Promise<void> {
		await this.db
			.update(area)
			.set({
				name: payload.name,
				province: payload.province,
				city: payload.city,
				description: payload.description,
				latitude: payload.latitude,
				longitude: payload.longitude,
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy
			})
			.where(eq(area.id, id));
	}

	async updateStatus(id: string, payload: AreaStatusPayload): Promise<void> {
		await this.db
			.update(area)
			.set({
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy,
				deletedAt: payload.deletedAt
			})
			.where(eq(area.id, id));
	}
}

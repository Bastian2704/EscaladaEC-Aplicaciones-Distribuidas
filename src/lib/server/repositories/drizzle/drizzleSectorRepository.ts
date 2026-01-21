import { and, eq } from 'drizzle-orm';
import { parseStatus } from '$lib/server/domain/parsers';
import { sector } from '$lib/server/db/schema';
import type { db as appDb } from '$lib/server/db';
import type {
	ISectorRepository,
	SectorRow,
	ListSectorsParams,
	NewSectorRow,
	SectorStatusPayload,
	SectorUpdatePayload
} from '../sector.repository';

type SectorSelect = typeof sector.$inferSelect;

export class DrizzleSectorRepository implements ISectorRepository {
	constructor(private readonly db: typeof appDb) {}

	private mapRow(row: SectorSelect): SectorRow {
		return { ...row, status: parseStatus(row.status) };
	}

	async findById(id: string): Promise<SectorRow | null> {
		const [row] = await this.db.select().from(sector).where(eq(sector.id, id));
		return row ? this.mapRow(row) : null;
	}

	async listByAreaId(params: ListSectorsParams): Promise<SectorRow[]> {
		const { areaId, page, pageSize } = params;
		const offset = (Math.max(1, page) - 1) * pageSize;

		const rows = await this.db
			.select()
			.from(sector)
			.where(and(eq(sector.areaId, areaId)))
			.limit(pageSize)
			.offset(offset);

		return rows.map((r) => this.mapRow(r));
	}

	async insert(newSector: NewSectorRow): Promise<SectorRow> {
		const [created] = await this.db.insert(sector).values(newSector).returning();
		return this.mapRow(created);
	}

	async updateDetails(id: string, payload: SectorUpdatePayload): Promise<void> {
		await this.db
			.update(sector)
			.set({
				name: payload.name,
				orientation: payload.orientation,
				description: payload.description,
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy
			})
			.where(eq(sector.id, id));
	}

	async updateStatus(id: string, payload: SectorStatusPayload): Promise<void> {
		await this.db
			.update(sector)
			.set({
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy,
				deletedAt: payload.deletedAt
			})
			.where(eq(sector.id, id));
	}
}

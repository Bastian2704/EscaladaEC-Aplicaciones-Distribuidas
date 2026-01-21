import { and, eq } from 'drizzle-orm';
import { parseStatus } from '$lib/server/domain/parsers';
import { climb } from '$lib/server/db/schema';
import type { db as appDb } from '$lib/server/db';
import type {
	IClimbRepository,
	ClimbRow,
	ListClimbsParams,
	NewClimbRow,
	ClimbStatusPayload,
	ClimbUpdatePayload
} from '../climb.repository';

type ClimbSelect = typeof climb.$inferSelect;

export class DrizzleClimbRepository implements IClimbRepository {
	constructor(private readonly db: typeof appDb) {}

	private mapRow(row: ClimbSelect): ClimbRow {
		return { ...row, status: parseStatus(row.status) };
	}

	async findById(id: string): Promise<ClimbRow | null> {
		const [row] = await this.db.select().from(climb).where(eq(climb.id, id));
		return row ? this.mapRow(row) : null;
	}

	async listBySectorId(params: ListClimbsParams): Promise<ClimbRow[]> {
		const { sectorId, page, pageSize } = params;
		const offset = (Math.max(1, page) - 1) * pageSize;

		// Por ahora igual que tu versión: solo filtra por sectorId.
		// Si luego quieres filtrar por status, lo añadimos aquí.
		const rows = await this.db
			.select()
			.from(climb)
			.where(and(eq(climb.sectorId, sectorId)))
			.limit(pageSize)
			.offset(offset);

		return rows.map((r) => this.mapRow(r));
	}

	async insert(newClimb: NewClimbRow): Promise<ClimbRow> {
		const [created] = await this.db.insert(climb).values(newClimb).returning();
		return this.mapRow(created);
	}

	async updateDetails(id: string, payload: ClimbUpdatePayload): Promise<void> {
		await this.db
			.update(climb)
			.set({
				name: payload.name,
				category: payload.category,
				climbType: payload.climbType,
				gradeSystem: payload.gradeSystem,
				value: payload.value,
				requiredEquipment: payload.requiredEquipment,
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy
			})
			.where(eq(climb.id, id));
	}

	async updateStatus(id: string, payload: ClimbStatusPayload): Promise<void> {
		await this.db
			.update(climb)
			.set({
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy,
				deletedAt: payload.deletedAt
			})
			.where(eq(climb.id, id));
	}
}

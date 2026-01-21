import { and, eq } from 'drizzle-orm';
import { parseStatus } from '$lib/server/domain/parsers';
import { grade } from '$lib/server/db/schema';
import type { db as appDb } from '$lib/server/db';
import type {
	IGradeRepository,
	GradeRow,
	ListParams,
	NewGradeRow,
	GradeStatusPayload,
	GradeUpdatePayload
} from '../grade.repository';

type GradeSelect = typeof grade.$inferSelect;
export class DrizzleGradeRepository implements IGradeRepository {
	constructor(private readonly db: typeof appDb) {}

	
	private mapRow(row: GradeSelect): GradeRow {
	return { ...row, status: parseStatus(row.status) };
}

	async findById(id: string): Promise<GradeRow | null> {
	const [row] = await this.db.select().from(grade).where(eq(grade.id, id));
	return row ? this.mapRow(row) : null;
}


	async listByClimbId(params: ListParams): Promise<GradeRow[]> {
	const { climbId, page, pageSize } = params;
	const offset = (Math.max(1, page) - 1) * pageSize;

	const rows = await this.db
		.select()
		.from(grade)
		.where(and(eq(grade.climbId, climbId)))
		.limit(pageSize)
		.offset(offset);

	return rows.map((r) => this.mapRow(r));
}


	async insert(newGrade: NewGradeRow): Promise<GradeRow> {
	const [created] = await this.db.insert(grade).values(newGrade).returning();
	return this.mapRow(created);
}


	async updateDetails(id: string, payload: GradeUpdatePayload): Promise<void> {
		await this.db
			.update(grade)
			.set({
				gradeSystem: payload.gradeSystem,
				value: payload.value,
				difficultyLevel: payload.difficultyLevel,
				accomplished: payload.accomplished,
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy
			})
			.where(eq(grade.id, id));
	}

	async updateStatus(id: string, payload: GradeStatusPayload): Promise<void> {
		await this.db
			.update(grade)
			.set({
				status: payload.status,
				updatedAt: payload.updatedAt,
				updatedBy: payload.updatedBy,
				deletedAt: payload.deletedAt
			})
			.where(eq(grade.id, id));
	}
}

import type { Status } from '$lib/server/domain/types';
import type { grade } from '$lib/server/db/schema';

type GradeSelect = typeof grade.$inferSelect;

export type GradeRow = Omit<GradeSelect, 'status'> & { status: Status };
export type NewGradeRow = typeof grade.$inferInsert;

export type ListParams = {
	climbId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

export type GradeUpdatePayload = {
	gradeSystem: string;
	value: string;
	difficultyLevel: number;
	accomplished: boolean;
	status: Status;
	updatedAt: Date;
	updatedBy: string;
};

export type GradeStatusPayload = {
	status: Status;
	updatedAt: Date;
	updatedBy: string;
	deletedAt: Date | null;
};

export interface IGradeRepository {
	findById(id: string): Promise<GradeRow | null>;
	listByClimbId(params: ListParams): Promise<GradeRow[]>;
	insert(newGrade: NewGradeRow): Promise<GradeRow>;

	updateDetails(id: string, payload: GradeUpdatePayload): Promise<void>;
	updateStatus(id: string, payload: GradeStatusPayload): Promise<void>;
}

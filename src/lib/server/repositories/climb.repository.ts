import type { Status } from '$lib/server/domain/types';
import type { climb } from '$lib/server/db/schema';

type ClimbSelect = typeof climb.$inferSelect;

export type ClimbRow = Omit<ClimbSelect, 'status'> & { status: Status };
export type NewClimbRow = typeof climb.$inferInsert;

export type ListClimbsParams = {
	sectorId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

export type ClimbUpdatePayload = {
	name: string;
	category: string;
	climbType: string;
	gradeSystem: string;
	value: string;
	requiredEquipment: string;
	status: Status;
	updatedAt: Date;
	updatedBy: string;
};

export type ClimbStatusPayload = {
	status: Status;
	updatedAt: Date;
	updatedBy: string;
	deletedAt: Date | null;
};

export interface IClimbRepository {
	findById(id: string): Promise<ClimbRow | null>;
	listBySectorId(params: ListClimbsParams): Promise<ClimbRow[]>;
	insert(newClimb: NewClimbRow): Promise<ClimbRow>;

	updateDetails(id: string, payload: ClimbUpdatePayload): Promise<void>;
	updateStatus(id: string, payload: ClimbStatusPayload): Promise<void>;
}

import type { Status } from '$lib/server/domain/types';
import type { area } from '$lib/server/db/schema';

type AreaSelect = typeof area.$inferSelect;

export type AreaRow = Omit<AreaSelect, 'status'> & { status: Status };
export type NewAreaRow = typeof area.$inferInsert;

export type ListAreasParams = {
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

export type AreaUpdatePayload = {
	name: string;
	province: string;
	city: string;
	description: string;
	latitude: number;
	longitude: number;
	status: Status;
	updatedAt: Date;
	updatedBy: string;
};

export type AreaStatusPayload = {
	status: Status;
	updatedAt: Date;
	updatedBy: string;
	deletedAt: Date | null;
};

export interface IAreaRepository {
	findById(id: string): Promise<AreaRow | null>;
	list(params: ListAreasParams): Promise<AreaRow[]>;
	insert(newArea: NewAreaRow): Promise<AreaRow>;

	updateDetails(id: string, payload: AreaUpdatePayload): Promise<void>;
	updateStatus(id: string, payload: AreaStatusPayload): Promise<void>;
}

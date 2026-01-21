import type { Status } from '$lib/server/domain/types';
import type { sector } from '$lib/server/db/schema';

type SectorSelect = typeof sector.$inferSelect;

export type SectorRow = Omit<SectorSelect, 'status'> & { status: Status };
export type NewSectorRow = typeof sector.$inferInsert;

export type ListSectorsParams = {
	areaId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

export type SectorUpdatePayload = {
	name: string;
	orientation: string;
	description: string;
	status: Status;
	updatedAt: Date;
	updatedBy: string;
};

export type SectorStatusPayload = {
	status: Status;
	updatedAt: Date;
	updatedBy: string;
	deletedAt: Date | null;
};

export interface ISectorRepository {
	findById(id: string): Promise<SectorRow | null>;
	listByAreaId(params: ListSectorsParams): Promise<SectorRow[]>;
	insert(newSector: NewSectorRow): Promise<SectorRow>;

	updateDetails(id: string, payload: SectorUpdatePayload): Promise<void>;
	updateStatus(id: string, payload: SectorStatusPayload): Promise<void>;
}

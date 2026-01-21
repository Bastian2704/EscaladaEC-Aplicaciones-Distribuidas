import { error } from '@sveltejs/kit';
import type { SessionUser, Status } from '$lib/server/domain/types';
import type {
	ISectorRepository,
	SectorRow,
	SectorUpdatePayload,
	SectorStatusPayload
} from '$lib/server/repositories/sector.repository';
import { SectorBuilder } from '$lib/server/domain/sector/sectorBuilder';
import { parseStatus } from '$lib/server/domain/parsers';

type ListSectorsParams = {
	areaId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

type CreateSectorParams = {
	areaId: string;
	name: string;
	orientation: string;
	description: string;
};

type UpdateSectorParams = {
	name: string;
	orientation: string;
	description: string;
	status: unknown;
};

export class SectorService {
	constructor(private readonly repo: ISectorRepository) {}

	private assertAdmin(user: SessionUser) {
		if (user.role !== 'admin') throw error(403, 'Forbidden');
	}
    async getSectorHeader(sectorId: string): Promise<SectorRow[]> {
            const row = await this.repo.findById(sectorId);
            if (!row) throw error(404, 'Sector no encontrado');
            return [row]; 
    }

	async listSectors(params: ListSectorsParams): Promise<SectorRow[]> {
		return this.repo.listByAreaId(params);
	}

	async createSector(input: CreateSectorParams, user: SessionUser): Promise<SectorRow> {
		this.assertAdmin(user);
		const newRow = new SectorBuilder().withUser(user).fromInput(input).validate().build();
		return this.repo.insert(newRow);
	}

	async getSectorForEdit(sectorId: string, user: SessionUser): Promise<SectorRow> {
		this.assertAdmin(user);
		const row = await this.repo.findById(sectorId);
		if (!row) throw error(404, 'Sector no encontrado');
		return row;
	}

	async updateSector(sectorId: string, input: UpdateSectorParams, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const row = await this.repo.findById(sectorId);
		if (!row) throw error(404, 'Sector no encontrado');

		const safeStatus = parseStatus(input.status, row.status);

		if (!input.name?.trim() || !input.orientation?.trim() || !input.description?.trim()) {
			throw error(400, 'Datos inválidos');
		}

		const payload: SectorUpdatePayload = {
			name: input.name.trim(),
			orientation: input.orientation.trim(),
			description: input.description.trim(),
			status: safeStatus,
			updatedAt: new Date(),
			updatedBy: user.id
		};

		await this.repo.updateDetails(sectorId, payload);
	}

	async changeStatus(sectorId: string, status: Status, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: SectorStatusPayload = {
			status,
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: status === 'deleted' ? new Date() : null
		};

		await this.repo.updateStatus(sectorId, payload);
	}

	async softDelete(sectorId: string, user: SessionUser): Promise<void> {
		return this.changeStatus(sectorId, 'deleted', user);
	}

	async restore(sectorId: string, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: SectorStatusPayload = {
			status: 'active',
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: null
		};

		await this.repo.updateStatus(sectorId, payload);
	}
}

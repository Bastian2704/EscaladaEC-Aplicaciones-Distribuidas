import { error } from '@sveltejs/kit';
import type { SessionUser, Status } from '$lib/server/domain/types';
import type {
	IAreaRepository,
	AreaRow,
	AreaUpdatePayload,
	AreaStatusPayload
} from '$lib/server/repositories/area.repository';
import { AreaBuilder } from '$lib/server/domain/area/areaBuilder';
import { parseStatus } from '$lib/server/domain/parsers';

type ListAreasParams = {
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

type CreateAreaParams = {
	name: string;
	province: string;
	city: string;
	description: string;
	latitude: number;
	longitude: number;
};

type UpdateAreaParams = {
	name: string;
	province: string;
	city: string;
	description: string;
	latitude: number;
	longitude: number;
	status: unknown;
};

export class AreaService {
	constructor(private readonly repo: IAreaRepository) {}

	private assertAdmin(user: SessionUser) {
		if (user.role !== 'admin') throw error(403, 'Forbidden');
	}

    async getAreaHeader(areaId: string): Promise<AreaRow[]> {
		const row = await this.repo.findById(areaId);
		if (!row) throw error(404, 'Área no encontrada');
		return [row]; 
	}

	async listAreas(params: ListAreasParams): Promise<AreaRow[]> {
		return this.repo.list(params);
	}

	async createArea(input: CreateAreaParams, user: SessionUser): Promise<AreaRow> {
		this.assertAdmin(user);
		const newRow = new AreaBuilder().withUser(user).fromInput(input).validate().build();
		return this.repo.insert(newRow);
	}

	async getAreaForEdit(areaId: string, user: SessionUser): Promise<AreaRow> {
		this.assertAdmin(user);
		const row = await this.repo.findById(areaId);
		if (!row) throw error(404, 'Área no encontrada');
		return row;
	}

	async updateArea(areaId: string, input: UpdateAreaParams, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const row = await this.repo.findById(areaId);
		if (!row) throw error(404, 'Área no encontrada');

		const safeStatus = parseStatus(input.status, row.status);

		if (
			!input.name?.trim() ||
			!input.province?.trim() ||
			!input.city?.trim() ||
			!input.description?.trim()
		) {
			throw error(400, 'Datos inválidos');
		}
		if (!Number.isFinite(input.latitude) || !Number.isFinite(input.longitude)) {
			throw error(400, 'Latitud/Longitud inválidas');
		}

		const payload: AreaUpdatePayload = {
			name: input.name.trim(),
			province: input.province.trim(),
			city: input.city.trim(),
			description: input.description.trim(),
			latitude: input.latitude,
			longitude: input.longitude,
			status: safeStatus,
			updatedAt: new Date(),
			updatedBy: user.id
		};

		await this.repo.updateDetails(areaId, payload);
	}

	async changeStatus(areaId: string, status: Status, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: AreaStatusPayload = {
			status,
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: status === 'deleted' ? new Date() : null
		};

		await this.repo.updateStatus(areaId, payload);
	}

	async softDelete(areaId: string, user: SessionUser): Promise<void> {
		return this.changeStatus(areaId, 'deleted', user);
	}

	async restore(areaId: string, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: AreaStatusPayload = {
			status: 'active',
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: null
		};

		await this.repo.updateStatus(areaId, payload);
	}
}

import { error } from '@sveltejs/kit';
import type { SessionUser, Status } from '$lib/server/domain/types';
import type {
	IClimbRepository,
	ClimbRow,
	ClimbUpdatePayload,
	ClimbStatusPayload
} from '$lib/server/repositories/climb.repository';
import { ClimbBuilder } from '$lib/server/domain/climb/climbBuilder';
import { parseStatus } from '$lib/server/domain/parsers';
import { isValidCategory, isValidType } from '$lib/contants/constants';

type ListClimbsParams = {
	sectorId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

type CreateClimbParams = {
	sectorId: string;
	name: string;
	category: string;
	climbType: string;
	gradeSystem: string;
	value: string;
	requiredEquipment: string;
};

type UpdateClimbParams = {
	name: string;
	category: string;
	climbType: string;
	gradeSystem: string;
	value: string;
	requiredEquipment: string;
	status: unknown;
};

export class ClimbService {
	constructor(private readonly repo: IClimbRepository) {}

	private assertAdmin(user: SessionUser) {
		if (user.role !== 'admin') throw error(403, 'Forbidden');
	}
	async getClimbHeader(climbId: string): Promise<ClimbRow[]> {
				const row = await this.repo.findById(climbId);
				if (!row) throw error(404, 'Climb no encontrado');
				return [row]; 
		}

	async listClimbs(params: ListClimbsParams): Promise<ClimbRow[]> {
		return this.repo.listBySectorId(params);
	}

	async createClimb(input: CreateClimbParams, user: SessionUser): Promise<ClimbRow> {
		this.assertAdmin(user);

		const newRow = new ClimbBuilder().withUser(user).fromInput(input).validate().build();
		return this.repo.insert(newRow);
	}

	async getClimbForEdit(climbId: string, user: SessionUser): Promise<ClimbRow> {
		this.assertAdmin(user);

		const row = await this.repo.findById(climbId);
		if (!row) throw error(404, 'Climb no encontrado');
		return row;
	}

	async updateClimb(climbId: string, input: UpdateClimbParams, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const row = await this.repo.findById(climbId);
		if (!row) throw error(404, 'Climb no encontrado');

		// Admin puede cambiar status, pero lo parseamos igual
		const safeStatus: Status = parseStatus(input.status, row.status);

		if (!input.name?.trim() || !input.category?.trim() || !input.climbType?.trim()) {
			throw error(400, 'Datos inválidos');
		}
		if (!input.requiredEquipment?.trim() || !input.gradeSystem?.trim() || !input.value?.trim()) {
			throw error(400, 'Datos inválidos');
		}

		// Validaciones de dominio iguales a create
		if (!isValidCategory(input.category)) throw error(400, 'Categoría inválida.');
		if (!isValidType(input.category, input.climbType)) {
			throw error(400, 'El tipo no corresponde a la categoría seleccionada.');
		}

		const payload: ClimbUpdatePayload = {
			name: input.name.trim(),
			category: input.category.trim(),
			climbType: input.climbType.trim(),
			gradeSystem: input.gradeSystem.trim(),
			value: input.value.trim(),
			requiredEquipment: input.requiredEquipment.trim(),
			status: safeStatus,
			updatedAt: new Date(),
			updatedBy: user.id
		};

		await this.repo.updateDetails(climbId, payload);
	}

	async changeStatus(climbId: string, status: Status, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: ClimbStatusPayload = {
			status,
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: status === 'deleted' ? new Date() : null
		};

		await this.repo.updateStatus(climbId, payload);
	}

	async softDelete(climbId: string, user: SessionUser): Promise<void> {
		return this.changeStatus(climbId, 'deleted', user);
	}

	async restore(climbId: string, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: ClimbStatusPayload = {
			status: 'active',
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: null
		};

		await this.repo.updateStatus(climbId, payload);
	}
}

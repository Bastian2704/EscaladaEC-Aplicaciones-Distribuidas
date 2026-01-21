import { error } from '@sveltejs/kit';
import type { SessionUser, Status } from '$lib/server/domain/types';
import type {
	IGradeRepository,
	GradeRow,
	GradeUpdatePayload,
	GradeStatusPayload
} from '$lib/server/repositories/grade.repository';
import { GradeBuilder } from '$lib/server/domain/grade/gradeBuilder';
import { isValidGradeSystem, isValidGradeSystemValue } from '$lib/contants/constants';
import { parseStatus } from '$lib/server/domain/parsers';


type ListGradesParams = {
	climbId: string;
	page: number;
	pageSize: number;
	status?: Status | 'all';
};

type CreateGradeParams = {
	climbId: string;
	climbCategory: string;
	gradeSystem: string;
	value: string;
	difficultyLevel: number;
	accomplished: boolean;
};

type UpdateGradeParams = {
	gradeSystem: string;
	value: string;
	difficultyLevel: number;
	accomplished: boolean;
	status: unknown;
	climbCategory?: string; 
};

export class GradeService {
	constructor(private readonly repo: IGradeRepository) {}

	private assertAdmin(user: SessionUser) {
		if (user.role !== 'admin') throw error(403, 'Forbidden');
	}

	private assertOwnerOrAdmin(user: SessionUser, row: Pick<GradeRow, 'publishedBy'>) {
		if (user.role === 'admin') return;
		if (row.publishedBy !== user.id) throw error(403, 'No autorizado');
	}

	async listGrades(params: ListGradesParams): Promise<GradeRow[]> {
		return this.repo.listByClimbId(params);
	}

	async createGrade(input: CreateGradeParams, user: SessionUser): Promise<GradeRow> {
		const newRow = new GradeBuilder().withUser(user).fromInput(input).validate().build();
		return this.repo.insert(newRow);
	}

	async getGradeForEdit(gradeId: string, user: SessionUser): Promise<GradeRow> {
		const row = await this.repo.findById(gradeId);
		if (!row) throw error(404, 'Grade no encontrado');

		this.assertOwnerOrAdmin(user, { publishedBy: row.publishedBy });
		return row;
	}

	async updateGrade(gradeId: string, input: UpdateGradeParams, user: SessionUser): Promise<void> {
		const row = await this.repo.findById(gradeId);
		if (!row) throw error(404, 'Grade no encontrado');

		this.assertOwnerOrAdmin(user, { publishedBy: row.publishedBy });
		
		const safeStatus: Status =
	        user.role === 'admin'   
		    ? parseStatus(input.status, row.status)
		    : row.status;
		if (!input.gradeSystem?.trim() || !input.value?.trim()) throw error(400, 'Datos inválidos');
		if (!Number.isFinite(input.difficultyLevel) || input.difficultyLevel < 1 || input.difficultyLevel > 10) {
			throw error(400, 'La dificultad percibida debe estar entre 1 y 10.');
		}

		if (input.climbCategory) {
			if (!isValidGradeSystem(input.climbCategory, input.gradeSystem)) {
				throw error(400, 'Sistema de grado inválido.');
			}
			if (!isValidGradeSystemValue(input.climbCategory, input.gradeSystem, input.value)) {
				throw error(400, 'Valor de grado no coincide con el sistema seleccionado.');
			}
		}

		const payload: GradeUpdatePayload = {
			gradeSystem: input.gradeSystem.trim(),
			value: input.value.trim(),
			difficultyLevel: input.difficultyLevel,
			accomplished: input.accomplished,
			status: safeStatus,
			updatedAt: new Date(),
			updatedBy: user.id
		};

		await this.repo.updateDetails(gradeId, payload);
	}

	async changeStatus(gradeId: string, status: Status, user: SessionUser): Promise<void> {
		this.assertAdmin(user);

		const payload: GradeStatusPayload = {
			status,
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: status === 'deleted' ? new Date() : null
		};

		await this.repo.updateStatus(gradeId, payload);
	}

	async softDelete(gradeId: string, user: SessionUser): Promise<void> {
		return this.changeStatus(gradeId, 'deleted', user);
	}

	async restore(gradeId: string, user: SessionUser): Promise<void> {
		// restore = active + deletedAt null
		this.assertAdmin(user);

		const payload: GradeStatusPayload = {
			status: 'active',
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: null
		};

		await this.repo.updateStatus(gradeId, payload);
	}

	// Mantener comportamiento original: owner o admin puede borrar desde edit
	async ownerSoftDelete(gradeId: string, user: SessionUser): Promise<void> {
		const row = await this.repo.findById(gradeId);
		if (!row) throw error(404, 'Grade no encontrado');

		this.assertOwnerOrAdmin(user, { publishedBy: row.publishedBy });

		const payload: GradeStatusPayload = {
			status: 'deleted',
			updatedAt: new Date(),
			updatedBy: user.id,
			deletedAt: new Date()
		};

		await this.repo.updateStatus(gradeId, payload);
	}
}

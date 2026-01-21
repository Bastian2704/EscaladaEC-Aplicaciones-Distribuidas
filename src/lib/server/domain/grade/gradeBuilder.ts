import type { SessionUser, Status } from '$lib/server/domain/types';
import type { NewGradeRow } from '$lib/server/repositories/grade.repository';
import { isValidGradeSystem, isValidGradeSystemValue } from '$lib/contants/constants';

type CreateGradeInput = {
	climbId: string;
	climbCategory: string;
	gradeSystem: string;
	value: string;
	difficultyLevel: number;
	accomplished: boolean;
};

export class GradeBuilder {
	private input!: CreateGradeInput;
	private user!: SessionUser;

	withUser(user: SessionUser) {
		this.user = user;
		return this;
	}

	fromInput(input: CreateGradeInput) {
		this.input = input;
		return this;
	}

	validate() {
		const { climbCategory, gradeSystem, value, difficultyLevel } = this.input;

		if (!gradeSystem) throw new Error('Sistema de grado requerido');
		if (!value) throw new Error('Valor requerido');

		if (!isValidGradeSystem(climbCategory, gradeSystem)) {
			throw new Error('Sistema de grado inválido.');
		}
		if (!isValidGradeSystemValue(climbCategory, gradeSystem, value)) {
			throw new Error('Valor de grado no coincide con el sistema seleccionado.');
		}
		if (!Number.isFinite(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 10) {
			throw new Error('La dificultad percibida debe estar entre 1 y 10.');
		}

		return this;
	}

	build(): NewGradeRow {
		const now = new Date();
		const status: Status = 'active';

		return {
			climbId: this.input.climbId,
			userId: this.user.id,

			gradeSystem: this.input.gradeSystem.trim(),
			value: this.input.value.trim(),
			difficultyLevel: this.input.difficultyLevel,
			accomplished: this.input.accomplished,

			likes: 0, 
			status,
			publishedBy: this.user.id,

			createdAt: now,
			updatedAt: now,
			updatedBy: this.user.id,
			deletedAt: null
		};
	}
}

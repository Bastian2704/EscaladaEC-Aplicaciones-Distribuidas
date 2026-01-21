import type { SessionUser, Status } from '$lib/server/domain/types';
import type { NewClimbRow } from '$lib/server/repositories/climb.repository';
import { isValidCategory, isValidType } from '$lib/contants/constants';

type CreateClimbInput = {
	sectorId: string;
	name: string;
	category: string;
	climbType: string;
	gradeSystem: string;
	value: string;
	requiredEquipment: string;
};

export class ClimbBuilder {
	private input!: CreateClimbInput;
	private user!: SessionUser;

	withUser(user: SessionUser) {
		this.user = user;
		return this;
	}

	fromInput(input: CreateClimbInput) {
		this.input = input;
		return this;
	}

	validate() {
		const { name, category, climbType, requiredEquipment, gradeSystem, value } = this.input;

		if (!name?.trim()) throw new Error('Nombre requerido');
		if (!category?.trim()) throw new Error('Categoría requerida');
		if (!climbType?.trim()) throw new Error('Tipo de escalada requerido');
		if (!requiredEquipment?.trim()) throw new Error('Equipo requerido');
		if (!gradeSystem?.trim()) throw new Error('Sistema de grado requerido');
		if (!value?.trim()) throw new Error('Valor requerido');

		if (!isValidCategory(category)) {
			throw new Error('Categoría inválida.');
		}
		if (!isValidType(category, climbType)) {
			throw new Error('El tipo no corresponde a la categoría seleccionada.');
		}

		return this;
	}

	build(): NewClimbRow {
		const now = new Date();
		const status: Status = 'active';

		return {
			sectorId: this.input.sectorId,
			userId: this.user.id,

			name: this.input.name.trim(),
			category: this.input.category.trim(),
			climbType: this.input.climbType.trim(),
			gradeSystem: this.input.gradeSystem.trim(),
			value: this.input.value.trim(),
			requiredEquipment: this.input.requiredEquipment.trim(),

			status,
			createdAt: now,
			updatedAt: now,
			createdBy: this.user.id,
			updatedBy: this.user.id,
			deletedAt: null
		};
	}
}

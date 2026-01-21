import type { SessionUser, Status } from '$lib/server/domain/types';
import type { NewSectorRow } from '$lib/server/repositories/sector.repository';

type CreateSectorInput = {
	areaId: string;
	name: string;
	orientation: string;
	description: string;
};

export class SectorBuilder {
	private input!: CreateSectorInput;
	private user!: SessionUser;

	withUser(user: SessionUser) {
		this.user = user;
		return this;
	}

	fromInput(input: CreateSectorInput) {
		this.input = input;
		return this;
	}

	validate() {
		const { name, orientation, description } = this.input;

		if (!name?.trim()) throw new Error('Nombre requerido');
		if (!orientation?.trim()) throw new Error('Orientación requerida');
		if (!description?.trim()) throw new Error('Descripción requerida');

		return this;
	}

	build(): NewSectorRow {
		const now = new Date();
		const status: Status = 'active';

		return {
			areaId: this.input.areaId,
			name: this.input.name.trim(),
			orientation: this.input.orientation.trim(),
			description: this.input.description.trim(),
			status,
			createdAt: now,
			updatedAt: now,
			createdBy: this.user.id,
			updatedBy: this.user.id,
			deletedAt: null
		};
	}
}

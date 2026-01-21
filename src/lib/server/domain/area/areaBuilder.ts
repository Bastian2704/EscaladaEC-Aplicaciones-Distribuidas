import type { SessionUser, Status } from '$lib/server/domain/types';
import type { NewAreaRow } from '$lib/server/repositories/area.repository';

type CreateAreaInput = {
	name: string;
	province: string;
	city: string;
	description: string;
	latitude: number;
	longitude: number;
};

export class AreaBuilder {
	private input!: CreateAreaInput;
	private user!: SessionUser;

	withUser(user: SessionUser) {
		this.user = user;
		return this;
	}

	fromInput(input: CreateAreaInput) {
		this.input = input;
		return this;
	}

	validate() {
		const { name, province, city, description, latitude, longitude } = this.input;

		if (!name?.trim()) throw new Error('Nombre requerido');
		if (!province?.trim()) throw new Error('Provincia requerida');
		if (!city?.trim()) throw new Error('Ciudad requerida');
		if (!description?.trim()) throw new Error('Descripción requerida');

		if (!Number.isFinite(latitude)) throw new Error('Latitud inválida');
		if (!Number.isFinite(longitude)) throw new Error('Longitud inválida');

		return this;
	}

	build(): NewAreaRow {
		const now = new Date();
		const status: Status = 'active';

		return {
			name: this.input.name.trim(),
			province: this.input.province.trim(),
			city: this.input.city.trim(),
			description: this.input.description.trim(),
			latitude: this.input.latitude,
			longitude: this.input.longitude,
			status,

			createdAt: now,
			updatedAt: now,
			deletedAt: null,

			createdBy: this.user.id,
			updatedBy: this.user.id
		};
	}
}

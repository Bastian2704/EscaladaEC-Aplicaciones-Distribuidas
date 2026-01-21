import type { NewUserRow, Role } from '$lib/server/repositories/user.repository';
import { hash } from 'argon2';

type CreateAdminUserInput = {
	email: string;
	username: string;
	age: string;
	password: string;
	role: Role;
};

export class AdminUserBuilder {
	private input!: CreateAdminUserInput;

	fromInput(input: CreateAdminUserInput) {
		this.input = input;
		return this;
	}

	validate() {
		const email = this.input.email.toLowerCase().trim();
		if (!email) throw new Error('Email requerido');
		if (!this.input.password || this.input.password.length < 8) {
			throw new Error('Contraseña inválida (mínimo 8 caracteres)');
		}
		if (!this.input.username?.trim()) throw new Error('Username requerido');
		if (!this.input.age?.trim()) throw new Error('Age requerido');
		return this;
	}

	async build(): Promise<NewUserRow> {
		const now = new Date();
		const email = this.input.email.toLowerCase().trim();

		const passwordHash = await hash(this.input.password);

		return {
			email,
			username: this.input.username.trim(),
			age: this.input.age.trim(),
			passwordHash,
			role: this.input.role,
			status: 'active',
			createdAt: now,
			updatedAt: now
		};
	}
}

export type Role = 'user' | 'admin';
export type Status = 'active' | 'suspended' | 'deleted';

export type SessionUser = {
	id: string;
	role: Role;
};
import type { Status } from '$lib/server/domain/types';
import type { Role } from '$lib/server/repositories/user.repository';

export function parseRole(value: unknown): Role {
	const v = String(value ?? '').toLowerCase();
	if (v === 'admin') return 'admin';
	if (v === 'user') return 'user';
	return 'user';
}

export function parseStatus(value: unknown, fallback: Status = 'active'): Status {
	const v = String(value ?? '').toLowerCase();
	if (v === 'active' || v === 'suspended' || v === 'deleted') return v;
	return fallback;
}

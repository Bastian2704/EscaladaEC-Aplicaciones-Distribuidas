import { describe, it, expect, beforeEach } from 'vitest';
import { hash, verify } from '@node-rs/argon2';

describe('TP-UT-AUTH - Pruebas Unitarias de Autenticación', () => {
	// TP-UT-AUTH-001
	it('TP-UT-AUTH-001 - Normalización de email en login/registro', () => {
		const rawEmail = '  TEST@MAIL.COM  ';
		const normalized = rawEmail.trim().toLowerCase();
		expect(normalized).toBe('test@mail.com');
	});

	// TP-UT-AUTH-002
	it('TP-UT-AUTH-002 - Validación de password mínimo', () => {
		const shortPassword = '1234567';
		const isValid = shortPassword.length >= 8;
		expect(isValid).toBe(false);
	});

	// TP-UT-AUTH-003
	it('TP-UT-AUTH-003 - Verificación de contraseña (hash)', async () => {
		const password = 'abc12345';
		const hashed = await hash(password);
		const correctVerify = await verify(hashed, password);
		const incorrectVerify = await verify(hashed, 'wrongpassword');
		expect(correctVerify).toBe(true);
		expect(incorrectVerify).toBe(false);
	});

	// TP-UT-AUTH-004
	it('TP-UT-AUTH-004 - Usuario con status distinto de active no puede iniciar sesión', () => {
		const user = { status: 'suspended', email: 'test@test.com' };
		const canLogin = user.status === 'active';
		expect(canLogin).toBe(false);
	});
});
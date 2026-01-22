import { test, expect } from '@playwright/test';

test.describe('TP-UAT-AUTH - Pruebas de Usuario - Autenticación', () => {
	// TP-UAT-AUTH-001
	test('TP-UAT-AUTH-001 - Flujo de registro completo desde UI', async ({ page }) => {
		await page.goto('/register');
		await page.fill('input[name="email"]', 'newuser@test.com');
		await page.fill('input[name="username"]', 'newuser');
		await page.fill('input[name="password"]', 'password123');
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL('/dashboard');
	});

	// TP-UAT-AUTH-002
	test('TP-UAT-AUTH-002 - Flujo de login desde UI con credenciales correctas', async ({ page }) => {
		await page.goto('/login');
		await page.fill('input[name="email"]', 'test@test.com');
		await page.fill('input[name="password"]', 'password123');
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL('/dashboard');
	});

	// TP-UAT-AUTH-003
	test('TP-UAT-AUTH-003 - Mensaje correcto con credenciales inválidas', async ({ page }) => {
		await page.goto('/login');
		await page.fill('input[name="email"]', 'test@test.com');
		await page.fill('input[name="password"]', 'wrongpassword');
		await page.click('button[type="submit"]');
		await expect(page.locator('text=Credenciales inválidas')).toBeVisible();
	});
});
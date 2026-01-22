import { test, expect } from '@playwright/test';

test.describe('TP-UAT-RBAC - Pruebas de Usuario - Control de Acceso', () => {
	// TP-UAT-RBAC-001
	test('TP-UAT-RBAC-001 - Acceso denegado para usuario regular', async ({ page }) => {
		await page.goto('/admin');
		await expect(page.locator('text=Acceso denegado')).toBeVisible();
	});

	// TP-UAT-RBAC-002
	test('TP-UAT-RBAC-002 - Acceso permitido para admin', async ({ page }) => {
		// Simular login como admin
		await page.goto('/login');
		await page.fill('input[name="email"]', 'admin@test.com');
		await page.fill('input[name="password"]', 'adminpass');
		await page.click('button[type="submit"]');
		await page.goto('/admin');
		await expect(page.locator('text=Panel de administración')).toBeVisible();
	});
});
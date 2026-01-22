import { test, expect } from '@playwright/test';

test.describe('TP-UAT-REC - Pruebas de Usuario - Recomendaciones', () => {
	// TP-UAT-REC-001
	test('TP-UAT-REC-001 - Ver recomendaciones en dashboard', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page.locator('text=Recomendaciones')).toBeVisible();
	});

	// TP-UAT-REC-002
	test('TP-UAT-REC-002 - Crear nueva recomendación', async ({ page }) => {
		await page.goto('/recommendations');
		await page.click('button:text("Nueva recomendación")');
		await page.fill('input[name="title"]', 'Recomendación de prueba');
		await page.click('button[type="submit"]');
		await expect(page.locator('text=Recomendación de prueba')).toBeVisible();
	});
});
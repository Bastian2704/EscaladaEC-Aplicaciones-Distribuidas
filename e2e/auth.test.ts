// --- Recomendaciones ---
test.describe('TP-UAT-REC-001: Recomendaciones coherentes', () => {
	test('Recomendaciones coinciden con el perfil del usuario', async ({ page, request }) => {
		// 1. Crear usuario de prueba con historial simulado
		const user = { email: 'recotest@demo.com', password: 'recotest', role: 'user' };
		await request.post('/api/auth/register', { data: user });
		// Simular historial (endpoint ficticio para pruebas)
		await request.post('/api/user/history', { data: {
			email: user.email,
			history: [
				{ curso: 'Escalada Básica', completado: true },
				{ curso: 'Nudos', completado: true },
				{ preferencia: 'boulder' }
			]
		}});

		// 2. Login
		await page.goto('/login');
		await page.fill('input[name="email"]', user.email);
		await page.fill('input[name="password"]', user.password);
		await page.click('button[type="submit"]');

		// 3. Acceder a recomendaciones
		await page.goto('/recomendaciones');

		// 4. Verificar que las sugerencias sean coherentes
		await expect(page.locator('text=Recomendado para ti')).toBeVisible();
		await expect(page.locator('text=Escalada Avanzada')).toBeVisible();
		await expect(page.locator('text=Boulder')).toBeVisible();
	});
});
// --- RBAC Admin ---
test.describe('TP-UAT-RBAC-002: Admin ejecuta acciones restringidas', () => {
	test('Admin ve opciones y ejecuta acción', async ({ page, request }) => {
		
		const admin = { email: 'admin1@demo.com', password: 'admin123', role: 'admin' };
		await request.post('/api/auth/register', { data: admin });

		
		await page.goto('/login');
		await page.fill('input[name="email"]', admin.email);
		await page.fill('input[name="password"]', admin.password);
		await page.click('button[type="submit"]');

		
		await expect(page.locator('text=Panel de Administración')).toBeVisible();

		
		await page.click('button:text("Crear usuario")');
		await expect(page.locator('text=Usuario creado')).toBeVisible();
	});
});
import { test, expect } from '@playwright/test';

test.describe('TP-UAT-AUTH - Pruebas de Usuario - Autenticación', () => {
	
	test('TP-UAT-AUTH-001 - Flujo de registro completo desde UI', async ({ page }) => {
		await page.goto('/register');
		await page.fill('input[name="email"]', 'newuser@test.com');
		await page.fill('input[name="username"]', 'newuser');
		await page.fill('input[name="password"]', 'password123');
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL('/dashboard');
	});

	
	test('TP-UAT-AUTH-002 - Flujo de login desde UI con credenciales correctas', async ({ page }) => {
		await page.goto('/login');
		await page.fill('input[name="email"]', 'test@test.com');
		await page.fill('input[name="password"]', 'password123');
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL('/dashboard');
	});

	
	test('TP-UAT-AUTH-003 - Mensaje correcto con credenciales inválidas', async ({ page }) => {
		await page.goto('/login');
		await page.fill('input[name="email"]', 'test@test.com');
		await page.fill('input[name="password"]', 'wrongpassword');
		await page.click('button[type="submit"]');
		await expect(page.locator('text=Credenciales inválidas')).toBeVisible();
	});
});

// --- RBAC ---
test.describe('TP-UAT-RBAC-001: Usuario estándar no ve opciones de admin', () => {
	test('No muestra opciones de admin ni permite acceso', async ({ page, request }) => {
		// 1. Crear usuario estándar (mock o API directa)
		const user = { email: 'user1@demo.com', password: 'user123', role: 'user' };
		// Suponiendo endpoint de registro para pruebas
		await request.post('/api/auth/register', { data: user });

		// 2. Login
		await page.goto('/login');
		await page.fill('input[name="email"]', user.email);
		await page.fill('input[name="password"]', user.password);
		await page.click('button[type="submit"]');

		// 3. Verificar que NO aparece botón/menu de admin
		await expect(page.locator('text=Panel de Administración')).toHaveCount(0);

		// 4. Intentar acceder a la URL de admin
		const [response] = await Promise.all([
			page.waitForResponse(r => r.url().includes('/admin') && r.status() === 403),
			page.goto('/admin')
		]);
		expect(response.status()).toBe(403);
	});
});
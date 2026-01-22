import { describe, it, expect } from 'vitest';

describe('TP-UT-REC - Pruebas Unitarias de Recomendaciones', () => {
	// TP-UT-REC-001
	it('TP-UT-REC-001 - Cálculo de promedio para recomendaciones', () => {
		const grades = [10, 12, 12];
		const average = grades.reduce((a, b) => a + b, 0) / grades.length;
		expect(average).toBeCloseTo(11.33, 2);
	});
});
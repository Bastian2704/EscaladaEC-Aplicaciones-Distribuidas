import type { TopRow } from './types';

export function avgAndBase(top: TopRow[]) {
	if (!top.length) {
		return { roundedAvg: null as number | null, baseSectorId: null as string | null, baseAreaId: null as string | null };
	}

	const avg = top.reduce((sum, row) => sum + (row.scaledValue ?? 0), 0) / top.length;
	const roundedAvg = Math.round(avg);

	return {
		roundedAvg,
		baseSectorId: top[0].sectorId,
		baseAreaId: top[0].areaId
	};
}
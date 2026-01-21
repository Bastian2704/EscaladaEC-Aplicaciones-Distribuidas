import { db } from '$lib/server/db';
import { users, area, sector, climb, grade, climbingLevelSport, climbingLevelNoRope, climbingLevelTrad } from '$lib/server/db/schema';
import { requireUser } from '$lib/server/auth/guards';
import type { PageServerLoad } from './$types';
import { eq, and, inArray, desc, or, notInArray } from 'drizzle-orm';

type TopRow = {
	scaledValue: number | null;
	sectorId: string | null;
	areaId: string | null;
};

function avgAndBase(top: TopRow[]) {
	if (!top.length) {
		return {
			roundedAvg: null as number | null,
			baseSectorId: null as string | null,
			baseAreaId: null as string | null
		};
	}

	const avg =
		top.reduce((sum, row) => sum + (row.scaledValue ?? 0), 0) / top.length;
	const roundedAvg = Math.round(avg);

	return {
		roundedAvg,
		baseSectorId: top[0].sectorId,
		baseAreaId: top[0].areaId
	};
}

async function getCompletedClimbIds(userId: string) {
	const completed = await db
		.select({ climbId: grade.climbId })
		.from(grade)
		.where(and(eq(grade.userId, userId), eq(grade.accomplished, true)));

	return completed.map((r) => r.climbId);
}

export const load: PageServerLoad = async (event) => {
	requireUser(event);
	const { userId } = event.params;

	const url = event.url;
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const status = url.searchParams.get('status') ?? 'active';

	const items = await db.select().from(users).where(eq(users.id, userId));

	const userRopeClimbs = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			realValue: climb.value,
			proposedValue: grade.value,
			difficulty: grade.difficultyLevel,
			done: grade.accomplished,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.where(
			and(
				eq(grade.userId, userId),
				inArray(grade.gradeSystem, ['Francesa', 'YDS'])
			)
		)
		.orderBy(desc(grade.createdAt));

	const userNoRopeClimbs = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			realValue: climb.value,
			proposedValue: grade.value,
			difficulty: grade.difficultyLevel,
			done: grade.accomplished,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.where(
			and(
				eq(grade.userId, userId),
				inArray(grade.gradeSystem, ['VScale', 'Fontainebleau'])
			)
		)
		.orderBy(desc(grade.createdAt));

	const userTradClimbs = await db
		.select({
			areaId: area.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			realValue: climb.value,
			proposedValue: grade.value,
			difficulty: grade.difficultyLevel,
			done: grade.accomplished,
			createdAt: grade.createdAt
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.where(
			and(eq(grade.userId, userId), eq(grade.gradeSystem, 'British'))
		)
		.orderBy(desc(grade.createdAt));
	const completedIds = await getCompletedClimbIds(userId);

const topSport = await db
	.select({
		gradeSystem: climb.gradeSystem,
		userGrade: climb.value,
		scaledValue: climbingLevelSport.scaledValue,
		frenchEquivalent: climbingLevelSport.frenchValue,
		ydsEquivalent: climbingLevelSport.ydsValue,
		sectorId: sector.id,
		areaId: area.id
	})
	.from(grade)
	.leftJoin(climb, eq(climb.id, grade.climbId))
	.leftJoin(sector, eq(sector.id, climb.sectorId))
	.leftJoin(area, eq(area.id, sector.areaId))
	.leftJoin(
		climbingLevelSport,
		or(
			and(
				eq(climb.gradeSystem, 'Francesa'),
				eq(climbingLevelSport.frenchValue, climb.value)
			),
			and(
				eq(climb.gradeSystem, 'YDS'),
				eq(climbingLevelSport.ydsValue, climb.value)
			)
		)
	)
	.where(
		and(
			eq(grade.userId, userId),
			eq(grade.accomplished, true),
			inArray(climb.gradeSystem, ['Francesa', 'YDS'])
		)
	)
	.orderBy(desc(climbingLevelSport.scaledValue))
	.limit(3);

const {
	roundedAvg: sportAvg,
	baseSectorId: sportSectorId,
	baseAreaId: sportAreaId
} = avgAndBase(topSport);

async function findSportRecommendationsWithScope(
	scope: 'sector' | 'area' | 'global'
) {
	if (sportAvg == null) {
		return [];
	}

	const whereParts: any[] = [
		inArray(climb.gradeSystem, ['Francesa', 'YDS']),
		eq(climbingLevelSport.scaledValue, sportAvg),
		eq(climb.status, 'active'),
		inArray(climb.climbType, [
            'Escala Deportiva',
            'Vía de Varios Largos',
            'Escalada en Gran Pared'
        ])
	];

	if (completedIds.length > 0) {
		whereParts.push(notInArray(climb.id, completedIds));
	}

	if (scope === 'sector' && sportSectorId) {
		whereParts.push(eq(sector.id, sportSectorId));
	}

	if (scope === 'area' && sportAreaId) {
		whereParts.push(eq(area.id, sportAreaId));
	}

	const rows = await db
		.select({
			climbId: climb.id,
			areaName: area.name,
			sectorName: sector.name,
			climbName: climb.name,
			gradeSystem: climb.gradeSystem,
			gradeValue: climb.value,
			scaledValue: climbingLevelSport.scaledValue
		})
		.from(climb)
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.leftJoin(
			climbingLevelSport,
			or(
				and(
					eq(climb.gradeSystem, 'Francesa'),
					eq(climbingLevelSport.frenchValue, climb.value)
				),
				and(
					eq(climb.gradeSystem, 'YDS'),
					eq(climbingLevelSport.ydsValue, climb.value)
				)
			)
		)
		.where(and(...whereParts))
		.limit(1);

	return rows;
}

let sportRecommendations = await findSportRecommendationsWithScope('sector');

if (sportRecommendations.length === 0) {
	sportRecommendations = await findSportRecommendationsWithScope('area');
}

if (sportRecommendations.length === 0) {
	sportRecommendations = await findSportRecommendationsWithScope('global');
}

	const topNoRope = await db
		.select({
			gradeSystem: climb.gradeSystem,
			userGrade: climb.value,
			scaledValue: climbingLevelNoRope.scaledValue,
			vScaleEquivalent: climbingLevelNoRope.vScale,
			fontainebleauEquivalent: climbingLevelNoRope.fontainebleau,
			sectorId: sector.id,
			areaId: area.id
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.leftJoin(
			climbingLevelNoRope,
			or(
				and(
					eq(climb.gradeSystem, 'VScale'),
					eq(climbingLevelNoRope.vScale, climb.value)
				),
				and(
					eq(climb.gradeSystem, 'Fontainebleau'),
					eq(climbingLevelNoRope.fontainebleau, climb.value)
				)
			)
		)
		.where(
			and(
				eq(grade.userId, userId),
				eq(grade.accomplished, true),
				inArray(climb.gradeSystem, ['VScale', 'Fontainebleau'])
			)
		)
		.orderBy(desc(climbingLevelNoRope.scaledValue))
		.limit(3);

	const {
		roundedAvg: noRopeAvg,
		baseSectorId: noRopeSectorId,
		baseAreaId: noRopeAreaId
	} = avgAndBase(topNoRope);

	async function findNoRopeRecommendationsWithScope(
		scope: 'sector' | 'area' | 'global'
	) {
		if (noRopeAvg == null) return [];

		const whereParts: any[] = [
			inArray(climb.gradeSystem, ['VScale', 'Fontainebleau']),
			eq(climbingLevelNoRope.scaledValue, noRopeAvg),
			eq(climb.status, 'active'),
			inArray(climb.climbType, [
            'Boulder', 'Psicobloc', 'Highball'
        	])
		];

		if (completedIds.length > 0) {
			whereParts.push(notInArray(climb.id, completedIds));
		}
		if (scope === 'sector' && noRopeSectorId) {
			whereParts.push(eq(sector.id, noRopeSectorId));
		}
		if (scope === 'area' && noRopeAreaId) {
			whereParts.push(eq(area.id, noRopeAreaId));
		}

		return db
			.select({
				climbId: climb.id,
				areaName: area.name,
				sectorName: sector.name,
				climbName: climb.name,
				gradeSystem: climb.gradeSystem,
				gradeValue: climb.value,
				scaledValue: climbingLevelNoRope.scaledValue
			})
			.from(climb)
			.leftJoin(sector, eq(sector.id, climb.sectorId))
			.leftJoin(area, eq(area.id, sector.areaId))
			.leftJoin(
				climbingLevelNoRope,
				or(
					and(
						eq(climb.gradeSystem, 'VScale'),
						eq(climbingLevelNoRope.vScale, climb.value)
					),
					and(
						eq(climb.gradeSystem, 'Fontainebleau'),
						eq(climbingLevelNoRope.fontainebleau, climb.value)
					)
				)
			)
			.where(and(...whereParts))
			.limit(1);
	}

	let noRopeRecommendations = await findNoRopeRecommendationsWithScope('sector');
	if (noRopeRecommendations.length === 0) {
		noRopeRecommendations = await findNoRopeRecommendationsWithScope('area');
	}
	if (noRopeRecommendations.length === 0) {
		noRopeRecommendations = await findNoRopeRecommendationsWithScope('global');
	}
	const topTrad = await db
		.select({
			gradeSystem: climb.gradeSystem,
			userGrade: climb.value,
			scaledValue: climbingLevelTrad.scaledValue,
			britishEquivalent: climbingLevelTrad.british,
			sectorId: sector.id,
			areaId: area.id
		})
		.from(grade)
		.leftJoin(climb, eq(climb.id, grade.climbId))
		.leftJoin(sector, eq(sector.id, climb.sectorId))
		.leftJoin(area, eq(area.id, sector.areaId))
		.leftJoin(
			climbingLevelTrad,
			eq(climbingLevelTrad.british, climb.value)
		)
		.where(
			and(
				eq(grade.userId, userId),
				eq(grade.accomplished, true),
				eq(climb.gradeSystem, 'British')
			)
		)
		.orderBy(desc(climbingLevelTrad.scaledValue))
		.limit(3);

	const {
		roundedAvg: tradAvg,
		baseSectorId: tradSectorId,
		baseAreaId: tradAreaId
	} = avgAndBase(topTrad);

	async function findTradRecommendationsWithScope(
		scope: 'sector' | 'area' | 'global'
	) {
		if (tradAvg == null) return [];

		const whereParts: any[] = [
			eq(climb.gradeSystem, 'British'),
			eq(climbingLevelTrad.scaledValue, tradAvg),
			eq(climb.status, 'active'),
			inArray(climb.climbType, [
            'Escala Tradicional', 'Vía de Varios Largos', 'Escalada en Gran Pared'
        	])
			
		];

		if (completedIds.length > 0) {
			whereParts.push(notInArray(climb.id, completedIds));
		}
		if (scope === 'sector' && tradSectorId) {
			whereParts.push(eq(sector.id, tradSectorId));
		}
		if (scope === 'area' && tradAreaId) {
			whereParts.push(eq(area.id, tradAreaId));
		}

		return db
			.select({
				climbId: climb.id,
				areaName: area.name,
				sectorName: sector.name,
				climbName: climb.name,
				gradeSystem: climb.gradeSystem,
				gradeValue: climb.value,
				scaledValue: climbingLevelTrad.scaledValue
			})
			.from(climb)
			.leftJoin(sector, eq(sector.id, climb.sectorId))
			.leftJoin(area, eq(area.id, sector.areaId))
			.leftJoin(
				climbingLevelTrad,
				eq(climbingLevelTrad.british, climb.value)
			)
			.where(and(...whereParts))
			.limit(1);
	}

	let tradRecommendations = await findTradRecommendationsWithScope('sector');
	if (tradRecommendations.length === 0) {
		tradRecommendations = await findTradRecommendationsWithScope('area');
	}
	if (tradRecommendations.length === 0) {
		tradRecommendations = await findTradRecommendationsWithScope('global');
	}
	return {
		items,
		page,
		status,
		userRopeClimbs,
		userNoRopeClimbs,
		userTradClimbs,
		topSport,
		topNoRope,
		topTrad,
		sportRecommendations,
		noRopeRecommendations,
		tradRecommendations
	};
};


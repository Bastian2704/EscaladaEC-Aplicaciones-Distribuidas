import type { SQL } from 'drizzle-orm';
import { and, desc, eq, inArray, notInArray, or } from 'drizzle-orm';
import type { db as appDb } from '$lib/server/db';
import { area, climb, climbingLevelNoRope, climbingLevelSport, climbingLevelTrad, grade, sector, users } from '$lib/server/db/schema';
import type { IRecommendationsRepository, FindRecommendationParams, ListUserClimbsParams, TopCompletedParams } from '../recommendations.repository';
import type { Discipline, RecommendationRow, TopRow, UserClimbRow } from '$lib/server/domain/recommendations/types';

function disciplineConfig(d: Discipline) {
	switch (d) {
		case 'sport':
			return {
				gradeSystems: ['Francesa', 'YDS'] as const,
				climbTypes: ['Escala Deportiva', 'Vía de Varios Largos', 'Escalada en Gran Pared'] as const
			};
		case 'noRope':
			return {
				gradeSystems: ['VScale', 'Fontainebleau'] as const,
				climbTypes: ['Boulder', 'Psicobloc', 'Highball'] as const
			};
		case 'trad':
			return {
				gradeSystems: ['British'] as const,
				climbTypes: ['Escala Tradicional', 'Vía de Varios Largos', 'Escalada en Gran Pared'] as const
			};
	}
}

export class DrizzleRecommendationsRepository implements IRecommendationsRepository {
	constructor(private readonly db: typeof appDb) {}

	async getUserById(userId: string) {
		const [row] = await this.db.select().from(users).where(eq(users.id, userId));
		return row ?? null;
	}

	async getCompletedClimbIds(userId: string): Promise<string[]> {
		const rows = await this.db
			.select({ climbId: grade.climbId })
			.from(grade)
			.where(and(eq(grade.userId, userId), eq(grade.accomplished, true)));

		return rows.map((r) => r.climbId);
	}

	async listUserClimbs(params: ListUserClimbsParams): Promise<UserClimbRow[]> {
		const { userId, discipline } = params;
		const cfg = disciplineConfig(discipline);

		const rows = await this.db
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
			.where(and(eq(grade.userId, userId), inArray(grade.gradeSystem, [...cfg.gradeSystems])))
			.orderBy(desc(grade.createdAt));

		return rows;
	}

	async topCompleted(params: TopCompletedParams): Promise<TopRow[]> {
		const { userId, discipline, limit } = params;
		const cfg = disciplineConfig(discipline);

		if (discipline === 'sport') {
			return this.db
				.select({
					scaledValue: climbingLevelSport.scaledValue,
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
						and(eq(climb.gradeSystem, 'Francesa'), eq(climbingLevelSport.frenchValue, climb.value)),
						and(eq(climb.gradeSystem, 'YDS'), eq(climbingLevelSport.ydsValue, climb.value))
					)
				)
				.where(and(eq(grade.userId, userId), eq(grade.accomplished, true), inArray(climb.gradeSystem, [...cfg.gradeSystems])))
				.orderBy(desc(climbingLevelSport.scaledValue))
				.limit(limit);
		}

		if (discipline === 'noRope') {
			return this.db
				.select({
					scaledValue: climbingLevelNoRope.scaledValue,
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
						and(eq(climb.gradeSystem, 'VScale'), eq(climbingLevelNoRope.vScale, climb.value)),
						and(eq(climb.gradeSystem, 'Fontainebleau'), eq(climbingLevelNoRope.fontainebleau, climb.value))
					)
				)
				.where(and(eq(grade.userId, userId), eq(grade.accomplished, true), inArray(climb.gradeSystem, [...cfg.gradeSystems])))
				.orderBy(desc(climbingLevelNoRope.scaledValue))
				.limit(limit);
		}

		// trad
		return this.db
			.select({
				scaledValue: climbingLevelTrad.scaledValue,
				sectorId: sector.id,
				areaId: area.id
			})
			.from(grade)
			.leftJoin(climb, eq(climb.id, grade.climbId))
			.leftJoin(sector, eq(sector.id, climb.sectorId))
			.leftJoin(area, eq(area.id, sector.areaId))
			.leftJoin(climbingLevelTrad, eq(climbingLevelTrad.british, climb.value))
			.where(and(eq(grade.userId, userId), eq(grade.accomplished, true), eq(climb.gradeSystem, 'British')))
			.orderBy(desc(climbingLevelTrad.scaledValue))
			.limit(limit);
	}

	async findRecommendations(params: FindRecommendationParams): Promise<RecommendationRow[]> {
		const { discipline, scaledValue, scope, sectorId, areaId, excludeClimbIds, limit } = params;
		const cfg = disciplineConfig(discipline);

		const whereParts: SQL[] = [
			inArray(climb.gradeSystem, [...cfg.gradeSystems]),
			eq(climb.status, 'active'),
			inArray(climb.climbType, [...cfg.climbTypes])
		];

		if (excludeClimbIds.length > 0) whereParts.push(notInArray(climb.id, excludeClimbIds));

		if (scope === 'sector' && sectorId) whereParts.push(eq(sector.id, sectorId));
		if (scope === 'area' && areaId) whereParts.push(eq(area.id, areaId));

		if (discipline === 'sport') {
			whereParts.push(eq(climbingLevelSport.scaledValue, scaledValue));

			return this.db
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
						and(eq(climb.gradeSystem, 'Francesa'), eq(climbingLevelSport.frenchValue, climb.value)),
						and(eq(climb.gradeSystem, 'YDS'), eq(climbingLevelSport.ydsValue, climb.value))
					)
				)
				.where(and(...whereParts))
				.limit(limit);
		}

		if (discipline === 'noRope') {
			whereParts.push(eq(climbingLevelNoRope.scaledValue, scaledValue));

			return this.db
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
						and(eq(climb.gradeSystem, 'VScale'), eq(climbingLevelNoRope.vScale, climb.value)),
						and(eq(climb.gradeSystem, 'Fontainebleau'), eq(climbingLevelNoRope.fontainebleau, climb.value))
					)
				)
				.where(and(...whereParts))
				.limit(limit);
		}

		// trad
		whereParts.push(eq(climbingLevelTrad.scaledValue, scaledValue));

		return this.db
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
			.leftJoin(climbingLevelTrad, eq(climbingLevelTrad.british, climb.value))
			.where(and(...whereParts))
			.limit(limit);
	}
}

import { db } from '$lib/server/db';
import { lucia } from '$lib/server/auth/lucia';

import { DrizzleGradeRepository } from '$lib/server/repositories/drizzle/drizzleGradeRepository';
import { GradeService } from '$lib/server/services/grade.service';

import { DrizzleClimbRepository } from '$lib/server/repositories/drizzle/drizzleClimbRepository';
import { ClimbService } from '$lib/server/services/climb.service';

import { DrizzleSectorRepository } from '$lib/server/repositories/drizzle/drizzleSectorRepository';
import { SectorService } from '$lib/server/services/sector.service';

import { DrizzleAreaRepository } from '$lib/server/repositories/drizzle/drizzleAreaRepository';
import { AreaService } from '$lib/server/services/area.service';

import { DrizzleUserRepository } from '$lib/server/repositories/drizzle/drizzleUserRepository';
import { UserService } from '$lib/server/services/user.service';
import { LuciaSessionManager } from '$lib/server/services/luciaSessionManager';

import { DrizzleRecommendationsRepository } from '$lib/server/repositories/drizzle/drizzleRecommendationsRepository';
import { RecommendationsService } from '$lib/server/services/recommendations.service';

export type EntityServiceName = 'grade' | 'climb' | 'sector' | 'area' | 'user' | 'recommendations';

export class ServiceFactory {
	static create(name: 'grade'): GradeService;
	static create(name: 'climb'): ClimbService;
	static create(name: 'sector'): SectorService;
	static create(name: 'area'): AreaService;
	static create(name: 'user'): UserService;
	static create(name: 'recommendations'): RecommendationsService;
	
	static create(name: EntityServiceName) {
		switch (name) {
			case 'grade': {
				return new GradeService(new DrizzleGradeRepository(db));
			}
			case 'climb': {
				return new ClimbService(new DrizzleClimbRepository(db));
			}
			case 'sector': {
				return new SectorService(new DrizzleSectorRepository(db));
			}
			case 'area': {
				return new AreaService(new DrizzleAreaRepository(db));
			}
			case 'user': {
				const repo = new DrizzleUserRepository(db);
				const sessions = new LuciaSessionManager(lucia);
				return new UserService(repo, sessions);
			}
			case 'recommendations': {
				const repo = new DrizzleRecommendationsRepository(db);
				return new RecommendationsService(repo);
			}
		}
	}
}

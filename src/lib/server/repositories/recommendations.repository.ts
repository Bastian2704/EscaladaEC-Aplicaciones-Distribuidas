import type { Discipline, RecommendationRow, TopRow, UserClimbRow, Scope } from '$lib/server/domain/recommendations/types';

export type ListUserClimbsParams = {
	userId: string;
	discipline: Discipline;
};

export type TopCompletedParams = {
	userId: string;
	discipline: Discipline;
	limit: number;
};

export type FindRecommendationParams = {
	discipline: Discipline;
	scaledValue: number;
	scope: Scope;
	sectorId: string | null;
	areaId: string | null;
	excludeClimbIds: string[];
	limit: number;
};

export interface IRecommendationsRepository {
	getUserById(userId: string): Promise<unknown | null>; // si luego lo tipas con UserRow, mejor
	getCompletedClimbIds(userId: string): Promise<string[]>;
	listUserClimbs(params: ListUserClimbsParams): Promise<UserClimbRow[]>;
	topCompleted(params: TopCompletedParams): Promise<TopRow[]>;
	findRecommendations(params: FindRecommendationParams): Promise<RecommendationRow[]>;
}

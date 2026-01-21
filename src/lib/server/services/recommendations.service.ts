import type { SessionUser } from '$lib/server/domain/types';
import { error } from '@sveltejs/kit';
import type { IRecommendationsRepository } from '$lib/server/repositories/recommendations.repository';
import type { Discipline, ProfileMiniCoreResult, Scope } from '$lib/server/domain/recommendations/types';
import { avgAndBase } from '$lib/server/domain/recommendations/score';

export class RecommendationsService {
	constructor(private readonly repo: IRecommendationsRepository) {}

	async getProfile(userId: string, viewer: SessionUser) {
		if (viewer.role !== 'admin' && viewer.id !== userId) throw error(403, 'Forbidden');

		const user = await this.repo.getUserById(userId);
		if (!user) throw error(404, 'Usuario no encontrado');

		const completedIds = await this.repo.getCompletedClimbIds(userId);

		const sport = await this.computeMiniCore(userId, 'sport', completedIds);
		const noRope = await this.computeMiniCore(userId, 'noRope', completedIds);
		const trad = await this.computeMiniCore(userId, 'trad', completedIds);

		return {
			user,
			sport,
			noRope,
			trad
		};
	}

	private async computeMiniCore(userId: string, discipline: Discipline, completedIds: string[]): Promise<ProfileMiniCoreResult> {
		const userClimbs = await this.repo.listUserClimbs({ userId, discipline });

		const top = await this.repo.topCompleted({ userId, discipline, limit: 3 });
		const { roundedAvg, baseSectorId, baseAreaId } = avgAndBase(top);

		if (roundedAvg == null) {
			return { top: [], recommendations: [], userClimbs };
		}

		const scopes: Scope[] = ['sector', 'area', 'global'];
		for (const scope of scopes) {
			const recs = await this.repo.findRecommendations({
				discipline,
				scaledValue: roundedAvg,
				scope,
				sectorId: baseSectorId,
				areaId: baseAreaId,
				excludeClimbIds: completedIds,
				limit: 1
			});

			if (recs.length) return { top: [], recommendations: recs, userClimbs };
		}

		return { top: [], recommendations: [], userClimbs };
	}
}

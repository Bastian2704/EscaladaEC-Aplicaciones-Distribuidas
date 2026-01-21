import { requireUser } from '$lib/server/auth/guards';
import type { PageServerLoad } from './$types';
import { ServiceFactory } from '$lib/server/factories/serviceFactory';

export const load: PageServerLoad = async (event) => {
	const viewer = requireUser(event);
	const { userId } = event.params;

	const service = ServiceFactory.create('recommendations');
	const result = await service.getProfile(userId, { id: viewer.id, role: viewer.role });

	const items = [result.user];

	return {
		items,

		userRopeClimbs: result.sport.userClimbs,
		userNoRopeClimbs: result.noRope.userClimbs,
		userTradClimbs: result.trad.userClimbs,

		topSport: result.sport.top,
		topNoRope: result.noRope.top,
		topTrad: result.trad.top,

		sportRecommendations: result.sport.recommendations,
		noRopeRecommendations: result.noRope.recommendations,
		tradRecommendations: result.trad.recommendations,

		page: Math.max(1, Number(event.url.searchParams.get('page') ?? 1)),
		status: event.url.searchParams.get('status') ?? 'active'
	};
};

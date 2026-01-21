export type Discipline = 'sport' | 'noRope' | 'trad';
export type Scope = 'sector' | 'area' | 'global';

export type TopRow = {
	scaledValue: number | null;
	sectorId: string | null;
	areaId: string | null;
};

export type RecommendationRow = {
	climbId: string;
	areaName: string | null;
	sectorName: string | null;
	climbName: string | null;
	gradeSystem: string | null;
	gradeValue: string | null;
	scaledValue: number | null;
};

export type UserClimbRow = {
	areaId: string | null;
	areaName: string | null;
	sectorName: string | null;
	climbName: string | null;
	realValue: string | null;
	proposedValue: string | null;
	difficulty: number | null;
	done: boolean | null;
	createdAt: Date | null;
};

export type ProfileMiniCoreResult = {
	top: RecommendationRow[];               
	recommendations: RecommendationRow[];  
	userClimbs: UserClimbRow[];         
};

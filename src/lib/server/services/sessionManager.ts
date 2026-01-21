export interface ISessionManager {
	invalidateUserSessions(userId: string): Promise<void>;
}

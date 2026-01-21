import type { Lucia } from 'lucia';
import type { ISessionManager } from './sessionManager';

export class LuciaSessionManager implements ISessionManager {
	constructor(private readonly lucia: Lucia) {}

	async invalidateUserSessions(userId: string): Promise<void> {
		await this.lucia.invalidateUserSessions(userId);
	}
}

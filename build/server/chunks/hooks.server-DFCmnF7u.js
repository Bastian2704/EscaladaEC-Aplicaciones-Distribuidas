import { l as lucia } from './lucia-gIa1lymd.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import './index3-DdXcqWnY.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get("session") ?? null;
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    const blank = lucia.createBlankSessionCookie();
    event.cookies.set(blank.name, blank.value, { ...blank.attributes, path: "/" });
    return resolve(event);
  }
  const { session, user } = await lucia.validateSession(sessionId).catch(() => ({ session: null, user: null }));
  const s = session;
  if (s?.fresh) {
    const cookie = lucia.createSessionCookie(s.id);
    event.cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: "/" });
  } else if (!session) {
    const blank = lucia.createBlankSessionCookie();
    event.cookies.set(blank.name, blank.value, { ...blank.attributes, path: "/" });
  }
  event.locals.user = user ? {
    id: user.id,
    email: user.email,
    role: user.role
  } : null;
  event.locals.session = session ? { id: session.id } : null;
  return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-DFCmnF7u.js.map

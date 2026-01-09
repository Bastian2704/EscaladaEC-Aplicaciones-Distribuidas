import { e as error, r as redirect } from './index-B2LGyy1l.js';

function requireUser(event) {
  if (!event.locals.user) throw redirect(303, "/login");
  return event.locals.user;
}
function requireAdmin(event) {
  const user = requireUser(event);
  if (user.role !== "admin") throw error(403, "Forbidden");
  return user;
}

export { requireUser as a, requireAdmin as r };
//# sourceMappingURL=guards-DZEKhdLa.js.map

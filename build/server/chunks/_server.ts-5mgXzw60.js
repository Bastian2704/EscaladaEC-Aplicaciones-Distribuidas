import { l as lucia } from './lucia-CGGv7VMT.js';
import { r as redirect } from './index-B2LGyy1l.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const POST = async ({ locals, cookies }) => {
  try {
    if (locals.session) {
      await lucia.invalidateSession(locals.session.id);
    }
  } finally {
    const blank = lucia.createBlankSessionCookie();
    cookies.set(blank.name, blank.value, { ...blank.attributes, path: "/" });
  }
  throw redirect(303, "/login");
};

export { POST };
//# sourceMappingURL=_server.ts-5mgXzw60.js.map

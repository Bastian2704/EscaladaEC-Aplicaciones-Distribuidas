import { l as lucia } from './lucia-gIa1lymd.js';
import { d as db, e as eq, u as users } from './index3-DdXcqWnY.js';
import { verify } from 'argon2';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, "/dashboard");
  }
  return {};
};
const actions = {
  default: async ({ request, cookies, locals }) => {
    if (locals.user) {
      return fail(400, {
        message: "Ya tienes una sesión iniciada."
      });
    }
    const data = await request.formData();
    const email = String(data.get("email") ?? "").toLowerCase().trim();
    const password = String(data.get("password") ?? "");
    if (!email || !password) return fail(400, { message: "Datos inválidos" });
    const u = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!u || !await verify(u.passwordHash, password)) {
      return fail(400, { message: "Credenciales inválidas" });
    }
    if (u.status !== "active") {
      return fail(403, { message: "Tu cuenta está desactivada o suspendida" });
    }
    const session = await lucia.createSession(u.id, {});
    const cookie = lucia.createSessionCookie(session.id);
    cookies.set(cookie.name, cookie.value, { ...cookie.attributes, path: "/" });
    throw redirect(303, "/dashboard");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B4PUU9DO.js')).default;
const server_id = "src/routes/(public)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/17.GEODUUxP.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-Cl1ICQyt.js.map

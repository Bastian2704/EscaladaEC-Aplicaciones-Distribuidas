import { l as lucia } from './lucia-gIa1lymd.js';
import { d as db, o as or, e as eq, u as users } from './index3-DdXcqWnY.js';
import { hash } from 'argon2';
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
    const username = String(data.get("username") ?? "");
    const age = String(data.get("age") ?? "");
    if (!email || password.length < 8 || !username || !age)
      return fail(400, { message: "Datos inválidos" });
    const exists = await db.query.users.findFirst({
      where: or(eq(users.email, email), eq(users.username, username))
    });
    if (exists) return fail(400, { message: "Email o usuario ya registrado" });
    const passwordHash = await hash(password);
    const [u] = await db.insert(users).values({ email, username, age, passwordHash }).returning();
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

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-6Ntpfm2Y.js')).default;
const server_id = "src/routes/(public)/register/+page.server.ts";
const imports = ["_app/immutable/nodes/18.DRiyqRmh.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-BVm2286N.js.map

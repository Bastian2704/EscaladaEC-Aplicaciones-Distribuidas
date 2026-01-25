import { d as db, e as eq, u as users, l as lucia } from './lucia-CGGv7VMT.js';
import { verify } from 'argon2';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const load = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, "/area");
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
    throw redirect(303, "/area");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cb2438RQ.js')).default;
const server_id = "src/routes/(public)/login/+page.server.ts";
const imports = ["_app/immutable/nodes/16.BvUGeXwe.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/DN3OWba0.js"];
const stylesheets = ["_app/immutable/assets/login.BKkJIZsL.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-BHrLxDOX.js.map

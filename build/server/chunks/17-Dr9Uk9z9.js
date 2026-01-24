import { d as db, o as or, e as eq, u as users, l as lucia } from './lucia-CGGv7VMT.js';
import { hash } from 'argon2';
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
    throw redirect(303, "/area");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B1bO1B81.js')).default;
const server_id = "src/routes/(public)/register/+page.server.ts";
const imports = ["_app/immutable/nodes/17.D-u2Y0nA.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/DN3OWba0.js"];
const stylesheets = ["_app/immutable/assets/login.BKkJIZsL.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-Dr9Uk9z9.js.map

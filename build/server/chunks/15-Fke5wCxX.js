import { d as db, f as climbRoute, h as desc } from './index3-DdXcqWnY.js';
import { a as requireUser } from './guards-DZEKhdLa.js';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const load = async () => {
  const items = await db.select().from(climbRoute).orderBy(desc(climbRoute.createdAt));
  return { items };
};
const actions = {
  create: async (event) => {
    const u = requireUser(event);
    const d = await event.request.formData();
    const name = String(d.get("name") ?? "").trim();
    const grade = String(d.get("grade") ?? "").trim();
    const description = String(d.get("description") ?? "").trim();
    if (!name || !grade) return fail(400, { message: "Nombre y grado son obligatorios" });
    await db.insert(climbRoute).values({ name, grade, description, createdBy: u.id });
    throw redirect(303, "/routes");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C6yTZ2AL.js')).default;
const server_id = "src/routes/(app)/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/15.CPwog4My.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-Fke5wCxX.js.map

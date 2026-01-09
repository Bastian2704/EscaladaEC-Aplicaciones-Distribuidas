import { d as db, f as climbRoute, e as eq } from './index3-DdXcqWnY.js';
import { a as requireUser } from './guards-DZEKhdLa.js';
import { e as error, r as redirect, f as fail } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

function assertOwnerOrAdmin(user, item) {
  if (user.role === "admin") return;
  if (item.createdBy !== user.id) throw error(403, "No autorizado");
}
const load = async (event) => {
  const u = requireUser(event);
  const { id } = event.params;
  const [item] = await db.select().from(climbRoute).where(eq(climbRoute.id, id));
  if (!item) throw error(404);
  assertOwnerOrAdmin(u, item);
  return { item };
};
const actions = {
  save: async (event) => {
    const u = requireUser(event);
    const { id } = event.params;
    const [item] = await db.select().from(climbRoute).where(eq(climbRoute.id, id));
    if (!item) throw error(404);
    assertOwnerOrAdmin(u, item);
    const d = await event.request.formData();
    const name = String(d.get("name") ?? "").trim();
    const grade = String(d.get("grade") ?? "").trim();
    const description = String(d.get("description") ?? "").trim();
    if (!name || !grade) return fail(400, { message: "Datos inválidos" });
    await db.update(climbRoute).set({ name, grade, description }).where(eq(climbRoute.id, id));
    throw redirect(303, "/routes");
  },
  delete: async (event) => {
    const u = requireUser(event);
    const { id } = event.params;
    const [item] = await db.select().from(climbRoute).where(eq(climbRoute.id, id));
    if (!item) throw error(404);
    assertOwnerOrAdmin(u, item);
    await db.delete(climbRoute).where(eq(climbRoute.id, id));
    throw redirect(303, "/routes");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5id8aXtb.js')).default;
const server_id = "src/routes/(app)/routes/[id]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/16.rvkjxAJG.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-DB5rzror.js.map

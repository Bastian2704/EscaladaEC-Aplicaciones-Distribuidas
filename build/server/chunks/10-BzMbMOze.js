import { d as db, c as climb, e as eq } from './index3-DdXcqWnY.js';
import { r as requireAdmin } from './guards-DZEKhdLa.js';
import { e as error, r as redirect, f as fail } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const load = async (event) => {
  requireAdmin(event);
  const { areaId, sectorId, climbId } = event.params;
  const [item] = await db.select().from(climb).where(eq(climb.id, climbId));
  if (!item) throw error(404);
  return { item, areaId, sectorId, climbId };
};
const actions = {
  save: async (event) => {
    requireAdmin(event);
    const { climbId } = event.params;
    const [item] = await db.select().from(climb).where(eq(climb.id, climbId));
    if (!item) throw error(404);
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const climbType = String(data.get("climbType") ?? "").trim();
    const requiredEquipment = String(data.get("requiredEquipment") ?? "").trim();
    const status = String(data.get("status") ?? "");
    if (!name || !category || !climbType || !requiredEquipment)
      return fail(400, { message: "Datos inválidos" });
    await db.update(climb).set({ name, category, climbType, requiredEquipment, status }).where(eq(climb.id, climbId));
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    requireAdmin(event);
    const { climbId } = event.params;
    const [item] = await db.select().from(climb).where(eq(climb.id, climbId));
    if (!item) throw error(404);
    await db.update(climb).set({ status: "deleted" }).where(eq(climb.id, climbId));
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BHP1VejM.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/10.BbOR8GPW.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-BzMbMOze.js.map

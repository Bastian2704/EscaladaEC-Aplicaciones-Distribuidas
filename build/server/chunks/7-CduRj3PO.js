import { d as db, b as area, e as eq } from './index3-DdXcqWnY.js';
import { r as requireAdmin } from './guards-DZEKhdLa.js';
import { e as error, r as redirect, f as fail } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const load = async (event) => {
  requireAdmin(event);
  const { areaId } = event.params;
  if (!areaId) throw error(400, "Falta areaId");
  const [item] = await db.select().from(area).where(eq(area.id, areaId));
  if (!item) throw error(404);
  return { item, areaId };
};
const actions = {
  save: async (event) => {
    requireAdmin(event);
    const { areaId } = event.params;
    if (!areaId) throw error(400, "Falta areaId");
    const [item] = await db.select().from(area).where(eq(area.id, areaId));
    if (!item) throw error(404);
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const province = String(data.get("province") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const latitude = Number(data.get("latitude") ?? "");
    const longitude = Number(data.get("longitude") ?? "");
    const status = String(data.get("status") ?? "");
    if (!province || !city || !description) return fail(400, { message: "Datos inválidos" });
    await db.update(area).set({ name, province, city, description, latitude, longitude, status }).where(eq(area.id, areaId));
    throw redirect(303, "/area");
  },
  //TODO: Change this to SOFT DELETE
  delete: async (event) => {
    requireAdmin(event);
    const { areaId } = event.params;
    if (!areaId) throw error(400, "Falta areaId");
    const [item] = await db.select().from(area).where(eq(area.id, areaId));
    if (!item) throw error(404);
    await db.delete(area).where(eq(area.id, areaId));
    throw redirect(303, "/area");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BgBPfn8U.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/7.S1IAej98.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js","_app/immutable/chunks/CHOmHQgN.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-CduRj3PO.js.map

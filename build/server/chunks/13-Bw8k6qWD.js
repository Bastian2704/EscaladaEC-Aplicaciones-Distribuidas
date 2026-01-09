import { d as db, s as sector, e as eq } from './index3-DdXcqWnY.js';
import { r as requireAdmin } from './guards-DZEKhdLa.js';
import { e as error, r as redirect, f as fail } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const load = async (event) => {
  requireAdmin(event);
  const { sectorId } = event.params;
  const [item] = await db.select().from(sector).where(eq(sector.id, sectorId));
  if (!item) throw error(404);
  return { item, sectorId };
};
const actions = {
  save: async (event) => {
    requireAdmin(event);
    const { sectorId } = event.params;
    const [item] = await db.select().from(sector).where(eq(sector.id, sectorId));
    if (!item) throw error(404);
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const orientation = String(data.get("orientation") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const status = String(data.get("status") ?? "");
    if (!name || !orientation || !description) return fail(400, { message: "Datos inválidos" });
    await db.update(sector).set({ name, orientation, description, status }).where(eq(sector.id, sectorId));
    const referer = event.request.headers.get("referer");
    throw redirect(303, referer ?? `/area/${event.params.areaId}/sector`);
  },
  softDelete: async (event) => {
    requireAdmin(event);
    const { sectorId } = event.params;
    const [item] = await db.select().from(sector).where(eq(sector.id, sectorId));
    if (!item) throw error(404);
    await db.update(sector).set({ status: "deleted" }).where(eq(sector.id, sectorId));
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-lc-Azhev.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/13.BFkCTU0p.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-Bw8k6qWD.js.map

import { d as db, g as grade, e as eq } from './index3-DdXcqWnY.js';
import { a as requireUser } from './guards-DZEKhdLa.js';
import { e as error, r as redirect, f as fail } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

function assertOwnerOrAdmin(user, item) {
  if (user.role === "admin") return;
  if (item.publishedBy !== user.id) throw error(403, "No autorizado");
}
const load = async (event) => {
  const user = requireUser(event);
  const { areaId, sectorId, climbId, gradeId } = event.params;
  const [item] = await db.select().from(grade).where(eq(grade.id, gradeId));
  if (!item) throw error(404);
  assertOwnerOrAdmin(user, item);
  return { item, areaId, sectorId, climbId, gradeId };
};
const actions = {
  save: async (event) => {
    const u = requireUser(event);
    const { gradeId } = event.params;
    const [item] = await db.select().from(grade).where(eq(grade.id, gradeId));
    if (!item) throw error(404);
    assertOwnerOrAdmin(u, item);
    const data = await event.request.formData();
    const gradeSystem = String(data.get("gradeSystem") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    const difficultyLevel = Number(data.get("difficultyLevel") ?? "");
    const accomplished = Boolean(data.get("accomplished") ?? "");
    const status = String(data.get("status") ?? "");
    if (!gradeSystem || !value || !difficultyLevel || !accomplished)
      return fail(400, { message: "Datos inválidos" });
    await db.update(grade).set({ gradeSystem, value, difficultyLevel, accomplished, status }).where(eq(grade.id, gradeId));
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    const u = requireUser(event);
    const { gradeId } = event.params;
    const [item] = await db.select().from(grade).where(eq(grade.id, gradeId));
    if (!item) throw error(404);
    assertOwnerOrAdmin(u, item);
    await db.update(grade).set({ status: "deleted" }).where(eq(grade.id, gradeId));
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CRh-2bKb.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/grade/[gradeId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/12.lvV7zuGA.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-F39CD5Q3.js.map

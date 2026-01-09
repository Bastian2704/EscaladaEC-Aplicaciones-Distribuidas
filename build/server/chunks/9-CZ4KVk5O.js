import { d as db, c as climb, e as eq, s as sector } from './index3-DdXcqWnY.js';
import { r as requireAdmin, a as requireUser } from './guards-DZEKhdLa.js';
import { S as Status, i as isValidCategoryGroup, a as isValidClimbType, c as category } from './constants-D1jAS2l2.js';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const PAGE_SIZE = 10;
const load = async (event) => {
  requireUser(event);
  const { areaId, sectorId } = event.params;
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const status = url.searchParams.get("status") ?? "active";
  const offset = (page - 1) * PAGE_SIZE;
  const items = await db.select().from(climb).where(eq(climb.sectorId, sectorId)).limit(PAGE_SIZE).offset(offset);
  const sectorInfo = await db.select().from(sector).where(eq(sector.id, sectorId));
  return {
    items,
    page,
    status,
    sectorId,
    areaId,
    sectorInfo,
    categoryGroups: Object.keys(category),
    categoryOptions: category
  };
};
const actions = {
  createClimb: async (event) => {
    requireAdmin(event);
    const { sectorId } = event.params;
    const user = event.locals.user;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const categoryGroup = String(data.get("category") ?? "").trim();
    const climbType = String(data.get("climbType") ?? "").trim();
    const requiredEquipment = String(data.get("requiredEquipment") ?? "").trim();
    if (!name || !categoryGroup || !climbType || !requiredEquipment) {
      return fail(400, {
        message: "Nombre del Climb, Categoria, Tipo de Escalada Y Equipo Requerido son Obligatorias"
      });
    }
    if (!name || !categoryGroup || !climbType || !requiredEquipment) {
      return fail(400, { message: "Nombre, Categoría, Tipo y Equipo Requerido son obligatorios." });
    }
    if (!isValidCategoryGroup(categoryGroup)) {
      return fail(400, { message: "Categoría inválida." });
    }
    if (!isValidClimbType(categoryGroup, climbType)) {
      return fail(400, { message: "El tipo no corresponde a la categoría seleccionada." });
    }
    await db.insert(climb).values({
      sectorId,
      userId: user?.id,
      name,
      category: categoryGroup,
      climbType,
      requiredEquipment,
      status: "active",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      createdBy: user?.id,
      updatedBy: user?.id
    });
    return { success: true, message: `Climb: ${name}, creado correctamente.` };
  },
  suspend: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const user = event.locals.user;
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await db.update(climb).set({ status: Status.suspended, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(climb.id, id));
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const user = event.locals.user;
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await db.update(climb).set({ status: Status.active, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(climb.id, id));
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const user = event.locals.user;
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await db.update(climb).set({
      status: Status.deleted,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user?.id,
      deletedAt: /* @__PURE__ */ new Date()
    }).where(eq(climb.id, id));
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const user = event.locals.user;
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await db.update(climb).set({ status: Status.active, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(climb.id, id));
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-t-JR12VF.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/+page.server.ts";
const imports = ["_app/immutable/nodes/9.2Akr3Gh_.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/BP3dwPwH.js","_app/immutable/chunks/DnupdPkf.js","_app/immutable/chunks/ZruzyP71.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js","_app/immutable/chunks/DuKJIFvM.js","_app/immutable/chunks/Cg8VCEQy.js","_app/immutable/chunks/DaLxRb8P.js"];
const stylesheets = ["_app/immutable/assets/9.wPBwWyY2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-CZ4KVk5O.js.map

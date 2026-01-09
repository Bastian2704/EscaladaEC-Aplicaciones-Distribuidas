import { d as db, s as sector, e as eq, b as area } from './index3-DdXcqWnY.js';
import { r as requireAdmin, a as requireUser } from './guards-DZEKhdLa.js';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { S as Status } from './constants-D1jAS2l2.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const PAGE_SIZE = 10;
const load = async (event) => {
  requireUser(event);
  const { areaId } = event.params;
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const status = url.searchParams.get("status") ?? "active";
  const offset = (page - 1) * PAGE_SIZE;
  const items = await db.select().from(sector).where(eq(sector.areaId, areaId)).limit(PAGE_SIZE).offset(offset);
  const areaInfo = await db.select().from(area).where(eq(area.id, areaId));
  return {
    items,
    page,
    status,
    areaInfo
  };
};
const actions = {
  createSector: async (event) => {
    requireAdmin(event);
    const { areaId } = event.params;
    const user = event.locals.user;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const orientation = String(data.get("orientation") ?? "").trim();
    const description = String(data.get("description") ?? "");
    if (!name || !orientation || !description) {
      return fail(400, {
        message: "Nombre del Sector, Orientación y Descripción son Obligatorias"
      });
    }
    await db.insert(sector).values({
      areaId,
      name,
      orientation,
      description,
      status: "active",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      createdBy: user?.id,
      updatedBy: user?.id
    });
    return { success: true, message: `Sector: ${name}, creado correctamente.` };
  },
  suspend: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    const user = event.locals.user;
    if (!id) return fail(400, { message: "Sin id" });
    await db.update(sector).set({ status: Status.suspended, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(sector.id, id));
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    const user = event.locals.user;
    if (!id) return fail(400, { message: "Sin id" });
    await db.update(sector).set({ status: Status.active, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(sector.id, id));
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    const user = event.locals.user;
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await db.update(sector).set({
      status: Status.deleted,
      updatedAt: /* @__PURE__ */ new Date(),
      deletedAt: /* @__PURE__ */ new Date(),
      updatedBy: user?.id
    }).where(eq(sector.id, id));
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    const user = event.locals.user;
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await db.update(sector).set({ status: Status.active, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(sector.id, id));
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CYyKzfu2.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/+page.server.ts";
const imports = ["_app/immutable/nodes/8.D-d1Qxmf.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/BP3dwPwH.js","_app/immutable/chunks/ZruzyP71.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js","_app/immutable/chunks/DuKJIFvM.js","_app/immutable/chunks/Cg8VCEQy.js","_app/immutable/chunks/DaLxRb8P.js"];
const stylesheets = ["_app/immutable/assets/sector.By84aPQ2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-Br_yeccW.js.map

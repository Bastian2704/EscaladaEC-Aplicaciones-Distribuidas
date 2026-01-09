import { d as db, b as area, e as eq, a as and } from './index3-DdXcqWnY.js';
import { r as requireAdmin, a as requireUser } from './guards-DZEKhdLa.js';
import { l as lucia } from './lucia-gIa1lymd.js';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { S as Status, p as provinces } from './constants-D1jAS2l2.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';

const PAGE_SIZE = 10;
const provincess = provinces;
function isProvince(value) {
  return provincess.includes(value);
}
const load = async (event) => {
  requireUser(event);
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const province = url.searchParams.get("province") ?? "";
  const status = url.searchParams.get("status") ?? "active";
  const filters = [];
  if (province && isProvince(province)) {
    filters.push(eq(area.province, province));
  }
  const where = filters.length ? and(...filters) : void 0;
  const offset = (page - 1) * PAGE_SIZE;
  const items = await db.select().from(area).where(where).limit(PAGE_SIZE).offset(offset);
  return {
    items,
    page,
    status,
    province
  };
};
const actions = {
  createArea: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const user = event.locals.user;
    const province = String(data.get("province") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const city = String(data.get("city") ?? "");
    const description = String(data.get("description") ?? "");
    const latitude = String(data.get("latitude") ?? "");
    const longitude = String(data.get("longitude") ?? "");
    if (!name || !province || !city || !description) {
      return fail(400, {
        message: "Nombre del Area, Ciudad, Provincia y Descripción son Obligatorias"
      });
    }
    if (!isProvince(province)) {
      return fail(400, { message: "Provincia inválida" });
    }
    await db.insert(area).values({
      name,
      province,
      city,
      description,
      latitude,
      longitude,
      status: "active",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      createdBy: user?.id,
      updatedBy: user?.id
    });
    return { success: true, message: `Area: ${name}, creado correctamente.` };
  },
  suspend: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const user = event.locals.user;
    await db.update(area).set({ status: Status.suspended, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(area.id, id));
    await lucia.invalidateUserSessions(id);
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const user = event.locals.user;
    await db.update(area).set({ status: Status.active, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(area.id, id));
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    const user = event.locals.user;
    await db.update(area).set({
      status: Status.deleted,
      updatedAt: /* @__PURE__ */ new Date(),
      deletedAt: /* @__PURE__ */ new Date(),
      updatedBy: user?.id
    }).where(eq(area.id, id));
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    const user = event.locals.user;
    await db.update(area).set({ status: Status.active, updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(area.id, id));
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-L2AHjhUw.js')).default;
const server_id = "src/routes/(app)/area/+page.server.ts";
const imports = ["_app/immutable/nodes/6.DCOYl50R.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/BP3dwPwH.js","_app/immutable/chunks/ZruzyP71.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js","_app/immutable/chunks/CHOmHQgN.js","_app/immutable/chunks/DuKJIFvM.js","_app/immutable/chunks/Cg8VCEQy.js","_app/immutable/chunks/DaLxRb8P.js"];
const stylesheets = ["_app/immutable/assets/6.Dfd6A9pA.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-CZeDC0LM.js.map

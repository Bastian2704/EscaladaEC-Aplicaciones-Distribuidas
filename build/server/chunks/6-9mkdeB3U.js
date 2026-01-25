import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { r as requireAdmin, a as requireUser } from './guards-DZEKhdLa.js';
import { S as ServiceFactory, p as parseStatus } from './serviceFactory-BdHGVNT9.js';
import './lucia-CGGv7VMT.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'argon2';

const PAGE_SIZE = 10;
const load = async (event) => {
  requireUser(event);
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const statusQuery = url.searchParams.get("status");
  const status = parseStatus(statusQuery, "active");
  const areaService = ServiceFactory.create("area");
  const items = await areaService.listAreas({ page, pageSize: PAGE_SIZE, status });
  return { items, page, status };
};
const actions = {
  createArea: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const province = String(data.get("province") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const latitude = Number(data.get("latitude"));
    const longitude = Number(data.get("longitude"));
    if (!name || !province || !city || !description) {
      return fail(400, { message: "Nombre, provincia, ciudad y descripción son obligatorios" });
    }
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return fail(400, { message: "Latitud/Longitud inválidas" });
    }
    try {
      await ServiceFactory.create("area").createArea(
        { name, province, city, description, latitude, longitude },
        admin
      );
      return { success: true, message: `Área ${name} creada correctamente.` };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error creando área";
      return fail(400, { message });
    }
  },
  suspend: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await ServiceFactory.create("area").changeStatus(id, "suspended", admin);
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await ServiceFactory.create("area").changeStatus(id, "active", admin);
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await ServiceFactory.create("area").softDelete(id, admin);
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await ServiceFactory.create("area").restore(id, admin);
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
const component = async () => component_cache ??= (await import('./_page.svelte-D0Eb-hap.js')).default;
const server_id = "src/routes/(app)/area/+page.server.ts";
const imports = ["_app/immutable/nodes/6.D4Z1Go02.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/WXJrxjW5.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/CxO6keTQ.js","_app/immutable/chunks/DN3OWba0.js","_app/immutable/chunks/DYFObpwG.js","_app/immutable/chunks/DnGCxwWg.js","_app/immutable/chunks/DajTkQhQ.js","_app/immutable/chunks/DoKzG_7j.js"];
const stylesheets = ["_app/immutable/assets/6.Dfd6A9pA.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-9mkdeB3U.js.map

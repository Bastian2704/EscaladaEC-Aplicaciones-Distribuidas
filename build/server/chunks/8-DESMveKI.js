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
  const { areaId } = event.params;
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const statusQuery = url.searchParams.get("status");
  const status = parseStatus(statusQuery, "active");
  const sectorService = ServiceFactory.create("sector");
  const items = await sectorService.listSectors({
    areaId,
    page,
    pageSize: PAGE_SIZE,
    status
  });
  const areaService = ServiceFactory.create("area");
  const areaInfo = await areaService.getAreaHeader(areaId);
  return {
    items,
    areaInfo,
    page,
    status,
    areaId
  };
};
const actions = {
  createSector: async (event) => {
    const admin = requireAdmin(event);
    const { areaId } = event.params;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const orientation = String(data.get("orientation") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    if (!name || !orientation || !description) {
      return fail(400, { message: "Nombre, orientación y descripción son obligatorios" });
    }
    try {
      await ServiceFactory.create("sector").createSector(
        {
          areaId,
          name,
          orientation,
          description
        },
        admin
      );
      return { success: true, message: `Sector ${name} creado correctamente.` };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error creando sector";
      return fail(400, { message });
    }
  },
  suspend: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await ServiceFactory.create("sector").changeStatus(id, "suspended", admin);
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await ServiceFactory.create("sector").changeStatus(id, "active", admin);
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await ServiceFactory.create("sector").softDelete(id, admin);
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await ServiceFactory.create("sector").restore(id, admin);
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
const component = async () => component_cache ??= (await import('./_page.svelte-BREboM-f.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/+page.server.ts";
const imports = ["_app/immutable/nodes/8.DRg1DJN6.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/WXJrxjW5.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/DN3OWba0.js","_app/immutable/chunks/DYFObpwG.js","_app/immutable/chunks/DnGCxwWg.js","_app/immutable/chunks/DajTkQhQ.js","_app/immutable/chunks/DoKzG_7j.js"];
const stylesheets = ["_app/immutable/assets/sector.By84aPQ2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-DESMveKI.js.map

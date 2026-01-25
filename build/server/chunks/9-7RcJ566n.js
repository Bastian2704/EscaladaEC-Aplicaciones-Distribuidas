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
  const { areaId, sectorId } = event.params;
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const statusQuery = url.searchParams.get("status");
  const status = parseStatus(statusQuery, "active");
  const climbService = ServiceFactory.create("climb");
  const items = await climbService.listClimbs({
    sectorId,
    page,
    pageSize: PAGE_SIZE,
    status
  });
  const sectorService = ServiceFactory.create("sector");
  const sectorInfo = await sectorService.getSectorHeader(sectorId);
  return {
    items,
    page,
    status,
    sectorId,
    areaId,
    sectorInfo
  };
};
const actions = {
  createClimb: async (event) => {
    const admin = requireAdmin(event);
    const { sectorId } = event.params;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const climbType = String(data.get("climbType") ?? "").trim();
    const requiredEquipment = String(data.get("requiredEquipment") ?? "").trim();
    const gradeSystem = String(data.get("gradeSystem") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    if (!name || !category || !climbType || !requiredEquipment || !gradeSystem || !value) {
      return fail(400, {
        message: "Nombre del Climb, Categoria, Tipo de Escalada, Sistema/Valor y Equipo Requerido son obligatorios"
      });
    }
    try {
      const climbService = ServiceFactory.create("climb");
      await climbService.createClimb(
        {
          sectorId,
          name,
          category,
          climbType,
          gradeSystem,
          value,
          requiredEquipment
        },
        { id: admin.id, role: admin.role }
      );
      return { success: true, message: `Climb: ${name}, creado correctamente.` };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error creando climb";
      return fail(400, { message });
    }
  },
  suspend: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await ServiceFactory.create("climb").changeStatus(id, "suspended", admin);
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await ServiceFactory.create("climb").changeStatus(id, "active", admin);
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await ServiceFactory.create("climb").softDelete(id, admin);
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    const admin = requireAdmin(event);
    const id = String((await event.request.formData()).get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    await ServiceFactory.create("climb").restore(id, admin);
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
const component = async () => component_cache ??= (await import('./_page.svelte-BlOeJ6bh.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/+page.server.ts";
const imports = ["_app/immutable/nodes/9.DHhZFx9k.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/B4mCVzul.js","_app/immutable/chunks/WXJrxjW5.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/CxO6keTQ.js","_app/immutable/chunks/DN3OWba0.js","_app/immutable/chunks/DYFObpwG.js","_app/immutable/chunks/DnGCxwWg.js","_app/immutable/chunks/DajTkQhQ.js","_app/immutable/chunks/DoKzG_7j.js"];
const stylesheets = ["_app/immutable/assets/9.wPBwWyY2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-7RcJ566n.js.map

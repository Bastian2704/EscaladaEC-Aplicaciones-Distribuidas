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
  const { areaId, sectorId, climbId } = event.params;
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const statusQuery = url.searchParams.get("status");
  const status = parseStatus(statusQuery, "active");
  const gradeService = ServiceFactory.create("grade");
  const items = await gradeService.listGrades({
    climbId,
    page,
    pageSize: PAGE_SIZE,
    status
  });
  const climbService = ServiceFactory.create("climb");
  const climbInfo = await climbService.getClimbHeader(climbId);
  return {
    items,
    page,
    status,
    sectorId,
    areaId,
    climbId,
    climbInfo
  };
};
const actions = {
  createGrade: async (event) => {
    const user = requireUser(event);
    const { climbId } = event.params;
    const data = await event.request.formData();
    const gradeSystem = String(data.get("gradeSystem") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    const difficultyLevel = Number(data.get("difficultyLevel") ?? "");
    const accomplished = data.get("accomplished") === "on";
    const climbCategory = String(data.get("climbCategory") ?? "").trim();
    if (!gradeSystem || !value || !Number.isFinite(difficultyLevel) || !climbCategory) {
      return fail(400, {
        message: "Sistema de Grado, Valor y Dificultad Percibida son Obligatorias"
      });
    }
    try {
      const gradeService = ServiceFactory.create("grade");
      await gradeService.createGrade(
        {
          climbId,
          climbCategory,
          gradeSystem,
          value,
          difficultyLevel,
          accomplished
        },
        { id: user.id, role: user.role }
      );
      return { success: true, message: `Grado creado correctamente.` };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error creando grado";
      return fail(400, { message });
    }
  },
  suspend: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const gradeService = ServiceFactory.create("grade");
    await gradeService.changeStatus(id, "suspended", { id: admin.id, role: admin.role });
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const gradeService = ServiceFactory.create("grade");
    await gradeService.changeStatus(id, "active", { id: admin.id, role: admin.role });
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    const gradeService = ServiceFactory.create("grade");
    await gradeService.softDelete(id, { id: admin.id, role: admin.role });
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    const gradeService = ServiceFactory.create("grade");
    await gradeService.restore(id, { id: admin.id, role: admin.role });
    throw redirect(303, event.url.pathname);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-w7f7MfDL.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/grade/+page.server.ts";
const imports = ["_app/immutable/nodes/11.BlcasAOp.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/B4mCVzul.js","_app/immutable/chunks/WXJrxjW5.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/CxO6keTQ.js","_app/immutable/chunks/DN3OWba0.js","_app/immutable/chunks/DYFObpwG.js","_app/immutable/chunks/DnGCxwWg.js","_app/immutable/chunks/DajTkQhQ.js","_app/immutable/chunks/DoKzG_7j.js"];
const stylesheets = ["_app/immutable/assets/sector.By84aPQ2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-CY4c8XA8.js.map

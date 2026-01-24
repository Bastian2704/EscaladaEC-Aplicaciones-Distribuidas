import { r as redirect, f as fail } from './index-B2LGyy1l.js';
import { a as requireUser } from './guards-DZEKhdLa.js';
import { S as ServiceFactory, p as parseStatus } from './serviceFactory-BdHGVNT9.js';
import './lucia-CGGv7VMT.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'argon2';

const load = async (event) => {
  const user = requireUser(event);
  const { areaId, sectorId, climbId, gradeId } = event.params;
  const gradeService = ServiceFactory.create("grade");
  const item = await gradeService.getGradeForEdit(gradeId, { id: user.id, role: user.role });
  return { item, areaId, sectorId, climbId, gradeId };
};
const actions = {
  save: async (event) => {
    const user = requireUser(event);
    const { gradeId } = event.params;
    const data = await event.request.formData();
    const gradeSystem = String(data.get("gradeSystem") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    const difficultyLevel = Number(data.get("difficultyLevel") ?? "");
    const accomplished = data.get("accomplished") === "on";
    const status = parseStatus(data.get("status"), "active");
    if (!gradeSystem || !value || !Number.isFinite(difficultyLevel)) {
      return fail(400, { message: "Datos inválidos" });
    }
    try {
      const gradeService = ServiceFactory.create("grade");
      await gradeService.updateGrade(
        gradeId,
        {
          gradeSystem,
          value,
          difficultyLevel,
          accomplished,
          status
          // Si luego quieres revalidar contra categoría, pasa climbCategory aquí.
        },
        { id: user.id, role: user.role }
      );
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error guardando grade";
      return fail(400, { message });
    }
  },
  softDelete: async (event) => {
    const user = requireUser(event);
    const { gradeId } = event.params;
    const gradeService = ServiceFactory.create("grade");
    try {
      await gradeService.ownerSoftDelete(gradeId, { id: user.id, role: user.role });
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error eliminando grade";
      return fail(400, { message });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BEvLdTCJ.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/grade/[gradeId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/12.DO-xIZcf.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-90QIIiDb.js.map

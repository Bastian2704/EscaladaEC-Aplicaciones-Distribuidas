import { r as redirect, f as fail } from './index-B2LGyy1l.js';
import { r as requireAdmin } from './guards-DZEKhdLa.js';
import { S as ServiceFactory, p as parseStatus } from './serviceFactory-BdHGVNT9.js';
import './lucia-CGGv7VMT.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'argon2';

const load = async (event) => {
  const admin = requireAdmin(event);
  const { areaId, sectorId, climbId } = event.params;
  const climbService = ServiceFactory.create("climb");
  const item = await climbService.getClimbForEdit(climbId, admin);
  return { item, areaId, sectorId, climbId };
};
const actions = {
  save: async (event) => {
    const admin = requireAdmin(event);
    const { climbId } = event.params;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const category = String(data.get("category") ?? "").trim();
    const climbType = String(data.get("climbType") ?? "").trim();
    const requiredEquipment = String(data.get("requiredEquipment") ?? "").trim();
    const gradeSystem = String(data.get("gradeSystem") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    const status = parseStatus(data.get("status"), "active");
    if (!name || !category || !climbType || !requiredEquipment || !gradeSystem || !value) {
      return fail(400, { message: "Datos inválidos" });
    }
    try {
      await ServiceFactory.create("climb").updateClimb(
        climbId,
        {
          name,
          category,
          climbType,
          requiredEquipment,
          gradeSystem,
          value,
          status
        },
        admin
      );
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error guardando climb";
      return fail(400, { message });
    }
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const { climbId } = event.params;
    try {
      await ServiceFactory.create("climb").softDelete(climbId, admin);
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error eliminando climb";
      return fail(400, { message });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CsyRAB6k.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/10.CsAcm3vY.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-BuChzB0z.js.map

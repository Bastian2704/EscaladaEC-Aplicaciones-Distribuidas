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
  const { areaId, sectorId } = event.params;
  const sectorService = ServiceFactory.create("sector");
  const item = await sectorService.getSectorForEdit(sectorId, admin);
  return { item, areaId, sectorId };
};
const actions = {
  save: async (event) => {
    const admin = requireAdmin(event);
    const { sectorId } = event.params;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const orientation = String(data.get("orientation") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const status = parseStatus(data.get("status"), "active");
    if (!name || !orientation || !description) {
      return fail(400, { message: "Datos inválidos" });
    }
    try {
      await ServiceFactory.create("sector").updateSector(
        sectorId,
        {
          name,
          orientation,
          description,
          status
        },
        admin
      );
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error guardando sector";
      return fail(400, { message });
    }
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const { sectorId } = event.params;
    try {
      await ServiceFactory.create("sector").softDelete(sectorId, admin);
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error eliminando sector";
      return fail(400, { message });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CimUbxTu.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/13.DxrBY1tS.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-gVsua2Rv.js.map

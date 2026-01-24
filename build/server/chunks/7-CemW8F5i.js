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
  const { areaId } = event.params;
  const item = await ServiceFactory.create("area").getAreaForEdit(areaId, admin);
  return { item, areaId };
};
const actions = {
  save: async (event) => {
    const admin = requireAdmin(event);
    const { areaId } = event.params;
    const data = await event.request.formData();
    const name = String(data.get("name") ?? "").trim();
    const province = String(data.get("province") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();
    const latitude = Number(data.get("latitude"));
    const longitude = Number(data.get("longitude"));
    const status = parseStatus(data.get("status"), "active");
    if (!name || !province || !city || !description) return fail(400, { message: "Datos inválidos" });
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return fail(400, { message: "Latitud/Longitud inválidas" });
    }
    try {
      await ServiceFactory.create("area").updateArea(
        areaId,
        { name, province, city, description, latitude, longitude, status },
        admin
      );
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error guardando área";
      return fail(400, { message });
    }
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const { areaId } = event.params;
    try {
      await ServiceFactory.create("area").softDelete(areaId, admin);
      throw redirect(303, event.url.pathname);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error eliminando área";
      return fail(400, { message });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C2nUU3X0.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/7.CYvLJ2U3.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js","_app/immutable/chunks/CxO6keTQ.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-CemW8F5i.js.map

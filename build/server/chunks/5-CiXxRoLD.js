import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { r as requireAdmin } from './guards-DZEKhdLa.js';
import { S as ServiceFactory } from './serviceFactory-BdHGVNT9.js';
import './lucia-CGGv7VMT.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'argon2';

const PAGE_SIZE = 10;
const load = async (event) => {
  const admin = requireAdmin(event);
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const role = url.searchParams.get("role") ?? "all";
  const status = url.searchParams.get("status") ?? "all";
  const userService = ServiceFactory.create("user");
  const items = await userService.listUsers(
    { page, pageSize: PAGE_SIZE, role, status },
    { id: admin.id, role: admin.role }
  );
  return { user: admin, items, page, role, status };
};
const actions = {
  createUser: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const email = String(data.get("email") ?? "").toLowerCase().trim();
    const password = String(data.get("password") ?? "");
    const username = String(data.get("username") ?? "").trim();
    const age = String(data.get("age") ?? "").trim();
    const role = String(data.get("role") ?? "user").toLowerCase();
    try {
      const userService = ServiceFactory.create("user");
      await userService.createUser(
        { email, password, username, age, role },
        { id: admin.id, role: admin.role }
      );
      return { success: true, message: `Usuario ${email} creado correctamente como ${role}` };
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error creando usuario";
      return fail(400, { message });
    }
  },
  setRole: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    const newRole = String(data.get("role") ?? "");
    if (!id) return fail(400, { message: "Datos inválidos" });
    const userService = ServiceFactory.create("user");
    await userService.setRole(id, newRole, { id: admin.id, role: admin.role });
    throw redirect(303, "/users");
  },
  suspend: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const userService = ServiceFactory.create("user");
    await userService.suspend(id, { id: admin.id, role: admin.role });
    throw redirect(303, "/users");
  },
  resume: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const userService = ServiceFactory.create("user");
    await userService.resume(id, { id: admin.id, role: admin.role });
    throw redirect(303, "/users");
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const userService = ServiceFactory.create("user");
    await userService.softDelete(id, { id: admin.id, role: admin.role });
    throw redirect(303, "/users?status=deleted");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CaBtLcio.js')).default;
const server_id = "src/routes/(admin)/users/+page.server.ts";
const imports = ["_app/immutable/nodes/5.DD354QqY.js","_app/immutable/chunks/CLFBao1S.js","_app/immutable/chunks/D-rjrqWF.js","_app/immutable/chunks/R2lLDMU1.js","_app/immutable/chunks/1ipHKKXI.js","_app/immutable/chunks/DcMo3cCv.js","_app/immutable/chunks/DYby9N2k.js","_app/immutable/chunks/BWJMsvq9.js","_app/immutable/chunks/BMTFBQAs.js","_app/immutable/chunks/SsGePZVV.js","_app/immutable/chunks/CDGVdonO.js","_app/immutable/chunks/DR-j32Px.js"];
const stylesheets = ["_app/immutable/assets/5.B-lVpkDm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-CiXxRoLD.js.map

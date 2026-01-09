import { d as db, u as users, e as eq, i as isNull, a as and } from './index3-DdXcqWnY.js';
import { r as requireAdmin } from './guards-DZEKhdLa.js';
import { l as lucia } from './lucia-gIa1lymd.js';
import { f as fail, r as redirect, e as error } from './index-B2LGyy1l.js';
import { hash } from 'argon2';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';

const PAGE_SIZE = 10;
const ROLE_VALUES = ["user", "admin"];
function isRole(value) {
  return ROLE_VALUES.includes(value);
}
const load = async (event) => {
  const admin = requireAdmin(event);
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const role = url.searchParams.get("role") ?? "";
  const status = url.searchParams.get("status") ?? "active";
  const filters = [];
  if (role && isRole(role)) {
    filters.push(eq(users.role, role));
  }
  if (status !== "deleted") filters.push(isNull(users.deletedAt));
  const where = filters.length ? and(...filters) : void 0;
  const offset = (page - 1) * PAGE_SIZE;
  const items = await db.select().from(users).where(where).limit(PAGE_SIZE).offset(offset);
  return { user: admin, items, page, role: role || "all", status };
};
function ensureNotSelf(currentUserId, targetId) {
  if (currentUserId && currentUserId === targetId) {
    return fail(400, { message: "No puedes modificarte a ti mismo" });
  }
  return null;
}
async function assertNotLastAdmin(targetUserId) {
  const target = await db.query.users.findFirst({ where: eq(users.id, targetUserId) });
  if (!target) throw error(404, "Usuario no encontrado");
  if (target.role !== "admin") return null;
  const admins = await db.select({ id: users.id }).from(users).where(and(eq(users.role, "admin"), isNull(users.deletedAt)));
  if (admins.length <= 1) {
    return fail(400, { message: "No puedes quitar el último admin del sistema" });
  }
  return null;
}
const actions = {
  createUser: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const email = String(data.get("email") ?? "").toLowerCase().trim();
    const password = String(data.get("password") ?? "");
    const username = String(data.get("username") ?? "");
    const age = String(data.get("age") ?? "");
    const role = String(data.get("role") ?? "user").toLowerCase();
    if (!email || password.length < 8) {
      return fail(400, { message: "Email y contraseña son requeridos (mínimo 8 caracteres)" });
    }
    if (!isRole(role)) {
      return fail(400, { message: "Rol inválido" });
    }
    const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (existing) {
      return fail(400, { message: "Ya existe un usuario con ese email" });
    }
    const passwordHash = await hash(password);
    await db.insert(users).values({
      email,
      username,
      age,
      passwordHash,
      role,
      status: "active",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    return { success: true, message: `Usuario ${email} creado correctamente como ${role}` };
  },
  setRole: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    const newRole = String(data.get("role") ?? "").toLowerCase();
    if (!id || !isRole(newRole)) {
      return fail(400, { message: "Datos inválidos" });
    }
    const selfErr = ensureNotSelf(admin.id, id);
    if (selfErr) return selfErr;
    if (newRole !== "admin") {
      const lastErr = await assertNotLastAdmin(id);
      if (lastErr) return lastErr;
    }
    await db.update(users).set({ role: newRole, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
    throw redirect(303, "/users");
  },
  suspend: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const selfErr = ensureNotSelf(admin.id, id);
    if (selfErr) return selfErr;
    const lastErr = await assertNotLastAdmin(id);
    if (lastErr) return lastErr;
    await db.update(users).set({ status: "suspended", updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
    await lucia.invalidateUserSessions(id);
    throw redirect(303, "/users");
  },
  resume: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await db.update(users).set({ status: "active", deletedAt: null, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
    throw redirect(303, "/users");
  },
  softDelete: async (event) => {
    const admin = requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const selfErr = ensureNotSelf(admin.id, id);
    if (selfErr) return selfErr;
    const lastErr = await assertNotLastAdmin(id);
    if (lastErr) return lastErr;
    await db.update(users).set({ status: "deleted", deletedAt: /* @__PURE__ */ new Date(), updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
    await lucia.invalidateUserSessions(id);
    throw redirect(303, "/users?status=deleted");
  },
  restore: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    await db.update(users).set({ status: "active", deletedAt: null, updatedAt: /* @__PURE__ */ new Date() }).where(eq(users.id, id));
    throw redirect(303, "/users");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BiLzJuAR.js')).default;
const server_id = "src/routes/(admin)/users/+page.server.ts";
const imports = ["_app/immutable/nodes/5.CPkjmsWJ.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/BP3dwPwH.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js"];
const stylesheets = ["_app/immutable/assets/5.B-lVpkDm.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-BgCvAtAr.js.map

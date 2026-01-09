import { d as db, g as grade, e as eq, a as and, c as climb } from './index3-DdXcqWnY.js';
import { r as requireAdmin, a as requireUser } from './guards-DZEKhdLa.js';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { b as isValidSystem, d as isValidValue, g as gradeSystem } from './constants-D1jAS2l2.js';
import 'postgres';
import './shared-server-DaWdgxVh.js';

const PAGE_SIZE = 10;
const load = async (event) => {
  requireUser(event);
  const { areaId, sectorId, climbId } = event.params;
  const url = event.url;
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1));
  const status = url.searchParams.get("status") ?? "active";
  const offset = (page - 1) * PAGE_SIZE;
  const items = await db.select().from(grade).where(and(eq(grade.climbId, climbId), eq(grade.status, status))).limit(PAGE_SIZE).offset(offset);
  const climbInfo = await db.select().from(climb).where(eq(climb.id, climbId));
  return {
    items,
    page,
    status,
    sectorId,
    areaId,
    climbId,
    systems: Object.keys(gradeSystem),
    gradeOptions: gradeSystem,
    climbInfo
  };
};
const actions = {
  createGrade: async (event) => {
    requireUser(event);
    const { climbId } = event.params;
    const user = event.locals.user;
    const data = await event.request.formData();
    const gradeSystem2 = String(data.get("gradeSystem") ?? "").trim();
    const value = String(data.get("value") ?? "").trim();
    const difficultyLevel = Number(data.get("difficultyLevel") ?? "");
    const accomplished = Boolean(data.get("accomplished") ?? "");
    if (!gradeSystem2 || !value || !difficultyLevel) {
      return fail(400, {
        message: "Sistema de Grado, Valor y Dificultad Percibida son Obligatorias"
      });
    }
    if (!isValidSystem(gradeSystem2)) {
      return fail(400, { message: "Sistema de grado inválido." });
    }
    if (!isValidValue(gradeSystem2, value)) {
      return fail(400, { message: "Valor de grado no coincide con el sistema seleccionado." });
    }
    if (!Number.isFinite(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 10) {
      return fail(400, { message: "La dificultad percibida debe estar entre 1 y 10." });
    }
    await db.insert(grade).values({
      climbId,
      userId: user?.id,
      gradeSystem: gradeSystem2,
      value,
      difficultyLevel,
      accomplished,
      status: "active",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      publishedBy: user?.id,
      updatedBy: user?.id
    });
    return { success: true, message: `Grado creado correctamente.` };
  },
  suspend: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const user = event.locals.user;
    await db.update(grade).set({ status: "suspended", updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(grade.id, id));
    throw redirect(303, event.url.pathname);
  },
  resume: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "Sin id" });
    const user = event.locals.user;
    await db.update(grade).set({ status: "active", updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(grade.id, id));
    throw redirect(303, event.url.pathname);
  },
  softDelete: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    const user = event.locals.user;
    await db.update(grade).set({ status: "deleted", updatedAt: /* @__PURE__ */ new Date(), deletedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(grade.id, id));
    throw redirect(303, event.url.pathname);
  },
  restore: async (event) => {
    requireAdmin(event);
    const data = await event.request.formData();
    const id = String(data.get("id") ?? "");
    if (!id) return fail(400, { message: "No se ha enviado un ID" });
    const user = event.locals.user;
    await db.update(grade).set({ status: "active", updatedAt: /* @__PURE__ */ new Date(), updatedBy: user?.id }).where(eq(grade.id, id));
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
const component = async () => component_cache ??= (await import('./_page.svelte-DtwpMtve.js')).default;
const server_id = "src/routes/(app)/area/[areaId]/sector/[sectorId]/climb/[climbId]/grade/+page.server.ts";
const imports = ["_app/immutable/nodes/11.C6_GFOWB.js","_app/immutable/chunks/R8eUw0rf.js","_app/immutable/chunks/Ckx13BoS.js","_app/immutable/chunks/Dw5luiki.js","_app/immutable/chunks/DjrrgQ94.js","_app/immutable/chunks/C6UGZhB6.js","_app/immutable/chunks/DZFDuCMu.js","_app/immutable/chunks/DBNqpBx4.js","_app/immutable/chunks/xiS_jUnV.js","_app/immutable/chunks/BP3dwPwH.js","_app/immutable/chunks/DnupdPkf.js","_app/immutable/chunks/ZruzyP71.js","_app/immutable/chunks/ZIA5dzzm.js","_app/immutable/chunks/B6sxBtLM.js","_app/immutable/chunks/DuKJIFvM.js","_app/immutable/chunks/Cg8VCEQy.js","_app/immutable/chunks/DaLxRb8P.js"];
const stylesheets = ["_app/immutable/assets/sector.By84aPQ2.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-KvnJiWuR.js.map

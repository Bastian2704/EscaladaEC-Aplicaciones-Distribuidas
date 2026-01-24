import { d as db, l as lucia, u as users, e as eq, g as grade, a as and, c as climb, s as sector, b as area, i as inArray, f as desc, h as climbingLevelSport, o as or, j as climbingLevelNoRope, k as climbingLevelTrad, n as notInArray, m as isNotNull, p as isNull } from './lucia-CGGv7VMT.js';
import { e as error } from './index-B2LGyy1l.js';
import { hash } from 'argon2';

const provinces = [
  "Azuay",
  "Bolívar",
  "Cañar",
  "Carchi",
  "Chimborazo",
  "Cotopaxi",
  "El Oro",
  "Esmeraldas",
  "Galápagos",
  "Guayas",
  "Imbabura",
  "Loja",
  "Los Ríos",
  "Manabí",
  "Morona Santiago",
  "Napo",
  "Orellana",
  "Pastaza",
  "Pichincha",
  "Santa Elena",
  "Santo Domingo de los Tsáchilas",
  "Sucumbíos",
  "Tungurahua",
  "Zamora Chinchipe"
];
const categories = [
  "Escalada Deportiva (Cuerda)",
  "Escalada Sin Cuerda",
  "Escalada Tradicional"
];
const climbTypes = {
  "Escalada Deportiva (Cuerda)": [
    "Escala Deportiva",
    "Vía de Varios Largos",
    "Escalada en Gran Pared"
  ],
  "Escalada Sin Cuerda": ["Boulder", "Psicobloc", "Highball"],
  "Escalada Tradicional": ["Escala Tradicional", "Vía de Varios Largos", "Escalada en Gran Pared"]
};
const climbGradeSystems = {
  "Escalada Deportiva (Cuerda)": ["Francesa", "YDS"],
  "Escalada Sin Cuerda": ["VScale", "Fontainebleau"],
  "Escalada Tradicional": ["British"]
};
const gradeSystemsValues = {
  Francesa: [
    "1",
    "2",
    "3",
    "4a",
    "4b",
    "4c",
    "5a",
    "5b",
    "5c",
    "6a",
    "6a+",
    "6b",
    "6b+",
    "6c",
    "6c/c+",
    "6c+",
    "7a",
    "7a+",
    "7b",
    "7b+",
    "7c",
    "7c+",
    "8a",
    "8a+",
    "8b",
    "8b+",
    "8c",
    "8c+",
    "9a",
    "9a+",
    "9b",
    "9b+",
    "9c"
  ],
  YDS: [
    "2nd class",
    "3rd class",
    "4th class",
    "5.0-5.4",
    "5.5",
    "5.6",
    "5.7",
    "5.8",
    "5.9",
    "5.10a",
    "5.10b",
    "5.10c",
    "5.10d",
    "5.11a",
    "5.11b",
    "5.11c",
    "5.11d",
    "5.12a",
    "5.12b",
    "5.12c",
    "5.12d",
    "5.13a",
    "5.13b",
    "5.13c",
    "5.13d",
    "5.14a",
    "5.14b",
    "5.14c",
    "5.14d",
    "5.15a",
    "5.15b",
    "5.15c",
    "5.15d"
  ],
  // V-Scale (Boulder)
  VScale: [
    "V1",
    "V2",
    "V3",
    "V3/4",
    "V4",
    "V4/5",
    "V5",
    "V5/6",
    "V6",
    "V7",
    "V8",
    "V8/9",
    "V9",
    "V10",
    "V11",
    "V12",
    "V13",
    "V14",
    "V15",
    "V16",
    "V17"
  ],
  // Fontainebleau (Boulder)
  Fontainebleau: [
    "5",
    "5+",
    "6A",
    "6A+",
    "6B",
    "6B+",
    "6C",
    "6C+",
    "7A",
    "7A+",
    "7B",
    "7B+",
    "7C",
    "7C+",
    "8A",
    "8A+",
    "8B",
    "8B+",
    "8C",
    "8C+",
    "9A"
  ],
  British: [
    "Mod",
    "Diff",
    "VDiff",
    "HVD",
    "Sev",
    "HS",
    "VS",
    "HVS",
    "E1 5a",
    "E2 5b",
    "E3 5c",
    "E4 6a",
    "E5 6b",
    "E6 6b",
    "E7 6c",
    "E8 6c",
    "E9 7a",
    "E10 7b",
    "E11 7c"
  ]
};
const isValidCategory = (formCategory) => categories.includes(formCategory);
const isValidType = (formCategory, formClimbType) => {
  if (!isValidCategory(formCategory)) {
    return false;
  }
  return climbTypes[formCategory].includes(formClimbType);
};
const isValidGradeSystem = (climbCategory, formGradeSystem) => {
  if (!isValidCategory(climbCategory)) {
    return false;
  }
  return climbGradeSystems[climbCategory].includes(formGradeSystem);
};
const isValidGradeSystemValue = (climbCategory, formGradeSystem, gradeSystemValue) => {
  if (!isValidGradeSystem(climbCategory, formGradeSystem)) {
    return false;
  }
  return gradeSystemsValues[formGradeSystem].includes(gradeSystemValue);
};

function parseRole(value) {
  const v = String(value ?? "").toLowerCase();
  if (v === "admin") return "admin";
  if (v === "user") return "user";
  return "user";
}
function parseStatus(value, fallback = "active") {
  const v = String(value ?? "").toLowerCase();
  if (v === "active" || v === "suspended" || v === "deleted") return v;
  return fallback;
}
class DrizzleGradeRepository {
  constructor(db2) {
    this.db = db2;
  }
  mapRow(row) {
    return { ...row, status: parseStatus(row.status) };
  }
  async findById(id) {
    const [row] = await this.db.select().from(grade).where(eq(grade.id, id));
    return row ? this.mapRow(row) : null;
  }
  async listByClimbId(params) {
    const { climbId, page, pageSize } = params;
    const offset = (Math.max(1, page) - 1) * pageSize;
    const rows = await this.db.select().from(grade).where(and(eq(grade.climbId, climbId))).limit(pageSize).offset(offset);
    return rows.map((r) => this.mapRow(r));
  }
  async insert(newGrade) {
    const [created] = await this.db.insert(grade).values(newGrade).returning();
    return this.mapRow(created);
  }
  async updateDetails(id, payload) {
    await this.db.update(grade).set({
      gradeSystem: payload.gradeSystem,
      value: payload.value,
      difficultyLevel: payload.difficultyLevel,
      accomplished: payload.accomplished,
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy
    }).where(eq(grade.id, id));
  }
  async updateStatus(id, payload) {
    await this.db.update(grade).set({
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy,
      deletedAt: payload.deletedAt
    }).where(eq(grade.id, id));
  }
}
class GradeBuilder {
  input;
  user;
  withUser(user) {
    this.user = user;
    return this;
  }
  fromInput(input) {
    this.input = input;
    return this;
  }
  validate() {
    const { climbCategory, gradeSystem, value, difficultyLevel } = this.input;
    if (!gradeSystem) throw new Error("Sistema de grado requerido");
    if (!value) throw new Error("Valor requerido");
    if (!isValidGradeSystem(climbCategory, gradeSystem)) {
      throw new Error("Sistema de grado inválido.");
    }
    if (!isValidGradeSystemValue(climbCategory, gradeSystem, value)) {
      throw new Error("Valor de grado no coincide con el sistema seleccionado.");
    }
    if (!Number.isFinite(difficultyLevel) || difficultyLevel < 1 || difficultyLevel > 10) {
      throw new Error("La dificultad percibida debe estar entre 1 y 10.");
    }
    return this;
  }
  build() {
    const now = /* @__PURE__ */ new Date();
    const status = "active";
    return {
      climbId: this.input.climbId,
      userId: this.user.id,
      gradeSystem: this.input.gradeSystem.trim(),
      value: this.input.value.trim(),
      difficultyLevel: this.input.difficultyLevel,
      accomplished: this.input.accomplished,
      likes: 0,
      status,
      publishedBy: this.user.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: this.user.id,
      deletedAt: null
    };
  }
}
class GradeService {
  constructor(repo) {
    this.repo = repo;
  }
  assertAdmin(user) {
    if (user.role !== "admin") throw error(403, "Forbidden");
  }
  assertOwnerOrAdmin(user, row) {
    if (user.role === "admin") return;
    if (row.publishedBy !== user.id) throw error(403, "No autorizado");
  }
  async listGrades(params) {
    return this.repo.listByClimbId(params);
  }
  async createGrade(input, user) {
    const newRow = new GradeBuilder().withUser(user).fromInput(input).validate().build();
    return this.repo.insert(newRow);
  }
  async getGradeForEdit(gradeId, user) {
    const row = await this.repo.findById(gradeId);
    if (!row) throw error(404, "Grade no encontrado");
    this.assertOwnerOrAdmin(user, { publishedBy: row.publishedBy });
    return row;
  }
  async updateGrade(gradeId, input, user) {
    const row = await this.repo.findById(gradeId);
    if (!row) throw error(404, "Grade no encontrado");
    this.assertOwnerOrAdmin(user, { publishedBy: row.publishedBy });
    const safeStatus = user.role === "admin" ? parseStatus(input.status, row.status) : row.status;
    if (!input.gradeSystem?.trim() || !input.value?.trim()) throw error(400, "Datos inválidos");
    if (!Number.isFinite(input.difficultyLevel) || input.difficultyLevel < 1 || input.difficultyLevel > 10) {
      throw error(400, "La dificultad percibida debe estar entre 1 y 10.");
    }
    if (input.climbCategory) {
      if (!isValidGradeSystem(input.climbCategory, input.gradeSystem)) {
        throw error(400, "Sistema de grado inválido.");
      }
      if (!isValidGradeSystemValue(input.climbCategory, input.gradeSystem, input.value)) {
        throw error(400, "Valor de grado no coincide con el sistema seleccionado.");
      }
    }
    const payload = {
      gradeSystem: input.gradeSystem.trim(),
      value: input.value.trim(),
      difficultyLevel: input.difficultyLevel,
      accomplished: input.accomplished,
      status: safeStatus,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id
    };
    await this.repo.updateDetails(gradeId, payload);
  }
  async changeStatus(gradeId, status, user) {
    this.assertAdmin(user);
    const payload = {
      status,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: status === "deleted" ? /* @__PURE__ */ new Date() : null
    };
    await this.repo.updateStatus(gradeId, payload);
  }
  async softDelete(gradeId, user) {
    return this.changeStatus(gradeId, "deleted", user);
  }
  async restore(gradeId, user) {
    this.assertAdmin(user);
    const payload = {
      status: "active",
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: null
    };
    await this.repo.updateStatus(gradeId, payload);
  }
  // Mantener comportamiento original: owner o admin puede borrar desde edit
  async ownerSoftDelete(gradeId, user) {
    const row = await this.repo.findById(gradeId);
    if (!row) throw error(404, "Grade no encontrado");
    this.assertOwnerOrAdmin(user, { publishedBy: row.publishedBy });
    const payload = {
      status: "deleted",
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: /* @__PURE__ */ new Date()
    };
    await this.repo.updateStatus(gradeId, payload);
  }
}
class DrizzleClimbRepository {
  constructor(db2) {
    this.db = db2;
  }
  mapRow(row) {
    return { ...row, status: parseStatus(row.status) };
  }
  async findById(id) {
    const [row] = await this.db.select().from(climb).where(eq(climb.id, id));
    return row ? this.mapRow(row) : null;
  }
  async listBySectorId(params) {
    const { sectorId, page, pageSize } = params;
    const offset = (Math.max(1, page) - 1) * pageSize;
    const rows = await this.db.select().from(climb).where(and(eq(climb.sectorId, sectorId))).limit(pageSize).offset(offset);
    return rows.map((r) => this.mapRow(r));
  }
  async insert(newClimb) {
    const [created] = await this.db.insert(climb).values(newClimb).returning();
    return this.mapRow(created);
  }
  async updateDetails(id, payload) {
    await this.db.update(climb).set({
      name: payload.name,
      category: payload.category,
      climbType: payload.climbType,
      gradeSystem: payload.gradeSystem,
      value: payload.value,
      requiredEquipment: payload.requiredEquipment,
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy
    }).where(eq(climb.id, id));
  }
  async updateStatus(id, payload) {
    await this.db.update(climb).set({
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy,
      deletedAt: payload.deletedAt
    }).where(eq(climb.id, id));
  }
}
class ClimbBuilder {
  input;
  user;
  withUser(user) {
    this.user = user;
    return this;
  }
  fromInput(input) {
    this.input = input;
    return this;
  }
  validate() {
    const { name, category, climbType, requiredEquipment, gradeSystem, value } = this.input;
    if (!name?.trim()) throw new Error("Nombre requerido");
    if (!category?.trim()) throw new Error("Categoría requerida");
    if (!climbType?.trim()) throw new Error("Tipo de escalada requerido");
    if (!requiredEquipment?.trim()) throw new Error("Equipo requerido");
    if (!gradeSystem?.trim()) throw new Error("Sistema de grado requerido");
    if (!value?.trim()) throw new Error("Valor requerido");
    if (!isValidCategory(category)) {
      throw new Error("Categoría inválida.");
    }
    if (!isValidType(category, climbType)) {
      throw new Error("El tipo no corresponde a la categoría seleccionada.");
    }
    return this;
  }
  build() {
    const now = /* @__PURE__ */ new Date();
    const status = "active";
    return {
      sectorId: this.input.sectorId,
      userId: this.user.id,
      name: this.input.name.trim(),
      category: this.input.category.trim(),
      climbType: this.input.climbType.trim(),
      gradeSystem: this.input.gradeSystem.trim(),
      value: this.input.value.trim(),
      requiredEquipment: this.input.requiredEquipment.trim(),
      status,
      createdAt: now,
      updatedAt: now,
      createdBy: this.user.id,
      updatedBy: this.user.id,
      deletedAt: null
    };
  }
}
class ClimbService {
  constructor(repo) {
    this.repo = repo;
  }
  assertAdmin(user) {
    if (user.role !== "admin") throw error(403, "Forbidden");
  }
  async getClimbHeader(climbId) {
    const row = await this.repo.findById(climbId);
    if (!row) throw error(404, "Climb no encontrado");
    return [row];
  }
  async listClimbs(params) {
    return this.repo.listBySectorId(params);
  }
  async createClimb(input, user) {
    this.assertAdmin(user);
    const newRow = new ClimbBuilder().withUser(user).fromInput(input).validate().build();
    return this.repo.insert(newRow);
  }
  async getClimbForEdit(climbId, user) {
    this.assertAdmin(user);
    const row = await this.repo.findById(climbId);
    if (!row) throw error(404, "Climb no encontrado");
    return row;
  }
  async updateClimb(climbId, input, user) {
    this.assertAdmin(user);
    const row = await this.repo.findById(climbId);
    if (!row) throw error(404, "Climb no encontrado");
    const safeStatus = parseStatus(input.status, row.status);
    if (!input.name?.trim() || !input.category?.trim() || !input.climbType?.trim()) {
      throw error(400, "Datos inválidos");
    }
    if (!input.requiredEquipment?.trim() || !input.gradeSystem?.trim() || !input.value?.trim()) {
      throw error(400, "Datos inválidos");
    }
    if (!isValidCategory(input.category)) throw error(400, "Categoría inválida.");
    if (!isValidType(input.category, input.climbType)) {
      throw error(400, "El tipo no corresponde a la categoría seleccionada.");
    }
    const payload = {
      name: input.name.trim(),
      category: input.category.trim(),
      climbType: input.climbType.trim(),
      gradeSystem: input.gradeSystem.trim(),
      value: input.value.trim(),
      requiredEquipment: input.requiredEquipment.trim(),
      status: safeStatus,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id
    };
    await this.repo.updateDetails(climbId, payload);
  }
  async changeStatus(climbId, status, user) {
    this.assertAdmin(user);
    const payload = {
      status,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: status === "deleted" ? /* @__PURE__ */ new Date() : null
    };
    await this.repo.updateStatus(climbId, payload);
  }
  async softDelete(climbId, user) {
    return this.changeStatus(climbId, "deleted", user);
  }
  async restore(climbId, user) {
    this.assertAdmin(user);
    const payload = {
      status: "active",
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: null
    };
    await this.repo.updateStatus(climbId, payload);
  }
}
class DrizzleSectorRepository {
  constructor(db2) {
    this.db = db2;
  }
  mapRow(row) {
    return { ...row, status: parseStatus(row.status) };
  }
  async findById(id) {
    const [row] = await this.db.select().from(sector).where(eq(sector.id, id));
    return row ? this.mapRow(row) : null;
  }
  async listByAreaId(params) {
    const { areaId, page, pageSize } = params;
    const offset = (Math.max(1, page) - 1) * pageSize;
    const rows = await this.db.select().from(sector).where(and(eq(sector.areaId, areaId))).limit(pageSize).offset(offset);
    return rows.map((r) => this.mapRow(r));
  }
  async insert(newSector) {
    const [created] = await this.db.insert(sector).values(newSector).returning();
    return this.mapRow(created);
  }
  async updateDetails(id, payload) {
    await this.db.update(sector).set({
      name: payload.name,
      orientation: payload.orientation,
      description: payload.description,
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy
    }).where(eq(sector.id, id));
  }
  async updateStatus(id, payload) {
    await this.db.update(sector).set({
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy,
      deletedAt: payload.deletedAt
    }).where(eq(sector.id, id));
  }
}
class SectorBuilder {
  input;
  user;
  withUser(user) {
    this.user = user;
    return this;
  }
  fromInput(input) {
    this.input = input;
    return this;
  }
  validate() {
    const { name, orientation, description } = this.input;
    if (!name?.trim()) throw new Error("Nombre requerido");
    if (!orientation?.trim()) throw new Error("Orientación requerida");
    if (!description?.trim()) throw new Error("Descripción requerida");
    return this;
  }
  build() {
    const now = /* @__PURE__ */ new Date();
    const status = "active";
    return {
      areaId: this.input.areaId,
      name: this.input.name.trim(),
      orientation: this.input.orientation.trim(),
      description: this.input.description.trim(),
      status,
      createdAt: now,
      updatedAt: now,
      createdBy: this.user.id,
      updatedBy: this.user.id,
      deletedAt: null
    };
  }
}
class SectorService {
  constructor(repo) {
    this.repo = repo;
  }
  assertAdmin(user) {
    if (user.role !== "admin") throw error(403, "Forbidden");
  }
  async getSectorHeader(sectorId) {
    const row = await this.repo.findById(sectorId);
    if (!row) throw error(404, "Sector no encontrado");
    return [row];
  }
  async listSectors(params) {
    return this.repo.listByAreaId(params);
  }
  async createSector(input, user) {
    this.assertAdmin(user);
    const newRow = new SectorBuilder().withUser(user).fromInput(input).validate().build();
    return this.repo.insert(newRow);
  }
  async getSectorForEdit(sectorId, user) {
    this.assertAdmin(user);
    const row = await this.repo.findById(sectorId);
    if (!row) throw error(404, "Sector no encontrado");
    return row;
  }
  async updateSector(sectorId, input, user) {
    this.assertAdmin(user);
    const row = await this.repo.findById(sectorId);
    if (!row) throw error(404, "Sector no encontrado");
    const safeStatus = parseStatus(input.status, row.status);
    if (!input.name?.trim() || !input.orientation?.trim() || !input.description?.trim()) {
      throw error(400, "Datos inválidos");
    }
    const payload = {
      name: input.name.trim(),
      orientation: input.orientation.trim(),
      description: input.description.trim(),
      status: safeStatus,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id
    };
    await this.repo.updateDetails(sectorId, payload);
  }
  async changeStatus(sectorId, status, user) {
    this.assertAdmin(user);
    const payload = {
      status,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: status === "deleted" ? /* @__PURE__ */ new Date() : null
    };
    await this.repo.updateStatus(sectorId, payload);
  }
  async softDelete(sectorId, user) {
    return this.changeStatus(sectorId, "deleted", user);
  }
  async restore(sectorId, user) {
    this.assertAdmin(user);
    const payload = {
      status: "active",
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: null
    };
    await this.repo.updateStatus(sectorId, payload);
  }
}
class DrizzleAreaRepository {
  constructor(db2) {
    this.db = db2;
  }
  mapRow(row) {
    return { ...row, status: parseStatus(row.status) };
  }
  async findById(id) {
    const [row] = await this.db.select().from(area).where(eq(area.id, id));
    return row ? this.mapRow(row) : null;
  }
  async list(params) {
    const { page, pageSize } = params;
    const offset = (Math.max(1, page) - 1) * pageSize;
    const rows = await this.db.select().from(area).limit(pageSize).offset(offset);
    return rows.map((r) => this.mapRow(r));
  }
  async insert(newArea) {
    const [created] = await this.db.insert(area).values(newArea).returning();
    return this.mapRow(created);
  }
  async updateDetails(id, payload) {
    await this.db.update(area).set({
      name: payload.name,
      province: payload.province,
      city: payload.city,
      description: payload.description,
      latitude: payload.latitude,
      longitude: payload.longitude,
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy
    }).where(eq(area.id, id));
  }
  async updateStatus(id, payload) {
    await this.db.update(area).set({
      status: payload.status,
      updatedAt: payload.updatedAt,
      updatedBy: payload.updatedBy,
      deletedAt: payload.deletedAt
    }).where(eq(area.id, id));
  }
}
class AreaBuilder {
  input;
  user;
  withUser(user) {
    this.user = user;
    return this;
  }
  fromInput(input) {
    this.input = input;
    return this;
  }
  validate() {
    const { name, province, city, description, latitude, longitude } = this.input;
    if (!name?.trim()) throw new Error("Nombre requerido");
    if (!province?.trim()) throw new Error("Provincia requerida");
    if (!city?.trim()) throw new Error("Ciudad requerida");
    if (!description?.trim()) throw new Error("Descripción requerida");
    if (!Number.isFinite(latitude)) throw new Error("Latitud inválida");
    if (!Number.isFinite(longitude)) throw new Error("Longitud inválida");
    return this;
  }
  build() {
    const now = /* @__PURE__ */ new Date();
    const status = "active";
    return {
      name: this.input.name.trim(),
      province: this.input.province.trim(),
      city: this.input.city.trim(),
      description: this.input.description.trim(),
      latitude: this.input.latitude,
      longitude: this.input.longitude,
      status,
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      createdBy: this.user.id,
      updatedBy: this.user.id
    };
  }
}
class AreaService {
  constructor(repo) {
    this.repo = repo;
  }
  assertAdmin(user) {
    if (user.role !== "admin") throw error(403, "Forbidden");
  }
  async getAreaHeader(areaId) {
    const row = await this.repo.findById(areaId);
    if (!row) throw error(404, "Área no encontrada");
    return [row];
  }
  async listAreas(params) {
    return this.repo.list(params);
  }
  async createArea(input, user) {
    this.assertAdmin(user);
    const newRow = new AreaBuilder().withUser(user).fromInput(input).validate().build();
    return this.repo.insert(newRow);
  }
  async getAreaForEdit(areaId, user) {
    this.assertAdmin(user);
    const row = await this.repo.findById(areaId);
    if (!row) throw error(404, "Área no encontrada");
    return row;
  }
  async updateArea(areaId, input, user) {
    this.assertAdmin(user);
    const row = await this.repo.findById(areaId);
    if (!row) throw error(404, "Área no encontrada");
    const safeStatus = parseStatus(input.status, row.status);
    if (!input.name?.trim() || !input.province?.trim() || !input.city?.trim() || !input.description?.trim()) {
      throw error(400, "Datos inválidos");
    }
    if (!Number.isFinite(input.latitude) || !Number.isFinite(input.longitude)) {
      throw error(400, "Latitud/Longitud inválidas");
    }
    const payload = {
      name: input.name.trim(),
      province: input.province.trim(),
      city: input.city.trim(),
      description: input.description.trim(),
      latitude: input.latitude,
      longitude: input.longitude,
      status: safeStatus,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id
    };
    await this.repo.updateDetails(areaId, payload);
  }
  async changeStatus(areaId, status, user) {
    this.assertAdmin(user);
    const payload = {
      status,
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: status === "deleted" ? /* @__PURE__ */ new Date() : null
    };
    await this.repo.updateStatus(areaId, payload);
  }
  async softDelete(areaId, user) {
    return this.changeStatus(areaId, "deleted", user);
  }
  async restore(areaId, user) {
    this.assertAdmin(user);
    const payload = {
      status: "active",
      updatedAt: /* @__PURE__ */ new Date(),
      updatedBy: user.id,
      deletedAt: null
    };
    await this.repo.updateStatus(areaId, payload);
  }
}
class DrizzleUserRepository {
  constructor(db2) {
    this.db = db2;
  }
  mapRow(row) {
    return {
      ...row,
      role: parseRole(row.role),
      status: parseStatus(row.status)
    };
  }
  async list(params) {
    const { page, pageSize, role = "all", status = "active" } = params;
    const offset = (Math.max(1, page) - 1) * pageSize;
    const whereParts = [];
    if (role !== "all") whereParts.push(eq(users.role, role));
    if (status !== "all") {
      if (status === "deleted") {
        whereParts.push(eq(users.status, "deleted"));
        whereParts.push(isNotNull(users.deletedAt));
      } else {
        whereParts.push(eq(users.status, status));
        whereParts.push(isNull(users.deletedAt));
      }
    }
    const where = whereParts.length ? and(...whereParts) : void 0;
    const rows = await this.db.select().from(users).where(where).limit(pageSize).offset(offset);
    return rows.map((r) => this.mapRow(r));
  }
  async findById(id) {
    const [row] = await this.db.select().from(users).where(eq(users.id, id));
    return row ? this.mapRow(row) : null;
  }
  async findByEmail(email) {
    const [row] = await this.db.select().from(users).where(eq(users.email, email));
    return row ? this.mapRow(row) : null;
  }
  async countActiveAdmins() {
    const rows = await this.db.select({ id: users.id }).from(users).where(and(eq(users.role, "admin"), eq(users.status, "active"), isNull(users.deletedAt)));
    return rows.length;
  }
  async insert(row) {
    const [created] = await this.db.insert(users).values(row).returning();
    return this.mapRow(created);
  }
  async updateRole(id, payload) {
    await this.db.update(users).set({
      role: payload.role,
      updatedAt: payload.updatedAt
    }).where(eq(users.id, id));
  }
  async updateStatus(id, payload) {
    await this.db.update(users).set({
      status: payload.status,
      updatedAt: payload.updatedAt,
      deletedAt: payload.deletedAt
    }).where(eq(users.id, id));
  }
}
class AdminUserBuilder {
  input;
  fromInput(input) {
    this.input = input;
    return this;
  }
  validate() {
    const email = this.input.email.toLowerCase().trim();
    if (!email) throw new Error("Email requerido");
    if (!this.input.password || this.input.password.length < 8) {
      throw new Error("Contraseña inválida (mínimo 8 caracteres)");
    }
    if (!this.input.username?.trim()) throw new Error("Username requerido");
    if (!this.input.age?.trim()) throw new Error("Age requerido");
    return this;
  }
  async build() {
    const now = /* @__PURE__ */ new Date();
    const email = this.input.email.toLowerCase().trim();
    const passwordHash = await hash(this.input.password);
    return {
      email,
      username: this.input.username.trim(),
      age: this.input.age.trim(),
      passwordHash,
      role: this.input.role,
      status: "active",
      createdAt: now,
      updatedAt: now
    };
  }
}
class UserService {
  constructor(repo, sessions) {
    this.repo = repo;
    this.sessions = sessions;
  }
  assertAdmin(user) {
    if (user.role !== "admin") throw error(403, "Forbidden");
  }
  ensureNotSelf(currentUserId, targetId) {
    if (currentUserId === targetId) throw error(400, "No puedes modificarte a ti mismo");
  }
  async assertNotLastAdminIfDemoting(targetUserId) {
    const target = await this.repo.findById(targetUserId);
    if (!target) throw error(404, "Usuario no encontrado");
    if (target.role !== "admin") return;
    const admins = await this.repo.countActiveAdmins();
    if (admins <= 1) throw error(400, "No puedes quitar el último admin del sistema");
  }
  async listUsers(input, admin) {
    this.assertAdmin(admin);
    const role = !input.role || input.role === "all" ? "all" : parseRole(input.role);
    const status = !input.status || input.status === "all" ? "all" : parseStatus(input.status);
    return this.repo.list({
      page: input.page,
      pageSize: input.pageSize,
      role,
      status
    });
  }
  async createUser(input, admin) {
    this.assertAdmin(admin);
    const role = parseRole(input.role);
    const exists = await this.repo.findByEmail(input.email.toLowerCase().trim());
    if (exists) throw error(400, "Ya existe un usuario con ese email");
    const row = await new AdminUserBuilder().fromInput({
      email: input.email,
      password: input.password,
      username: input.username,
      age: input.age,
      role
    }).validate().build();
    await this.repo.insert(row);
  }
  async setRole(targetId, newRoleRaw, admin) {
    this.assertAdmin(admin);
    this.ensureNotSelf(admin.id, targetId);
    const newRole = parseRole(newRoleRaw);
    if (newRole !== "admin") {
      await this.assertNotLastAdminIfDemoting(targetId);
    }
    await this.repo.updateRole(targetId, { role: newRole, updatedAt: /* @__PURE__ */ new Date() });
  }
  async suspend(targetId, admin) {
    this.assertAdmin(admin);
    this.ensureNotSelf(admin.id, targetId);
    await this.assertNotLastAdminIfDemoting(targetId);
    await this.repo.updateStatus(targetId, { status: "suspended", updatedAt: /* @__PURE__ */ new Date(), deletedAt: null });
    await this.sessions.invalidateUserSessions(targetId);
  }
  async resume(targetId, admin) {
    this.assertAdmin(admin);
    await this.repo.updateStatus(targetId, { status: "active", updatedAt: /* @__PURE__ */ new Date(), deletedAt: null });
  }
  async softDelete(targetId, admin) {
    this.assertAdmin(admin);
    this.ensureNotSelf(admin.id, targetId);
    await this.assertNotLastAdminIfDemoting(targetId);
    await this.repo.updateStatus(targetId, {
      status: "deleted",
      updatedAt: /* @__PURE__ */ new Date(),
      deletedAt: /* @__PURE__ */ new Date()
    });
    await this.sessions.invalidateUserSessions(targetId);
  }
}
class LuciaSessionManager {
  constructor(lucia2) {
    this.lucia = lucia2;
  }
  async invalidateUserSessions(userId) {
    await this.lucia.invalidateUserSessions(userId);
  }
}
function disciplineConfig(d) {
  switch (d) {
    case "sport":
      return {
        gradeSystems: ["Francesa", "YDS"],
        climbTypes: ["Escala Deportiva", "Vía de Varios Largos", "Escalada en Gran Pared"]
      };
    case "noRope":
      return {
        gradeSystems: ["VScale", "Fontainebleau"],
        climbTypes: ["Boulder", "Psicobloc", "Highball"]
      };
    case "trad":
      return {
        gradeSystems: ["British"],
        climbTypes: ["Escala Tradicional", "Vía de Varios Largos", "Escalada en Gran Pared"]
      };
  }
}
class DrizzleRecommendationsRepository {
  constructor(db2) {
    this.db = db2;
  }
  async getUserById(userId) {
    const [row] = await this.db.select().from(users).where(eq(users.id, userId));
    return row ?? null;
  }
  async getCompletedClimbIds(userId) {
    const rows = await this.db.select({ climbId: grade.climbId }).from(grade).where(and(eq(grade.userId, userId), eq(grade.accomplished, true)));
    return rows.map((r) => r.climbId);
  }
  async listUserClimbs(params) {
    const { userId, discipline } = params;
    const cfg = disciplineConfig(discipline);
    const rows = await this.db.select({
      areaId: area.id,
      areaName: area.name,
      sectorName: sector.name,
      climbName: climb.name,
      realValue: climb.value,
      proposedValue: grade.value,
      difficulty: grade.difficultyLevel,
      done: grade.accomplished,
      createdAt: grade.createdAt
    }).from(grade).leftJoin(climb, eq(climb.id, grade.climbId)).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).where(and(eq(grade.userId, userId), inArray(grade.gradeSystem, [...cfg.gradeSystems]))).orderBy(desc(grade.createdAt));
    return rows;
  }
  async topCompleted(params) {
    const { userId, discipline, limit } = params;
    const cfg = disciplineConfig(discipline);
    if (discipline === "sport") {
      return this.db.select({
        scaledValue: climbingLevelSport.scaledValue,
        sectorId: sector.id,
        areaId: area.id
      }).from(grade).leftJoin(climb, eq(climb.id, grade.climbId)).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).leftJoin(
        climbingLevelSport,
        or(
          and(eq(climb.gradeSystem, "Francesa"), eq(climbingLevelSport.frenchValue, climb.value)),
          and(eq(climb.gradeSystem, "YDS"), eq(climbingLevelSport.ydsValue, climb.value))
        )
      ).where(and(eq(grade.userId, userId), eq(grade.accomplished, true), inArray(climb.gradeSystem, [...cfg.gradeSystems]))).orderBy(desc(climbingLevelSport.scaledValue)).limit(limit);
    }
    if (discipline === "noRope") {
      return this.db.select({
        scaledValue: climbingLevelNoRope.scaledValue,
        sectorId: sector.id,
        areaId: area.id
      }).from(grade).leftJoin(climb, eq(climb.id, grade.climbId)).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).leftJoin(
        climbingLevelNoRope,
        or(
          and(eq(climb.gradeSystem, "VScale"), eq(climbingLevelNoRope.vScale, climb.value)),
          and(eq(climb.gradeSystem, "Fontainebleau"), eq(climbingLevelNoRope.fontainebleau, climb.value))
        )
      ).where(and(eq(grade.userId, userId), eq(grade.accomplished, true), inArray(climb.gradeSystem, [...cfg.gradeSystems]))).orderBy(desc(climbingLevelNoRope.scaledValue)).limit(limit);
    }
    return this.db.select({
      scaledValue: climbingLevelTrad.scaledValue,
      sectorId: sector.id,
      areaId: area.id
    }).from(grade).leftJoin(climb, eq(climb.id, grade.climbId)).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).leftJoin(climbingLevelTrad, eq(climbingLevelTrad.british, climb.value)).where(and(eq(grade.userId, userId), eq(grade.accomplished, true), eq(climb.gradeSystem, "British"))).orderBy(desc(climbingLevelTrad.scaledValue)).limit(limit);
  }
  async findRecommendations(params) {
    const { discipline, scaledValue, scope, sectorId, areaId, excludeClimbIds, limit } = params;
    const cfg = disciplineConfig(discipline);
    const whereParts = [
      inArray(climb.gradeSystem, [...cfg.gradeSystems]),
      eq(climb.status, "active"),
      inArray(climb.climbType, [...cfg.climbTypes])
    ];
    if (excludeClimbIds.length > 0) whereParts.push(notInArray(climb.id, excludeClimbIds));
    if (scope === "sector" && sectorId) whereParts.push(eq(sector.id, sectorId));
    if (scope === "area" && areaId) whereParts.push(eq(area.id, areaId));
    if (discipline === "sport") {
      whereParts.push(eq(climbingLevelSport.scaledValue, scaledValue));
      return this.db.select({
        climbId: climb.id,
        areaName: area.name,
        sectorName: sector.name,
        climbName: climb.name,
        gradeSystem: climb.gradeSystem,
        gradeValue: climb.value,
        scaledValue: climbingLevelSport.scaledValue
      }).from(climb).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).leftJoin(
        climbingLevelSport,
        or(
          and(eq(climb.gradeSystem, "Francesa"), eq(climbingLevelSport.frenchValue, climb.value)),
          and(eq(climb.gradeSystem, "YDS"), eq(climbingLevelSport.ydsValue, climb.value))
        )
      ).where(and(...whereParts)).limit(limit);
    }
    if (discipline === "noRope") {
      whereParts.push(eq(climbingLevelNoRope.scaledValue, scaledValue));
      return this.db.select({
        climbId: climb.id,
        areaName: area.name,
        sectorName: sector.name,
        climbName: climb.name,
        gradeSystem: climb.gradeSystem,
        gradeValue: climb.value,
        scaledValue: climbingLevelNoRope.scaledValue
      }).from(climb).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).leftJoin(
        climbingLevelNoRope,
        or(
          and(eq(climb.gradeSystem, "VScale"), eq(climbingLevelNoRope.vScale, climb.value)),
          and(eq(climb.gradeSystem, "Fontainebleau"), eq(climbingLevelNoRope.fontainebleau, climb.value))
        )
      ).where(and(...whereParts)).limit(limit);
    }
    whereParts.push(eq(climbingLevelTrad.scaledValue, scaledValue));
    return this.db.select({
      climbId: climb.id,
      areaName: area.name,
      sectorName: sector.name,
      climbName: climb.name,
      gradeSystem: climb.gradeSystem,
      gradeValue: climb.value,
      scaledValue: climbingLevelTrad.scaledValue
    }).from(climb).leftJoin(sector, eq(sector.id, climb.sectorId)).leftJoin(area, eq(area.id, sector.areaId)).leftJoin(climbingLevelTrad, eq(climbingLevelTrad.british, climb.value)).where(and(...whereParts)).limit(limit);
  }
}
function avgAndBase(top) {
  if (!top.length) {
    return { roundedAvg: null, baseSectorId: null, baseAreaId: null };
  }
  const avg = top.reduce((sum, row) => sum + (row.scaledValue ?? 0), 0) / top.length;
  const roundedAvg = Math.round(avg);
  return {
    roundedAvg,
    baseSectorId: top[0].sectorId,
    baseAreaId: top[0].areaId
  };
}
class RecommendationsService {
  constructor(repo) {
    this.repo = repo;
  }
  async getProfile(userId, viewer) {
    if (viewer.role !== "admin" && viewer.id !== userId) throw error(403, "Forbidden");
    const user = await this.repo.getUserById(userId);
    if (!user) throw error(404, "Usuario no encontrado");
    const completedIds = await this.repo.getCompletedClimbIds(userId);
    const sport = await this.computeMiniCore(userId, "sport", completedIds);
    const noRope = await this.computeMiniCore(userId, "noRope", completedIds);
    const trad = await this.computeMiniCore(userId, "trad", completedIds);
    return {
      user,
      sport,
      noRope,
      trad
    };
  }
  async computeMiniCore(userId, discipline, completedIds) {
    const userClimbs = await this.repo.listUserClimbs({ userId, discipline });
    const top = await this.repo.topCompleted({ userId, discipline, limit: 3 });
    const { roundedAvg, baseSectorId, baseAreaId } = avgAndBase(top);
    if (roundedAvg == null) {
      return { top: [], recommendations: [], userClimbs };
    }
    const scopes = ["sector", "area", "global"];
    for (const scope of scopes) {
      const recs = await this.repo.findRecommendations({
        discipline,
        scaledValue: roundedAvg,
        scope,
        sectorId: baseSectorId,
        areaId: baseAreaId,
        excludeClimbIds: completedIds,
        limit: 1
      });
      if (recs.length) return { top: [], recommendations: recs, userClimbs };
    }
    return { top: [], recommendations: [], userClimbs };
  }
}
class ServiceFactory {
  static create(name) {
    switch (name) {
      case "grade": {
        return new GradeService(new DrizzleGradeRepository(db));
      }
      case "climb": {
        return new ClimbService(new DrizzleClimbRepository(db));
      }
      case "sector": {
        return new SectorService(new DrizzleSectorRepository(db));
      }
      case "area": {
        return new AreaService(new DrizzleAreaRepository(db));
      }
      case "user": {
        const repo = new DrizzleUserRepository(db);
        const sessions = new LuciaSessionManager(lucia);
        return new UserService(repo, sessions);
      }
      case "recommendations": {
        const repo = new DrizzleRecommendationsRepository(db);
        return new RecommendationsService(repo);
      }
    }
  }
}

export { ServiceFactory as S, provinces as a, climbGradeSystems as c, parseStatus as p };
//# sourceMappingURL=serviceFactory-BdHGVNT9.js.map

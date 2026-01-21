import { db } from "../index";
import { area, sector, climb, users } from "../schema";
import { eq } from "drizzle-orm";
import { AREAS, SECTORS, CLIMBS } from "./data";
import argon2 from "argon2";

/**
 * Crea (o reutiliza) un usuario seed
 * Necesario porque climb.userId es NOT NULL
 */
async function getOrCreateSeedUser() {
  const email = "seed@escaladec.local";
  const passwordHash = await argon2.hash("seed123");

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) return existing.id;

  const [created] = await db
    .insert(users)
    .values({
      email,
      username: "seed",
      passwordHash, 
      age: "25",
      role: "admin",
      status: "active",
    })
    .returning({ id: users.id });

  return created.id;
}

export async function seed() {
  console.log("🌱 Iniciando seed de EscaladEC...");

  const seedUserId = await getOrCreateSeedUser();

  /**
   * =========================
   * 1️⃣ AREAS
   * =========================
   */
  const areaIdByKey = new Map<string, string>();

  for (const a of AREAS) {
    const [inserted] = await db
      .insert(area)
      .values({
        name: a.name,
        province: a.province,
        city: a.city,
        description: a.description,
        latitude: a.latitude,
        longitude: a.longitude,
        status: "active",
        createdBy: "seed",
        updatedBy: "seed",
      })
      .onConflictDoNothing()
      .returning({ id: area.id });

    const finalId =
      inserted?.id ??
      (
        await db.query.area.findFirst({
          where: eq(area.name, a.name),
        })
      )?.id;

    if (!finalId) {
      throw new Error(`❌ No se pudo resolver area: ${a.name}`);
    }

    areaIdByKey.set(a.key, finalId);
  }

  console.log(`✅ Areas insertadas: ${areaIdByKey.size}`);

  /**
   * =========================
   * 2️⃣ SECTORS
   * =========================
   */
  const sectorIdByKey = new Map<string, string>();

  for (const s of SECTORS) {
    const areaId = areaIdByKey.get(s.areaKey);
    if (!areaId) {
      throw new Error(`❌ AreaKey no encontrada: ${s.areaKey}`);
    }

    const [inserted] = await db
      .insert(sector)
      .values({
        areaId,
        name: s.name,
        orientation: s.orientation,
        description: s.description,
        status: "active",
        createdBy: "seed",
        updatedBy: "seed",
      })
      .onConflictDoNothing()
      .returning({ id: sector.id });

    const finalId =
      inserted?.id ??
      (
        await db.query.sector.findFirst({
          where: eq(sector.name, s.name),
        })
      )?.id;

    if (!finalId) {
      throw new Error(`❌ No se pudo resolver sector: ${s.name}`);
    }

    sectorIdByKey.set(s.key, finalId);
  }

  console.log(`✅ Sectores insertados: ${sectorIdByKey.size}`);

  /**
   * =========================
   * 3️⃣ CLIMBS
   * =========================
   */
  let climbCount = 0;

  for (const c of CLIMBS) {
    const sectorId = sectorIdByKey.get(c.sectorKey);
    if (!sectorId) {
      throw new Error(`❌ SectorKey no encontrada: ${c.sectorKey}`);
    }

    await db
      .insert(climb)
      .values({
        sectorId,
        userId: seedUserId,
        name: c.name,
        category: c.category,
        climbType: c.climbType,
        gradeSystem: c.gradeSystem,
        value: c.value,
        requiredEquipment: c.requiredEquipment,
        status: "active",
        createdBy: "seed",
        updatedBy: "seed",
      })
      .onConflictDoNothing();

    climbCount++;
  }

  console.log(`✅ Climbs insertados: ${climbCount}`);
  console.log("🎉 Seed COMPLETADO correctamente.");
}

/**
 * Permite correr el archivo directamente
 */
seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error ejecutando seed:", err);
    process.exit(1);
  });

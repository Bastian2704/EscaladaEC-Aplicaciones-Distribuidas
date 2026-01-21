import { db } from "../index";
import { users, grade } from "../schema";
import { eq } from "drizzle-orm";
import { gradeSystemsValues } from "$lib/contants/constants";
import argon2 from "argon2";


// ----------------------------
// Seed users (7)
// ----------------------------
type SeedUser = {
  email: string;
  username: string;
  age: string;
  climbingLevelSport: number;
  climbingLevelNoRope: number;
  climbingLevelTrad: number;
};

const SEEDED_USERS: SeedUser[] = [
  {
    email: "ana.seed@escaladec.local",
    username: "ana_seed",
    age: "24",
    climbingLevelSport: 16,
    climbingLevelNoRope: 10,
    climbingLevelTrad: 12,
  },
  {
    email: "carlos.seed@escaladec.local",
    username: "carlos_seed",
    age: "28",
    climbingLevelSport: 10,
    climbingLevelNoRope: 6,
    climbingLevelTrad: 8,
  },
  {
    email: "martin.seed@escaladec.local",
    username: "martin_seed",
    age: "32",
    climbingLevelSport: 20,
    climbingLevelNoRope: 12,
    climbingLevelTrad: 16,
  },
  {
    email: "sofia.seed@escaladec.local",
    username: "sofia_seed",
    age: "21",
    climbingLevelSport: 8,
    climbingLevelNoRope: 5,
    climbingLevelTrad: 6,
  },
  {
    email: "diego.seed@escaladec.local",
    username: "diego_seed",
    age: "27",
    climbingLevelSport: 14,
    climbingLevelNoRope: 9,
    climbingLevelTrad: 10,
  },
  {
    email: "vale.seed@escaladec.local",
    username: "vale_seed",
    age: "26",
    climbingLevelSport: 18,
    climbingLevelNoRope: 11,
    climbingLevelTrad: 14,
  },
  {
    email: "pablo.seed@escaladec.local",
    username: "pablo_seed",
    age: "35",
    climbingLevelSport: 12,
    climbingLevelNoRope: 7,
    climbingLevelTrad: 9,
  },
];

async function getOrCreateUsers(): Promise<string[]> {
  const ids: string[] = [];

  for (const u of SEEDED_USERS) {
    const existing = await db.query.users.findFirst({
      where: eq(users.email, u.email),
    });

    if (existing) {
      ids.push(existing.id);
      continue;
    }
    const passwordHash = await argon2.hash("seed123");

    const [created] = await db
      .insert(users)
      .values({
        email: u.email,
        username: u.username,
        passwordHash,
        age: u.age,
        role: "user",
        status: "active",
        climbingLevelSport: u.climbingLevelSport,
        climbingLevelNoRope: u.climbingLevelNoRope,
        climbingLevelTrad: u.climbingLevelTrad,
      })
      .returning({ id: users.id });

    ids.push(created.id);
  }

  return ids;
}

// ----------------------------
// Helpers: deterministic random
// ----------------------------
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260120);

function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function chance(p: number) {
  return rand() < p;
}
function pickNUnique<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length) {
    const i = randInt(0, copy.length - 1);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

// ----------------------------
// Grade derivation
// ----------------------------
type GradeSystem = keyof typeof gradeSystemsValues;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function getScale(system: string): string[] {
  const s = system as GradeSystem;
  const scale = gradeSystemsValues[s];
  if (!scale) throw new Error(`Sistema de grado no soportado en seed: ${system}`);
  return scale;
}

/**
 * Devuelve un "value" percibido cercano al del climb padre:
 * - 70%: ±1 paso
 * - 20%: ±2 pasos
 * - 10%: igual
 */
function perceivedValueNear(parentSystem: string, parentValue: string): string {
  const scale = getScale(parentSystem);
  const idx = scale.indexOf(parentValue);

  // si por alguna razón no está, cae al medio del rango
  const base = idx >= 0 ? idx : Math.floor(scale.length / 2);

  let delta = 0;
  if (chance(0.7)) delta = randInt(-1, 1);
  else if (chance(0.666)) delta = randInt(-2, 2);
  else delta = 0;

  const next = clamp(base + delta, 0, scale.length - 1);
  return scale[next];
}

/**
 * difficultyLevel: entero coherente con el value percibido.
 * Lo pongo como (index + 1) para que sea estable y comparable dentro del sistema.
 */
function difficultyLevelFromValue(system: string, value: string): number {
  const scale = getScale(system);
  const idx = scale.indexOf(value);
  return (idx >= 0 ? idx : Math.floor(scale.length / 2)) + 1;
}

/**
 * accomplished: más probable si el usuario "tiene nivel" vs dificultad.
 * Para simplificar, comparamos climbingLevelSport con difficultyLevel (normalizado).
 */
function accomplishedFromUserVsDifficulty(userSportLevel: number, diffLevel: number): boolean {
  // Normaliza el diffLevel (que puede ser 1..30) a escala 1..20 aprox
  const normalizedDiff = Math.ceil((diffLevel / 30) * 20);

  // Si el usuario está por encima, muy probable; si está por debajo, menos
  if (userSportLevel >= normalizedDiff + 2) return chance(0.85);
  if (userSportLevel >= normalizedDiff) return chance(0.65);
  if (userSportLevel >= normalizedDiff - 2) return chance(0.45);
  return chance(0.25);
}

function likesForGrade(accomplished: boolean): number {
  // likes razonables; si lo logró, un poco más
  return accomplished ? randInt(1, 30) : randInt(0, 18);
}

// ----------------------------
// Main seed
// ----------------------------
export async function seedUsersAndGrades() {
  console.log("🌱 Seeding users + grades (minicore-friendly)...");

  const seededUserIds = await getOrCreateUsers();

  // Trae info útil de usuarios para accomplished
  const seededUsersRows = await db.query.users.findMany({
    where: (u, { inArray }) => inArray(u.id, seededUserIds),
    columns: {
      id: true,
      climbingLevelSport: true,
    },
  });

  const sportLevelByUserId = new Map<string, number>();
  for (const u of seededUsersRows) {
    sportLevelByUserId.set(u.id, u.climbingLevelSport ?? 10);
  }

  // ✅ Limpia solo grades sembrados por seed (idempotente)
  await db.delete(grade).where(eq(grade.publishedBy, "seed"));

  // Trae todos los climbs
  const climbs = await db.query.climb.findMany({
    columns: {
      id: true,
      gradeSystem: true,
      value: true,
    },
  });

  if (!climbs.length) {
    console.log("⚠️ No hay climbs. Corre primero pnpm db:seed");
    return;
  }

  let insertedGrades = 0;

  for (const c of climbs) {
    // Queremos que "la mayoría" tenga grades
    // 85% de climbs con grades
    if (!chance(0.85)) continue;

    // Cuántos grades por climb (2 a 5)
    const nGrades = randInt(2, 5);

    // Elige usuarios únicos para este climb (max 1 por usuario)
    const reviewers = pickNUnique(seededUserIds, Math.min(nGrades, seededUserIds.length));

    for (const userId of reviewers) {
      const parentSystem = c.gradeSystem;
      const parentValue = c.value;

      // value percibido (cerca del padre)
      const perceivedValue = perceivedValueNear(parentSystem, parentValue);

      const diffLevel = difficultyLevelFromValue(parentSystem, perceivedValue);

      const userSport = sportLevelByUserId.get(userId) ?? 10;
      const accomplished = accomplishedFromUserVsDifficulty(userSport, diffLevel);

      await db.insert(grade).values({
        climbId: c.id,
        userId,
        gradeSystem: parentSystem,
        value: perceivedValue,
        difficultyLevel: diffLevel,
        accomplished,
        likes: likesForGrade(accomplished),
        status: "active",
        publishedBy: "seed",
        updatedBy: "seed",
      });

      insertedGrades++;
    }
  }

  console.log(`✅ Grades insertados: ${insertedGrades}`);
  console.log("🎉 Seed users + grades completado.");
}

// Permite correr como script
seedUsersAndGrades()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error seeding users + grades:", err);
    process.exit(1);
  });

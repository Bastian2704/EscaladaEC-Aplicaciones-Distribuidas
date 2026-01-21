import { pgTable, text, timestamp, uuid, boolean, real, integer } from 'drizzle-orm/pg-core';

// Usuarios
export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	email: text('email').notNull().unique(),
	username: text('username').notNull().unique(),
	climbingLevelSport: integer('climbing_level_sport'),
	climbingLevelNoRope: integer('climbing_level_no_rope'),
	climbingLevelTrad: integer('climbing_level_trad'), //TODO: Add to ER diagram
	age: text('age').notNull(),
	role: text('role').notNull().default('user'),
	status: text('status').notNull().default('active'),
	passwordHash: text('password_hash').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'),
	deletedAt: timestamp('deleted_at')
});

// Sesiones (formato que exige Lucia)
export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull()
});

/** Rutas de escalada (CRUD base) */
export const climbRoute = pgTable('climb_route', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	grade: text('grade').notNull(),
	description: text('description'),
	createdBy: text('createdBy').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

/** =======================
 *  AREA
 *  ======================= */
export const area = pgTable('area', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	province: text('province').notNull(),
	city: text('city').notNull(),
	description: text('description').notNull(),
	latitude: real('latitude').notNull(),
	longitude: real('longitude').notNull(),
	status: text('status').notNull().default('active'),
	createdBy: text('created_by').notNull().default('user'), //user default,
	updatedBy: text('updated_by').notNull().default('user'), //user default,
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'), //remove defaultNow (stops taking time of birth)
	deletedAt: timestamp('deleted_at') //remove defaultNow (stops taking time of birth)
});

/** =======================
 *  SECTOR (1 Area → n Sectors)
 *  ======================= */
export const sector = pgTable('sector', {
	id: uuid('id').primaryKey().defaultRandom(),
	areaId: uuid('area_id')
		.notNull()
		.references(() => area.id),
	name: text('name').notNull(),
	orientation: text('orientation').notNull(),
	description: text('description').notNull(),
	status: text('status').notNull().default('active'),
	createdBy: text('created_by').notNull().default('user'), //user default,
	updatedBy: text('updated_by').notNull().default('user'), //user default,
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at'), //remove defaultNow (stops taking time of birth)
	deletedAt: timestamp('deleted_at') //remove defaultNow (stops taking time of birth)
});

/** =======================
 *  CLIMBs (1 Sector → n Climbs)
 *  ======================= */
export const climb = pgTable('climb', {
	id: uuid('id').primaryKey().defaultRandom(),
	sectorId: uuid('sector_id')
		.notNull()
		.references(() => sector.id),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id),
	name: text('name').notNull(),
	category: text('category').notNull(),
	climbType: text('climb_type').notNull().default('sport'),
	gradeSystem: text('grade_system').notNull(),
	value: text('value').notNull(),
	requiredEquipment: text('required_equipment').notNull(),
	status: text('status').notNull().default('active'),
	createdBy: text('created_by').notNull().default('user'), //user default
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedBy: text('updated_by').notNull().default('user'), //user default,
	updatedAt: timestamp('updated_at'), //Add Validations
	deletedAt: timestamp('deleted_at') //Add Validations
});

/** =======================
 *  GRADE (1 Climb → n Grades)
 *  ======================= */
export const grade = pgTable('grade', {
	id: uuid('id').primaryKey().defaultRandom(),
	climbId: uuid('climb_id')
		.notNull()
		.references(() => climb.id, { onDelete: 'cascade' }),
	userId: uuid('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	gradeSystem: text('grade_system').notNull(),
	value: text('value').notNull(),
	accomplished: boolean('accomplished').notNull().default(false), //Add False Default
	difficultyLevel: integer('difficulty_level').notNull(),
	likes: integer('likes').notNull().default(0),
	status: text('status').notNull().default('active'), //TODO Needs adding in E-R diagram
	publishedBy: text('published_by').notNull().default('user'), //TODO Needs adding in E-R diagram
	createdAt: timestamp('created_at').notNull().defaultNow(), //TODO  Needs adding in E-R diagram
	updatedBy: text('updated_by').notNull().default('user'), //Add user default,
	updatedAt: timestamp('updated_at'), //Add Validations
	deletedAt: timestamp('deleted_at') //Add Validations
});

//TODO ADD to ER Diagram

export const climbingLevelSport = pgTable('climbing_level_sport',{
	id: uuid('id').primaryKey().defaultRandom(),
	scaledValue: integer('scaled_value').notNull().default(0),
	frenchValue: text('french_value').notNull().default(''),
	ydsValue: text('yds_value').notNull().default('')
});
export const climbingLevelNoRope = pgTable('climbing_level_no_rope',{
	id: uuid('id').primaryKey().defaultRandom(),
	scaledValue: integer('scaled_value').notNull().default(0),
	vScale: text('vscale').notNull().default(''),
	fontainebleau: text('fontainebleau').notNull().default('')
});
export const climbingLevelTrad = pgTable('climbing_level_trad',{
	id: uuid('id').primaryKey().defaultRandom(),
	scaledValue: integer('scaled_value').notNull().default(0),
	british: text('british').notNull().default('')
})

/** =======================
 *  REVISION (1 Climb → 1 Revision)
 *  ======================= */
export const revision = pgTable('revision', {
	id: uuid('id').primaryKey().defaultRandom(),
	climbId: uuid('climb_id')
		.notNull()
		.references(() => climb.id),
	approved: boolean('approved').notNull(),
	reviewedBy: text('reviewed_by').notNull(),
	createdAt: timestamp('created_at').notNull(),
	revisionStatus: text('revision_status').notNull().default('pending'),
	rejectionReason: text('rejection_reason')
});

/** =======================
 *  IMAGE (1 Climb → 1 Image)
 *  ======================= */
export const image = pgTable('image', {
	id: uuid('id').primaryKey().defaultRandom(),
	climbId: uuid('climb_id')
		.notNull()
		.references(() => climb.id),
	url: text('url').notNull() // Puedes guardar links aquí o paths de almacenamiento
});

/** =======================
 *  EXTENDED IMAGE INFO (1 Image → n Info)
 *  ======================= */
export const extendedImageInfo = pgTable('extended_image_info', {
	id: uuid('id').primaryKey().defaultRandom(),
	imageId: uuid('image_id')
		.notNull()
		.references(() => image.id),
	description: text('description').notNull(),
	createdBy: text('created_by').notNull()
});

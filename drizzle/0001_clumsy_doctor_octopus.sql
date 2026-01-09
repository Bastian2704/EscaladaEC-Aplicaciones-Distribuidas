ALTER TABLE "grade" DROP CONSTRAINT "grade_climb_id_climb_id_fk";
--> statement-breakpoint
ALTER TABLE "grade" DROP CONSTRAINT "grade_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "area" ALTER COLUMN "created_by" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "area" ALTER COLUMN "updated_by" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "area" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "area" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "area" ALTER COLUMN "deleted_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "area" ALTER COLUMN "deleted_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "climb" ALTER COLUMN "created_by" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "grade" ALTER COLUMN "accomplished" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "grade" ALTER COLUMN "likes" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "sector" ALTER COLUMN "created_by" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "sector" ALTER COLUMN "updated_by" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "sector" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sector" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "sector" ALTER COLUMN "deleted_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "sector" ALTER COLUMN "deleted_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "climb" ADD COLUMN "updated_by" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "climb" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "climb" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "status" text DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "publishedBy" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "updated_by" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "grade" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_climb_id_climb_id_fk" FOREIGN KEY ("climb_id") REFERENCES "public"."climb"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" DROP COLUMN "published_at";
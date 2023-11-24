CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
INSERT INTO category (name) VALUES ('Food Delivery'), ('Laundry'), ('Scooter Rental');--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "category" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "task" DROP CONSTRAINT "task_category_category_id_fk";--> statement-breakpoint
INSERT INTO category (id, name) VALUES (0, 'Other');--> statement-breakpoint
UPDATE "task" SET category = 0 WHERE category IS NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "task" ADD COLUMN "acceptedByUserId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_acceptedByUserId_user_id_fk" FOREIGN KEY ("acceptedByUserId") REFERENCES "user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

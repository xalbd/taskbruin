DELETE TABLE "task";
ALTER TABLE
    "task"
ALTER COLUMN
    "price" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE
    "task"
ALTER COLUMN
    "description" DROP DEFAULT;
--> statement-breakpoint
ALTER TABLE
    "task"
ADD
    COLUMN "userId" text NOT NULL;
--> statement-breakpoint
DO $ $ BEGIN
ALTER TABLE
    "task"
ADD
    CONSTRAINT "task_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE no ACTION;
EXCEPTION
WHEN duplicate_object THEN NULL;
END $ $;
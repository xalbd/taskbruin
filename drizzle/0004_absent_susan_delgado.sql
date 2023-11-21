ALTER TABLE "task" ADD COLUMN "creationTime" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "startDate" timestamp;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "endDate" timestamp;
ALTER TABLE "task" ADD COLUMN "image" text;--> statement-breakpoint
UPDATE "task" SET "image"='https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/can-task-be-a-verb-5813-7f1eb0445f882a35228fdfdaea993c72@1x.jpg';--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "image" SET NOT NULL;
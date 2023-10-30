CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" integer DEFAULT 1 NOT NULL,
	"description" text DEFAULT 'No description given.' NOT NULL
);

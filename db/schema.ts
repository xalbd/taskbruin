import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";

export const task = pgTable("task", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  price: integer("price").default(1).notNull(),
  description: text("description").default("No description given.").notNull(),
});

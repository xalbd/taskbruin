import {
  pgTable,
  text,
  integer,
  serial,
  timestamp,
  primaryKey,
  date,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const task = pgTable("task", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  creationTime: timestamp("creationTime").defaultNow(),
  startDate: timestamp("startDate", { mode: "string" }),
  endDate: timestamp("endDate", { mode: "string" }),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  acceptedByUserId: text("acceptedByUserId").references(() => users.id, {
    onDelete: "set null",
  }),
  category: integer("category")
    .notNull()
    .references(() => category.id, {
      onDelete: "cascade",
    }),
  image: text("image").notNull(),
  completed: boolean("completed").default(false).notNull(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

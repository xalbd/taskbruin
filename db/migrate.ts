import { migrate } from "drizzle-orm/neon-http/migrator";
import db from "@/utils/getDrizzle";

migrate(db, { migrationsFolder: "drizzle" });

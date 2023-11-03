import { task } from "%/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  const result = await db.select().from(task);

  return Response.json(result);
}

export async function POST(request: Request) {}

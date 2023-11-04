import { task } from "%/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function GET(request: Request) {
  const result = await db.select().from(task);

  return Response.json(result);
}

export async function POST(request: Request) {
  const req = await request.json();

  type Task = typeof task.$inferInsert;
  const newTask: Task = req;
  const result = await db
    .insert(task)
    .values(newTask)
    .returning({ id: task.id });

  return Response.json(result);
}

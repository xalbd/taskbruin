import { task } from "%/schema";
import { neon } from "@neondatabase/serverless";
<<<<<<< HEAD
import { drizzle} from "drizzle-orm/neon-http";
import {eq} from "drizzle-orm";
=======
import { drizzle } from "drizzle-orm/neon-http";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
>>>>>>> origin/auth

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

//task is database

export async function GET() {
  try {
    const result = await db.select().from(task);
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({}, { status: 401 });
  }

  try {
    const req = await request.json();
    const result = await db
      .insert(task)
      .values({ userId: session.user.id, ...req })
      .returning({ id: task.id });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const req = await request.json();
    const result = await db.delete(task).where(eq(task.id,req.id));
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

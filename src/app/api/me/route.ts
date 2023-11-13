import { task } from "%/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return Response.json({}, { status: 401 });
  }

  try {
    const result = await db
      .select({
        id: task.id,
        title: task.title,
        description: task.description,
        price: task.price,
      })
      .from(task)
      .where(eq(task.userId, session.user.id!));

    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

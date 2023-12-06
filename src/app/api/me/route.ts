import { task } from "%/schema";
import { eq, and } from "drizzle-orm";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import db from "@/utils/getDrizzle";

export async function GET() {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const created = await db
      .select()
      .from(task)
      .where(and(eq(task.userId, userId), eq(task.completed, false)));

    const created_completed = await db
      .select()
      .from(task)
      .where(and(eq(task.userId, userId), eq(task.completed, true)));

    const accepted = await db
      .select()
      .from(task)
      .where(and(eq(task.acceptedByUserId, userId), eq(task.completed, false)));

    const created_accepted = await db
      .select()
      .from(task)
      .where(and(eq(task.acceptedByUserId, userId), eq(task.completed, true)));

    return Response.json(
      { created, created_completed, accepted, created_accepted },
      { status: 200 },
    );
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

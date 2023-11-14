import { task } from "%/schema";
import { eq, and } from "drizzle-orm";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import db from "@/utils/getDrizzle";

export async function GET() {
  try {
    const result = await db.select().from(task);
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const req = await request.json();
    const result = await db
      .insert(task)
      .values({ userId: userId, ...req })
      .returning({ id: task.id });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const req = await request.json();
    const result = await db
      .delete(task)
      .where(and(eq(task.userId, userId), eq(task.id, req.id)))
      .returning({ deletedId: task.id });

    return Response.json(result, {
      status: Object.keys(result).length !== 0 ? 200 : 400,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

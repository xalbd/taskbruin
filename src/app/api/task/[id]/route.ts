import { task } from "%/schema";
import db from "@/utils/getDrizzle";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } },
) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const result = await db
      .delete(task)
      .where(and(eq(task.userId, userId), eq(task.id, params.id)))
      .returning({ id: task.id });

    return Response.json(result, {
      status: Object.keys(result).length !== 0 ? 200 : 400,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

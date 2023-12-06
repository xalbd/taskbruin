import { task } from "%/schema";
import db from "@/utils/getDrizzle";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import { and, eq, isNotNull } from "drizzle-orm";

export async function POST(
  request: Request,
  { params }: { params: { id: number } },
) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const result = await db
      .update(task)
      .set({ completed: true })
      .where(
        and(
          eq(task.userId, userId),
          eq(task.id, params.id),
          isNotNull(task.acceptedByUserId),
        ),
      )
      .returning({ id: task.id });

    return Response.json(result, {
      status: Object.keys(result).length !== 0 ? 200 : 400,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

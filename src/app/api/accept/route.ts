import { task } from "%/schema";
import { eq, and, isNull, ne } from "drizzle-orm";
import db from "@/utils/getDrizzle";
import getServerSessionUserId from "@/utils/getServerSessionUserId";

export async function PATCH(request: Request) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const req = await request.json();
    const result = await db
      .update(task)
      .set({ acceptedByUserId: userId })
      .where(
        and(
          eq(task.id, req.id),
          isNull(task.acceptedByUserId),
          ne(task.userId, userId),
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

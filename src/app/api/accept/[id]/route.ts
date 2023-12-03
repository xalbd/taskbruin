import { task } from "%/schema";
import { eq, and, isNull, ne } from "drizzle-orm";
import db from "@/utils/getDrizzle";
import getServerSessionUserId from "@/utils/getServerSessionUserId";

export async function POST(
  request: Request,
  { params }: { params: { id: number } },
) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const availableToAccept = await db
      .select({ id: task.id })
      .from(task)
      .where(
        and(
          eq(task.id, params.id),
          isNull(task.acceptedByUserId),
          ne(task.userId, userId),
        ),
      );

    if (!availableToAccept) {
      return Response.json({ status: 406 });
    }

    const result = await db
      .update(task)
      .set({ acceptedByUserId: userId })
      .where(
        and(
          eq(task.id, params.id),
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
      .update(task)
      .set({ acceptedByUserId: null })
      .where(and(eq(task.id, params.id), eq(task.acceptedByUserId, userId)))
      .returning({ id: task.id });

    return Response.json(result, {
      status: Object.keys(result).length !== 0 ? 200 : 400,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

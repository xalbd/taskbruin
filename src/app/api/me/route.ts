import { task } from "%/schema";
import { eq } from "drizzle-orm";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import db from "@/utils/getDrizzle";

export async function GET() {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const created = await db
      .select({
        id: task.id,
        title: task.title,
        description: task.description,
        price: task.price,
        acceptedByUserId: task.acceptedByUserId,
      })
      .from(task)
      .where(eq(task.userId, userId));

    const accepted = await db
      .select({
        id: task.id,
        title: task.title,
        description: task.description,
        price: task.price,
        createdByUserId: task.userId,
      })
      .from(task)
      .where(eq(task.acceptedByUserId, userId));

    return Response.json({ created, accepted }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

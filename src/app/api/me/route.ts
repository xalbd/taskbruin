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
    const created = await db.select().from(task).where(eq(task.userId, userId));

    const accepted = await db
      .select()
      .from(task)
      .where(eq(task.acceptedByUserId, userId));

    return Response.json({ created, accepted }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

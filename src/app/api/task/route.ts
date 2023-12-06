import { task } from "%/schema";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import db from "@/utils/getDrizzle";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select()
      .from(task)
      .where(eq(task.completed, false));
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

import { users } from "%/schema";
import { eq } from "drizzle-orm";
import getServerSessionUserId from "@/utils/getServerSessionUserId";
import db from "@/utils/getDrizzle";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  try {
    const result = await db
      .select({ name: users.name, email: users.email, image: users.image })
      .from(users)
      .where(eq(users.id, params.id));
    return Response.json(result, {
      status: Object.keys(result).length !== 0 ? 200 : 400,
    });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

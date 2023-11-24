import { category } from "%/schema";
import db from "@/utils/getDrizzle";

export async function GET() {
  try {
    const result = await db.select().from(category);
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

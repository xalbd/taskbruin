import { redirect } from "next/navigation";
import getServerSessionUserId from "@/utils/getServerSessionUserId";

export async function GET(request: Request) {
  const userId = await getServerSessionUserId();
  if (!userId) {
    return Response.json({}, { status: 401 });
  }

  redirect(`/api/user/${userId}`);
}

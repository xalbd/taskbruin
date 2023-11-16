import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

async function getServerSessionUserId() {
  const session = await getServerSession(authOptions);
  return session?.user?.id;
}

export default getServerSessionUserId;

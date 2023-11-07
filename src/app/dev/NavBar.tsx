import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name}
        <button className="outline m-2 p-1" onClick={() => signOut()}>
          Sign Out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in
      <button className="outline m-2 p-1" onClick={() => signIn()}>
        Sign In
      </button>
    </>
  );
}

export default function NavBar() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}

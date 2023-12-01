"use client";

import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function SignIn() {
  const [providers, setProviders] = useState([]);
  const { status: authStatus } = useSession();
  if (authStatus == "authenticated") {
    return redirect("/");
  }
  useEffect(() => {
    const getProvidersAsync = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    getProvidersAsync(); // run it, run it
  }, []);
  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 flex flex-col items-center">
        <div class="text-3xl mb-3">Sign In</div>
        <div class="text-sm text-slate-400">
          Welcome to TaskBruin, our UCLA service platform that connects you with
          Bruins to help with food delivery, laundry, scooter rental, and more.
        </div>
        <br></br>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              class={
                provider.name == "GitHub"
                  ? "text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
                  : ""
              }
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

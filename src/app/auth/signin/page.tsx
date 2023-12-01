"use client";

import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { useEffect, useState } from "react";
import { getOperators } from "drizzle-orm";
import { redirect } from "next/navigation";

export default function SignIn() {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const checkIfUser = async () => {
      const session = await getServerSession();
      if (session) {
        redirect("/");
      }
    };
    checkIfUser();
    const getProvidersAsync = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    getProvidersAsync(); // run it, run it
  }, []);
  return (
    <>
      <div className="max-w-7xl m-auto p-5 sm:p-8">
        <div class="text-3xl">Sign in to TaskBruin!</div>
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

"use client";

import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers/index";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignIn = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { status: authStatus } = useSession();

  useEffect(() => {
    const getProvidersAsync = async () => {
      const oauthProviders = await getProviders();
      setProviders(oauthProviders);
    };

    // Check if window is defined before executing client-side code
    if (typeof window !== "undefined") {
      getProvidersAsync();
    }
  }, []);

  if (authStatus == "authenticated") {
    return redirect("/");
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 flex flex-col items-center">
        <div className="text-5xl mb-7">Sign In</div>
        <div className="text-xl text-slate-400">
          Welcome to TaskBruin, our UCLA service platform that connects you with
          Bruins to help with food delivery, laundry, scooter rental, and more.
        </div>
        <br />
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/explore" })}
                className={
                  "font-bold text-lg py-3 px-6 mb-7 rounded border border-indigo-500 focus:ring transform transition hover:scale-105 duration-300 ease-in-out hover:bg-indigo-500 hover:text-white inline-flex items-center space-x-2"
                }
              >
                {provider.name.toLowerCase() === "google" && (
                  <FcGoogle className="w-6 h-6 mr-2" />
                )}
                {provider.name.toLowerCase() === "github" && (
                  <FaGithub className="w-6 h-6 mr-2" />
                )}
                <span className="text-lg">Sign in with {provider.name}</span>
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default SignIn;

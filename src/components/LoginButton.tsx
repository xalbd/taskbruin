"use client";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface LoginButtonProps {
  loggedIn: boolean;
}

const LoginButton = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  const { data: session } = useSession();

  useEffect(() => {
    const getProvidersAsync = async () => {
      const oauthProviders = await getProviders();
      setProviders(oauthProviders);
    };

    getProvidersAsync();
  }, []);

  return (
    <div>
      {!session ? (
        providers &&
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
        ))
      ) : (
        <button className="font-bold text-lg py-2 px-5 mb-7 rounded border text-indigo-500 border-indigo-500 focus:ring transform transition hover:scale-105 duration-300 ease-in-out hover:bg-indigo-500 hover:text-white inline-flex items-center space-x-2">
          Explore
        </button>
      )}
    </div>
  );
};

export default LoginButton;

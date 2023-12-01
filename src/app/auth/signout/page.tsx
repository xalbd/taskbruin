"use client";

import { getProviders, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { useEffect, useState } from "react";
import { getOperators } from "drizzle-orm";

export default function SignOut() {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    const getProvidersAsync = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    getProvidersAsync(); // run it, run it
  }, []);
  return (
    <>
      <div>Hi</div>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signOut(provider.id)}>Sign out</button>
        </div>
      ))}
    </>
  );
}

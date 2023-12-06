import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      className="font-bold py-2 px-4 rounded border text-indigo-500 border-indigo-500 focus:ring transform transition hover:scale-105 duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
};

export default LoginButton;

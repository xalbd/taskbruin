import React from "react";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button
      className="bg-gradient-to-r from-blue-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
};

export default LoginButton;

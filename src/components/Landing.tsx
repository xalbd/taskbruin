"use client";
import React from "react";
import hero from "../app/hero.png";
import LoginButton from "@/components/LoginButton";
import { useSession } from "next-auth/react";

const Landing = () => {
  const { data: session } = useSession();

  return (
    <div className="tracking-normal m-6 bg-cover bg-fixed mt-10">
      <div className="container mx-auto max-w-7xl px-2 mt-6 sm:px-6 lg:px-8 flex flex-wrap items-center">
        <div className="flex flex-col w-full md:w-1/2 justify-center lg:items-start">
          <h1 className="my-4 text-5xl md:text-5xl xl:text-7xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
              TaskBruin
            </span>
          </h1>
          <p className="text-indigo-500 leading-normal text-xl md:text-2xl mb-8 text-center md:text-left">
            Welcome to TaskBruin, our UCLA service platform that connects you
            with Bruins to help with food delivery, laundry, scooter rental, and
            more.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between pt-4 mb-8">
            <LoginButton loggedIn={!!session} />
          </div>
        </div>
        <div className="w-full md:w-1/2 overflow-hidden">
          <img src={hero.src} alt="Hero" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Landing;

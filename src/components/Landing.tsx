"use client";
import hero from "../app/hero.png";

const Landing = () => {
  return (
    <div className="leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed">
        <div className="container md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
            <h1 className="my-4 text-5xl md:text-7xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                TaskBruin
              </span>
            </h1>
            <p className="leading-normal text-xl  md:text-2xl mb-8 text-center md:text-left">
              Welcome to TaskBruin, our UCLA service platform that connects you
              with Bruins to help with food delivery, laundry, scooter rental,
              and more.
            </p>

            <form className="opacity-75 w-full px-8 pt-6 pb-8 mb-4">
              <div className="flex items-center justify-between pt-4">
                <button
                  className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                  type="button"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className="xl:w-2/5 overflow-hidden">
            <img className="" src={hero.src} alt="Hero" />
          </div>
        </div>
    </div>
  );
};

export default Landing;

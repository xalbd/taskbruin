"use client";

import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import ThemeButton from "@/components/ThemeButton";
import ProfileOption from "@/components/ProfileOption";
import Link from "next/link";
import logo from "../app/taskbruinlogo.png";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Explore", href: "/explore", current: false },
  { name: "Create", href: "/create", current: false },
];

function classNames<T extends string>(...classes: T[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 mt-6 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md ml-5 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  {open ? (
                    <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-4 items-center">
                    <img
                      className="h-16 w-auto"
                      src={logo.src}
                      alt="Your Company"
                    />
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "group rounded-md px-3 py-2 text-xl font-medium relative",
                          item.current ? "" : "group-hover:underline",
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 transform scale-x-0 origin-bottom transition-transform group-hover:scale-x-100"></span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-5 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ThemeButton />

                <Menu as="div" className="relative ml-3">
                  {session ? (
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <img
                        className="h-12 w-12 rounded-full"
                        src={
                          session?.user?.image ??
                          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        }
                        alt=""
                      />
                    </Menu.Button>
                  ) : (
                    <Link
                      className="font-bold py-2 px-4 rounded border text-indigo-400 border-indigo-400 focus:ring transform transition hover:scale-105 duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
                      href="/"
                    >
                      Sign In
                    </Link>
                  )}
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <ProfileOption title="Your Profile" page="/profile" />
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "w-full block px-4 py-2 text-sm text-gray-700 text-left",
                            )}
                            onClick={() => signOut({ callbackUrl: "/" })}
                          >
                            Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-700 text-white"
                      : " hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-5 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;

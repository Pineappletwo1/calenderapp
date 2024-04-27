"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const [selection, setSelection] = useState(false);
  return (
    <nav className="flex gap-4 p-4 px-6 items-center shadow-lg">
      <Link href="/">
        <h1 className="text-xl py-2 px-4 hover:bg-gray-200 rounded">
          Tyee Calendar
        </h1>
      </Link>
      <Link href="/month">
        <h1 className="text-xl py-2 px-4 hover:bg-gray-200 rounded">
          Current Month
        </h1>
      </Link>
      <div className=" grow mx-16 relative">
        <input
          type="text"
          className="px-4 py-2 bg-gray-200 rounded w-full"
          placeholder="Search Events"
          onFocus={() => setSelection(true)}
          onBlur={() => setSelection(false)}
        ></input>
        {selection && (
          <div className="absolute top-13 left-0 w-full bg-gray-200">
            <h1 className="p-4">Search Results</h1>
            <div className="p-4">No Results</div>
          </div>
        )}
      </div>
      {!session ? (
        <>
          <button
            onClick={() => signIn()}
            className="ml-auto py-2 px-4 rounded-lg bg-blue-500 text-white text-xl"
          >
            Login
          </button>
          <button
            onClick={() => signIn()}
            className="py-2 px-4 rounded-lg border-2 border-black text-xl"
          >
            Signup
          </button>
        </>
      ) : (
        <>
          <Image
            src={session?.user?.image || ""}
            alt="Profile Picture"
            width={45}
            height={45}
            className="ml-auto rounded"
          />

          <button
            onClick={() => signOut()}
            className="py-2 px-4 rounded-lg bg-blue-500 text-white text-xl "
          >
            Logout
          </button>
        </>
      )}
      <div className="md:hidden" onClick={() => setActive(!active)}>
        <div className="navIconLine"></div>
        <div className="navIconLine"></div>
        <div className="navIconLine"></div>
      </div>
      {active && (
        <div className="navMenu">
          {!session ? (
            <>
              <button
                onClick={() => signIn()}
                className="pt-2 px-4 rounded-lg bg-blue-500"
              >
                Login
              </button>
              <button onClick={() => signIn()} className="navMenuItem">
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => signOut()}
                className="pt-2 px-4 rounded-lg bg-blue-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

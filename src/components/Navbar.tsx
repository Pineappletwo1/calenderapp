"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  return (
    <nav className="flex gap-4 p-4 px-6 items-center shadow-lg">
      <Link href="/">
        <h1 className="text-xl">Tyee Calendar</h1>
      </Link>
      {!session ? (
        <>
          <button
            onClick={() => signIn()}
            className="ml-auto py-2 px-4 rounded-lg bg-blue-500 text-white"
          >
            Login
          </button>
          <button
            onClick={() => signIn()}
            className="py-2 px-4 rounded-lg border-2 border-black"
          >
            Signup
          </button>
        </>
      ) : (
        <>
          <Image
            src={session?.user?.image || ""}
            alt="Profile Picture"
            width={40}
            height={40}
            className="ml-auto rounded"
          />

          <button
            onClick={() => signOut()}
            className="py-2 px-4 rounded-lg bg-blue-500 text-white "
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

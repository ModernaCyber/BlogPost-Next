"use client";
import { Nav, NavLink } from "components/Nav";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const AppBar = () => {
  const { data: session } = useSession();
  // console.log(JSON.stringify(session)+"-----------------------------------session--AppBar------------------------------------")

  return (
    <Nav>
      {session?.user ? (
        <>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/blog/create">Create Blog</NavLink>
        </>
      ) : (
        <></>
      )}
      <div className="ml-auto flex gap-2">
        {session?.user ? (
          <>
            <p className="pr-4 flex my-auto gap-4 items-center">
              <span className="text-sky-300 ">Welcome</span>
              <span className=" text-sky-600">
                {session?.user?.user?.username}
                {/* {JSON.stringify(session?.user?.user)}  */}
              </span>
            </p>
            <button className="text-red-500" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <button className="text-green-600" onClick={() => signIn()}>
            Sign In
          </button>
        )}
        <button onClick={() => console.log(JSON.stringify(session))}>
          session
        </button>
      </div>
    </Nav>
  );
};

export default AppBar;

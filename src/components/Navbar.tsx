"use client";

import { PinterestFilled, SearchOutlined } from "@ant-design/icons";
import Link from "next/link";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import { useSession } from "next-auth/react";
import { Avatar } from "antd";
import LogoutButton from "./LogoutButton";
import { SearchProps } from "antd/es/input";
import { usePathname } from "next/navigation";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const { data: session } = useSession();
  const path = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center h-20 px-5 bg-white">
      <Link
        className="flex items-center gap-1 mr-5"
        href={`${session ? `/home` : `/`}`}
      >
        <PinterestFilled className="text-[var(--primary-color)] text-[32px]" />
        {!session && (
          <h1 className="text-xl text-[var(--color-text-error)] font-semibold tracking-tighter">
            Pinterest
          </h1>
        )}
      </Link>

      {session ? (
        <>
          <div className="flex items-center gap-1">
            <Link href={"/home"}>
              <button
                className={`px-4 py-2 rounded-full ${
                  path == `/home` ? `text-white bg-black` : `text-black`
                }`}
              >
                Home
              </button>
            </Link>
            <Link href={"/create"}>
              <button
                className={`px-4 py-2 rounded-full ${
                  path == `/create` ? `text-white bg-black` : `text-black`
                }`}
              >
                Create
              </button>
            </Link>
          </div>

          {path == "/home" && <Searchbar />}

          <div className="flex items-center gap-2 ml-auto">
            <Link href={"/profile"}>
              <Avatar src={session.user.profilePicture} className="w-10 h-10" />
            </Link>
            <LogoutButton />
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 ml-auto">
          <LoginButton />
          <SignupButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

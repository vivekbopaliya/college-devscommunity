import Image from "next/image";
import Link from "next/link";
import gdsclogo from "./gdsc-logo.png";
import React from "react";
import { buttonVariants } from "../ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserNavbar from "./UserNavbar";
import SearchBar from "../SearchBar";
import { cn } from "@/lib/utils";
import ToggleTheme from "../ToggleTheme";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed shadow bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-800 border-opacity-60 top-0  py-2 inset-x-0 z-[10] h-fit">
      <div className="flex max-w-7xl items-center justify-between mx-auto h-full sm:gap-2 gap-5 container">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src={gdsclogo}
            alt="logo"
            className="h-14 w-14 md:w-9 object-contain md:h-9"
          />
          <p className="hidden md:block dark:text-zinc-200 text-zinc-700 font-bold">
            <span className="font-extrabold dark:font-bold">GDSC</span> AU
          </p>
        </Link>

        <SearchBar />

        <div className="flex justify-center items-center gap-5">
          <ToggleTheme />
          {session?.user ? (
            <UserNavbar user={session?.user} />
          ) : (
            <Link
              href="sign-in"
              className={cn(buttonVariants({}), "sm:text-base text-sm")}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import Image from "next/image";
import Link from "next/link";
import gdsclogo from "./gdsc-logo.png";
import React from "react";
import { buttonVariants } from "../ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserNavbar from "./UserNavbar";
import SearchBar from "../SearchBar";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed shadow bg-zinc-100 border-b border-zinc-300 top-0  py-2 inset-x-0 z-[10] h-fit">
      <div className="flex max-w-7xl items-center justify-between mx-auto h-full sm:gap-2 gap-5 container">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src={gdsclogo}
            alt="logo"
            className="h-14 w-14 md:w-9 object-contain md:h-9"
          />
          <p className="hidden md:block  text-zinc-700 font-bold">
            <span className="font-extrabold">GDSC</span> AU
          </p>
        </Link>

        <SearchBar />

        {session?.user ? (
          <UserNavbar user={session?.user} />
        ) : (
          <Link href="sign-in" className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

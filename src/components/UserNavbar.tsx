"use client";

import { User } from "next-auth";
import React, { FC } from "react";
import UserAvatar from "./UserAvatar";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

import Link from "next/link";
import { signOut } from "next-auth/react";
import CreateCommunity from "./CreateCommunity";

interface UserNavbarProps {
  user: Pick<User, "name" | "email" | "image">;
}
const UserNavbar: FC<UserNavbarProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name,
            image: user.image,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="bg-white dark:bg-black dark:text-white"
        align="end"
      >
        <div className="flex  justify-start items-center gap-2 p-2">
          <div className="flex flex-col items-center justify-center  space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="text-sm text-zinc-700 dark:text-zinc-200 truncate w-[200px]">
                {user?.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/newsletters">Read Newsletters</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
        >
          Sign out
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <CreateCommunity />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavbar;

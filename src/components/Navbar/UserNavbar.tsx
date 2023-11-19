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
} from "../ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserNavbarProps {
  user: Pick<User, "name" | "email" | "image">;
}
const UserNavbar: FC<UserNavbarProps> = ({ user }) => {
  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{
              name: user.name,
              image: user.image,
            }}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white" align="end">
          <div className="flex  justify-start items-center gap-2 p-2">
            <div className="flex flex-col items-center  space-y-1 leading-none">
              {user?.name && <p className="font-medium">{user?.name}</p>}
              {user?.email && (
                <p className="text-sm text-zinc-700 truncate w-[200px]">
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
            <Link href="/articles">Read articles</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </Sheet>
  );
};

export default UserNavbar;
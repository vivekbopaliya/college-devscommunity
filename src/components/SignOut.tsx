"use client";

import { Session } from "next-auth";
import React, { FC } from "react";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface SignOutProps {
  session: any;
}

const SignOut: FC<SignOutProps> = ({ session }) => {
  return (
    <div>
      {session?.user ? (
        <Button
          className={cn(
            buttonVariants({ size: "lg", variant: "subtle" }),
            " font-bold"
          )}
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </Button>
      ) : (
        <Link
          className={cn(
            buttonVariants({ size: "lg", variant: "subtle" }),
            " font-bold"
          )}
          href="/sign-in"
        >
          Sign in
        </Link>
      )}
    </div>
  );
};

export default SignOut;

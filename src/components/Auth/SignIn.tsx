import Image from "next/image";
import React, { FC } from "react";
import gdsclogo from "@/components/Navbar/gdsc-logo.png";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = () => {
  return (
    <div className="flex flex-col container justify-center w-full items-center">
      <div className="flex flex-col justify-center items-center  text-center space-y-2 ">
        <Image src={gdsclogo} className="h-12 w-12 object-contain" alt="logo" />
        <p className="text-2xl font-semibold tracking-tight">Welcome Back!</p>
        <p className="text-sm max-w-xs mx-auto">
          {" "}
          By continuing, you are setting up a Google account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 space-y-5 text-center text-sm text-muted-foreground">
        New to here?{" "}
        <Link
          href="/sign-up"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;

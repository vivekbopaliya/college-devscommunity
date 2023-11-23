"use client";

import React from "react";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Icons } from "./ui/Icons";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";

const UserAuthForm = () => {
  const [loading, setLoading] = React.useState(false);
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signIn("google");
      toast({
        title: "You are logged in.",
        description: "Login successfully with Google account.",
      });
    } catch (error) {
      toast({
        title: "An error occured.",
        description: "There was an error loggin in with Google account.",
        variant: "destructive",
      });
    } finally {
      setLoading(true);
    }
  };
  return (
    <div className={cn("justify-center flex mt-8 ")}>
      <Button
        className="w-full dark:bg-white dark:text-black"
        onClick={signInWithGoogle}
        isLoading={loading}
      >
        {loading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;

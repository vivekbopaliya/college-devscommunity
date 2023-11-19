import SignIn from "@/components/Auth/SignIn";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="absolute inset-0 ">
      <div className="max-w-2xl mx-auto h-full flex-col flex justify-center items-center">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start mb-20"
          )}
        >
          <ChevronLeftIcon className="h-4 w-4 mr-2" />
          Home
        </Link>

        <SignIn />
      </div>
    </div>
  );
};

export default page;

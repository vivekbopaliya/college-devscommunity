"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/Button";

const YourFeedLink = () => {
  return (
    <div>
      <Link
        className={cn(buttonVariants({ size: "lg" }), " font-bold ")}
        href="/r"
      >
        Your Feed
      </Link>
    </div>
  );
};

export default YourFeedLink;

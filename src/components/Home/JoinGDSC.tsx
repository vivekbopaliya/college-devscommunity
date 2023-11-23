"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/Button";

const JoinGDSC = () => {
  return (
    <div>
      <Link
        target="_blank"
        href={"https://gdsc.community.dev/atmiya-university-rajkot/"}
        className={cn(buttonVariants({ size: "lg" }), " my-3 font-bold")}
      >
        Join GDSC
      </Link>
    </div>
  );
};

export default JoinGDSC;

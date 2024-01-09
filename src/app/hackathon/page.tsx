"use client";

import React from "react";
import "../globals.css";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

const page = () => {
  const route = useRouter();
  return (
    <main className="w-screen sm:-ml-28 -ml-3 sm:py-28 py-36 -mt-10 h-full flex justify-center items-center hackathon__bg">
      <div className="  flex flex-col justify-center items-center">
        <div className="flex flex-col items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
          <p>⌚ Date: 2nd - 3rd March </p>
          <p>🪧 Venue: Atmiya University, Rajkot</p>
        </div>

        <main className="sm:flex hidden mt-4  flex-col gap-2 justify-center items-center">
          <p className="text-6xl  heckathon">CODE </p>
          <p className="text-6xl  heckathon">CARNIVAL</p>
          <p className="text-slate-500 mt-4 headline  sm:text-2xl text-xl">
            Where ideas find codes.
          </p>
        </main>

        <main className="sm:hidden mt-8 mb-2 flex flex-col gap-3 justify-center items-center">
          <p className="text-7xl heckathon-phone ">CODE</p>
          <p className="text-7xl heckathon-phone">CARNIVAL</p>
          <p className="text-slate-500 mt-4 headline-phone   text-xl">
            Where Ideas find Code.
          </p>
        </main>

        <main className=" flex gap-5 justify-between my-5 items-center  ">
          <Button size={"lg"} onClick={() => route.push("/hackathon/form")}>
            Register Now
          </Button>
        </main>
      </div>
    </main>
  );
};

export default page;

"use client";

import React from "react";
import "../globals.css";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Seperator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
const page = () => {
  return (
    <div className="container  pb-5">
      <div className="w-full relative flex flex-col justify-center items-center">
        <div className="absolute w-full sm:ml-[150px]  ml-20  h-full -mt-16 inset-0 overflow-hidden">
          <div className="jumbo absolute inset-[10px] opacity-50   overflow-hidden "></div>
        </div>

        <main className="pt-12">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            <span>
              ⌚ Date: 2nd - 3rd March <Separator /> 🪧 Venue: Atmiya University
            </span>
          </div>
        </main>

        <main className="sm:flex hidden mt-4 relative flex-col gap-2 justify-center items-center">
          <p className="text-6xl heckathon ">CODE </p>
          <p className="text-6xl heckathon ">CARNIVAL</p>
          <p className="text-slate-500 mt-4  sm:text-2xl text-xl">
            Where ideas find codes.
          </p>
        </main>

        <main className="sm:hidden mt-8 mb-2 flex flex-col gap-3 justify-center items-center">
          <p className="text-7xl heckathon-phone ">CODE</p>
          <p className="text-7xl heckathon-phone">CARNIVAL</p>
          <p className="text-slate-500 mt-4   text-xl">
            Where ideas find codes.
          </p>
        </main>

        <main className=" flex gap-5 justify-between my-5 items-center  ">
          <Drawer>
            <DrawerTrigger>
              <Button size={"lg"}>Read More</Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                  <DrawerTitle>Open Hackathon</DrawerTitle>
                  <DrawerDescription>
                    Code Carnival 2024 is an open hackathon, organized by the
                    GDSC team of Atmiya University from 2nd to 3rd March.
                  </DrawerDescription>
                  <div className="p-4">
                    <ul className="circle-list flex flex-col gap-2">
                      <li>Code Carnival is a continuous 34-hour hackathon.</li>
                      <li>
                        Teams can have a minimum of 1 and a maximum of 4
                        participants.
                      </li>
                      <li>
                        Complimentary breakfast, lunch, and dinner will be
                        provided.
                      </li>
                      <li>
                        Participants are not allowed to leave the campus before
                        the hackathon concludes.
                      </li>
                      <li>
                        The registration fee is <b>500rs</b> per team,
                        refundable upon the completion of the hackathon.
                      </li>
                      <li>
                        Exciting prizes and certificates will be awarded to the
                        winning teams.
                      </li>
                      <li>
                        Participants must bring their own laptops, chargers, and
                        any specific hardware required for their projects.
                      </li>
                      <li>
                        Coding guidelines and judging criteria will be shared
                        during the hackathon.
                      </li>
                    </ul>
                  </div>
                </DrawerHeader>
              </div>
            </DrawerContent>
            <Button size={"lg"}>Register</Button>
          </Drawer>
        </main>
      </div>
    </div>
  );
};

export default page;

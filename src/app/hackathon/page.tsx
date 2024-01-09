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
    <main className="w-screen sm:-ml-28 -ml-3 sm:py-28 py-36 -mt-16 h-full flex justify-center items-center hackathon__bg">
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

        <main className=" flex gap-5 justify-between my-7 items-center  ">
          <Drawer>
            <DrawerTrigger>
              <Button>Rules & Regulations</Button>
            </DrawerTrigger>

            <DrawerContent>
              <div className="mx-auto w-full max-w-lg">
                <DrawerHeader>
                  <DrawerTitle>Open Hackathon</DrawerTitle>
                  <DrawerDescription>
                    Code Carnival 2024 is an open hackathon, organized by the
                    GDSC team of Atmiya University from 2nd to 3rd March.
                  </DrawerDescription>
                  <div className="p-4">
                    <ul className="circle-list flex flex-col gap-2">
                      <li>Code Carnival is a continuous 36-hours hackathon.</li>
                      <li>
                        Teams can have a minimum of 1 and a maximum of 4
                        participants.
                      </li>
                      <li>
                        Complimentary breakfast, lunch, and dinner will be
                        provided.
                      </li>
                      <li>
                        Leaving the campus before the conclusion of the
                        hackathon will result in the loss of your fees.
                      </li>
                      <li>
                        The registration fee is{" "}
                        <b className="text-blue-500">500rs</b> per team,
                        refundable upon the completion of the hackathon.
                      </li>

                      <li>
                        We, the organizers have the right to disqualify the
                        teams if the rules and regulations are violated.
                      </li>
                      <li>
                        Winning teams will receive thrilling prizes and
                        certificates, while participants will be awarded
                        certificates of appreciation.
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
          </Drawer>
          <Button
            variant={"outline"}
            onClick={() => route.push("/hackathon/form")}
          >
            Register Now
          </Button>
        </main>
      </div>
    </main>
  );
};

export default page;

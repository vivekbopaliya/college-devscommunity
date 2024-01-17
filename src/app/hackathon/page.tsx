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
    <main className="w-screen sm:-ml-28 -ml-3 sm:py-28 py-30 -mt-16 h-full flex flex-col justify-center items-center hackathon__bg">
      <div className="  flex flex-col justify-center items-center">
        <div className="flex flex-col items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
          <p>⌚ Date: 2nd - 3rd March </p>
          <p>🪧 Venue: Atmiya University, Rajkot</p>
        </div>

        <main className="sm:flex hidden mt-4  flex-col gap-2 justify-center items-center">
          <p className="text-6xl  heckathon">CODE </p>
          <p className="text-6xl  heckathon">CARNIVAL</p>
          <p className="text-slate-500 mt-4 headline  sm:text-2xl text-xl">
            Where Ideas find Code.
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
              <div className="mx-auto w-full max-w-4xl text-sm">
                <DrawerHeader>
                  <DrawerTitle>Open Hackathon</DrawerTitle>
                  <DrawerDescription>
                    Code Carnival 2024 is an open hackathon, organized by the
                    GDSC team of Atmiya University from 2nd to 3rd March.
                  </DrawerDescription>
                  <div className="p-4">
                    <ul className="circle-list flex flex-col gap-2">
                      <li>Code Carnival is a continuous 36-hours hackathon.</li>
                      <li className="text-blue-600 hover:underline">
                        <a
                          className="text-sm font-light"
                          target="_blank"
                          href="https://docs.google.com/document/d/11Qxq2KI8xSp1Mwhp350FHQQQNeMsjInsFp0ZF0tYCis/edit"
                        >
                          Read about Problem Statements.
                        </a>
                      </li>
                      <li>
                        Teams can have a minimum of 1 and a maximum of 4
                        participants.
                      </li>
                      <li>
                        Complimentary breakfast, lunch, and dinner will be
                        provided.
                      </li>

                      <li>
                        We, the organizers have the right to disqualify the
                        teams if the rules and regulations are violated.
                      </li>
                      <li>
                        Participants are required to submit their project
                        synopsis through the designated online platform. The
                        submitted synopses will be throughly reviewed by the
                        organizing committee for evaluation.
                      </li>

                      <li>
                        No outsiders are allowed in the hackathon. You cannot
                        take help from other teams or the people who haven't
                        participated in the hackathon. This will lead to the
                        disqualification of the team
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

      <section className="mt-14 pb-4 events flex  flex-col justify-center items-center">
        <p className="text-white">
          Total timeline for Code Carnival participants
        </p>
        <h1 className="sm:text-5xl dark:text-white text-white text-4xl font-extrabold pb-16 pt-2">
          <span className="red">W</span>hat's <span className="green">C</span>
          oming <span className="blue">U</span>p
          <span className="yellow">..?</span>
        </h1>
        <ul>
          {/* @ts-ignore */}
          <li style={{ "--accent-color": "#EA4335" }}>
            <div className="date text-3xl">Registration</div>
            <div className="title"> 10/01/2024 - 10/02/2024</div>
            <div className="descr">
              {" "}
              The registration phase marks the initial step for participants to
              express their interest in joining the hackathon. During this
              period, individuals or teams register for the event by providing
              necessary information, such as team details, participant names,
              and any required background information. Organizers often use
              online platforms or dedicated websites to streamline the
              registration process and gather essential data.
            </div>
          </li>

          {/* @ts-ignore */}
          <li style={{ "--accent-color": "#0F9D58" }}>
            <div className="date text-3xl">Presentation Submission</div>
            <div className="title"> 01/02/2024 - 15/02/2024</div>
            <div className="descr">
              {" "}
              Following successful registration, participants are typically
              required to prepare and submit their project proposals or
              presentation materials. This phase is crucial for teams to outline
              their project ideas, objectives, and any preliminary work they
              have done. Presentation submission allows organizers to review and
              assess the proposed projects, ensuring they align with the
              hackathon's theme and guidelines.
            </div>
          </li>
          {/* @ts-ignore */}

          <li style={{ "--accent-color": "#4285F4" }}>
            <div className="date text-3xl">Acceptance Notification</div>
            <div className="title">17/02/2024</div>
            <div className="descr">
              {" "}
              After the presentation submission deadline, organizers review the
              entries to select the most promising projects that will proceed to
              the hackathon event. The acceptance notification phase involves
              notifying participants or teams about the outcome of the selection
              process. Successful participants receive confirmation of their
              acceptance into the hackathon, while those who are not selected
              may receive feedback or information on future opportunities.
            </div>
          </li>
          {/* @ts-ignore */}

          <li style={{ "--accent-color": "#F8A218" }}>
            <div className="date text-3xl">Final Details Declaration</div>
            <div className="title"> 20/02/2024</div>
            <div className="descr">
              As the hackathon date approaches, organizers release final details
              to the accepted participants. This includes essential information
              such as the event schedule, venue details (whether it's in-person
              or virtual), rules and guidelines, tools or platforms to be used,
              and any additional resources or support provided during the
              hackathon. The final details declaration ensures that participants
              are well-prepared and have all the necessary information to make
              the most of the hackathon experience.
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default page;

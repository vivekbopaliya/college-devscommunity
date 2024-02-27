"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Check, CheckCheckIcon, ChevronsUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import React from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { Courses, ProblemStatements, Universities } from "./problem-statement";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function ProfileForm() {
  function getCurrentTimestamp() {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    let hours = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${ampm}`;

    return formattedTimestamp;
  }

  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };
  const [teamLeaderName, setTeamLeaderName] = React.useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = React.useState("");
  const [teamLeaderPhone, setTeamLeaderPhone] = React.useState("");
  const [mentor, setMentor] = React.useState("");
  const route = useRouter();
  const [open, setOpen] = React.useState(false);
  const [universityOpen, setUniversityOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [otherCollege, setOtherCollege] = React.useState("");
  const [otherCourse, setOtherCourse] = React.useState("");

  const [value, setValue] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [course, setCourse] = React.useState("");

  const form = useForm<any>({
    mode: "onChange",
  });
  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const timeStamp = getCurrentTimestamp();

    const data = {
      Timestamp: timeStamp,
      Team_Leader: teamLeaderName,
      Leader_Email: teamLeaderEmail,
      Leader_Number: teamLeaderPhone,
      PS: value,
      Leader_College: university,
      Leader_Other: otherCollege,
      Leader_Course: course,
      Leader_OtherCourse: otherCourse,
      Mentor: mentor,
    };
    try {
      setIsLoading(true);
      // @ts-ignore
      const dataJSON = JSON.stringify(data);
      localStorage.setItem("teamLeader", dataJSON);
      toast({
        title: "Enter other team members credentials and submit.",
      });
      route.push("/hackathon/form/member1");
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description:
          "Your form has not been submitted, please contact at gdsc.atmiya@gmail.com",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  getCurrentTimestamp();

  return (
    <main className="sm:pb-0 pb-10">
      <Form {...form}>
        <form className="space-y-16">
          <div className="my-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Leader's Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Full Name..."
                      value={teamLeaderName}
                      onChange={(e: any) => setTeamLeaderName(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This should be team leader's name only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Leader's Email</FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Email..."
                      value={teamLeaderEmail}
                      onChange={(e: any) => setTeamLeaderEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This should be team leader's email only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-8">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Leader's Phone Number</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      placeholder=" Enter Phone Number..."
                      value={teamLeaderPhone}
                      onChange={(e: any) => setTeamLeaderPhone(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This should be team leader's phone number only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-8">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty Mentor's Name</FormLabel>

                  <FormControl>
                    <Input
                      type="text"
                      placeholder=" Enter Faculty Mentor's Name..."
                      value={mentor}
                      onChange={(e: any) => setMentor(e.target.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-8  flex flex-col gap-3">
            <p className="text-sm font-light">
              Select team leader's University
            </p>
            <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
              <PopoverTrigger asChild>
                <Button
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between dark:text-white"
                >
                  {university ? university : "Select your Univeristy"}
                  <ChevronsUpDown className="ml-2 h-4 w-10 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] p-0  overflow-y-auto max-h-[400px]">
                <Command>
                  <CommandGroup>
                    {Universities.map((ps) => (
                      <CommandItem
                        key={ps.label}
                        value={ps.label}
                        onSelect={(currentValue) => {
                          setUniversity(
                            currentValue === university ? "" : currentValue
                          );
                          setUniversityOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === ps.label ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {ps.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <section className="mt-3">
              {university === "others" && (
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-600">
                        Enter other College name:{" "}
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          value={otherCollege}
                          onChange={(e: any) => setOtherCollege(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </section>
          </div>

          <div className="my-8  flex flex-col gap-3">
            <p className="text-sm font-light">Select team leader's Course</p>
            <Popover open={courseOpen} onOpenChange={setCourseOpen}>
              <PopoverTrigger asChild>
                <Button
                  role="combobox"
                  aria-expanded={open}
                  className="w-[300px] justify-between dark:text-white"
                >
                  {course ? course : "Select your Course"}
                  <ChevronsUpDown className="ml-2 h-4 w-10 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] p-0  overflow-y-auto max-h-[400px]">
                <Command>
                  <CommandGroup>
                    {Courses.map((ps) => (
                      <CommandItem
                        key={ps.label}
                        value={ps.label}
                        onSelect={(currentValue) => {
                          setCourse(
                            currentValue === course ? "" : currentValue
                          );
                          setCourseOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === ps.label ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {ps.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            <section className="mt-3">
              {course === "others" && (
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-600">
                        Enter other Course name:{" "}
                      </FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          value={otherCourse}
                          onChange={(e: any) => setOtherCourse(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </section>
          </div>
          <div className="my-8 flex flex-col gap-3">
            <a
              className="text-sm font-light"
              target="_blank"
              href="https://docs.google.com/document/d/11Qxq2KI8xSp1Mwhp350FHQQQNeMsjInsFp0ZF0tYCis/edit"
            >
              Read more about Problem Statements{" "}
              <span className=" hover:underline  text-blue-600">here.</span>
            </a>
            <div className="mb-8">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between dark:text-white"
                  >
                    {value ? value : "Select Problem Statement..."}
                    <ChevronsUpDown className="ml-2 h-4 w-10 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[500px] p-0  overflow-y-auto max-h-[400px]">
                  <Command>
                    <CommandInput placeholder="Select Problem Statement..." />
                    <CommandEmpty>No such problem statements.</CommandEmpty>
                    <CommandGroup>
                      {ProblemStatements.map((ps) => (
                        <CommandItem
                          key={ps.label}
                          value={ps.label}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === ps.label ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {ps.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="my-4 flex  gap-4  justify-center items-center">
            <a
              target="_blank"
              href="https://docs.google.com/document/d/1cdeWedY8ZBETe6_0HRQdXh-GHhqTqkCgKq_PFcTYJtQ/edit"
              className="text-blue-600 hover:underline w-[50%]"
            >
              Read Synopsis Criterias here.
            </a>
            <p className="text-sm font-light">
              *Synopsis submission form will be opend from{" "}
              <span className="font-semibold text-red-600">01/02/2024</span> to{" "}
              <span className="font-semibold text-red-600">10/02/2024</span>*
            </p>
          </div>

          <div className="mt-6 mb-2">
            <Drawer>
              <DrawerTrigger>
                <p className="text-sm font-light text-blue-600 hover:underline">
                  Read Rules & Regulations here
                </p>
              </DrawerTrigger>

              <DrawerContent>
                <div className="mx-auto text-sm w-full max-w-4xl">
                  <DrawerHeader>
                    <DrawerTitle>Open Hackathon</DrawerTitle>
                    <DrawerDescription>
                      Code Carnival 2024 is an open hackathon, organized by the
                      GDSC team of Atmiya University from 2nd to 3rd March.
                    </DrawerDescription>
                    <div className="p-4">
                      <ul className="circle-list flex flex-col gap-2">
                        <li>
                          Code Carnival is a continuous 36-hours hackathon.
                        </li>
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
                          Participants must bring their own laptops, chargers,
                          and any specific hardware required for their projects.
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

            <div className="mt-4">
              <main className="mb-7">
                <div className="items-top flex space-x-2">
                  <main onClick={handleCheckboxChange}>
                    <Checkbox id="terms1" />
                  </main>
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      I have thoroughly reviewed and understood all the rules
                      and regulations.
                    </p>
                  </div>
                </div>
              </main>

              <Button
                isLoading={isLoading}
                type="button"
                variant={"outline"}
                disabled={
                  termsAccepted === false ||
                  teamLeaderName === "" ||
                  teamLeaderEmail === "" ||
                  teamLeaderPhone === "" ||
                  value === ""
                }
                className="disabled:opacity-30"
                onClick={handleSubmit}
              >
                Next <ChevronRight className="ml-2 w-4 h-4" size={"sm"} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}

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
import "../../globals.css";
import { ProblemStatements } from "./problem-statement";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";

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

  const [submit, setSubmit] = React.useState(false);
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };
  const [teamLeaderName, setTeamLeaderName] = React.useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = React.useState("");
  const [teamLeaderPhone, setTeamLeaderPhone] = React.useState("");
  const [transactionID, setTrasactionID] = React.useState("");
  const [mentor, setMentor] = React.useState("");

  const [teamMemberName, setTeamMemebersName] = React.useState([]);
  const [teamMembersEmails, setTeamMemeberEmails] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<any>({
    mode: "onChange",
  });
  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const addNames = (index: number, value: string) => {
    const updatedArray = [...teamMemberName];
    // @ts-expect-error
    updatedArray[index] = value;
    setTeamMemebersName(updatedArray);
  };

  const addEmails = (index: number, value: string) => {
    const updatedArray = [...teamMembersEmails];
    // @ts-expect-error
    updatedArray[index] = value;
    setTeamMemeberEmails(updatedArray);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const timeStamp = getCurrentTimestamp();

    const data = {
      Timestamp: timeStamp,
      TeamLeader: teamLeaderName,
      TeamLeaderEmail: teamLeaderEmail,
      TeamLeaderNumber: teamLeaderPhone,
      ProblemStatement: value,
      Mentor: mentor,
      TransactionID: transactionID,
      TeamMembers: teamMemberName,
      TeamMembersEmail: teamMembersEmails,
    };
    try {
      setIsLoading(true);
      await axios.post(
        "https://sheet.best/api/sheets/279366d4-f3e7-43da-82b9-87808dcf6def",
        data
      );
      setSubmit(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  4;

  getCurrentTimestamp();

  return (
    <main className="sm:pb-0 pb-10">
      {submit === false && (
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
                        onChange={(e: any) =>
                          setTeamLeaderEmail(e.target.value)
                        }
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
                        onChange={(e: any) =>
                          setTeamLeaderPhone(e.target.value)
                        }
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

            <div className="my-8 flex flex-col gap-3">
              <a
                className="text-sm font-light"
                target="_blank"
                href="https://docs.google.com/document/d/11Qxq2KI8xSp1Mwhp350FHQQQNeMsjInsFp0ZF0tYCis/edit"
              >
                Read more about Problem Statements{" "}
                <span className=" hover:underline  text-blue-600">here.</span>
              </a>
              <div>
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
            <div className="my-8">
              {fields.map((field: { id: any }, index: number) => (
                <FormField
                  name="names"
                  key={field.id}
                  render={({ field: any }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Names
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add other team members' names here.
                      </FormDescription>
                      <FormControl>
                        <Input
                          onChange={(e: any) => addNames(index, e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {fields.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: "" })}
                >
                  Add More Member
                </Button>
              )}
              {fields.length === 3 && (
                <p className="my-2 font-light text-gray-600">
                  Maximum 4 members allowed.
                </p>
              )}
            </div>
            <div className="my-8">
              {fields.map((field: { id: any }, index: number) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field: any }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Emails
                      </FormLabel>
                      <FormDescription className={cn(index !== 0 && "sr-only")}>
                        Add other team members' emails here.
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="email"
                          onChange={(e: any) => {
                            addEmails(index, e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {fields.length < 3 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ value: "" })}
                >
                  Add Email
                </Button>
              )}
              {fields.length === 3 && (
                <p className="my-2 font-light text-gray-600">
                  Maximum 4 members allowed.
                </p>
              )}
            </div>

            <div className="mb-5 ">
              <div className="flex gap-5 items-center ">
                <a
                  className="button-57 mt-5 mb-3"
                  target="_blank"
                  href="http://seminar.atmiya.ac.in/"
                >
                  <span>Pay Fees</span>
                  <span> 500₹ per team</span>
                </a>

                <p className="text-sm font-light">
                  *The registration fee is <b>500rs</b> per team, refundable
                  upon the completion of the hackathon and it is to be only paid
                  by the team leader*
                </p>
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transaction ID</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="VADE0B248932"
                        value={transactionID}
                        onChange={(e: any) => setTrasactionID(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      ID will be given after the registration fees.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-6 mb-2">
              <Drawer>
                <DrawerTrigger>
                  <p className="text-sm font-light text-blue-600 hover:underline">
                    Read Rules & Regulations here
                  </p>
                </DrawerTrigger>

                <DrawerContent>
                  <div className="mx-auto w-full max-w-xl">
                    <DrawerHeader>
                      <DrawerTitle>Open Hackathon</DrawerTitle>
                      <DrawerDescription>
                        Code Carnival 2024 is an open hackathon, organized by
                        the GDSC team of Atmiya University from 2nd to 3rd
                        March.
                      </DrawerDescription>
                      <div className="p-4">
                        <ul className="circle-list flex flex-col gap-2">
                          <li>
                            Code Carnival is a continuous 36-hours hackathon.
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
                            Leaving the campus before the conclusion of the
                            hackathon will result in the loss of your fees.
                          </li>
                          <li>
                            The registration fee is{" "}
                            <b className="text-blue-300">500rs</b> per team,
                            refundable upon the completion of the hackathon.
                          </li>

                          <li>
                            We, the organizers have the right to disqualify the
                            teams if the rules and regulations are violated.
                          </li>

                          <li>
                            No outsiders are allowed in the hackathon. You
                            cannot take help from other teams or the people who
                            haven't participated in the hackathon. This will
                            lead to the disqualification of the team
                          </li>
                          <li>
                            Winning teams will receive thrilling prizes and
                            certificates, while participants will be awarded
                            certificates of appreciation.
                          </li>
                          <li>
                            Participants must bring their own laptops, chargers,
                            and any specific hardware required for their
                            projects.
                          </li>
                          <li>
                            Coding guidelines and judging criteria will be
                            shared during the hackathon.
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
                    transactionID === "" ||
                    termsAccepted === false ||
                    teamLeaderName === "" ||
                    teamLeaderEmail === "" ||
                    teamLeaderPhone === ""
                  }
                  className="disabled:opacity-30"
                  onClick={handleSubmit}
                >
                  Submit <ChevronRight className="ml-2 w-4 h-4" size={"sm"} />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}

      {submit === true && (
        <div className="flex gap-3 text-4xl py-36 justify-center items-center w-full h-full">
          <CheckCheckIcon color="#00f510" />
          <p className="text-green-500">Submitted</p>
        </div>
      )}

      {transactionID === "" && (
        <p className="text-red-600 text-sm mt-4">
          *Please read rules & regulations and enter the valid transaction ID*
        </p>
      )}
    </main>
  );
}

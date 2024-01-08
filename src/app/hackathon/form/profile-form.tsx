"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { CheckboxWithText } from "./check-box";
import { CheckCheckIcon } from "lucide-react";

// This can come from your database or API.

export function ProfileForm() {
  const [submit, setSubmit] = React.useState(false);
  const [teamLeaderName, setTeamLeaderName] = React.useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = React.useState("");
  const [teamLeaderPhone, setTeamLeaderPhone] = React.useState("");
  const [transactionID, setTrasactionID] = React.useState("");

  const [teamMemberName, setTeamMemebersName] = React.useState([]);
  const [teamMembersEmails, setTeamMemeberEmails] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
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

    const data = {
      TeamLeader: teamLeaderName,
      TeamLeaderEmail: teamLeaderEmail,
      TeamLeaderNumber: teamLeaderPhone,
      TeamMembers: teamMemberName,
      TeamMembersEmail: teamMembersEmails,
      TransactionID: transactionID,
      ProblemStatement: value,
    };
    try {
      await axios.post(
        "https://sheet.best/api/sheets/279366d4-f3e7-43da-82b9-87808dcf6def",
        data
      );
      setSubmit(true);
    } catch (error) {
      console.log(error);
    }
  };

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
                        placeholder="Elon Musk"
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
                        placeholder="elonmusk@gmail.com"
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
                        placeholder="9876543210"
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
              <a
                className="button-57 mt-5 mb-3"
                target="_blank"
                href="http://seminar.atmiya.ac.in/"
              >
                <span>Pay Fees</span>
                <span> 500₹ per team</span>
              </a>

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
                      ID will be given after the register fees.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5">
              <main className="mb-7 ">
                <CheckboxWithText />
              </main>

              <Button
                type="button"
                variant={"outline"}
                disabled={transactionID === ""}
                className="disabled:opacity-30"
                onClick={handleSubmit}
              >
                Submit <ChevronRight className="ml-2 w-4 h-4" size={"sm"} />
              </Button>
            </div>
          </form>
        </Form>
      )}

      {submit === true && (
        <div className="flex gap-3 text-3xl justify-center items-center w-full h-full">
          <CheckCheckIcon color="#00f510" />
          <p color="#00f510">Submitted</p>
        </div>
      )}
    </main>
  );
}

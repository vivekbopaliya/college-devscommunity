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
import { Courses, ProblemStatements, Universities } from "../problem-statement";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const [otherCourse, setOtherCourse] = React.useState("");
  const [teamMember1Name, setTeamMember1Name] = React.useState("");
  const route = useRouter();
  const [universityOpen, setUniversityOpen] = React.useState(false);
  const [courseOpen, setCourseOpen] = React.useState(false);
  const [otherCollege, setOtherCollege] = React.useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = React.useState("");

  const [university, setUniversity] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [course, setCourse] = React.useState("");

  const form = useForm<any>({
    mode: "onChange",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      Member_3: teamMember1Name,
      M3_Email: teamLeaderEmail,
      M3_College: university,
      M3_Other: otherCollege,
      M3_Course: course,
      M3_OtherCourse: otherCourse,
    };
    try {
      setIsLoading(true);

      const existingDataJSON = localStorage.getItem("teamLeader");

      const existingData = existingDataJSON ? JSON.parse(existingDataJSON) : {};

      const mergedData = { ...existingData, ...data };

      const mergedDataJSON = JSON.stringify(mergedData);

      localStorage.setItem("teamLeader", mergedDataJSON);

      const JSONDATA = localStorage.getItem("teamLeader");

      const dataObject = JSON.parse(JSONDATA!);
      await axios.post("/api/hackathon", dataObject);
      toast({
        title: "Your team's form has been submitted successfully.",
      });
      route.push("/");
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

  return (
    <main className="sm:pb-0 pb-10">
      <p className="text-sm font-light my-2 w-3/5 text-yellow-500">
        Form for team members, if there are none in your team other than you,
        simply proceed to the next step.
      </p>
      <Form {...form}>
        <form className="space-y-16">
          <div className="my-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Member 3's Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Full Name..."
                      value={teamMember1Name}
                      onChange={(e: any) => setTeamMember1Name(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This should be team member 3's name only.
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
                  <FormLabel>Team Member 3's Email</FormLabel>

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

          <div className="my-8  flex flex-col gap-3">
            <p className="text-sm font-light">
              Select Team Member 3's University
            </p>
            <Popover open={universityOpen} onOpenChange={setUniversityOpen}>
              <PopoverTrigger asChild>
                {/* @ts-ignore */}
                <Button
                  role="combobox"
                  className="w-[300px] justify-between dark:text-white"
                >
                  {university ? university : "Select your Univeristy"}
                  <ChevronsUpDown className="ml-2 h-4 w-10 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[500px] p-0  overflow-y-auto max-h-[400px]">
                <Command>
                  <CommandGroup>
                    {Universities.map((ps: any) => (
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
                            university === ps.label
                              ? "opacity-100"
                              : "opacity-0"
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
            <p className="text-sm font-light">Select team member 3's Course</p>
            <Popover open={courseOpen} onOpenChange={setCourseOpen}>
              <PopoverTrigger asChild>
                {/* @ts-ignore */}
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
                    {Courses.map((ps: any) => (
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
                            course === ps.label ? "opacity-100" : "opacity-0"
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

          <div className="mt-4">
            <Button
              isLoading={isLoading}
              type="button"
              variant={"outline"}
              className="disabled:opacity-30"
              onClick={handleSubmit}
            >
              Submit <ChevronRight className="ml-2 w-4 h-4" size={"sm"} />
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

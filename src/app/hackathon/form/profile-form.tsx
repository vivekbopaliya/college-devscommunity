"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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

// This can come from your database or API.

export function ProfileForm() {
  const [teamLeaderName, setTeamLeaderName] = React.useState("");
  const [teamLeaderEmail, setTeamLeaderEmail] = React.useState("");
  const [teamLeaderPhone, setTeamLeaderPhone] = React.useState("");

  const [teamMemberName, setTeamMemebersName] = React.useState([]);
  const [teamMembersEmails, setTeamMemeberEmails] = React.useState([]);

  const route = useRouter();
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
    };
    try {
      await axios.post(
        "https://sheet.best/api/sheets/279366d4-f3e7-43da-82b9-87808dcf6def",
        data
      );
      route.push("hackathon/payment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="sm:pb-0 pb-10">
      <Form {...form}>
        <form className="space-y-11">
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
                    This is team leader's name only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
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
                      onChange={(e: any) => setTeamLeaderEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This is team leader's email only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="my-5">
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
                      onChange={(e: any) => setTeamLeaderPhone(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    This is team leader's email only.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-5">
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
                      Add other team members names here.
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

            {fields.length < 4 && (
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
          </div>
          <div className="my-5">
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
                      Add other team members emails here.
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
            {fields.length < 4 && (
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
          </div>

          <Button type="button" onClick={handleSubmit}>
            Next <ChevronRight className="ml-2 w-4 h-4" size={"sm"} />
          </Button>
        </form>
      </Form>
    </main>
  );
}

"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { SubredditPayload } from "@/lib/validators/subreddit";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [input, setInput] = React.useState<string>("");
  const route = useRouter();

  const { mutate: createSubreddit, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubredditPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/subreddit", payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Subreddit already exists!",
            description: "Please choose diffrent name for Subreddit.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid subreddit name!",
            description: "Please choose a name between 3 and 21 letters.",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) {
          const loginToast = () => {
            const { dismiss } = toast({
              title: "Login required.",
              description: "You need to be logged in to do that.",
              variant: "destructive",
              action: (
                <Link
                  href="/sign-in"
                  onClick={() => dismiss()}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Login
                </Link>
              ),
            });
          };

          return loginToast();
        }
      }

      toast({
        title: "There was an error!",
        description: "Could not create subreddit, please try again.",
        variant: "destructive",
      });
    },

    onSuccess: (data) => {
      route.push(`/r/${data}`);
    },
  });

  return (
    <div className="max-w-2xl mx-auto flex items-center  h-fit inset-0 py-2 dark:bg-black dark:text-white bg-white rounded-lg ">
      <div className="relative flex flex-col gap-4 w-full px-5 py-3">
        <h1 className="font-semibold text-lg">Create a community</h1>

        <hr className="bg-zinc-500 dark:bg-zinc-700 h-px" />
        <div className="flex flex-col ">
          <p className="font-semibold ">Name</p>
          <p className="text-xs">
            Community name including capitalization cannot be changed
          </p>
        </div>

        <div className="relative">
          <p className="absolute grid w-8 text-zinc-500 dark:text-zinc-200 inset-y-0 place-items-center">
            r/
          </p>
          <Input
            className="pl-6"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            className="dark:text-white dark:hover:bg-transparent"
            variant="ghost"
            onClick={() => {
              route.push("/");
            }}
          >
            Cancel
          </Button>

          <Button
            className="dark:bg-white dark:text-black"
            onClick={() => createSubreddit()}
            disabled={input.length === 0}
            isLoading={isLoading}
          >
            Create Community
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;

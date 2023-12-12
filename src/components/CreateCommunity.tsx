"use client";

import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { SubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

const CreateCommunity = () => {
  const router = useRouter();
  const [input, setInput] = React.useState("");

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
      router.push(`/r/${data}`);
    },
  });
  return (
    <div>
      <Dialog>
        <DialogTrigger
          className={cn(buttonVariants(), "mt-4 dark:mb-5 w-full")}
        >
          Create Community
        </DialogTrigger>
        <DialogContent className=" bg-white dark:bg-black rounded-lg">
          <DialogHeader>
            <h1 className="font-bold text-2xl">Create a community</h1>
          </DialogHeader>

          <DialogDescription>
            <div className="flex flex-col ">
              <p className="font-semibold text-lg ">Name</p>
              <p className="text-xs">
                Community name including capitalization cannot be changed
              </p>
            </div>
            <div className="relative">
              <p className="absolute grid w-8 text-zinc-500 dark:text-zinc-300 inset-y-0 place-items-center">
                r/
              </p>
              <Input
                className="pl-6 mt-4 text-black dark:text-white"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-4 mt-5">
              <DialogClose>
                <Button className={buttonVariants()}>Cancel</Button>
              </DialogClose>

              <Button
                isLoading={isLoading}
                className={cn(
                  buttonVariants(),
                  "dark:text-black dark:bg-white dark:hover:text-black"
                )}
                onClick={() => createSubreddit()}
              >
                Create Community
              </Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCommunity;

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
      <div className="overflow-hidden h-fit  rounded-lg border border-gray-100 order-1 ">
        <div className="bg-black px-6 py-4">
          <p className="font-semibold py-3 text-white flex items-center gap-1.5">
            <UserPlus />
            Create your community
          </p>
        </div>

        <div className="-my-3 divide-y  px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-4">
            <p className="text-zinc-500">
              Create your own community and gather people with same intrests
            </p>
          </div>

          <Dialog>
            <DialogTrigger className={cn(buttonVariants(), "mt-4 w-full")}>
              Create Community
            </DialogTrigger>
            <DialogContent className=" bg-white rounded-lg">
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
                  <p className="absolute grid w-8 text-zinc-500 inset-y-0 place-items-center">
                    r/
                  </p>
                  <Input
                    className="pl-6 mt-2 text-black"
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-5">
                  <DialogClose>
                    <Button variant={"ghost"}>Cancel</Button>
                  </DialogClose>

                  <Button
                    isLoading={isLoading}
                    onClick={() => createSubreddit()}
                  >
                    Create Community
                  </Button>
                </div>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;

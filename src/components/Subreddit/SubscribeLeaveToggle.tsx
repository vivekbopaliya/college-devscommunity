"use client";

import React, { FC, startTransition } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, buttonVariants } from "../ui/Button";
import { SubscriptionPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
  subredditId: string;
  subredditName: string;
}
const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
  subredditId,
  subredditName,
}) => {
  const router = useRouter();

  //   Subscribe

  const { mutate: joinCommunity, isLoading: subLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscriptionPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
    },
    onError: (err: any) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          const logintoast = () => {
            const { dismiss } = toast({
              title: "Login required!",
              description: "You need to be login to do that.",
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
          return logintoast();
        }
      }

      return toast({
        title: "Something went wrong!",
        description: "There was an error, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Subscribed!",
        description: `You are now subscribed to to r/${subredditName}`,
      });
    },
  });

  //   Unsubscibe

  const { mutate: leaveCommunity, isLoading: unsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscriptionPayload = {
        subredditId,
      };
      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
    },
    onError: (err: any) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          const logintoast = () => {
            const { dismiss } = toast({
              title: "Login required!",
              description: "You need to be login to do that.",
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
          return logintoast();
        }
      }

      return toast({
        title: "Something went wrong!",
        description: "There was an error, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });

      return toast({
        title: "Unsubscribed!",
        description: `You are no longer subscribed to to r/${subredditName}`,
      });
    },
  });

  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      onClick={() => leaveCommunity()}
      isLoading={unsubLoading}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={subLoading}
      variant={"outline"}
      onClick={() => joinCommunity()}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;

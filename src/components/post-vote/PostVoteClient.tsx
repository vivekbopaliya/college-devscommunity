"use client";

import { PostVoteRequest } from "@/lib/validators/vote";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "../../hooks/use-toast";
import { Button, buttonVariants } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HoverCard } from "@radix-ui/react-hover-card";
import { HoverCardContent, HoverCardTrigger } from "../ui/Hover";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
}

const PostVoteClient = ({
  postId,
  initialVotesAmt,
  initialVote,
}: PostVoteClientProps) => {
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      };

      await axios.patch("/api/subreddit/post/vote", payload);
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1);
      else setVotesAmt((prev) => prev + 1);

      // reset current vote
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
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

      return toast({
        title: "Something went wrong.",
        description: "Your vote was not registered. Please try again.",
        variant: "destructive",
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type);
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 justify-center items-center sm:pb-0">
      {/* upvote */}
      <HoverCard openDelay={700}>
        <HoverCardTrigger>
          <Button
            onClick={() => vote("UP")}
            size="sm"
            variant="ghost"
            aria-label="upvote"
          >
            <ArrowBigUp
              className={cn("h-5 w-5 text-zinc-700", {
                "text-emerald-500 fill-emerald-500": currentVote === "UP",
              })}
            />
          </Button>
          <HoverCardContent className="px-3 py-2 w-fit text-base">
            Upvote
          </HoverCardContent>
        </HoverCardTrigger>
      </HoverCard>

      {/* score */}
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>

      {/* downvote */}
      <HoverCard openDelay={700}>
        <HoverCardTrigger>
          <Button
            onClick={() => vote("DOWN")}
            size="sm"
            className={cn({
              "text-emerald-500": currentVote === "DOWN",
            })}
            variant="ghost"
            aria-label="downvote"
          >
            <ArrowBigDown
              className={cn("h-5 w-5 text-zinc-700", {
                "text-red-500 fill-red-500": currentVote === "DOWN",
              })}
            />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="px-3 py-2 w-fit text-base">
          Downvote
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default PostVoteClient;

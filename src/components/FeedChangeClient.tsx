"use client";

import React, { FC } from "react";
import CreateCommunity from "./CreateCommunity";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import CommunititesTable from "./CommunititesTable";
import { Subreddit } from "@prisma/client";

type Feed = "GENERAL" | "FOR YOU";

interface FeedChangeClientProps {
  children: React.ReactNode;
  children2: React.ReactNode;
  mostPostsCommunities: Subreddit[];
  mostFollowedCommunities: Subreddit[];
  newCommunities: Subreddit[];
}
const FeedChangeClient: FC<FeedChangeClientProps> = ({
  children,
  children2,
  newCommunities,
  mostPostsCommunities,
  mostFollowedCommunities,
}) => {
  const [feed, setFeed] = React.useState<Feed>("GENERAL");

  const toggleFeed = () => {
    if (feed === "GENERAL") setFeed("FOR YOU");
    if (feed === "FOR YOU") setFeed("GENERAL");
  };

  return (
    <div className="sm:pt-12 pt-8 sm:container sm:mx-auto h-full">
      <div>
        <div className="sm:text-5xl dark:text-gray-200 text-3xl font-bold flex  items-center my-2  gap-5">
          <h1>{feed === "GENERAL" ? "General" : "Customized"} feed</h1>
          <Button
            className={cn(buttonVariants({ variant: "outline" }))}
            onClick={toggleFeed}
          >
            {feed === "GENERAL"
              ? "Switch to customized feed"
              : "Switch to general feed"}
          </Button>
        </div>

        <div className="grid sm:grid-cols-9 grid-col-1 mt-4  sm:order-none  gap-10   py-6">
          <ul className="flex flex-col sm:col-span-6 order-last sm:order-first space-x-8 overflow-y-auto">
            {feed === "GENERAL" && children}
            {feed === "FOR YOU" && children2}
          </ul>

          {/* subreddit info */}
          <div className="gap-y-4 hidden sm:block sm:col-span-3">
            {/* Feed */}

            {/* Subreddit Info */}
            <CommunititesTable
              mostFollowedCommunities={mostFollowedCommunities}
              mostPostsCommunities={mostPostsCommunities}
              newCommunities={newCommunities}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedChangeClient;

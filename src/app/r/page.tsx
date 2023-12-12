import FeedChangeClient from "@/components/FeedChangeClient";
import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import React from "react";
import { db } from "@/lib/db";

const page = async () => {
  const mostFollowedCommunities = await db.subreddit.findMany({
    orderBy: {
      subscribers: {
        _count: "desc",
      },
    },
    take: 5,
  });

  const mostPostsCommunities = await db.subreddit.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    take: 5,
  });

  const newCommunities = await db.subreddit.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div>
      <FeedChangeClient
        /* @ts-ignore */

        children={<GeneralFeed />}
        /* @ts-ignore */

        children2={<CustomFeed />}
        mostFollowedCommunities={mostFollowedCommunities}
        mostPostsCommunities={mostPostsCommunities}
        newCommunities={newCommunities}
      />
    </div>
  );
};

export default page;

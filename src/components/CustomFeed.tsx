import { db } from "@/lib/db";
import React from "react";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { Label } from "./ui/Label";
import { InfoIcon } from "lucide-react";

const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedCommunites = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      subreddit: true,
    },
  });

  const followedPosts = await db.post.findMany({
    where: {
      subreddit: {
        name: {
          in: followedCommunites.map((sub) => sub.subreddit.name),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      comments: true,
      subreddit: true,
      votes: true,
    },
  });
  return (
    <div>
      <h1 className="text-gray-600 flex gap-2  text-xl font-extralight">
        <InfoIcon />
        {(!session || !followedCommunites) &&
          "You need to sign-in and join your favourite communities to get this feed."}{" "}
      </h1>
      {session && (
        <PostFeed
          initialPosts={followedPosts}
          h1={"Post from community you have joined"}
        />
      )}
    </div>
  );
};

export default CustomFeed;

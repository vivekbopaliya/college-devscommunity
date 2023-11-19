import { db } from "@/lib/db";
import React from "react";
import PostFeed from "../PostFeed";
import { getAuthSession } from "@/lib/auth";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { Label } from "../ui/Label";

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
      <h1 className="mb-5 text-gray-800 font-light max-w-4xl text-sm px-3 py-2">
        Join your favorite communities to get better Customized feed.
      </h1>
      <PostFeed initialPosts={followedPosts} />
    </div>
  );
};

export default CustomFeed;

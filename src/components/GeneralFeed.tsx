import { db } from "@/lib/db";
import React from "react";
import PostFeed from "./PostFeed";

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
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
      <PostFeed initialPosts={posts} />
    </div>
  );
};

export default GeneralFeed;

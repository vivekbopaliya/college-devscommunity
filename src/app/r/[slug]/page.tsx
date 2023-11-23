import PostFeed from "@/components/PostFeed";
import MiniCreatePost from "@/components/MiniCreatePost";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}
const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!subreddit) return notFound();
  const sesssion = await getAuthSession();
  return (
    <>
      <h1 className="font-bold text-5xl md:text-6xl h-14 my-4 sm:my-0">
        r/{slug}
      </h1>

      <MiniCreatePost session={sesssion} />
      <PostFeed subredditName={slug} initialPosts={subreddit.posts} />
    </>
  );
};

export default page;

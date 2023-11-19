"use client";

import { formatTimeToNow } from "@/lib/utils";
import type { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { FC, useRef } from "react";
import EditorOutput from "./Subreddit/EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import { HoverCardContent, HoverCard, HoverCardTrigger } from "./ui/Hover";
// import EditorOutput from "./EditorOutput";
// import PostVoteClient from "./post-vote/PostVoteClient";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmt: number;
  subredditName: string;
  currentVote?: PartialVote;
  commentAmt: number;
}

const Post: FC<PostProps> = ({
  post,
  votesAmt,
  currentVote,
  subredditName,
  commentAmt,
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="rounded-md bg-white shadow ">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient
          postId={post.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote?.type}
        />

        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {subredditName ? (
              <>
                <HoverCard openDelay={700}>
                  <HoverCardTrigger>
                    <Link
                      className="underline text-zinc-900 text-sm underline-offset-2"
                      href={`/r/${subredditName}`}
                    >
                      r/{subredditName}
                    </Link>
                    <HoverCardContent className="w-fit  text-base">
                      Go to r/{subredditName}
                    </HoverCardContent>
                  </HoverCardTrigger>
                </HoverCard>
                <span className="px-1 mx-1">•</span>
              </>
            ) : null}
            <span className="mx-1">
              Posted by u/
              <span className="font-bold">{post.author.name}</span>
            </span>
            <span className="ml-3">
              {formatTimeToNow(new Date(post.createdAt))}
            </span>
          </div>
          <a href={`/r/${subredditName}/post/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 max-w-3xl overflow-hidden leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>

          <div
            className="relative text-sm max-h-40 h-full w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput content={post.content} />
            {pRef.current?.clientHeight === 160 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 text-black z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/${subredditName}/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  );
};
export default Post;

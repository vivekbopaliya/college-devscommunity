import type { Comment, Post, Subreddit, User, Vote } from "@prisma/client";

export type ExtendedPosts = Post & {
  subreddit: Subreddit;
  votes: Vote[];
  comments: Comment[];
  author: User;
};

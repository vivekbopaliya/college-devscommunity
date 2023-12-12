import type {
  Comment,
  Post,
  Subreddit,
  Subscription,
  User,
  Vote,
} from "@prisma/client";

export type ExtendedPosts = Post & {
  subreddit: Subreddit;
  votes: Vote[];
  comments: Comment[];
  author: User;
};

export type ExtendedCommunities = Subreddit & {
  subscriptions: Subscription;
  posts: Post;
};

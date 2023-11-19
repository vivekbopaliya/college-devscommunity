import { VoteType } from "@prisma/client";

export type CachedPost = {
  id: string;
  title: string;
  content: string;
  currentVote: VoteType;
  createdAt: Date;
};

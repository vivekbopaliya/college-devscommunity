import { z } from "zod";

export const SubredditValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Subreddit name must be atleast 3 characters long." })
    .max(21, { message: "Subreddit name must be smaller than 21 characters." }),
});

export const SubscriptionValidator = z.object({
  subredditId: z.string(),
});
export type SubredditPayload = z.infer<typeof SubredditValidator>;
export type SubscriptionPayload = z.infer<typeof SubscriptionValidator>;

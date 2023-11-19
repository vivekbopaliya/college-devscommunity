import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized!", { status: 401 });
    }

    const { subredditId } = SubscriptionValidator.parse(body);

    const subscriptionExits = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExits) {
      return new Response("You are not subscribed to Subreddit, yet!");
    }

    await db.subscription.deleteMany({
      where: {
        subredditId,
        userId: session.user.id,
        subreddit: {
          subscribers: {
            some: {
              userId: session.user.id,
              subredditId,
            },
          },
        },
      },
    });

    return new Response(subredditId);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data provided!", { status: 422 });
    }

    return new Response(error.message, { status: 500 });
  }
}

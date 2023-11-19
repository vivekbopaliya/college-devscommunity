import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized!", { status: 401 });
    }

    const { name } = SubredditValidator.parse(body);

    const subredditExits = await db.subreddit.findFirst({
      where: {
        name,
      },
    });

    if (subredditExits) {
      return new Response("Subreddit already exits with this name", {
        status: 409,
      });
    }

    const subreddit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    });

    await db.subscription.create({
      data: {
        subredditId: subreddit.id,
        userId: session.user.id,
      },
    });

    return new Response(subreddit.name);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid Name!", { status: 422 });
    }

    return new Response(error.message, { status: 500 });
  }
}

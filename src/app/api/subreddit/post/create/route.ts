import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized!", { status: 401 });
    }

    const { subredditId, title, content } = PostValidator.parse(body);

    const subscribeToSubreddit = await db.subscription.findFirst({
      where: {
        subredditId,
        userId: session.user.id,
      },
    });

    if (!subscribeToSubreddit) {
      return new Response("You need to be subscribed to post.", {
        status: 403,
      });
    }

    await db.post.create({
      data: { title, subredditId, content, authorId: session.user.id },
    });

    return new Response("OK");
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data!", { status: 400 });
    }

    return new Response(error.message, { status: 500 });
  }
}

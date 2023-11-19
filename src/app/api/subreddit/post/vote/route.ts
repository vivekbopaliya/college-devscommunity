import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/validators/redis";
import { PostVoteValidator } from "@/lib/validators/vote";
import { CachedPost } from "@/types/redis";
import { ZodError } from "zod";

const CACHE_AFTER_UPVOTES = 1;

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized!", { status: 401 });
    }

    const body = await req.json();

    const { postId, voteType } = PostVoteValidator.parse(body);

    const existionVote = await db.vote.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });

    if (existionVote) {
      if (existionVote.type === voteType) {
        await db.vote.deleteMany({
          where: {
            userId: session.user.id,
            postId,
          },
        });
        return new Response("OK");
      }
    }

    await db.vote.updateMany({
      where: {
        postId,
      },
      data: {
        postId,
        type: voteType,
        userId: session.user.id,
      },
    });

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });

    if (!post) {
      return new Response("Post not found!", { status: 404 });
    }

    const voteAmt = post?.votes.reduce((acc, vote) => {
      if (vote.type === "UP") acc + 1;
      if (vote.type === "DOWN") acc - 1;
      return acc;
    }, 0);

    if (voteAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedPost = {
        id: post.id,
        content: JSON.stringify(post.content),
        createdAt: post.createdAt,
        currentVote: voteType,
        title: post.title,
      };

      await redis.hset(`post: ${postId}`, cachePayload);
    }

    await db.vote.create({
      data: {
        postId,
        userId: session.user.id,
        type: voteType,
      },
    });

    const votesAmt = post?.votes.reduce((acc, vote) => {
      if (vote.type === "UP") acc + 1;
      if (vote.type === "DOWN") acc - 1;
      return acc;
    }, 0);

    if (votesAmt >= CACHE_AFTER_UPVOTES) {
      const cachePayload: CachedPost = {
        id: post.id,
        content: JSON.stringify(post.content),
        createdAt: post.createdAt,
        currentVote: voteType,
        title: post.title,
      };

      await redis.hset(`post: ${postId}`, cachePayload);
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid data passed!", { status: 422 });
    }

    return new Response("Could not register your vote, please try again!", {
      status: 500,
    });
  }
}

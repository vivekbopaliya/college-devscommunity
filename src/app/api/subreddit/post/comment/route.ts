import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session) {
      return new Response("Unauthorized!", { status: 401 });
    }

    const body = await req.json();

    const { text, postId, replyToId } = CommentValidator.parse(body);

    await db.comment.create({
      data: {
        authorId: session.user.id,
        replyToId,
        content: text,
        postId,
      },
    });

    return new Response("OK");
  } catch (error: any) {
    if (error instanceof ZodError) {
      return new Response("Invalid Data!", { status: 400 });
    }
    return new Response(error.message, { status: 500 });
  }
}

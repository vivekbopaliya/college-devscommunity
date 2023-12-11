import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PointsValidtor } from "@/lib/validators/points";
import { z } from "zod";

export async function PUT(req: Request) {
  const body = await req.json();
  try {
    const session = await getAuthSession();

    // if (!session?.user) {
    //   return new Response("Unauthorized!", { status: 401 });
    // }

    // const user = await db.user.findFirst({
    //   where: {
    //     id: session.user.id,
    //   },
    // });
    // if (user?.role === "User") {
    //   return new Response("You cannot do that!", { status: 400 });
    // }

    const { point, userId } = PointsValidtor.parse(body);
    console.log(point, userId);

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        points: point,
      },
    });

    return new Response("ok");
  } catch (error: any) {
    console.error(error);
    return new Response(error, { status: 500 });
  }
}

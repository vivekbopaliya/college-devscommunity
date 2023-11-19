import { format } from "date-fns";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import SubscribeLeaveToggle from "@/components/Subreddit/SubscribeLeaveToggle";

export const metadata: Metadata = {
  title: "GDSC - AU",
  description: "A community for Atmiya devs",
};

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: { slug: any };
}) => {
  const session = await getAuthSession();

  const currentSubreddit = await db.subreddit.findFirst({
    where: {
      name: slug,
    },
    include: {
      creator: true,
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          subredditId: currentSubreddit?.id,
          userId: session?.user.id,
        },
      });

  const isSubscribed = !!subscription;

  const memberCount = await db.subscription.count({
    where: {
      subreddit: {
        name: slug,
      },
    },
  });

  if (!currentSubreddit) return notFound();
  return (
    <div className="pt-12 sm:container mx-auto h-full">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          {/* create post */}
          <ul className="flex flex-col col-span-2 space-y-6">{children}</ul>

          {/* subreddit info */}
          <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4 bg-black text-white">
              <p className="font-semibold py-1  text-lg">
                About r/{currentSubreddit?.name}
              </p>
            </div>

            <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-700 font-semibold">
                  <time dateTime={currentSubreddit.createdAt.toDateString()}>
                    {format(currentSubreddit.createdAt, "MMMM d, yyyy")}
                  </time>
                </dd>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Members</dt>

                <dd className="flex items-start gap-x-2">
                  <p className="text-gray-900 font-semibold">{memberCount}</p>
                </dd>
              </div>

              {currentSubreddit.creatorId === session?.user.id ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">You created this community</dt>
                </div>
              ) : null}

              {currentSubreddit.creatorId !== session?.user?.id ? (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  subredditId={currentSubreddit.id}
                  subredditName={currentSubreddit.name}
                />
              ) : null}

              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full mb-6",
                })}
                href={`/r/${slug}/submit`}
              >
                Create Post
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

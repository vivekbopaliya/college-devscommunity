"use client";

import { HomeIcon, LayoutDashboardIcon, NewspaperIcon } from "lucide-react";
import React from "react";
import { buttonVariants } from "../ui/Button";
import Link from "next/link";

const NavigationCharts = () => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 mt-10 py-6">
      <div className="overflow-hidden h-fit dark:border-opacity-20 rounded-lg border border-gray-100  dark:border-white order-last">
        <div className="bg-red-100 dark:bg-purple-600 dark:text-black px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            <LayoutDashboardIcon />
            Dashboard
          </p>
        </div>

        <div className="-my-3 divide-y divide-gray-300 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-4">
            <p className="text-zinc-500">
              Find your rank between more than 200 GDSC members.
            </p>
          </div>

          <Link
            className={buttonVariants({
              className: "dark:bg-white dark:text-black w-full mt-4 mb-6",
            })}
            href="/dashboard"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
      {/* Subreddit Info */}
      <div className="overflow-hidden dark:border-white h-fit rounded-lg border dark:border-opacity-20 border-gray-100 order-first ">
        <div className="bg-emerald-100 dark:bg-emerald-500 dark:text-black px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            <HomeIcon />
            Communities
          </p>
        </div>

        <div className="-my-3 divide-y divide-gray-300 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-4">
            <p className="text-zinc-500">
              Come here to check in with your favorite Atmiya comunities.
            </p>
          </div>

          <Link
            className={buttonVariants({
              className: "dark:bg-white dark:text-black w-full mt-4 mb-6",
            })}
            href="/r/"
          >
            Go to Communities
          </Link>
        </div>
      </div>
      <div className="overflow-hidden dark:border-opacity-20 dark:border-white h-fit rounded-lg border border-gray-100 order-2 ">
        <div className="bg-amber-100 dark:bg-cyan-500 dark:text-black px-6 py-4">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            <NewspaperIcon />
            Newletters
          </p>
        </div>

        <div className="-my-3 divide-y divide-gray-300 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-4">
            <p className="text-zinc-500">
              Check out the articles of GDSC members and find out the latest
              tech updates.
            </p>
          </div>

          <Link
            className={buttonVariants({
              className: "w-full mt-4 mb-6 dark:bg-white dark:text-black",
            })}
            href="/newsletters"
          >
            Read Newsletters
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationCharts;

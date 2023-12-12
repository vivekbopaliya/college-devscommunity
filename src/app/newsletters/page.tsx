import { Button, buttonVariants } from "@/components/ui/Button";
import techtales from "./techtales.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Recent Magazines</h1>
      <div className="max-w-full min-h-full flex ">
        <div className="flex gap-2 dark:bg-slate-900 bg-gray-200 px-3 py-4  rounded-sm dark:text-white text-black">
          <Image
            src={techtales}
            className="w-56 h-56 object-contain "
            alt="techtales"
          />

          <main className="flex flex-col   gap-3">
            <p className="font-bold dark:text-white  text-black text-3xl">
              Tech Tales
            </p>
            <p className=" my-1 text-xs max-w-sm min-h-fit text-slate-700 dark:text-slate-400">
              Explore the dynamic world of our club in 'Innovate & Elevate.'
              From AI-hosted events and programming fundamentals to data
              insights and hackathon chronicles, journey through our past works
              and the Google Solution Challenge. Introducing 'Innovate &
              Elevate,' this magazine offers a sneak peek into the vibrant
              events and collaborative innovation at GDSC.
            </p>
            <Link href="/TechTales.pdf" legacyBehavior target="_blank">
              <a
                target="_blank"
                className={buttonVariants({ variant: "outline" })}
              >
                Check out
              </a>
            </Link>
          </main>
        </div>
      </div>
    </>
  );
};

export default page;

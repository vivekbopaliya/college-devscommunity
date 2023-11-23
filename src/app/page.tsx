import { Button, buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import {
  Code2Icon,
  GithubIcon,
  HomeIcon,
  InstagramIcon,
  LayoutDashboardIcon,
  LinkedinIcon,
  NewspaperIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordian";
import photo from "@/components/Navbar/photo.jpeg";
import { signOut } from "next-auth/react";
import SignOut from "@/components/SignOut";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div className="container   ">
      <div className="w-full relative flex flex-col transition-bg justify-center items-center  ">
        <div className="absolute w-screen -mt-16 inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <div className="flex relative flex-col justify-center items-center text-center gap-4 max-w-5xl h-fit my-10">
          <p className="text-xs font-light mb-3 rounded-lg border-opacity-30 px-3 py-2 dark:text-slate-100 text-slate-900 border border-slate-900 dark:border-slate-100 ">
            First time at Atmiya University
          </p>
          <p className="sm:text-8xl text-6xl w-full dark:text-white text-black font-bold">
            Google Developers Student Club
          </p>

          <p className="text-slate-500  sm:text-2xl text-xl">
            Connect. Interact. Learn. Grow.
          </p>

          <div className="flex gap-3 mt-5">
            <Link
              className={cn(buttonVariants({ size: "lg" }), " font-bold ")}
              href="/r"
            >
              Your Feed
            </Link>

            <SignOut session={session} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 mt-10 py-6">
        {/* Feed */}

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

      <div className="sm:grid sm:grid-cols-12 sm:gap-10 flex flex-col gap-2 min-h-fit my-24 ">
        <div className="sm:col-span-7  min-h-fit">
          <Image src={photo} alt="photo" className="h-49" />
        </div>

        <div className="flex sm:flex flex-col sm:col-span-5  sm:gap-2 gap-5 ">
          <p className="text-lg my-1 font-light sm:block hidden">ABOUT US</p>
          <h1 className="text-4xl font-bold my-3">
            What is <span className="text-red-500">G</span>
            <span className="text-blue-500">D</span>
            <span className="text-green-500">S</span>
            <span className="text-yellow-500">C</span> & why shoud you care?
          </h1>
          <div className="flex flex-col justify-center items-center">
            <p className=" text-center dark:text-gray-200  my-4">
              GDSC-AU is like a tech-savvy family within our university, all
              geared up to explore the tech universe with Google's tools. Our
              main gig? Boosting each other's developer skills and actually
              using what we learn.Think of us as the cool kids organizing a
              bunch of exciting stuff – webinars, hands-on workshops, talks –
              you name it. But our goal is more than just sharing info, it's
              about building a community.
            </p>

            <Link
              target="_blank"
              href={"https://gdsc.community.dev/atmiya-university-rajkot/"}
              className={cn(buttonVariants({ size: "lg" }), " my-3 font-bold")}
            >
              Join GDSC
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center    z-0">
        <div className=" max-w-3xl flex flex-col justify-center items-center ">
          <h1 className=" text-lg font-light">FAQs</h1>

          <h1 className="sm:text-6xl text-4xl font-bold my-8">
            {" "}
            <span className="text-red-500">G</span>et
            <span className="text-blue-500"> I</span>n{" "}
            <span className="text-green-500">T</span>ocu
            <span className="text-yellow-500">H</span>
          </h1>
          <Accordion type="single" className="w-full ">
            <AccordionItem
              value="item-1"
              className="flex flex-col justify-center"
            >
              <AccordionTrigger
                defaultChecked
                className="font-medium text-xl text-blue-600"
              >
                How to join GDSC AU?
              </AccordionTrigger>

              <AccordionContent className="sm:text-lg text-base leading-relaxed">
                You can join GDSC AU by clicking on the above JOIN GDSC button
                and be a part of community filled with passionate and
                enthusiastic individuals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="flex flex-col justify-center
              "
            >
              <AccordionTrigger className="font-medium text-xl text-blue-600">
                Who should join GDSC AU?
              </AccordionTrigger>
              <AccordionContent className="sm:text-lg text-base leading-relaxed">
                Anyone who is interested in tech and dedicated to learn new
                technologies and make strong connections should join GDSC AU?
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="flex flex-col justify-center"
            >
              <AccordionTrigger className="font-medium text-xl text-blue-600">
                What is the purpose of GDSC?
              </AccordionTrigger>
              <AccordionContent className="sm:text-lg text-base  leading-relaxed">
                The purpose of GDSC is to enlighten the students about the
                present and upcoming technologies and help them in their journey
                of learning new stuff.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="flex flex-col ">
              <AccordionTrigger className="font-medium text-xl text-blue-600">
                What is the purpose of this Website?
              </AccordionTrigger>
              <AccordionContent className="sm:text-lg text-base  leading-relaxed">
                The purpose of this website is to provide a bridge for people
                who want to find a community of people having same intrests as
                them, use it to showcase your personal project, share new tech
                news or asking for help to solve your error. find your community
                and if it doesnt exist? Create one. its all yours.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex mt-10 justify-center items-center">
        <div className=" flex gap-2 ">
          <Link
            target="_blank"
            href="https://www.instagram.com/gdsc.atmiya?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
            className={buttonVariants()}
          >
            <InstagramIcon />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/company/gdsc-atmiya-university/"
            className={buttonVariants()}
          >
            <LinkedinIcon />
          </Link>
          <Link
            target="_blank"
            href="https://github.com/GDSCAtmiya01"
            className={buttonVariants()}
          >
            <GithubIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import photo from "@/components/Navbar/photo.jpeg";
import SignOut from "@/components/SignOut";
import YourFeedLink from "@/components/Home/YourFeedLink";
import NavigationCharts from "@/components/Home/NavigationCharts";
import JoinGDSC from "@/components/Home/JoinGDSC";
import FAQs from "@/components/Home/FAQs";
import SocialMedia from "@/components/Home/SocialMedia";
import { AlignRightIcon, GithubIcon } from "lucide-react";
import Link from "next/link";
import whatsapplogo from "../components/whatsapp-logo.png";
import emailogo from "../components/email-logo.png";
import gdsc_au from "../components/gdsclogo.png";
import instagramlogo from "../components/instragram-logo.png";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div className="container ">
      <div className="w-full relative flex  justify-center items-center">
        <div className="absolute w-full sm:ml-[150px]  ml-20   -mt-16 inset-0 overflow-hidden">
          <div className="jumbo absolute inset-[10px] opacity-50   overflow-hidden "></div>
        </div>
        <div className="flex relative flex-col justify-center items-center text-center gap-4 max-w-5xl h-fit my-10">
          <Link href="/hackathon">
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
              🎉
              <span className="hidden sm:inline">
                Know about upcoming hackathon
              </span>
            </div>
          </Link>
          <p className="sm:text-8xl text-6xl w-full dark:text-white text-black font-bold">
            Google Developers Student Club
          </p>

          <p className="text-slate-500  sm:text-2xl text-xl">
            For the Developers, by the Developers.
          </p>

          <div className="flex gap-3 mt-5">
            <YourFeedLink />

            <SignOut session={session} />
          </div>
        </div>
      </div>
      <div>
        {/* Feed */}
        <NavigationCharts />
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
            <span className="text-yellow-500">C</span> & why should you care?
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

            <JoinGDSC />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center items-center  pt-14  z-0">
        <div className=" max-w-3xl flex flex-col justify-center items-center ">
          <h1 className=" text-lg font-light">FAQs</h1>

          <h1 className="sm:text-6xl text-4xl font-bold my-8">
            {" "}
            <span className="text-red-500">G</span>et
            <span className="text-blue-500"> I</span>n{" "}
            <span className="text-green-500">T</span>ouc
            <span className="text-yellow-500">H</span>
          </h1>

          <FAQs />
        </div>
      </div>

      <div className="pt-28  sm:-ml-40 -ml-14 w-screen h-full">
        <div className="py-4 h-full flex  pb-5 justify-around items-center  dark:bg-slate-900 dark:text-white bg-black text-white">
          <main className="flex-col sm:flex  hidden justify-center items-start  ">
            {/* <Image
              src={gdsc_au}
              alt="Atmiyalogo"
              className="w-32  h-32    my-2 object-contain"
            /> */}

            <p className="py-2 ">Connect with GDSC: </p>
            <div className="flex gap-4 row r">
              <a href="https://www.instagram.com/gdsc.atmiya?igsh=MTVweTFwNGdqdWN4eQ==">
                <Image
                  height={20}
                  width={20}
                  src={instagramlogo}
                  alt="Instagram"
                  className="bounce-out-on-hover object-contain h-8 w-8 rounded-full"
                />
              </a>{" "}
              <a href="https://www.linkedin.com/company/gdsc-atmiya-university/">
                <Image
                  height={20}
                  width={20}
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"
                  }
                  alt="Linkedin"
                  className="bounce-out-on-hover h-8 w-8 rounded-full"
                />
              </a>{" "}
              <a href="https://whatsapp.com/channel/0029VaDA0a52f3EJBeidSK0B">
                <Image
                  height={20}
                  width={20}
                  src={whatsapplogo}
                  alt="Whatsapp "
                  className="bounce-out-on-hover w-8 h-8 rounded-full"
                />
              </a>{" "}
            </div>

            <p className="pt-10 text-sm text-gray-500">
              Copyright © 2024 Google Developers Student Club, All rights
              reserved.
            </p>
          </main>
          <div className="flex flex-col justify-center text-sm  items-center">
            <a
              className="py-4 text-sm"
              href="https://www.linkedin.com/in/vivek-bopaliya-391596246/"
            >
              Designed & Developed by{" "}
              <span className="text-blue-600  max-w-lg hover:underline">
                Vivek Bopaliya
              </span>
            </a>

            <div className="text-sm justify-center flex items-center gap-3">
              <p>Souce Code:</p>
              <a
                href="https://github.com/vivekbopaliya/college-devscommunity"
                className="flex gap-2 justify-center items-center"
              >
                <GithubIcon className="bounce-out-on-hover h-8 w-8" />{" "}
                <p className="text-sm font-light text-blue-600 underline">
                  Github
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

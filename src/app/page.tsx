import { getAuthSession } from "@/lib/auth";
import Image from "next/image";
import photo from "@/components/Navbar/photo.jpeg";
import SignOut from "@/components/SignOut";
import YourFeedLink from "@/components/Home/YourFeedLink";
import NavigationCharts from "@/components/Home/NavigationCharts";
import JoinGDSC from "@/components/Home/JoinGDSC";
import FAQs from "@/components/Home/FAQs";
import SocialMedia from "@/components/Home/SocialMedia";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div className="container pb-5">
      <div className="w-full relative flex  justify-center items-center">
        <div className="absolute w-full sm:ml-[150px]  ml-16   -mt-16 inset-0 overflow-hidden">
          <div className="jumbo absolute inset-[10px] opacity-50   overflow-hidden "></div>
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

      <div className="w-full flex justify-center items-center    z-0">
        <div className=" max-w-3xl flex flex-col justify-center items-center ">
          <h1 className=" text-lg font-light">FAQs</h1>

          <h1 className="sm:text-6xl text-4xl font-bold my-8">
            {" "}
            <span className="text-red-500">G</span>et
            <span className="text-blue-500"> I</span>n{" "}
            <span className="text-green-500">T</span>ouch
            <span className="text-yellow-500">H</span>
          </h1>

          <FAQs />
        </div>
      </div>

      <div className="flex mt-10 justify-center items-center">
        <SocialMedia />
      </div>
    </div>
  );
}

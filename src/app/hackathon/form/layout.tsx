import { Metadata } from "next";
import { Separator } from "@/components/ui/Seperator";
import { BadgeAlert } from "lucide-react";
import { SidebarNav } from "./sidebar-nav";

export const metadata: Metadata = {
  title: "Register for Code Carnival",
  description: "Register for Code Carnival",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "Team Leader",
    href: "/hackathon/form",
  },
  {
    title: "Team Member 1",
    href: "/hackathon/form/member1",
  },
  {
    title: "Team Member 2",
    href: "/hackathon/form/member2",
  },

  {
    title: "Team Member 3",
    href: "/hackathon/form/member3",
  },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 -mt-5 sm:p-10 p-5 sm:pb-16 pb-0 md:block">
        <div className="flex gap-3">
          <div>
            <BadgeAlert size={40} className="fill-blue-600" />
          </div>
          <div className="space-y-0.5">
<<<<<<< HEAD
            <h2 className="text-3xl text-red-600 font-bold tracking-tight">
              Register Closed!
=======
            <h2 className="text-2xl text-blue-600 font-bold tracking-tight">
              Register for Code Carnival
>>>>>>> parent of f15157c (register closed)
            </h2>
            <p className="text-muted-foreground">
              Fill out the form step by step, adding details for each team
              member as needed.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 text-xs lg:text-base lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}

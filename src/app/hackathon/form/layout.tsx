import { Metadata } from "next";
import { Separator } from "@/components/ui/Seperator";
import { BadgeAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Register for Code Carnival",
  description: "Register for Code Carnival",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 -mt-5 sm:p-10 p-5 sm:pb-16 pb-0 md:block">
        <div className="flex gap-3">
          <div>
            <BadgeAlert size={40} className="fill-blue-600" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl text-blue-600 font-bold tracking-tight">
              Register for Code Carnival
            </h2>
            <p className="text-muted-foreground">
              Kindly read rules & regulations before filling the form.
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5"></aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}

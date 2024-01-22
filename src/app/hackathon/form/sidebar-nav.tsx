"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <p
          key={item.href}
          className={cn(
            buttonVariants({ variant: "default" }),
            pathname === item.href
              ? " "
              : "bg-transparent sm:text-base text-xs px-3 py-2 ",
            "justify-start hover:bg-transparent"
          )}
        >
          {item.title}
        </p>
      ))}
    </nav>
  );
}

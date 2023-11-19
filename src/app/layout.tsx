import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/lib/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "GDSC - AU | Atmiya University, Rajkot",
  description: "A community for Atmiya developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="pt-12  min-h-screen bg-slate-50 antialiased">
        <QueryProvider>
          {/* @ts-ignore */}
          <Navbar />

          <div className="pt-12  sm:max-w-7xl max-w-full px-3 sm:px-0 sm:container sm:mx-auto h-full">
            {children}
          </div>

          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}

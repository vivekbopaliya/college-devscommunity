"use client";

import React, { FC } from "react";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ImageIcon, Link2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <li className="overflow-hidden rounded-md bg-black text-white shadow">
      <div className="h-full px-6 py-4 flex justify-between gap-3">
        <div className="relative">
          {" "}
          <UserAvatar
            user={{
              image: session?.user.image,
              name: session?.user.name,
            }}
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 outline outline-white outline-2" />
        </div>

        <Input
          placeholder="Create post"
          readOnly
          className="placeholder:text-white"
          onClick={() => {
            router.push(pathname + "/submit");
          }}
        />
        <Button
          onClick={() => {
            router.push(pathname + "/submit");
          }}
          className="text-white"
        >
          <ImageIcon />
        </Button>
        <Button
          onClick={() => {
            router.push(pathname + "/submit");
          }}
          className="text-white "
        >
          <Link2 />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;

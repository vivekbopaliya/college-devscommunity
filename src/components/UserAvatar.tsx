"use client";

import React, { FC } from "react";
import { Avatar } from "./ui/Avatar";
import {
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from "@radix-ui/react-avatar";
import { User } from "next-auth";
import { Icons } from "./ui/Icons";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}
const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage src={user?.image} className="h-full w-full aspect-auto" />
      ) : (
        <AvatarFallback>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;

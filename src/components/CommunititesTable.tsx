"use client";

import React, { FC } from "react";
import {
  TableCaption,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { Subreddit, Subscription } from "@prisma/client";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Button } from "./ui/Button";
import { ExtendedCommunities } from "@/types/post";
import { FilterIcon, SlidersHorizontalIcon } from "lucide-react";

interface CommunititesTableProps {
  mostPostsCommunities: Subreddit[];
  mostFollowedCommunities: Subreddit[];
  newCommunities: Subreddit[];
}

const CommunititesTable: FC<CommunititesTableProps> = ({
  newCommunities,
  mostPostsCommunities,
  mostFollowedCommunities,
}) => {
  const [filter, setFilter] = React.useState("followed");

  let communities;
  if (filter === "followed") {
    communities = mostFollowedCommunities;
  }
  if (filter === "posts") {
    communities = mostPostsCommunities;
  }
  if (filter === "new") {
    communities = newCommunities;
  }
  return (
    <div className=" flex items-center justify-center flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex px-3 py-2 justify-center items-center w-full h-full">
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
            <DropdownMenuRadioItem value="followed">
              Most followed
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="posts">
              Most posts
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="new">
              Recently created
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Table className="border border-gray-400 border-opacity-50 px-1 py-2">
        <TableHeader>
          <TableRow className="bg-black">
            <TableHead className="text-white dark:text-black bg-blue-600 text-lg py-2 ">
              {filter === "followed" && "Most Followed Communities"}
              {filter === "posts" && "Highest Post Communitis"}
              {filter === "new" && "Recently Created Communitis"}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* @ts-ignore */}
          {communities.map((comm) => {
            return (
              <TableRow>
                <TableCell>
                  <Link href={`/r/${comm.name}`}>r/{comm.name}</Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommunititesTable;

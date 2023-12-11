"use client";

import React, { ChangeEventHandler, FC } from "react";
import {
  TableCaption,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/Table";
import { User } from "@prisma/client";
import UserAvatar from "./UserAvatar";
import { Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Input } from "./ui/Input";
import { Button, buttonVariants } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Label } from "./ui/Label";
import { useMutation } from "@tanstack/react-query";
import { PointRequest } from "@/lib/validators/points";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface DashboardProps {
  users: User[];
}
const Dashboard: FC<DashboardProps> = ({ users }) => {
  const [input, setInput] = React.useState<number>(0);

  const { data: session } = useSession();
  const router = useRouter();

  const { mutate: changePoints, isLoading } = useMutation({
    mutationFn: async ({ userId, point }: PointRequest) => {
      const payload: PointRequest = {
        point,
        userId,
      };
      await axios.put("/api/points", payload);
    },
    onSuccess: () => {
      router.refresh();
      setInput(0);
    },
  });
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Table className="border  border-gray-400 border-opacity-50 px-3 py-2">
        <TableCaption>
          The points have been given based on the members' performace in past
          GDSC events.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-black  ">
            <TableHead className="sm:text-lg text-white">Rank</TableHead>
            <TableHead className="sm:text-lg text-white">User</TableHead>

            <TableHead className="sm:text-lg sm:flex text-white sm:items-center hidden">
              Gmail
            </TableHead>

            <TableHead className="sm:text-lg text-white">Points</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users

            .filter((user) => {
              return user.role === "User";
            })
            .map((user, index) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-bold  sm:text-lg">
                    #{index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-5  items-center">
                      <UserAvatar
                        className="sm:w-9 w-7 sm:h-9 h-7"
                        user={{
                          image: user.image,
                          name: user.name,
                        }}
                      />
                      <p>{user.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="sm:flex sm:h-full sm:items-center hidden">
                    {user.email}
                  </TableCell>

                  <TableCell className="font-semibold     ">
                    <p className="text-blue-600 mr-4 flex  gap-2">
                      <span className="sm:text-lg">{user.points}</span>

                      {session?.user?.email === "gdsc.atmiya@gmail.com" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Settings2 size={"sm"} />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            className="bg-white  dark:text-black"
                            align="end"
                          >
                            <div className="flex container py-3 px-4 mx-auto flex-col justify-between gap-3">
                              <Label className="text-gray-500 font-light">
                                Change the points of{" "}
                                <span className="text-gray-800 font-semibold">
                                  {user.name}
                                </span>
                              </Label>
                              <Input
                                type="number"
                                onChange={(e: any) =>
                                  setInput(parseInt(e.target.value, 10))
                                }
                              />
                              <Button
                                size={"sm"}
                                isLoading={isLoading}
                                className={cn(buttonVariants())}
                                onClick={() => {
                                  changePoints({
                                    userId: user.id,
                                    point: input,
                                  });
                                }}
                              >
                                Submit
                              </Button>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </p>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;

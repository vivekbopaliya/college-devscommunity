import Dashboard from "@/components/Dashboard";
import { Avatar } from "@/components/ui/Avatar";

import { db } from "@/lib/db";
import React from "react";

const page = async () => {
  const users = await db.user.findMany({
    orderBy: {
      points: "desc",
    },
  });

  return (
    <div className="max-w-5xl flex flex-col gap-3 justify-center items-center ">
      <h1 className="sm:text-5xl text-3xl text-gray-800 font-bold justify-center items-center my-8  ">
        Dashboard
      </h1>
      <Dashboard users={users} />
    </div>
  );
};

export default page;

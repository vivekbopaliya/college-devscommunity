import { MehIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="max-w-screen min-h-screen flex justify-center items-center">
      <div className="flex gap-4 dark:text-white text-black">
        <MehIcon />
        <p>No newsletters yet!</p>
      </div>
    </div>
  );
};

export default page;

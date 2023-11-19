import CreateCommunity from "@/components/CreateCommunity";
import FeedChangeClient from "@/components/FeedChangeClient";
import CustomFeed from "@/components/Home/CustomFeed";
import GeneralFeed from "@/components/Home/GeneralFeed";
import { Label } from "@/components/ui/Label";
import { getAuthSession } from "@/lib/auth";
import React from "react";

const page = async () => {
  return (
    <div>
      {/*  */}
      {/* @ts-ignore */}
      <FeedChangeClient children={<GeneralFeed />} children2={<CustomFeed />} />
    </div>
  );
};

export default page;

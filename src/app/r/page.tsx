import FeedChangeClient from "@/components/FeedChangeClient";
import CustomFeed from "@/components/CustomFeed";
import GeneralFeed from "@/components/GeneralFeed";
import React from "react";

const page = async () => {
  return (
    <div>
      {/* @ts-ignore */}
      <FeedChangeClient children={<GeneralFeed />} children2={<CustomFeed />} />
    </div>
  );
};

export default page;

"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/Button";
import { InstagramIcon, LinkedinIcon } from "lucide-react";
import { GithubIcon } from "lucide-react";

const SocialMedia = () => {
  return (
    <div className=" flex gap-2 ">
      <Link
        target="_blank"
        href="https://www.instagram.com/gdsc.atmiya?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
        className={buttonVariants()}
      >
        <InstagramIcon />
      </Link>
      <Link
        target="_blank"
        href="https://www.linkedin.com/company/gdsc-atmiya-university/"
        className={buttonVariants()}
      >
        <LinkedinIcon />
      </Link>
      <Link
        target="_blank"
        href="https://github.com/GDSCAtmiya01"
        className={buttonVariants()}
      >
        <GithubIcon />
      </Link>
    </div>
  );
};

export default SocialMedia;

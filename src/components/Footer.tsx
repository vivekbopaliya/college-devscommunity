"use client";

import React from "react";
import whatsapplogo from "./whatsapp-logo.png";
import emailogo from "./email-logo.png";
import Image from "next/image";
import gdsc_au from "./gdsc-au.png";
import "../app/globals.css";

const Footer = () => {
  return (
    <div className="py-4 h-full flex justify-around items-center  dark:bg-slate-900 dark:text-white bg-black text-white">
      <main className="flex flex-col justify-center items-start ">
        <Image
          src={gdsc_au}
          alt="Atmiyalogo"
          className="w-32  h-32    my-2 object-contain"
        />

        <p className="py-2 ">Connect us on : </p>
        <div className="flex gap-4 row r">
          <a href="/">
            <Image
              height={20}
              width={20}
              src={whatsapplogo}
              alt="Whatsapp "
              className="bounce-out-on-hover w-8 h-8 rounded-full"
            />
          </a>{" "}
          <a href="/">
            <Image
              height={20}
              width={20}
              src={emailogo}
              alt="Email "
              className="bounce-out-on-hover h-8 w-8 rounded-full"
            />
          </a>{" "}
          <a href="/">
            <Image
              height={20}
              width={20}
              src={
                "https://freelogopng.com/images/all_Image/1683191308instagram-logo-black-and-white.png"
              }
              alt="Instagram"
              className="bounce-out-on-hover h-8 w-8 rounded-full"
            />
          </a>{" "}
          <a href="/">
            <Image
              height={20}
              width={20}
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png"
              }
              alt="Linkedin"
              className="bounce-out-on-hover h-8 w-8 rounded-full"
            />
          </a>{" "}
        </div>

        <p className="pt-10 text-sm text-gray-500">
          Copyright © 2023 Atmiya University, All rights reserved.
        </p>
      </main>
      <div className="flex flex-col">
        <p className="py-4 text-lg">Next events at your library :</p>
      </div>
    </div>
  );
};

export default Footer;

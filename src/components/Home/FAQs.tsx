"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordian";

const FAQs = () => {
  return (
    <div>
      <Accordion type="single" className="w-full ">
        <AccordionItem value="item-1" className="flex flex-col justify-center">
          <AccordionTrigger
            defaultChecked
            className="font-medium text-xl text-blue-600"
          >
            How to join GDSC AU?
          </AccordionTrigger>

          <AccordionContent className="sm:text-lg text-base leading-relaxed">
            You can join GDSC AU by clicking on the above JOIN GDSC button and
            be a part of community filled with passionate and enthusiastic
            individuals.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="flex flex-col justify-center
              "
        >
          <AccordionTrigger className="font-medium text-xl text-blue-600">
            Who should join GDSC AU?
          </AccordionTrigger>
          <AccordionContent className="sm:text-lg text-base leading-relaxed">
            Anyone who is interested in tech and dedicated to learn new
            technologies and make strong connections should join GDSC AU?
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="flex flex-col justify-center">
          <AccordionTrigger className="font-medium text-xl text-blue-600">
            What is the purpose of GDSC?
          </AccordionTrigger>
          <AccordionContent className="sm:text-lg text-base  leading-relaxed">
            The purpose of GDSC is to enlighten the students about the present
            and upcoming technologies and help them in their journey of learning
            new stuff.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="flex flex-col ">
          <AccordionTrigger className="font-medium text-xl text-blue-600">
            What is the purpose of this Website?
          </AccordionTrigger>
          <AccordionContent className="sm:text-lg text-base  leading-relaxed">
            The purpose of this website is to provide a bridge for people who
            want to find a community of people having same intrests as them, use
            it to showcase your personal project, share new tech news or asking
            for help to solve your error. find your community and if it doesnt
            exist? Create one. its all yours.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQs;

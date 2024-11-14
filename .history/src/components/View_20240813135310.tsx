"use client";
import React from "react";
import { PiGithubLogoLight } from "react-icons/pi";
import { SiDotnet, SiFramer } from "react-icons/si";

import TestimonialTooltip from "./TestimonialTooltip";
import { motion, useAnimation } from "framer-motion";
import { LuDownload } from "react-icons/lu";

function View() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: 0.9,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="lg:block w-ful lg:w-fit "
    >
      <div className=" md:w-60 w-full rounded-2xl h-fit sticky top-5 ">
        <div>
          <div className="bg-[#1C1C1C] min-w-min rounded-2xl p-4 border border-neutral-800 h-fit">
            <h2 className="font-RubikBold text-neutral-200">View My Resume</h2>
            <p className="text-xs my-3 text-neutral-400 font-RubikRegular">
              Click to get a detailed overview of my experience and skills
            </p>
            <button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium text-neutral-50 ">
              <span>Download</span>
              <LuDownload />
            </button>

            <div className="border border-neutral-700 my-5" />

            <div className="text-neutral-400">
              <h1 className="font-RubikMedium text-neutral-200">Featured in</h1>
              <div className="flex items-center gap-x-3 mt-6 hover:bg-neutral-800  p-2 rounded-md ">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <PiGithubLogoLight className="text-lg" />
                </div>
                <h3 className="text-xs ">
                  9 Essential Javascript <br /> Functions
                </h3>
              </div>
              <div className="flex items-center gap-x-3 mt-6 hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiFramer className="text-lg" />
                </div>
                <h3 className="text-xs ">
                  How to easily creat React <br /> animations: Framer Motion
                </h3>
              </div>
              <div className="flex items-center gap-x-3 mt-6 hover:bg-neutral-800  p-2 rounded-md">
                <div className="bg-neutral-700/50 h-8 w-8 rounded-full flex items-center justify-center">
                  <SiDotnet className="text-lg" />
                </div>
                <h3 className="text-xs ">.NET tips</h3>
              </div>

              <div className="border border-neutral-700 my-5" />

              <div className="flex items-center justify-center gap-x-2">
                <TestimonialTooltip />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default View;

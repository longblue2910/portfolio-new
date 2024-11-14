"use client";
import React from "react";
import { PiGithubLogoLight } from "react-icons/pi";
import { SiDotnet, SiFramer } from "react-icons/si";

import TestimonialTooltip from "./TestimonialTooltip";
import { motion, useAnimation } from "framer-motion";

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
            <button className="bg-[#696969] h-7 p-1 rounded-md text-xs w-full font-RubikMedium text-neutral-50 ">
              <span>Download CV</span>
            </button>

            <div className="border border-neutral-700 my-5" />

            
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default View;

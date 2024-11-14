"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PiCodeThin } from "react-icons/pi";

function Home() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          delay: 0.6,
          type: "spring",
          stiffness: 200,
        },
      }}
      className="w-full lg:w-fit mt-5 md:mt-0"
    >
      <div className="bg-[#1C1C1C] lg:bg-transparent rounded-2xl">
        <div>
          <div className="flex items-center space-x-3 p-3">
            <h1 className="font-RubikBold text-neutral-200">My Projects</h1>
          </div>
          <div className="flex items-center space-x-3 p-3">
            <p className="text-xs text-neutral-400 font-RubikRegular">
              Take a look at the projects I’ve developed, <br />
              each reflecting my dedication to creating robust and innovative
              solutions.
            </p>
          </div>

          <div className="border border-neutral-700 my-4" />

          <div className="  bg-[#1C1C1C] rounded-lg text-neutral-400 p-2">
            <Link href={"/dashboard/djdj"}>
              <div className="bg-neutral-800 duration-200 transition-all ease-in">
                <div className="flex flex-col space-y-3 p2">
                  <Image
                    width={300}
                    height={300}
                    objectFit="cover"
                    className="w-full h-[250px] rounded-tl-md rounded-tr-md"
                    src="/project-1.jpg"
                    alt="Project"
                  />
                  <div>
                    <h2 className="text-sm font-RubikMedium">
                      Fullstack Website Hotel Booking | .NET Core, NextJs, SQL
                      Server, TailwindCSS, ShadcnUI
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* without image */}

          {/* <div className="mt-6  bg-[#1C1C1C] rounded-lg text-neutral-400">
            <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
              <div className="  flex items-center space-x-3">
                <div>
                  <h2 className="text-sm font-RubikMedium">
                    Smooth Animation with React and Framer Motion
                  </h2>
                  <div className="flex items-center sapce-x-2 font-RubikBold">
                    <p className="bg-[#282828] w-fit text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] ">
                      TypeScript
                    </p>
                    <div className="w-1 h-1 rounded-full bg-neutral-400" />
                    <span className="text-xs">Sunday, July 22, 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}

export default Home;

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

          <div className="  bg-[#1C1C1C] rounded-lg text-neutral-400">
            <Link href={"/dashboard/djdj"}>
              <div className="hover:bg-neutral-800 duration-200 transition-all ease-in p-4">
                <div className="  flex items-center space-x-3">
                  <Image
                    width={1000}
                    height={1000}
                    className="w-24 h-24 object-cover rounded-md"
                    src="/pic.jpg"
                    alt=""
                  />
                  <div>
                    <span className="text-sm">July 22, 2023</span>
                    <h2 className="text-sm font-RubikMedium">
                      Smooth Animation with React and Framer Motion
                    </h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;

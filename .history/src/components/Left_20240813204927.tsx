"use client";
import React, { useState } from "react";
import { PiMagicWandThin, PiShapesThin } from "react-icons/pi";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { LiaGenderlessSolid } from "react-icons/lia";

function Leftpage() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const controls = useAnimation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      setEmail("");
    } else {
      controls.start({
        x: 0,
        transition: {
          type: "spring",
          velocity: 600,
          stiffness: 5000,
          damping: 15,
        },
      });
    }
  };

  return (
    <div>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, type: "spring", stiffness: 200 },
        }}
        className=" md:block bg-[#1C1C1C] w-full md:w-72 lg:w-80 h-fit sticky top-5 "
      >
        <div className=" md:w-70 w-full p-5 md:p-3 border border-neutral-800 rounded-2xl h-full bg-[#1C1C1C]  ">
          <div className="flex">
            <div className="w-full relative">
              <Image
                width={1000}
                height={1000}
                className="w-28 h-28 rounded-full object-cover"
                src="/avatar.jpg"
                alt=""
              />
              <div
                onClick={() => setOpen(!open)}
                className="bg-lime-400 w-3 h-3 cursor-pointer rounded-full absolute top-20 animate-pulse hidden xl:block xl:right-[185px]"
              />

              {open && (
                <div className="border border-lime-400 h-5 flex items-center justify-center rounded-2xl w-fit px-2 absolute top-[4.7rem] right-[4.7rem]">
                  <p className="text-[9px] font-RubikMedium text-lime-300">
                    Open to freelancing
                  </p>
                </div>
              )}
              <h1 className="font-RubikExtraBold text-xl  text-neutral-300 mt-3">
                Phan Tien Long
              </h1>
              <p className="text-xs font-RubikMedium text-neutral-300 mt-2">
                tienlong291099@gmail.com 📧
              </p>

              <p className="text-xs font-RubikMedium text-neutral-300 mt-1">
                rimdasilva.com 🌍
              </p>

              <div className="flex w-full">
                <div className="flex space-x-1  text-xs my-4">
                  <p className="bg-[#282828] text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] font-RubikBold">
                    .NET
                  </p>
                  <p className="bg-[#282828] text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] font-RubikBold">
                    SQL
                  </p>
                  <p className="bg-[#282828] text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] font-RubikBold">
                    DevOps
                  </p>
                  <p className=" bg-[#282828] text-neutral-300 rounded-md px-2 h-5 flex items-center justify-center text-[11px] font-RubikBold shrink-0 ">
                    NextJs/React
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="flex space-x-1 w-full h-fit">
              <Link href={"/"}>
                <div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
                  <PiHouseLight className="text-neutral-100" />
                </div>
              </Link>

              <div className="bg-neutral-700/50 h-7 w-7 rounded-full flex items-center justify-center">
                <PiBookOpenTextLight className="text-neutral-100" />
              </div>
            </div> */}
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#282828] p-1  rounded-md md:flex items-center  justify-between h-9 w-full hidden "
          >
            <input
              value={email}
              onChange={handleChange}
              className=" w-36 focus:outline-none bg-transparent text-neutral-400 text-xs placeholder:text-neutral-600 h-full pl-2 placeholder:text-xs placeholder:font-RubikMedium"
              placeholder="name@email.com"
              type="text"
            />
            <motion.button
              animate={controls}
              className="bg-[#696969] h-full p-1 rounded-md text-xs w-20 font-RubikMedium text-neutral-50"
            >
              Contact me
            </motion.button>
          </form>

          <div className="w-full mt-5 text-neutral-300">
            <h2 className="font-RubikBold my-4">Bio</h2>
            <p className="text-[12px]  font-RubikRegular my-3">
              {"I'm "} .NET Software Engineer with over 4+ years of experience
              in developing .NET applications.
            </p>

            <div className="mt-6 flex justify-between text-sm">
              <div className="flex items-center space-x-1">
                <PiShapesThin />
                <span className="text-xs font-RubikRegular">
                  4 Years as a Developer
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <PiMagicWandThin />
                <span className="text-xs font-RubikRegular">15 Projects</span>
              </div>
            </div>

            <div className="border border-[#282828] text-neutral-300 my-6" />

            <div className="my-4 ">
              <h1 className="font-RubikRegular">Work History</h1>
              <div className="mt-7 flex  justify-between">
                <div className="flex space-x-3">
                  <LiaGenderlessSolid className="text-xl" />
                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">
                      Full
                    </h3>
                    <p className="text-[9px]">ISD Corp - Ho Chi Minh City</p>
                  </div>
                </div>
                <small className="text-[9px] text-neutral-300">
                  May 2022 - August
                </small>
              </div>
              <div className="my-3 flex  justify-between">
                <div className="flex space-x-3">
                  <LiaGenderlessSolid className="text-xl" />

                  <div className="-mt-1">
                    <h3 className="text-sm font-RubikMedium">
                      Backend Developer
                    </h3>
                    <p className="text-[9px]">3S Intersoft - Hue City</p>
                  </div>
                </div>
                <small className="text-[9px] text-neutral-300">
                  2021 - July 2022
                </small>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Leftpage;

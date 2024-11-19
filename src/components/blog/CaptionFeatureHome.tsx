"use client";

import Link from "next/link";
import { AiFillCaretRight } from "react-icons/ai";
import { BiChevronRight } from "react-icons/bi";
import { FiChevronRight } from "react-icons/fi";

interface CaptionFeatureHomeProps {
  title: string;
  link: string;
}

const CaptionFeatureHome = ({ title, link }: CaptionFeatureHomeProps) => {
  return (
    <div className="flex gap-2 items-center">
      <h1 className="font-bold text-xl">{title}</h1>
      <Link href={link}>
        <div className="cursor-pointer flex justify-center items-center w-[14px] h-[14px] border border-gray-300 rounded-full hover:bg-gray-200 transition-all duration-200 ease-in-out">
          <FiChevronRight className="text-[8px] text-black font-extrabold" />
        </div>
      </Link>
    </div>
  );
};

export default CaptionFeatureHome;

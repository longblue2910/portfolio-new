import Link from "next/link";
import React from "react";
import ContinueReading from "./ContinueReading";
import Tag from "./Tag";
import Image from "next/image";

const PostWithImage = () => {
  return (
    <div className="mb-3 flex gap-3">
      <div>
        <div className="flex gap-5 mt-3 items-center ">
          <Tag tag=".NET" />
          <p className="text-xs font-semibold text-gray-500">April 16, 2022</p>
        </div>
        <h1 className="font-bold text-xs mt-2">
          <Link href="/" className="title-hover-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, qui.
          </Link>
        </h1>
        <ContinueReading link="#" />
      </div>
      <div className="w-full h-[100px] relative overflow-hidden rounded-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-500 mt-3">
        <Image
          src="https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PostWithImage;

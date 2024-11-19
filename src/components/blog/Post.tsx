import Link from "next/link";
import React from "react";
import ContinueReading from "./ContinueReading";
import Tag from "./Tag";

const Post = () => {
  return (
    <div className="mb-3">
      {/* Header */}
      <div className="flex gap-3 sm:gap-5 mt-3 items-center">
        <Tag tag=".NET" />
        <p className="text-xs sm:text-sm font-semibold text-gray-500">
          April 16, 2022
        </p>
      </div>

      {/* Title */}
      <h1 className="font-bold text-lg sm:text-xl mt-2">
        <Link href="/" className="title-hover-2 text-lg sm:text-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, qui.
        </Link>
      </h1>

      <p className="text-gray-600 text-sm mt-1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, tempora
        excepturi neque eveniet porro distinctio ex cum animi deleniti ipsum.
      </p>

      {/* Continue Reading */}
      <ContinueReading link="#" />
    </div>
  );
};

export default Post;

"use client";

import Link from "next/link";
import Tag from "./Tag";
import ContinueReading from "./ContinueReading";
import { formatDate } from "@/lib/dateUtils";

interface PostProps {
  title: string;
  date: string;
  description: string;
  link: string;
}

const Post: React.FC<PostProps> = ({ title, date, description, link }) => {
  return (
    <div className="mb-3">
      {/* Header */}
      <div className="flex gap-3 sm:gap-5 mt-3  items-center">
        <Tag tag=".NET" />
        <div className="text-xs font-semibold text-gray-500">
          <span>{formatDate(date)}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-bold text-lg sm:text-xl mt-2">
        <Link href={link} className="title-hover-2 text-lg sm:text-xl">
          {title}
        </Link>
      </h1>

      <p className="text-gray-600 text-sm mt-1">{description}</p>

      {/* Continue Reading */}
      <ContinueReading link={link} />
    </div>
  );
};

export default Post;

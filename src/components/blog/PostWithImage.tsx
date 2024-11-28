"use client";

import Image from "next/image";
import Link from "next/link";
import ContinueReading from "./ContinueReading";
import Tag from "./Tag";
import { formatDate } from "@/lib/dateUtils";

interface PostWithImageProps {
  title: string;
  image: string;
  link: string;
  description: string;
  date: string;
}

const PostWithImage: React.FC<PostWithImageProps> = ({
  title,
  image,
  link,
  date,
}) => {
  return (
    <div className="mb-3 flex gap-3">
      <div className="w-1/2">
        <div className="flex gap-4 mt-3 items-center ">
          <Tag tag=".NET" />
          <div className="text-xs font-semibold text-gray-500">
            <span>{formatDate(date)}</span>
          </div>
        </div>
        <h1 className="font-bold text-xs mt-2">
          <Link href={link} className="title-hover-2">
            {title}
          </Link>
        </h1>
        <ContinueReading link={link} />
      </div>
      <div className="w-1/2 h-[100px] relative overflow-hidden rounded-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-500 mt-3">
        <Image
          src={`http://blog-api.rimdasilva.com/Uploads/Image/Post/${image}`}
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

"use client";

import Image from "next/image";
import Link from "next/link";
import CaptionFeatureHome from "./CaptionFeatureHome";
import Post from "./Post";
import ContinueReading from "./ContinueReading";
import PostWithImage from "./PostWithImage";

const posts = [
  { id: 1, title: "Post 1", date: "April 16, 2022" },
  { id: 2, title: "Post 2", date: "April 17, 2022" },
  { id: 3, title: "Post 3", date: "April 18, 2022" },
];

const posts2 = [
  { id: 1, title: "Post 1", date: "April 16, 2022" },
  { id: 2, title: "Post 2", date: "April 17, 2022" },
  { id: 3, title: "Post 3", date: "April 18, 2022" },
  { id: 4, title: "Post 4", date: "April 18, 2022" },
  { id: 5, title: "Post 4", date: "April 18, 2022" },
];

const FeatureHome = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-between">
      {/* Left */}
      <div className="flex-1 min-w-[300px] md:border-r md:border-gray-200 md:pr-5 mb-5 lg:mb-0">
        <CaptionFeatureHome title="News" link="#" />
        <div className="w-full h-[300px] relative overflow-hidden rounded-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-500 mt-3">
          <Image
            src="https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image"
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </div>
        <p className="text-xs font-semibold text-gray-500 mt-2">
          April 17, 2022
        </p>
        <h1 className="title-hover-2 text-lg">
          <Link href="/">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, qui.
          </Link>
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, tempora
          excepturi neque eveniet porro distinctio ex cum animi deleniti ipsum.
        </p>
        <ContinueReading link="#" />
      </div>

      {/* Center */}
      <div className="flex-1 min-w-[300px] md:border-r md:border-gray-200 md:pr-5 mb-5 lg:mb-0">
        <CaptionFeatureHome title="Latest Blog" link="#" />
        <div>
          {posts.map((post, index) => (
            <div key={post.id}>
              <Post />
              {index < posts.length - 1 && (
                <div className="border-b border-gray-300 mx-auto my-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right (only visible on sm, lg, xl, 2xl and hidden on md) */}
      <div className="flex-1 min-w-[300px] md:hidden lg:block xl:block 2xl:block">
        <CaptionFeatureHome title="Most Read" link="#" />
        <div>
          {posts2.map((post, index) => (
            <div key={post.id}>
              <PostWithImage />
              {/* {index < posts.length - 1 && (
                <div className="border-b border-gray-300 mx-auto my-4"></div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHome;

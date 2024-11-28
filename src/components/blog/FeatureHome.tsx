"use client";

import Image from "next/image";
import Link from "next/link";
import CaptionFeatureHome from "./CaptionFeatureHome";
import ContinueReading from "./ContinueReading";
import Post from "./Post";
import PostWithImage from "./PostWithImage";
import { formatDate } from "@/lib/dateUtils";

interface Post {
  id: string;
  title: string;
  descriptionShort: string;
  imageUrl: string;
  slug: string;
  createdDate: string;
  categories: {
    id: string;
    title: string;
    tagName: string | null;
  }[];
}

interface FeatureHomeProps {
  data: {
    latestNews: Post;
    latestBlog: Post[];
    mostRead: Post[];
  };
}

const FeatureHome: React.FC<FeatureHomeProps> = ({ data }) => {
  const { latestNews, latestBlog, mostRead } = data;

  return (
    <div className="flex flex-wrap gap-3 justify-between">
      {/* Left */}
      <div className="flex-1 min-w-[300px] md:border-r md:border-gray-200 md:pr-5 mb-5 lg:mb-0">
        <CaptionFeatureHome title="News" link="#" />
        <div className="w-full h-[300px] relative overflow-hidden rounded-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-500 mt-3">
          <Image
            src={`http://blog-api.rimdasilva.com/Uploads/Image/Post/${latestNews.imageUrl}`}
            alt={latestNews.title}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        </div>
        <p className="text-xs font-semibold text-gray-500 mt-2">
          {formatDate(latestNews.createdDate)}
        </p>
        <h1 className="font-bold text-lg sm:text-xl mt-2">
          <Link href={`/post/${latestNews.slug}`}>{latestNews.title}</Link>
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          {latestNews.descriptionShort}
        </p>
        <ContinueReading link={`/posts/${latestNews.slug}`} />
      </div>

      {/* Center */}
      <div className="flex-1 min-w-[300px] md:border-r md:border-gray-200 md:pr-5 mb-5 lg:mb-0">
        <CaptionFeatureHome title="Latest Blog" link="#" />
        <div>
          {latestBlog.map((post, index) => (
            <div key={post.id}>
              <Post
                title={post.title}
                date={post.createdDate}
                description={post.descriptionShort}
                link={`/post/${post.slug}`}
              />
              {index < latestBlog.length - 1 && (
                <div className="border-b border-gray-300 mx-auto my-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 min-w-[300px] md:hidden lg:block xl:block 2xl:block">
        <CaptionFeatureHome title="Most Read" link="#" />
        <div>
          {mostRead.map((post) => (
            <div key={post.id}>
              <PostWithImage
                title={post.title}
                date={post.createdDate}
                image={post.imageUrl}
                link={`/post/${post.slug}`}
                description={post.descriptionShort}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureHome;

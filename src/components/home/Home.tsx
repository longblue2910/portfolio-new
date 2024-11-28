"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/dateUtils";

interface Post {
  id: string;
  title: string;
  descriptionShort: string;
  imageUrl: string;
  slug: string;
  createdDate: string;
  countWatch: number;
  categories: {
    id: string;
    title: string;
    tagName: string | null;
  }[];
}

interface HomeProps {
  data: {
    latestNews: Post[];
    latestBlog: Post[];
    mostRead: Post[];
  };
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const { latestNews, latestBlog, mostRead } = data;

  const tags = ["Development", "Design", "Productivity", "APIs", "JavaScript"];

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        {/* News Section */}
        <section className="mb-12 bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">News</h2>
            <button className="text-blue-600 hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((post, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={`http://blog-api.rimdasilva.com/Uploads/Image/Post/${post.imageUrl}`}
                    alt={`News ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold">
                    <Link className="title-hover-2" href={`post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm truncate-3-lines">
                    {post.descriptionShort}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">Jan 12, 2024</p>
                    <p className="text-gray-500 text-sm">👁️ 2,401</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Khóa học Section */}
        <section className="mb-12 bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Khóa học</h2>
            <button className="text-blue-600 hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={`https://via.placeholder.com/300x200?text=Khóa+Học+${
                      index + 1
                    }`}
                    alt={`Khóa Học ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <Link href="/" className="text-lg font-bold title-hover-2">
                    Course Title {index + 1}
                  </Link>
                  <p className="text-blue-600 text-sm font-bold mt-2">
                    500,000 đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="bg-white shadow-md rounded-lg p-6 flex flex-col lg:flex-row">
          {/* Left: Blog Posts */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="text-2xl font-bold">Blog</div>
              <button className="text-blue-600 hover:underline">
                Xem tất cả
              </button>
            </div>
            <div className="space-y-4">
              {latestBlog.map((post, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
                >
                  {/* Tiêu đề */}
                  <Link
                    href={`post/${post.slug}`}
                    className="text-lg font-bold title-hover-2"
                  >
                    {post.title}
                  </Link>

                  <div className="flex gap-2 mt-2">
                    {post.categories.map((c, index) => (
                      <Link
                        key={index}
                        href="/"
                        className="inline-block bg-slate-100 hover:bg-blue-200 text-sm rounded-md py-1 px-3"
                      >
                        {c.title}
                      </Link>
                    ))}
                  </div>

                  {/* Mô tả ngắn */}
                  <p className="text-gray-700 mt-2">{post.descriptionShort}</p>

                  {/* Ngày đăng & Lượt xem */}
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-500 text-sm">
                      {formatDate(post.createdDate)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      👁️ {post.countWatch}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tags */}
          <div className="hidden lg:block w-full lg:w-1/4 lg:pl-6 mt-6 lg:mt-0">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className=" shadow-md rounded-lg p-4 space-y-2">
              {tags.map((tag, index) => (
                <Link
                  href="/"
                  key={index}
                  className="block w-full text-sm text-left bg-slate-100 hover:bg-blue-200  rounded-md py-2 px-3 transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

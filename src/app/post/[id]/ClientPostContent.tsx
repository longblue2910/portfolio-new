"use client";

import { useEffect } from "react";
import Prism from "prismjs";
import Image from "next/image";

// Hàm giải mã HTML entities
const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

interface Post {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  categories: { title: string; id: string }[];
  createdDate: string;
}

// Client Component
const ClientPostContent = ({ post }: { post: Post }) => {
  useEffect(() => {
    // Giải mã HTML entities trong description
    const decodedDescription = decodeHtml(post.description);

    // Tạo DOM từ description đã giải mã và tìm các phần tử <code> trong đó
    const container = document.createElement("div");
    container.innerHTML = decodedDescription;

    // Tìm các phần tử <pre> và <code> trong description đã giải mã
    const codeBlocks = container.querySelectorAll("pre code");
    if (codeBlocks.length > 0) {
      // Nếu có code block, gọi PrismJS để highlight code
      Prism.highlightAll();
    }
  }, [post.description]); // Chạy lại khi description thay đổi

  // Giải mã description trước khi render
  const decodedDescription = decodeHtml(post.description);

  return (
    <div className="mt-[200px] container-rds flex flex-col items-center">
      {/* Title */}
      <h1 className="text-3xl text-center font-extrabold">{post.title}</h1>

      {/* Image */}
      <div className="w-[70%] text-center h-[400px] relative overflow-hidden rounded-lg border-2 border-gray-300 transition-all duration-300 hover:border-gray-500 mt-3">
        <Image
          src={`http://blog-api.rimdasilva.com/Uploads/Image/Post/${post.imageUrl}`}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>

      {/* Description with decoded HTML */}
      <div
        className="md:w-[70%] text-gray-600 text mt-10"
        dangerouslySetInnerHTML={{ __html: decodedDescription }}
      />
    </div>
  );
};

export default ClientPostContent;

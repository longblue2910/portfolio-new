"use client";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import Image from "next/image";
import { FaFacebook, FaCopy } from "react-icons/fa";
import CommentSection from "@/components/blog/CommentSection";
import "../../../../public/css/prism-coldark-dark.css";
import { formatDate } from "@/lib/dateUtils";
import Avatar from "@mui/material/Avatar";
import { RiFacebookLine } from "react-icons/ri";

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

const ClientPostContent = ({ post }: { post: Post }) => {
  const [toc, setToc] = useState<
    { id: string; title: string; level: number }[]
  >([]); // Mục lục với cấp độ
  const [decodedDescription, setDecodedDescription] = useState<string>("");

  useEffect(() => {
    const decodedDescription = decodeHtml(post.description);
    setDecodedDescription(decodedDescription);

    // Tạo mục lục chỉ lấy thẻ <h1>
    const tempToc: { id: string; title: string; level: number }[] = [];
    const container = document.createElement("div");
    container.innerHTML = decodedDescription;

    // Lấy tất cả các thẻ <h1>
    const headings = container.querySelectorAll("h1");
    headings.forEach((heading) => {
      const headingText = heading.textContent || "";
      const id = headingText.toLowerCase().replace(/\s+/g, "-");
      heading.id = id;
      tempToc.push({ id, title: headingText, level: 1 });
    });

    setToc(tempToc);
    setDecodedDescription(container.innerHTML);
  }, [post.description]);

  useEffect(() => {
    // Highlight code after updating decodedDescription
    if (decodedDescription) {
      Prism.highlightAll();
    }
  }, [decodedDescription]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link bài viết đã được sao chép!");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container-rds mx-auto p-4 md:flex md:gap-6 mt-[150px]">
      {/* Bên trái: Nội dung bài viết */}
      <div className="lg:w-3/4 lg:px-2">
        <h1 className="text-4xl font-bold text-center mb-6 text-primary leading-tight md:text-5xl">
          {post.title}
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Avatar alt="Remy Sharp" src="/avatar.jpg" />
            <div className="ml-3 flex flex-col">
              <span className="font-semibold text-slate-600">RimdaSilva</span>
              <span className="text-xs font-semibold text-gray-400">
                {formatDate(post.createdDate)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              title="Copy Link"
            >
              <FaCopy />
            </button>
            <button
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              title="Share to Facebook"
            >
              <RiFacebookLine />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg mb-6 border-2 border-gray-300 transition-all duration-300 hover:border-gray">
          <Image
            src={`http://blog-api.rimdasilva.com/Uploads/Image/Post/${post.imageUrl}`}
            alt={post.title}
            layout="responsive"
            width={600}
            height={300}
            objectFit="cover"
          />
        </div>

        <div
          id="description"
          className="text-gray-700 leading-relaxed mb-10"
          dangerouslySetInnerHTML={{ __html: decodedDescription }}
        />
        <CommentSection />
      </div>

      <div className="w-full md:w-1/4 hidden lg:block p-4 fixed md:right-4 md:top-[150px] z-10">
        <h3 className="font-semibold text-lg mb-4 pb-2 text-gray-700">
          Mục lục
        </h3>
        <div className="space-y-2">
          {toc.map((item, index) => (
            <div
              key={index}
              className={`pl-${item.level === 2 ? "4" : "0"} text-sm`}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className="truncate w-full text-left text-gray-500 font-semibold hover:text-blue-700 transition-colors duration-200"
                style={{
                  maxWidth: "200px",
                }}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPostContent;

"use client";
import React from "react";
import Image from "next/image"; // Sử dụng Image của Next.js

const Banner = () => {
  return (
    <div className="lg:w-full lg:h-[500px] relative mt-[100px] hidden lg:block border-4 border-gray-300 rounded-lg hover:border-blue-500 transition-all duration-300">
      <Image
        src="/banner.jpg" // Đảm bảo ảnh nằm trong thư mục /public
        alt="Banner"
        layout="fill" // Đảm bảo ảnh phủ toàn bộ phần chứa
        objectFit="cover" // Cắt ảnh sao cho không bị méo
      />
    </div>
  );
};

export default Banner;

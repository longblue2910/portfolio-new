"use client";

import React from "react";
import Link from "next/link"; // Sử dụng Link của Next.js
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; // Thêm icon mạng xã hội
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-5">
      <div className="container-rds mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start space-y-8 lg:space-y-0">
          {/* Logo Section */}
          <div className="text-center  flex flex-col items-start lg:text-left mb-6 lg:mb-0">
            <Link href="/" className="text-xl font-extrabold text-white">
              RimdaSilva
            </Link>
            <span className="text-sm text-gray-400 mt-2">
              Your trusted tech source
            </span>
          </div>

          {/* Chức năng Section */}
          <div className="flex flex-col lg:flex-row lg:space-x-12 mb-6 lg:mb-0 space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:items-start">
              <span className="text-base mb-4 text-white">Chức năng</span>
              <div className="flex flex-col gap-2">
                <Link href="/" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Tin tức
                  </span>
                </Link>
                <Link href="/about" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Blog
                  </span>
                </Link>
                <Link href="/blog" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Khóa học
                  </span>
                </Link>
                <Link href="/contact" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Hỏi đáp
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Về chúng tôi */}
          <div className="flex flex-col lg:flex-row lg:space-x-12 mb-6 lg:mb-0 space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:items-start">
              <span className="text-base mb-4 text-white">Về chúng tôi</span>
              <div className="flex flex-col gap-2">
                <Link href="/" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Giới thiệu
                  </span>
                </Link>
                <Link href="/about" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Điều khoản sử dụng
                  </span>
                </Link>
                <Link href="/blog" passHref>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition duration-300">
                    Trợ giúp
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="flex flex-col lg:flex-row lg:space-x-12 mb-6 lg:mb-0 space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:items-start">
              <span className="text-base mb-4 text-white">Liên hệ</span>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CiMail />
                  <span className="text-gray-400 font-semibold hover:text-white cursor-pointer transition duration-300">
                    rimdasilva@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center mt-8">
          <span className="text-sm text-gray-400">
            © 2024 Rimdasilva. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FiSearch, FiBell, FiUser, FiX, FiMenu } from "react-icons/fi";
import { debounce } from "lodash"; // Import lodash.debounce
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
}

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Modal trạng thái
  const [query, setQuery] = useState(""); // Từ khóa tìm kiếm
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // Bài viết tìm được
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái của menu bên phải

  // Hàm lọc bài viết và gọi API
  const filterPosts = async (keyword: string) => {
    if (keyword.trim()) {
      try {
        const response = await fetch(`/api/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: keyword.trim(), // Gửi từ khóa tìm kiếm trong field 'title'
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();

        // Kiểm tra và đảm bảo data có field `data`
        const posts = data.data || [];
        setFilteredPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    } else {
      setFilteredPosts([]); // Xóa kết quả nếu không có keyword
    }
  };

  // Sử dụng debounce để trì hoãn việc gọi filterPosts
  const debouncedFilter = useCallback(
    debounce((keyword: string) => filterPosts(keyword), 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setQuery(keyword);
    debouncedFilter(keyword); // Gọi hàm debounce khi người dùng gõ
  };

  // Đóng modal khi click ngoài
  const handleCloseModal = (e: React.MouseEvent) => {
    // Kiểm tra nếu click vào nền (không phải modal) thì đóng modal
    if (e.target === e.currentTarget) {
      setIsSearchOpen(false);
    }
  };

  // Toggle menu bên phải
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Khóa cuộn trang khi menu mở và mở lại khi menu đóng
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"; // Khóa cuộn khi menu mở
    } else {
      document.body.style.overflow = "auto"; // Mở lại cuộn khi menu đóng
    }

    // Dọn dẹp khi component bị unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full shadow-md bg-white fixed top-0 z-50">
      {/* Phần trên */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        {/* Phần left */}
        <div className="flex items-center gap-4">
          {/* Nút menu chỉ hiển thị dưới màn hình md */}
          <button
            className="text-gray-600 hover:text-blue-500 transition block md:hidden"
            onClick={toggleMenu}
          >
            <FiMenu size={18} />
          </button>
          <button
            className="text-gray-600 hover:text-blue-500 transition"
            onClick={() => setIsSearchOpen(true)}
          >
            <FiSearch size={18} />
          </button>
          <button className="text-gray-600 hover:text-blue-500 transition">
            <FiBell size={18} />
          </button>
        </div>
        {/* Phần center */}
        <div className="text-xl font-extrabold text-gray-900">RimdaSilva</div>
        {/* Phần right */}
        <div>
          <button className="flex items-center gap-2 text-sm text-white bg-black hover:bg-gray-800 px-4 py-2 rounded-md transition">
            <FiUser size={18} />
            <Link href="/login">Login</Link>
          </button>
        </div>
      </div>
      {/* Phần dưới */}
      <div className=" items-center hidden md:flex justify-center py-2">
        {["News", "Series", ".NET", "SQL", "Devops", "Azure"].map(
          (category) => (
            <div
              key={category}
              className="mx-4 px-1 py-1 cursor-pointer text-gray-500 font-semibold text-sm title-hover"
            >
              {category}
            </div>
          )
        )}
      </div>

      {/* Phần menu bên phải chỉ hiển thị dưới màn hình md */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)} // Đóng menu khi click ra ngoài
        >
          <div
            className="bg-white w-64 p-6 rounded-l-md shadow-xl fixed top-0 right-0 h-full transform transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            }} // Hiệu ứng slide-in
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiX size={20} />
            </button>
            <div className="space-y-6 mt-10">
              <div className="text-2xl font-semibold text-gray-800">Menu</div>
              <ul className="space-y-4">
                {["News", "Series", ".NET", "SQL", "Devops", "Azure"].map(
                  (category) => (
                    <li
                      key={category}
                      className="cursor-pointer text-gray-700 hover:text-blue-500 transition duration-300 hover:pl-2"
                    >
                      {category}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal Search */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal} // Đóng modal khi click ngoài
        >
          <div
            className="bg-white w-11/12 sm:w-96 p-6 rounded-md shadow-md mt-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold">Tìm kiếm bài viết</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsSearchOpen(false)}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Input Search */}
            <input
              type="text"
              placeholder="Search here..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={query}
              onChange={handleSearchChange} // Gọi hàm debounce khi thay đổi
            />

            {/* Search Results */}
            <div className="mt-4">
              {filteredPosts.length > 0
                ? filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="py-2 px-3 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <h3 className="font-semibold text-sm text-gray-800">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-xs"></p>
                    </div>
                  ))
                : query && <p className="text-gray-500">No results found.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

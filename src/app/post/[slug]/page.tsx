"use client";

// File: app/post/[id]/page.tsx
import "prismjs/themes/prism.css";
import ClientPostContent from "./ClientPostContent";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

interface Post {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  categories: { title: string; id: string }[];
  createdDate: string;
}

// Fetch post data from API
async function fetchPostData(slug: string): Promise<Post | null> {
  try {
    const response = await axios.get(
      `http://blog-api.rimdasilva.com/api/post/get-by-slug/${slug}?userWatch=true&api-version=1.0`
    );

    // Kiểm tra cấu trúc dữ liệu trả về
    if (response.data && response.data.data) {
      return response.data.data as Post;
    } else {
      console.error("Invalid post data structure:", response.data);
      return null;
    }
  } catch (err) {
    // Xử lý lỗi
    if (axios.isAxiosError(err)) {
      console.error("Error fetching post:", err.response?.data || err.message);
    } else {
      console.error("Unexpected error:", err);
    }
    return null;
  }
}

// Server Component
const DetailPostPage = ({ params }: { params: { slug: string } }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const fetchedPost = await fetchPostData(params.slug);
      setPost(fetchedPost);
      setLoading(false);
    };

    loadPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="mt-[200px] flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!post) {
    return <div className="mt-[200px] text-center">Post not found.</div>;
  }

  return <ClientPostContent post={post} />;
};

export default DetailPostPage;

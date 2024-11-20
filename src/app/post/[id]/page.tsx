// File: app/post/[id]/page.tsx
import "prismjs/themes/prism.css";
import ClientPostContent from "../[id]/ClientPostContent";

interface Post {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  categories: { title: string; id: string }[];
  createdDate: string;
}

// Fetch post data from API
async function fetchPostData(id: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `http://blog-api.rimdasilva.com/api/post/${id}?api-version=1.0`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching post:", err);
    return null;
  }
}

// Server Component
const DetailPostPage = async ({ params }: { params: { id: string } }) => {
  const post = await fetchPostData(params.id);

  if (!post) {
    return <div className="mt-[200px] text-center">Post not found.</div>;
  }

  return <ClientPostContent post={post} />;
};

export default DetailPostPage;

// components/CommentSection.tsx
import { useState } from "react";
import { FaReply, FaHeart, FaRegHeart, FaSmile } from "react-icons/fa";
import { RiEmojiStickerLine } from "react-icons/ri";

// Emoji List (có thể thay thế bằng thư viện)
const emojis = ["😊", "😃", "😉", "😍", "😎", "😂", "😭", "👍", "🙏"];

interface Comment {
  id: string;
  name: string;
  content: string;
  usename: string;
  replies?: Comment[];
  likes: number;
  liked: boolean; // Trạng thái thả tim (liked or not)
}

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      name: "Nguyễn Văn A",
      usename: "nva",
      content: "Bài viết rất hay và bổ ích!",
      likes: 2,
      liked: false,
    },
    {
      id: "2",
      name: "Trần Thị B",
      content: "Mình đã học được rất nhiều điều từ bài này!",
      usename: "nvb",
      likes: 5,
      liked: false,
    },
  ]);
  const [newComment, setNewComment] = useState<string>("");
  const [newReply, setNewReply] = useState<{ [key: string]: string }>({}); // Lưu trả lời theo từng comment
  const [showEmojiPicker, setShowEmojiPicker] = useState<{
    [key: string]: boolean;
  }>({}); // Trạng thái hiển thị emoji cho từng comment
  const [isReplying, setIsReplying] = useState<{ [key: string]: boolean }>({
    // Trạng thái có trả lời hay không
  });

  // Hàm thêm bình luận
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Math.random().toString(),
        name: "Người dùng mới",
        content: newComment,
        usename: "nva",
        likes: 0,
        liked: false,
        replies: [],
      };
      setComments([...comments, newCommentData]);
      setNewComment("");
    }
  };

  // Hàm thêm trả lời cho bình luận
  const handleAddReply = (parentId: string) => {
    if (newReply[parentId]?.trim()) {
      const updatedComments = comments.map((comment) =>
        comment.id === parentId
          ? {
              ...comment,
              replies: [
                ...(comment.replies || []),
                {
                  id: Math.random().toString(),
                  name: "Người dùng mới",
                  content: newReply[parentId],
                  likes: 0,
                  liked: false,
                  usename: "nva",
                },
              ],
            }
          : comment
      );
      setComments(updatedComments);
      setNewReply({ ...newReply, [parentId]: "" }); // Reset ô input sau khi gửi
      setIsReplying({ ...isReplying, [parentId]: false }); // Đóng ô nhập liệu sau khi gửi
    }
  };

  // Hàm thả tim
  const handleLike = (commentId: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? {
            ...comment,
            liked: !comment.liked, // Đổi trạng thái thả tim
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1, // Thay đổi số lượt thả tim
          }
        : comment
    );
    setComments(updatedComments);
  };

  // Hàm thêm emoji vào ô nhập liệu
  const handleEmojiClick = (parentId: string, emoji: string) => {
    setNewReply((prev) => ({
      ...prev,
      [parentId]: (prev[parentId] || "") + emoji,
    }));
  };

  // Xử lý khi người dùng nhấn enter để trả lời
  const handleKeyDown = (e: React.KeyboardEvent, parentId: string) => {
    if (e.key === "Enter") {
      handleAddReply(parentId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Bình luận</h2>

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{comment.name}</p>
                <p className="text-gray-700">{comment.content}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`transition ${
                    comment.liked ? "text-red-600" : "text-gray-400"
                  }`}
                >
                  {comment.liked ? (
                    <FaHeart className="text-red-600" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
                <span>{comment.likes}</span>
              </div>
            </div>

            {/* Button Reply */}
            <button
              onClick={() =>
                setIsReplying((prev) => ({
                  ...prev,
                  [comment.id]: !prev[comment.id],
                }))
              }
              className="flex items-center text-blue-500 mt-2 text-sm hover:underline"
            >
              <FaReply className="mr-1" />
              Trả lời
            </button>

            {/* Ô nhập liệu trả lời */}
            {isReplying[comment.id] && (
              <div className="mt-2">
                <div className="relative">
                  <textarea
                    value={newReply[comment.id]}
                    onChange={(e) =>
                      setNewReply((prev) => ({
                        ...prev,
                        [comment.id]: e.target.value,
                      }))
                    }
                    placeholder="Nhập trả lời..."
                    className="w-full p-3 border border-gray-300 rounded-lg mb-3"
                    onKeyDown={(e) => handleKeyDown(e, comment.id)}
                  />
                  {/* Nút Emoji */}
                  <button
                    onClick={() =>
                      setShowEmojiPicker((prev) => ({
                        ...prev,
                        [comment.id]: !prev[comment.id],
                      }))
                    }
                    className="absolute right-3 top-3 text-xl"
                  >
                    <RiEmojiStickerLine />
                  </button>

                  {/* Emoji Picker */}
                  {showEmojiPicker[comment.id] && (
                    <div className="absolute right-3 top-12 bg-white border border-gray-300 rounded-lg shadow-lg p-2 grid grid-cols-4 gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleEmojiClick(comment.id, emoji)}
                          className="text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAddReply(comment.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-2"
                >
                  Gửi trả lời
                </button>
              </div>
            )}

            {/* Hiển thị các reply nếu có */}
            {comment.replies && (
              <div className="pl-6 mt-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="text-gray-600 pl-4">
                    <p className="font-semibold">{reply.name}</p>
                    <p>{reply.content}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(reply.id)}
                        className={`transition ${
                          reply.liked ? "text-red-600" : "text-gray-400"
                        }`}
                      >
                        {reply.liked ? (
                          <FaHeart className="text-red-600" />
                        ) : (
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </button>
                      <span>{reply.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form thêm bình luận */}
      <div className="mt-6">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Thêm bình luận..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-3"
          />
          {/* Nút Thêm Icon (emoji) */}
          <button
            onClick={() =>
              setShowEmojiPicker((prev) => ({
                ...prev,
                newComment: !prev["newComment"],
              }))
            }
            className="absolute right-3 top-3 text-xl"
          >
            <RiEmojiStickerLine />
          </button>

          {/* Emoji Picker cho bình luận */}
          {showEmojiPicker["newComment"] && (
            <div className="absolute right-3 top-12 bg-white border border-gray-300 rounded-lg shadow-lg p-2 grid grid-cols-4 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setNewComment((prev) => prev + emoji)}
                  className="text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          Thêm Bình luận
        </button>
      </div>
    </div>
  );
};

export default CommentSection;

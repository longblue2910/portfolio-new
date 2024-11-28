import React from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify"; // Để hiển thị thông báo
import "react-toastify/dist/ReactToastify.css";

interface DeleteButtonProps {
  onDelete: (postId: string) => Promise<void>; // Hàm xóa với ID bài viết
  postId: string; // ID bài viết
  confirmMessage?: string; // Tin nhắn xác nhận
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  postId,
  confirmMessage = "Bạn có chắc chắn muốn xóa bài viết này?",
}) => {
  const handleDelete = async () => {
    const confirmed = confirm(confirmMessage); // Hỏi người dùng trước khi xóa
    if (!confirmed) return;

    try {
      await onDelete(postId); // Gọi hàm onDelete với ID
      toast.success("Xóa bài viết thành công!"); // Thông báo thành công
    } catch (error) {
      toast.error(`Lỗi khi xóa: ${(error as Error).message}`); // Thông báo lỗi
    }
  };

  return (
    <Button variant="contained" color="error" onClick={handleDelete}>
      Xóa
    </Button>
  );
};

export default DeleteButton;

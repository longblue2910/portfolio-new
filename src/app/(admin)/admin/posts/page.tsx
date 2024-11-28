"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import DeleteButton from "@/components/admin/DeleteButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Post {
  id: string;
  title: string;
  descriptionShort: string;
  imageUrl: string;
  slug: string;
  createdDate: string;
  categories: {
    id: string;
    title: string;
    tagName: string | null;
  }[];
}

const ManagePostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  // Fetch posts
  const fetchPosts = async () => {
    const response = await fetch(
      `http://blog-api.rimdasilva.com/api/post/paging?PageSize=${pageSize}&PageIndex=${pageIndex}&api-version=1.0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          title: searchTitle,
        }),
      }
    );

    const result = await response.json();
    setPosts(result.data.data);
    setTotalPosts(result.data.count);
  };

  useEffect(() => {
    fetchPosts();
  }, [pageIndex, searchTitle]);

  // Handle Pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageIndex(value);
  };

  // Handle Dialog
  const handleDialogOpen = (post: Post | null = null) => {
    setSelectedPost(post);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedPost(null);
    setIsDialogOpen(false);
  };

  const navigateToEdit = (postId: string) => {
    router.push(`/admin/posts/edit/${postId}`);
  };

  const navigateToCreate = () => {
    router.push(`/admin/posts/create`);
  };

  const handleDeletePost = async (id: string) => {
    const response = await fetch(
      `http://blog-api.rimdasilva.com/api/post?id=${id}&api-version=1.0`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không rõ lỗi");
    }
  };

  return (
    <div className="bg-white">
      <ToastContainer position="top-right" autoClose={3000} />

      <Box padding={3} sx={{ marginTop: "150px" }}>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Tìm theo Tiêu đề"
              variant="outlined"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              fullWidth
              sx={{
                marginBottom: 2,
                maxWidth: 400, // Set width limit for input
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={navigateToCreate}
              sx={{
                marginBottom: 2,
                paddingLeft: 3,
                paddingRight: 3,
                fontSize: "14px",
                alignSelf: "flex-start", // Align button to the top-right
              }}
            >
              Tạo Mới
            </Button>
          </Grid>
        </Grid>

        <TableContainer
          component={Paper}
          sx={{
            marginTop: 2,
            maxHeight: 500, // Set max height of the table
            overflowX: "auto", // Enable horizontal scrolling for small screens
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>
                    {new Date(post.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => navigateToEdit(post.id)}
                      sx={{ mr: 2 }}
                    >
                      Sửa
                    </Button>
                    <DeleteButton
                      postId={post.id}
                      onDelete={handleDeletePost}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="center" marginTop={2}>
          <Pagination
            count={Math.ceil(totalPosts / pageSize)}
            page={pageIndex}
            onChange={handlePageChange}
          />
        </Box>

        {/* Dialog for Add/Edit */}
        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>
            {selectedPost ? "Chỉnh sửa Bài viết" : "Tạo Mới Bài viết"}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Tiêu đề"
              fullWidth
              margin="dense"
              defaultValue={selectedPost?.title || ""}
            />
            <TextField
              label="Slug"
              fullWidth
              margin="dense"
              defaultValue={selectedPost?.slug || ""}
            />
            <TextField
              label="Thể loại"
              fullWidth
              margin="dense"
              defaultValue={
                selectedPost?.categories.map((cat) => cat.title).join(", ") ||
                ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Hủy</Button>
            <Button variant="contained" onClick={() => alert("Lưu bài viết")}>
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default ManagePostsPage;

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import dynamic cho ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface Category {
  id: string;
  title: string;
}

const CreatePost = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    slug: "",
    categoryIds: [] as string[],
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Fetch danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>(
          "http://blog-api.rimdasilva.com/api/category?size=10&api-version=1.0"
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.description)
      tempErrors.description = "Description is required";
    if (!formData.slug) tempErrors.slug = "Slug is required";
    if (!formData.categoryIds.length)
      tempErrors.categoryIds = "Select at least one category";
    if (!image) tempErrors.image = "Image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("Title", formData.title);
      submitData.append("Description", formData.description);
      submitData.append("Slug", formData.slug);
      submitData.append("ImageFile", image as Blob);
      formData.categoryIds.forEach((id, index) => {
        submitData.append(`CategoryIds[${index}]`, id);
      });

      const res = await axios.post(
        "http://blog-api.rimdasilva.com/api/post?api-version=1.0",
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-requestid": "c2df9a18-fb50-4051-92e3-6c6561e1d3d9",
          },
        }
      );

      // Hiển thị thông báo thành công
      toast.success("Post created successfully!");
      console.log("API Response:", res.data);
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 4, marginTop: "200px" }}>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Typography variant="h4" gutterBottom>
        Tạo mới bài viết
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={Boolean(errors.title)}
          helperText={errors.title}
          margin="normal"
        />

        {/* Description */}
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1">Description</Typography>
          <ReactQuill
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
          {errors.description && (
            <Typography color="error" variant="body2">
              {errors.description}
            </Typography>
          )}
        </Box>

        {/* Slug */}
        <TextField
          fullWidth
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          error={Boolean(errors.slug)}
          helperText={errors.slug}
          margin="normal"
        />

        {/* Category Selection */}
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(errors.categoryIds)}
        >
          <InputLabel id="category-select-label">Categories</InputLabel>
          <Select
            multiple
            value={formData.categoryIds}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryIds: e.target.value as string[],
              })
            }
            renderValue={(selected) =>
              selected
                .map(
                  (id) =>
                    categories.find((category) => category.id === id)?.title
                )
                .join(", ")
            }
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
          {errors.categoryIds && (
            <FormHelperText>{errors.categoryIds}</FormHelperText>
          )}
        </FormControl>

        {/* Upload Image */}
        <Box sx={{ my: 2 }}>
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files![0])}
            />
          </Button>
          {image && <Typography>{image.name}</Typography>}
          {errors.image && (
            <Typography color="error" variant="body2">
              {errors.image}
            </Typography>
          )}
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;

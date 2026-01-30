import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, cancelEditing } from "../slices/blogsSlice";
import { RootState } from "../store";
import "./BlogForm.css";

export const BlogForm: React.FC = () => {
  const dispatch = useDispatch();
  const isEditing = useSelector((state: RootState) => state.blogs.isEditing);
  const selectedBlogId = useSelector(
    (state: RootState) => state.blogs.selectedBlogId
  );
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const selectedBlog = blogs.find((b) => b.id === selectedBlogId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedBlog && isEditing) {
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
    }
  }, [selectedBlog, isEditing]);

  if (!isEditing || !selectedBlog) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateBlog({
        id: selectedBlog.id,
        title,
        content,
      })
    );
    setTitle("");
    setContent("");
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
    setTitle("");
    setContent("");
  };

  return (
    <div className="blog-form-overlay">
      <div className="blog-form-container">
        <h2>Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Blog content"
              rows={6}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Update Blog
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;

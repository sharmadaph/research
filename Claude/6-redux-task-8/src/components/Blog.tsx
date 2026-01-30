import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startEditing, deleteBlog, selectBlog } from "../slices/blogsSlice";
import { RootState } from "../store";
import "./Blog.css";

export const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const selectedBlogId = useSelector(
    (state: RootState) => state.blogs.selectedBlogId
  );
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const selectedBlog = blogs.find((b) => b.id === selectedBlogId);

  if (!selectedBlog) {
    return (
      <div className="blog-container">
        <p>Select a blog to view or create a new one</p>
      </div>
    );
  }

  const handleEdit = () => {
    dispatch(selectBlog(selectedBlog.id));
    dispatch(startEditing());
  };

  const handleDelete = () => {
    dispatch(deleteBlog(selectedBlog.id));
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>{selectedBlog.title}</h1>
        <button
          className="edit-btn"
          onClick={handleEdit}
          title="Edit this blog"
        >
          Edit
        </button>
      </div>
      <div className="blog-content">
        <p>{selectedBlog.content}</p>
      </div>
      <div className="blog-actions">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Blog;

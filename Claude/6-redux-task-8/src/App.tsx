import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import { selectBlog, addBlog } from "./slices/blogsSlice";
import { RootState } from "./store";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const selectedBlogId = useSelector(
    (state: RootState) => state.blogs.selectedBlogId
  );
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");

  const handleAddBlog = () => {
    if (newBlogTitle.trim()) {
      const newBlog = {
        id: Date.now().toString(),
        title: newBlogTitle,
        content: newBlogContent,
      };
      dispatch(addBlog(newBlog));
      dispatch(selectBlog(newBlog.id));
      setNewBlogTitle("");
      setNewBlogContent("");
    }
  };

  const handleSelectBlog = (id: string) => {
    dispatch(selectBlog(id));
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>📝 Blog Manager</h1>
        <p>Manage your blogs with Redux</p>
      </div>

      <div className="app-container">
        <div className="sidebar">
          <div className="new-blog-section">
            <h3>Create New Blog</h3>
            <input
              type="text"
              placeholder="Blog title"
              value={newBlogTitle}
              onChange={(e) => setNewBlogTitle(e.target.value)}
              className="new-blog-input"
            />
            <textarea
              placeholder="Blog content"
              value={newBlogContent}
              onChange={(e) => setNewBlogContent(e.target.value)}
              className="new-blog-input"
              rows={3}
            />
            <button onClick={handleAddBlog} className="add-blog-btn">
              Create Blog
            </button>
          </div>

          <div className="blogs-list">
            <h3>All Blogs</h3>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={`blog-item ${
                  selectedBlogId === blog.id ? "active" : ""
                }`}
                onClick={() => handleSelectBlog(blog.id)}
              >
                <h4>{blog.title}</h4>
                <p>{blog.content.substring(0, 50)}...</p>
              </div>
            ))}
          </div>
        </div>

        <div className="main-content">
          <Blog />
        </div>
      </div>

      <BlogForm />
    </div>
  );
}

export default App;

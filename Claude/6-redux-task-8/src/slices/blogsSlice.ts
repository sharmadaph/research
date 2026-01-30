import { createSlice } from "@reduxjs/toolkit";

export interface Blog {
  id: string;
  title: string;
  content: string;
}

interface BlogsState {
  blogs: Blog[];
  selectedBlogId: string | null;
  isEditing: boolean;
}

const initialState: BlogsState = {
  blogs: [
    {
      id: "1",
      title: "Welcome to My Blog",
      content: "This is my first blog post. Feel free to edit it!",
    },
    {
      id: "2",
      title: "React and Redux",
      content: "Learning React with Redux for state management.",
    },
  ],
  selectedBlogId: null,
  isEditing: false,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    selectBlog(state, action) {
      state.selectedBlogId = action.payload;
    },
    startEditing(state) {
      state.isEditing = true;
    },
    cancelEditing(state) {
      state.isEditing = false;
    },
    updateBlog(state, action) {
      const { id, title, content } = action.payload;
      const blog = state.blogs.find((b) => b.id === id);
      if (blog) {
        blog.title = title;
        blog.content = content;
      }
      state.isEditing = false;
    },
    addBlog(state, action) {
      state.blogs.push(action.payload);
    },
    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
      if (state.selectedBlogId === action.payload) {
        state.selectedBlogId = null;
      }
    },
  },
});

export const {
  selectBlog,
  startEditing,
  cancelEditing,
  updateBlog,
  addBlog,
  deleteBlog,
} = blogsSlice.actions;
export default blogsSlice.reducer;

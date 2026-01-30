# Redux Blog Editor

A React application demonstrating Redux state management for a blog editor with the following features:

## Features

✅ **Add New Blogs** - Create blogs with title and content
✅ **View Blogs** - Select and view blog content  
✅ **Edit Blogs** - Click the blue "Edit" button to edit selected blog
✅ **Redux State Management** - Complete Redux setup with Redux Toolkit
✅ **Modal Form** - Edit form displays as an overlay modal
✅ **Delete Blogs** - Remove blogs from the list
✅ **Responsive Design** - Mobile-friendly interface

## Redux Architecture

### Actions (blogsSlice.ts)

- `selectBlog` - Select a blog to view/edit
- `startEditing` - Enter edit mode
- `cancelEditing` - Cancel editing
- `updateBlog` - Update blog content and exit edit mode
- `addBlog` - Add new blog
- `deleteBlog` - Delete blog

### State Structure

```typescript
{
  blogs: [
    { id: string, title: string, content: string },
    ...
  ],
  selectedBlogId: string | null,
  isEditing: boolean
}
```

## Components

### Blog.tsx

- Displays the selected blog
- Blue "Edit" button in top-right with appealing gradient style
- Shows blog title and content
- Delete button for removing blogs

### BlogForm.tsx

- Modal form for editing blogs
- Title shows "Edit Blog"
- Form fields for title and content
- Update Blog and Cancel buttons
- Only visible when isEditing is true

### App.tsx

- Main application component
- Blog list sidebar
- Blog display area
- Redux store provider

## Styling

### .edit-btn (Blog.css)

- Appealing blue gradient: `linear-gradient(135deg, #0066cc 0%, #0052a3 100%)`
- Positioned in top-right of blog display
- Smooth hover and active states
- Drop shadow for depth

### BlogForm.css

- Overlay modal with semi-transparent background
- Clean, modern form styling
- Responsive design

## Installation & Setup

```bash
npm install
npm start
```

## File Structure

```
src/
├── components/
│   ├── Blog.tsx
│   ├── Blog.css
│   ├── BlogForm.tsx
│   └── BlogForm.css
├── slices/
│   └── blogsSlice.ts
├── App.tsx
├── App.css
├── index.tsx
├── index.css
└── store.ts
public/
└── index.html
package.json
```

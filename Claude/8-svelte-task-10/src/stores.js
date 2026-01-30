import { writable, derived } from 'svelte/store';

// Sample blog data
const blogs = [
  { id: 1, title: 'Getting Started with Svelte', content: 'Learn the basics...' },
  { id: 2, title: 'Advanced Svelte Patterns', content: 'Deep dive into...' },
  { id: 3, title: 'Svelte and Performance', content: 'Optimize your apps...' },
  { id: 4, title: 'Building Real-time Apps', content: 'Using WebSockets...' }
];

// Writable store for all blogs
export const blogStore = writable(blogs);

// Writable store for search query
export const searchQuery = writable('');

// Derived store for filtered blogs
export const filteredBlogs = derived(
  [blogStore, searchQuery],
  ([$blogs, $searchQuery]) => {
    if (!$searchQuery.trim()) {
      return $blogs;
    }
    const query = $searchQuery.toLowerCase();
    return $blogs.filter(blog =>
      blog.title.toLowerCase().includes(query) ||
      blog.content.toLowerCase().includes(query)
    );
  }
);

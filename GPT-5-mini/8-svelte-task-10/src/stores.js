import { writable, derived } from 'svelte/store';

export const blogs = writable([
  { id: 1, title: 'First Blog', content: 'Hello world' },
  { id: 2, title: 'Svelte Tips', content: 'Svelte is great' },
  { id: 3, title: 'Advanced Patterns', content: 'Derived stores are useful' }
]);

export const searchQuery = writable('');

export const filteredBlogs = derived(
  [blogs, searchQuery],
  ([$blogs, $search]) => {
    const q = String($search).trim().toLowerCase();
    if (!q) return $blogs;
    return $blogs.filter(b => (b.title + ' ' + b.content).toLowerCase().includes(q));
  }
);

<script>
  import Search from './components/Search.svelte';
  import BlogList from './components/BlogList.svelte';
  import { derived } from 'svelte/store';
  import { searchQuery } from './components/Search.svelte';

  // Example blogs store
  const blogs = writable([
    { id: 1, title: 'Svelte Basics' },
    { id: 2, title: 'Advanced Svelte' },
    { id: 3, title: 'Svelte and Stores' }
  ]);

  // Derived store to filter blogs based on search query
  const filteredBlogs = derived([blogs, searchQuery], ([$blogs, $searchQuery]) => {
    return $blogs.filter(blog =>
      blog.title.toLowerCase().includes($searchQuery.toLowerCase())
    );
  });
</script>

<Search />
<BlogList {filteredBlogs} />
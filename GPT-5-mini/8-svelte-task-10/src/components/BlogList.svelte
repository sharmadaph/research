<script>
  import { filteredBlogs } from '../stores.js';
  import { onDestroy } from 'svelte';
  let items = [];
  const unsub = filteredBlogs.subscribe(v => items = v);
  onDestroy(unsub);
</script>

<ul>
  {#each items as blog}
    <li>{blog.title}</li>
  {:else}
    <li>No blogs found</li>
  {/each}
</ul>

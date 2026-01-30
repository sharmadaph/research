<script>
  import { writable, derived } from 'svelte/store';

  // Store for search input
  export const searchQuery = writable('');
</script>

<style>
  .search-container {
    width: 200px;
    box-sizing: border-box;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>

<div class="search-container">
  <input
    type="text"
    placeholder="Search Blogs"
    bind:value={$searchQuery}
  />
</div>
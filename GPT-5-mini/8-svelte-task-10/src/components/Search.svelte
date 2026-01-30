<script>
  import { searchQuery } from '../stores.js';
  let value = '';
  $: searchQuery.set(value);
</script>

<style>
  .search { width: 200px; box-sizing: border-box; padding: 6px; }
</style>

<input class="search" placeholder="Search Blogs" bind:value />

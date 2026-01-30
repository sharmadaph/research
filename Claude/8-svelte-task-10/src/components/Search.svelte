<script>
  import { searchQuery } from './stores.js';
</script>

<div class="search-container">
  <input
    type="text"
    placeholder="Search Blogs"
    bind:value={$searchQuery}
  />
</div>

<style>
  .search-container {
    width: 200px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 5px rgba(0, 102, 204, 0.3);
  }
</style>

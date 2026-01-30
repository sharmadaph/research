<script>
  import { filteredBlogs } from '../stores.js';
</script>

<div class="blog-list">
  {#if $filteredBlogs.length > 0}
    {#each $filteredBlogs as blog (blog.id)}
      <div class="blog-item">
        <h3>{blog.title}</h3>
        <p>{blog.content}</p>
      </div>
    {/each}
  {:else}
    <p class="no-results">No blogs found</p>
  {/if}
</div>

<style>
  .blog-list {
    width: 100%;
  }

  .blog-item {
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  .blog-item h3 {
    margin: 0 0 8px 0;
    color: #333;
  }

  .blog-item p {
    margin: 0;
    color: #666;
  }

  .no-results {
    text-align: center;
    color: #999;
    padding: 20px;
  }
</style>

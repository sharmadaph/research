<script>
  export let filteredBlogs = [];
</script>

<style>
  .blog-list {
    margin-top: 20px;
  }

  .blog-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>

<div class="blog-list">
  {#each filteredBlogs as blog}
    <div class="blog-item">{blog.title}</div>
  {/each}
</div>
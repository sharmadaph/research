<script>
  import Search from './components/Search.svelte';
  import BlogList from './components/BlogList.svelte';
</script>

<main>
  <h1>Blog Collection</h1>
  <Search />
  <BlogList />
</main>

<style>
  main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  h1 {
    color: #333;
    margin-bottom: 30px;
  }
</style>

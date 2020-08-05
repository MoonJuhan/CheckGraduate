<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        
      </ul>
      <div class="copyright">
        © {{year}} made with <i class="tim-icons icon-heart-2"></i> by
        <a href="https://github.com/MoonJuhan" target="_blank" rel="noopener">CodeMike</a>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      }
    }
  };
</script>
<style>
</style>

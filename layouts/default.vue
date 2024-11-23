<template>
  <section class="grid" style="min-height: 100vh">
    <aside><LayoutSidebar /></aside>

    <div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
console.log("Loaded Default Layout");
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>

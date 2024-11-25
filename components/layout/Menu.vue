<script setup lang="ts">
import { MENU_DATA } from "./menu.data";
</script>
<template>
  <div>
    <NuxtLink
      v-for="item in MENU_DATA"
      :item.name
      :to="item.url"
      class="flex gap-4 w-full text-gray-300 py-2 px-3 text-xl mb-2 hover:shadow transition-all hover:bg-gray-600 rounded-md"
    >
      <Icon :name="item.icon" />
      <span> {{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped></style>

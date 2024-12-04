<script setup lang="ts">
import { MENU_DATA } from "./menu.data";
</script>
<template>
  <div>
    <NuxtLink
      v-for="item in MENU_DATA"
      :item.name
      :to="item.url"
      class="flex gap-1 w-full justify-center items-center text-gray-300 py-4 px-1 text-base mb-2 hover:shadow transition-all hover:bg-gray-600 rounded-md"
    >
      <Icon size="20" :name="item.icon" />
      <span class="hidden md:flex"> {{ item.name }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped></style>

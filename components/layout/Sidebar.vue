<template>
  <aside class="px-5 py-8 bg-gray-900 h-full relative w-full">
    <NuxtLink to="/" class="block mb-8">
      <NuxtImg src="/icon-green.png" width="100" class="mx-auto" />
    </NuxtLink>
    <button
      class="absolute top-5 right-5 transition-colors hover:text-purple-400 text-2xl text-white"
    >
      <Icon name="line-md:log-out" size="20" />
    </button>
    <UiButton class="bg-blue-900 grid items-center justify-center">
      Send
    </UiButton>
    <slot />
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped></style>

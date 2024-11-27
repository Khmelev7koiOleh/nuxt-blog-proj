<template>
  <aside class="px-5 py-8 bg-gray-900 h-full relative w-full">
    <NuxtLink to="/" class="block mb-8">
      <NuxtImg src="/icon-green.png" width="100" class="mx-auto" />
    </NuxtLink>
    <button
      class="absolute top-5 right-5 transition-colors hover:text-purple-400 text-2xl text-white"
    >
      <Icon name="line-md:log-out" size="20" @click="logout" />
    </button>
    <LayoutMenu />
    <slot />
  </aside>
</template>

<script setup lang="ts">
import { account } from "~/lib/appwrite";

import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();

const router = useRouter();

const logout = async () => {
  isLoadingStore.set(true);
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
  isLoadingStore.set(false);
};
</script>

<style scoped></style>

<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section :class="{ grid: store.isAuth }" style="min-height: 100vh">
    <aside><LayoutSidebar v-if="store.isAuth" /></aside>

    <div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { account } from "~/lib/appwrite";

import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();

const router = useRouter();
console.log("Loaded Default Layout Component");

onMounted(async () => {
  try {
    const user = await account.get();

    if (user) store.set(user);
  } catch (error) {
    console.error("Error:", error);
    router.push("/login");
  } finally {
    isLoadingStore.set(false);
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>

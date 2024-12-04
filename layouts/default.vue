<template>
  <LayoutLoader v-if="isLoadingStore.isLoading" />
  <section class="min-h-screen flex flex-col md:flex-row">
    <!-- Sidebar for medium and larger screens -->
    <aside
      v-if="store.isAuth"
      class="md:block fixed top-0 left-0 z-10 w-[70px] md:w-[200px] bg-gray-200 h-full flex items-center justify-center"
    >
      <LayoutSidebar />
    </aside>

    <!-- Main Content -->
    <div :class="[{ 'md:ml-[200px] ml-[40px]': store.isAuth }, 'flex-1 p-4']">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { account } from "~/lib/appwrite";
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";
import { useRouter } from "vue-router";

const isLoadingStore = useIsLoadingStore();
const store = useAuthStore();
const router = useRouter();

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

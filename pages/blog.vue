<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { DB } from "~/lib/appwrite"; // Assuming DB is set up correctly
import { COLLECTION_BLOGS, DB_ID } from "@/app.constants";

import type { BLOG_DATA } from "../components/kannban/kannban.types";
import { useRouter } from "vue-router";
import { IUseKannban } from "~/components/kannban/kannban.store";

const useKannban = IUseKannban();
const router = useRouter();
const blogs = ref<BLOG_DATA[]>([]);
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

// Funktion zum Abrufen der Blogs
const getAllBlogs = async () => {
  try {
    const response = await DB.listDocuments(DB_ID, COLLECTION_BLOGS);

    if (response.documents.length === 0) {
      errorMessage.value = "No blogs available.";
    } else {
      blogs.value = response.documents.map((document) => ({
        $id: document.$id,
        title: document.title,
        description: document.description,
        image: document.image,
        $createdAt: document.$createdAt,
        status: document.status,
        documentId: document.$id,
      })) as BLOG_DATA[];

      //cool function
      blogs.value.sort((a, b) => {
        const dateA = new Date(a.$createdAt);
        const dateB = new Date(b.$createdAt);
        return dateB.getTime() - dateA.getTime(); // Neuste zuerst
      }); // Sort the blogs by date
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    errorMessage.value = "An error occurred while fetching blogs.";
  } finally {
    isLoading.value = false;
  }
};

// Wenn die Komponente gemountet wird, rufe die Blogs ab
onMounted(() => {
  getAllBlogs();
});

// Beobachte Änderungen in der `blogs`-Datenbank und rufe die Methode erneut auf
watch(blogs && useKannban, async () => {
  await getAllBlogs(); // Ruf die Blogs erneut ab, wenn sie sich ändern
});
</script>
<template>
  <div class="text-2xl text-center font-bold my-8">Blogs</div>
  <div class="text-2xl font-bold mx-4 sm:mx-8">All blogs</div>

  <section class="w-full min-h-screen container mx-auto">
    <div class="flex flex-col gap-8">
      <!-- Create New Post Button -->
      <div class="flex justify-end p-4 w-full">
        <UiButton
          class="px-4 py-2 bg-blue-500 text-white rounded-md"
          @click="useKannban.set(true)"
        >
          Create new post
        </UiButton>
      </div>

      <!-- Create Blog Popup -->
      <div v-if="useKannban.onOpenBlog">
        <KannbanCreateBlogPopup />
      </div>

      <!-- Display Blogs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="blog in blogs" :key="blog.$id" class="flex flex-col gap-8">
          >
          <NuxtLink
            :href="`./edit/${blog.$id}`"
            class="w-full flex justify-center items-center"
          >
            <KannbanABlog :blog="blog" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped></style>

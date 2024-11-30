<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router"; // To get the route parameters
import { DB } from "~/lib/appwrite"; // Assuming DB is set up correctly
import { COLLECTION_BLOGS, DB_ID } from "@/app.constants";
import type { BLOG_DATA } from "~/components/kannban/kannban.types";
import dayjs from "dayjs";

// Define refs for blog data and loading/error states
const blog = ref<BLOG_DATA | null>(null); // Single blog data instead of an array
const isLoading = ref(true);
const errorMessage = ref<string | null>(null);

// Get the route parameters to fetch the specific blog
const route = useRoute();
const blogId = route.params.id as string;

// Function to fetch the blog by ID from the DB
const getBlogById = async () => {
  try {
    const response = await DB.getDocument(DB_ID, COLLECTION_BLOGS, blogId);
    if (response) {
      blog.value = {
        $id: response.$id,
        title: response.title,
        description: response.description,
        image: response.image,
        $createdAt: response.$createdAt,
        status: response.status,
        documentId: response.$id,
      };
    } else {
      errorMessage.value = "Blog not found.";
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    errorMessage.value = "An error occurred while fetching the blog.";
  } finally {
    isLoading.value = false;
  }
};

// Fetch the blog when the component is mounted
onMounted(() => {
  getBlogById();
});
</script>

<template>
  <div v-if="isLoading" class="text-center py-4">Loading blog...</div>

  <div v-else-if="errorMessage" class="text-center py-4 text-red-500">
    {{ errorMessage }}
  </div>

  <div v-else class="gap-4 p-4 rounded-lg">
    <div class="flex justify-between gap-8 mx-8 mt-6">
      <NuxtLink to="/blog">
        <Icon name="line-md:arrow-left" size="30"
      /></NuxtLink>
      <div class="rounded-md px-2 py-1 bg-blue-600 text-white">
        {{ dayjs(blog.$createdAt).format("DD-MM-YYYY") }}
      </div>
    </div>
    <!-- Blog content -->
    <div class="flex flex-col gap-8 justify-center items-center">
      <h2 class="text-2xl font-bold text-center">{{ blog.title }}</h2>
      <div class="w-[65%]">
        <img :src="blog.image" alt="Blog Image" />
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-base font-bold text-center">{{ blog.description }}</p>
      </div>
    </div>
    <!-- Blog meta information -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuid } from "uuid";
import { useRouter } from "vue-router";
import { DB, storage, account } from "~/lib/appwrite";
import { COLLECTION_BLOGS, DB_ID, STORAGE_ID } from "@/app.constants";
import { IUseKannban } from "./kannban.store";

const router = useRouter();
const useKannban = IUseKannban();

const titleRef = ref("");
const descriptionRef = ref("");
const imageRef = ref<File | null>(null);
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

// Handle file selection
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imageRef.value = target.files[0];
  }
};

// Permissions function

// Reset form fields
const resetForm = () => {
  titleRef.value = "";
  descriptionRef.value = "";
  imageRef.value = null;
  isLoading.value = false;
  errorMessage.value = null;
};

const createBlog = async () => {
  try {
    // Start loading state
    isLoading.value = true;

    // Fetch the current logged-in user
    const user = await account.get().catch(() => {
      alert("Please log in first.");
      router.push("/login");
    });
    if (!user) return;

    // Ensure all fields are filled out
    if (!titleRef.value || !descriptionRef.value || !imageRef.value) {
      alert("All fields are required!");
      return;
    }

    // Upload the image to Appwrite storage with proper permissions
    const uploadedImage = await storage.createFile(
      STORAGE_ID,
      uuid(), // Use a unique ID for the image file
      imageRef.value

      // Set proper permissions
    );

    const fileId = uploadedImage.$id;
    const imageURL = storage.getFileView(STORAGE_ID, fileId);

    // Create blog document in the database with proper permissions
    const response = await DB.createDocument(
      DB_ID,
      COLLECTION_BLOGS,
      uuid(), // Use a unique ID for the blog document
      {
        title: titleRef.value,
        description: descriptionRef.value,
        image: imageURL,
      }
    );

    // Reset form fields
    resetForm();
    useKannban.set(false);

    router.push(`/blog`);

    // Refresh the blog list dynamically after creating the new blog
  } catch (error) {
    console.error("Error creating blog:", error);

    if (error.response) {
      console.error("Response details:", error.response);
      errorMessage.value =
        error.response.message || "An error occurred while creating the blog.";
    } else {
      errorMessage.value = error.message || "An error occurred.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section
    class="w-2/4 h-[85%] container bg-green-900 rounded-lg py-8 flex flex-col gap-18 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
  >
    <div class="absolute top-6 left-6">
      <Icon
        name="line-md:close"
        class="text-white"
        size="25"
        @click="useKannban.set(false)"
      />
    </div>
    <div class="text-2xl text-gray-200 text-center mb-[10%]">Create Blog</div>
    <div class="flex flex-col gap-6 max-w-[80%] mx-auto p-4 rounded-lg">
      <div class="border-b-2 border-gray-500"></div>

      <!-- Title Input -->
      <input
        v-model="titleRef"
        placeholder="Enter blog title"
        type="text"
        class="w-full rounded-md px-2"
        :disabled="isLoading"
      />

      <!-- Description Textarea -->
      <textarea
        v-model="descriptionRef"
        rows="10"
        placeholder="Enter blog description"
        class="w-full rounded-md px-2"
        :disabled="isLoading"
      />

      <!-- Image File Input -->
      <input
        type="file"
        class="bg-white rounded-md px-2"
        @change="handleFileChange"
        :disabled="isLoading"
      />

      <!-- Error message -->
      <div v-if="errorMessage" class="text-red-500 text-center">
        {{ errorMessage }}
      </div>

      <!-- Submit Button -->
      <div
        class="text-xl p-4 text-gray-200 text-center bg-gray-900 bg-opacity-5 rounded-lg cursor-pointer"
        @click="createBlog"
        :class="{ 'bg-opacity-50': isLoading }"
        :disabled="isLoading"
      >
        {{ isLoading ? "Creating..." : "Create" }}
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add any additional custom styles here */
</style>

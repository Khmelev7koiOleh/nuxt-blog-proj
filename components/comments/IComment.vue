<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuid } from "uuid";
import { DB, account } from "~/lib/appwrite";
import { useRouter } from "vue-router";
import { COLLECTION_COMMENTS, DB_ID } from "@/app.constants";
import dayjs from "dayjs";
import type { IComment } from "./comments.store";

const comments = ref<IComment[]>([]);
const router = useRouter();
const userName = ref("");
const commentsAmount = ref(0);
const commentRef = ref("");
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

const resetForm = () => {
  commentRef.value = "";
};

const onCancel = () => {
  resetForm();
};

const getAllComments = async () => {
  try {
    isLoading.value = true;
    const response = await DB.listDocuments(DB_ID, COLLECTION_COMMENTS);

    if (response) {
      comments.value = response.documents.map((document) => ({
        $id: document.$id,
        text: document.text,
        $createdAt: dayjs(document.$createdAt).format("MM/DD/YYYY HH:mm"),
      }));
      commentsAmount.value = comments.value.length;
    } else {
      errorMessage.value = "Comments not found.";
    }

    comments.value.sort((a, b) => {
      const dateA = new Date(a.$createdAt);
      const dateB = new Date(b.$createdAt);
      return dateB.getTime() - dateA.getTime(); // Neuste zuerst
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    errorMessage.value = "An error occurred while fetching the comments.";
  } finally {
    isLoading.value = false;
  }
};

const createComment = async () => {
  if (commentRef.value.length >= 1) {
    try {
      const user = await account.get().catch(() => {
        alert("Please log in first.");
        router.push("/login");
      });
      if (!user) return;

      const newComment = {
        $id: uuid(),
        text: commentRef.value,
        $createdAt: dayjs().format("MM/DD/YYYY HH:mm"),
      };

      const response = await DB.createDocument(
        DB_ID,
        COLLECTION_COMMENTS,
        newComment.$id,
        { text: newComment.text }
      );

      if (response) {
        resetForm();
        comments.value.unshift(newComment); // Füge den neuen Kommentar oben ein
        commentsAmount.value = comments.value.length; // Aktualisiere die Anzahl
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    alert("Please enter something.");
  }
};

onMounted(async () => {
  await getAllComments();
  const user = await account.get();
  userName.value = user.email;
});
</script>

<template>
  <div class="px-4 py-2">
    <div>Comments: {{ commentsAmount }}</div>

    <section>
      <div class="py-8">
        <input
          v-model="commentRef"
          placeholder="Write a comment"
          type="text"
          class="w-full bg-transparent placeholder:text-white placeholder:font-light focus:outline-none text-gray-200"
        />
        <div class="border-b-2 border-gray-500"></div>

        <div class="flex justify-end p-4 gap-4">
          <button @click="onCancel" class="px-4 py-2">Cancel</button>
          <button
            @click="createComment()"
            class="px-4 py-2 rounded-lg bg-gray-600"
          >
            Create
          </button>
        </div>
      </div>

      <div v-if="isLoading">Loading...</div>
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.$id" class="mt-8">
          <div class="flex gap-4 justify-between">
            <div class="px-2">By: {{ userName }}</div>
            <div
              class="inline-block rounded-md px-2 py-1 bg-gray-500 text-white"
            >
              {{ comment.$createdAt }}
            </div>
          </div>
          <div class="border border-gray-500 p-4">{{ comment.text }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuid } from "uuid";
import { DB, account } from "~/lib/appwrite";
import { useRouter, useRoute } from "vue-router";
import { COLLECTION_COMMENTS, DB_ID } from "@/app.constants";
import dayjs from "dayjs";
import type { IComment } from "./comments.store";
import { Query } from "appwrite";

const comments = ref<IComment[]>([]);
const router = useRouter();
const route = useRoute();
const blogId = ref(route.params.id as string);

const userName = ref("");

const commentsAmount = ref(0);
const commentRef = ref("");
const isLoading = ref(false);
const errorMessage = ref<string | null>(null);

// Resets comment input form
const resetForm = () => {
  commentRef.value = "";
};

const onCancel = () => {
  resetForm();
};

// Fetch all comments
const getAllComments = async () => {
  try {
    isLoading.value = true;
    let commentsList: IComment[] = [];
    let page = 1;
    let moreComments = true;

    while (moreComments) {
      const response = await DB.listDocuments(DB_ID, COLLECTION_COMMENTS, [
        Query.equal("blog", blogId.value),
        Query.limit(50),
        Query.offset((page - 1) * 50),
      ]);

      if (response?.documents?.length > 0) {
        commentsList = commentsList.concat(
          response.documents.map((document) => ({
            $id: document.$id,
            text: document.text,
            $createdAt: dayjs(document.$createdAt).format("MM/DD/YYYY HH:mm"),
            blog: document.blog,
            user: document.user, // Ensure user ID is stored
          }))
        );

        if (response.documents.length < 50) {
          moreComments = false;
        } else {
          page++;
        }
      } else {
        moreComments = false;
      }
    }

    comments.value = commentsList;
    commentsAmount.value = comments.value.length;

    comments.value.sort(
      (a, b) =>
        new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching comments:", error);
    errorMessage.value = `Error fetching comments: ${error.message}`;
  } finally {
    isLoading.value = false;
  }
};

// Create new comment
const createComment = async () => {
  if (commentRef.value.trim().length >= 1) {
    try {
      const user = await account.get().catch(() => {
        alert("Please log in first.");
        router.push("/login");
      });
      if (!user) return;

      const newComment = {
        $id: uuid(),
        text: commentRef.value,
        blog: blogId.value,
        user: userName.value,
        $createdAt: dayjs().format("MM/DD/YYYY HH:mm"),
      };

      await DB.createDocument(DB_ID, COLLECTION_COMMENTS, newComment.$id, {
        text: newComment.text,
        blog: newComment.blog,
        user: newComment.user,
      });
      console.log(user);
      resetForm();
      comments.value.unshift(newComment);
      commentsAmount.value = comments.value.length;
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  } else {
    alert("Please enter something.");
  }
};

onMounted(async () => {
  const user = await account.get();
  userName.value = user.email;
  await getAllComments();
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
          @keyup.enter="createComment"
          class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 bg-transparent placeholder:text-black placeholder:font-light focus:outline-none text-gray-600"
        />
        <div class="border-b-2 border-gray-500 mt-4"></div>

        <div class="flex justify-end p-4 gap-4">
          <button @click="onCancel" class="px-4 py-2">Cancel</button>
          <button
            @click="createComment"
            class="px-4 py-2 rounded-lg bg-gray-600 text-white"
          >
            Create
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-4">Loading...</div>
      <div v-else-if="errorMessage" class="text-center py-4 text-red-500">
        {{ errorMessage }}
      </div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.$id" class="mt-8">
          <div class="flex gap-4 justify-between">
            <div class="px-2">By: {{ comment.user }}</div>
            <div
              class="inline-block rounded-md px-2 py-1 bg-gray-500 text-white"
            >
              {{ comment.$createdAt }}
            </div>
          </div>

          <textarea
            rows="3"
            class="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-2 mt-2 border rounded"
          >
            {{ comment.text }}
          </textarea>
          <!-- Uncomment and use if textarea is needed for editing -->
          <!-- 
          <textarea
            v-model="comment.text"
            class="w-full break-words rounded-md px-2 py-1 bg-gray-500 text-white"
            readonly
          ></textarea>
          -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>

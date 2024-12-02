<template>
  <div class="gap-4 p-4 bg-green-800 rounded-lg">
    <div class="flex justify-between gap-8 w-[90%]">
      <div class="w-2/5">
        <img :src="blog.image" alt="Blog Image" />
      </div>
      <div class="text-white w-3/6 flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-center">
          {{ blog.title }}
        </h2>
        <p class="text-base font-bold text-center">{{ blog.description }}</p>
      </div>
    </div>
    <div class="flex justify-between mx-8 mt-6">
      <div class="rounded-md px-2 py-1 bg-blue-600 text-white">
        {{ dayjs(blog.$createdAt).format("DD-MM-YYYY") }}
      </div>
      <button
        class="flex rounded-md px-3 py-1 bg-blue-600 text-white gap-2 items-center hover:bg-blue-500 transition-all"
      >
        <div>View</div>
        <Icon name="line-md:arrow-right" size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { v4 as uuid } from "uuid";
import { useRouter } from "vue-router";
import { DB, storage, account } from "~/lib/appwrite";
import { COLLECTION_BLOGS, DB_ID, STORAGE_ID } from "@/app.constants";
import { IUseKannban } from "./kannban.store";
import { get } from "@vueuse/core";
import type { BLOG_DATA } from "./kannban.types";

import { defineProps } from "vue";

import dayjs from "dayjs";
const props = defineProps<{
  blog: BLOG_DATA;
}>();
const router = useRouter();
const useKannban = IUseKannban();
</script>

<style scoped></style>

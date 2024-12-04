<template>
  <div class="gap-4 p-4 bg-green-800 rounded-lg w-full hidden md:inline-block">
    <div class="rounded-md px-2 py-1 text-white w-full flex justify-center">
      <div class="inline-block rounded-md px-2 py-1 bg-blue-900">
        {{ dayjs(blog.$createdAt).format("DD-MM-YYYY-HH:mm") }}
      </div>
    </div>
    <div class="flex justify-between gap-8 w-[90%]">
      <div class="w-[350px] h-[250px] flex justify-center items-center">
        <img
          :src="blog.image"
          class="object-cover max-h-[250px] max-w-[350px]"
          alt="Blog Image"
        />
      </div>
      <div class="text-white w-3/6 flex flex-col gap-4">
        <h2 class="text-2xl font-bold text-center">
          {{ blog.title }}
        </h2>
        <textarea
          rows="5"
          class="text-base font-bold text-center w-full break-words bg-transparent"
        >
          {{ blog.description }}
        </textarea>
      </div>
    </div>
    <div class="flex justify-end mx-8 mt-6">
      <button
        class="flex rounded-md px-3 py-1 bg-blue-600 text-white gap-2 items-center hover:bg-blue-500 transition-all"
      >
        <div>View</div>
        <Icon name="line-md:arrow-right" size="20" />
      </button>
    </div>
  </div>

  <div class="gap-4 p-4 bg-green-800 rounded-lg w-full inline-block md:hidden">
    <div class="flex flex-col justify-between gap-8 w-[90%]">
      <div class="rounded-md px-2 text-sm py-1 bg-blue-600 text-white">
        Created: {{ dayjs(blog.$createdAt).format("DD-MM-YYYY-HH:mm") }}
      </div>
      <h2 class="text-lg font-bold text-center text-white">
        {{ blog.title }}
      </h2>
      <div
        class="object-cover w-[200px] h-[200px] flex justify-center items-center overflow-hidden"
      >
        <img :src="blog.image" width="200" alt="Blog Image" />
      </div>
      <div class="text-gray-200 w-full flex justify-center gap-4">
        {{ blog.description.slice(0, 30) }}...
      </div>
    </div>
    <div class="flex justify-end items-center gap-2 mx-2 mt-2">
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

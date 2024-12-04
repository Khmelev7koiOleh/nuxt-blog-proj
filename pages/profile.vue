<template>
  <div class="text-2xl text-center font-bold my-8">Profile</div>

  <section
    class="container p-10 border-2 border-gray-900 w-[90%] sm:w-[80%] md:w-[70%] flex flex-col sm:flex-row justify-start items-center rounded-md bg-gray-800"
  >
    <div class="flex flex-col sm:flex-row gap-10 sm:gap-20 w-full">
      <img
        src="/icon-green.png"
        width="200"
        height="200"
        class="mx-auto rounded-full border-2 border-gray-800 sm:w-[200px] sm:h-[200px] w-[150px] h-[150px] object-cover"
      />
      <div class="flex flex-col justify-center gap-4 w-full">
        <div class="text-2xl text-gray-200">My name: {{ user.name }}</div>
        <div class="text-xl text-gray-200">My email: {{ user.email }}</div>
        <div class="text-xl text-gray-200">
          Account was created at: {{ user.$createdAt.slice(0, 10) }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { account } from "~/lib/appwrite";
import { ref, onMounted } from "vue";

const user = ref({});

onMounted(async () => {
  user.value = await account.get();
});
</script>

<style scoped></style>

<script setup lang="ts">
import { v4 as uuid } from "uuid";

import { account } from "~/lib/appwrite";
import { useIsLoadingStore, useAuthStore } from "~/store/auth.store";
const authStore = useAuthStore();

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const router = useRouter();
const isLoadingStore = useIsLoadingStore();
const login = async () => {
  isLoadingStore.set(true);
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

  const response = await account.get();
  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
    });
  }

  emailRef.value = "";
  passwordRef.value = "";
  nameRef.value = "";

  await router.push("/");
  isLoadingStore.set(false);
};

const register = async () => {
  await account.create(
    uuid(),
    emailRef.value,
    passwordRef.value,
    nameRef.value
  );
  await login();
};
</script>

<template>
  <div class="p-10 flex justify-center items-center min-h-screen w-full">
    <div class="rounded bg-gray-900 w-1/4 p-5 text-gray-300">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
      <form>
        <UiInput
          v-model="emailRef"
          placeholder="Email"
          type="email"
          class="mb-4"
        />
        <UiInput
          v-model="passwordRef"
          placeholder="Password"
          type="password"
          class="mb-4"
        />
        <UiInput
          v-model="nameRef"
          placeholder="Name"
          type="text"
          class="mb-4"
        />
        <div class="flex justify-center items-center gap-5">
          <UiButton
            type="button"
            class="bg-gray-800 text-white rounded hover:bg-gray-700"
            @click="login"
            >Login</UiButton
          >
          <UiButton
            type="button"
            class="bg-gray-800 text-white rounded hover:bg-gray-700"
            @click="register"
            >Register</UiButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { useAuthStore, useIsLoadingStore } from "~/store/auth.store";
import { account } from "~/lib/appwrite";
import { v4 as uuid } from "uuid";
import { useSeoMeta, useRouter, ref, watch } from "#imports"; // Ensure to import these as needed

const errorMessages = {
  email: "Email is required",
  password: "Password is required",
  name: "Name is required",
};

useSeoMeta({
  title: "Login",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const isLoadingStore = useIsLoadingStore();
const authStore = useAuthStore();
const router = useRouter();

// Function to handle login
const login = async () => {
  try {
    isLoadingStore.set(true);
    await account.createEmailPasswordSession(emailRef.value, passwordRef.value);

    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        status: true,
        name: response.name,
      });
      await router.push("/");
    }
  } catch (error) {
    console.error("Login error:", error); // Handle error appropriately
  } finally {
    isLoadingStore.set(false);
  }
};

// Function to handle registration
const register = async () => {
  try {
    isLoadingStore.set(true);
    await account.create(
      uuid(), // Generate a unique ID for the user
      emailRef.value, // Ensure email is correctly assigned to the second argument
      passwordRef.value, // Password as the third argument
      nameRef.value // Name as the optional fourth argument
    );
    await login(); // Log in automatically after registration
  } catch (error) {
    console.error("Registration error:", error);
    // Handle error appropriately
  } finally {
    isLoadingStore.set(false);
  }
};

// Watcher for debugging email input (optional)
watch(emailRef, () => {
  console.log(emailRef.value);
});
</script>

<template>
  <div class="p-10 flex justify-center items-center min-h-screen w-full">
    <div
      class="rounded bg-gray-900 w-full sm:w-3/4 md:w-1/3 lg:w-1/4 p-5 text-white"
    >
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
      <form>
        <UiInput
          v-model="emailRef"
          type="email"
          class="mb-4"
          :placeholder="
            errorMessages ? `${errorMessages.email}` : 'Enter your email'
          "
          :class="{
            'placeholder:text-red-500': errorMessages,
            'placeholder:text-gray-500': !errorMessages,
          }"
        />
        <UiInput
          v-model="passwordRef"
          type="password"
          class="mb-4"
          :placeholder="
            errorMessages ? `${errorMessages.password}` : 'Enter your password'
          "
          :class="{
            'placeholder:text-red-500': errorMessages,
            'placeholder:text-gray-500': !errorMessages,
          }"
        />
        <UiInput
          v-model="nameRef"
          type="text"
          :placeholder="
            errorMessages ? `${errorMessages.name}` : 'Enter your name ..'
          "
          :class="{
            'placeholder:text-red-500': errorMessages,
            'placeholder:text-gray-500': !errorMessages,
          }"
        />
        <div class="flex justify-center items-center gap-5 p-4">
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

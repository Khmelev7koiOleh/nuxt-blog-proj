<template>
  <div>{{ comment.text }}</div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { IComment } from "./comments.store";

const props = defineProps<{ blogId: string; comment: IComment }>();
</script>

<style scoped></style>

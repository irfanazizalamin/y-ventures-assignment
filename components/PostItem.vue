<script setup lang="ts">
import type { Post } from "@/types/post";

defineProps<{ post: Post }>();
</script>

<template>
  <div class="border rounded p-3 mb-2 shadow-sm">
    <h2 class="font-semibold">{{ post.title }}</h2>
    <p class="text-sm text-gray-700">{{ post.body }}</p>
  </div>
</template>

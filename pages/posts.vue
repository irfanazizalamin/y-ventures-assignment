<script setup lang="ts">
import { usePosts } from "@/composables/usePosts";

const { posts, fetchPosts, loading, error, userId } = usePosts();

onMounted(fetchPosts);
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-6">
    <div class="mb-4">
      <label for="user" class="block font-medium mb-1"
        >Filter by User ID:</label
      >
      <select id="user" class="border rounded p-2" v-model="userId">
        <option :value="null">All Users</option>
        <option v-for="id in 10" :key="id" :value="id">User {{ id }}</option>
      </select>
    </div>

    <div v-if="loading">Loading posts...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <ul v-else class="space-y-4">
      <li v-for="post in posts" :key="post.id" class="border p-4 rounded">
        <h3 class="font-semibold mb-1">{{ post.title }}</h3>
        <p class="text-sm text-gray-700">{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

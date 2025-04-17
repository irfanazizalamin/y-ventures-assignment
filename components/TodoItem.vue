<script setup lang="ts">
import type { Todo } from "~/types/todo.ts";

defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: "toggle", id: string): void;
  (e: "remove", id: string): void;
}>();
</script>

<template>
  <li class="flex items-center justify-between mb-2">
    <label class="flex items-center gap-2">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      />
      <span :class="{ 'line-through text-gray-400': todo.completed }">{{
        todo.title
      }}</span>
    </label>
    <button
      class="text-red-500 hover:text-red-700"
      @click="emit('remove', todo.id)"
    >
      🗑️
    </button>
  </li>
</template>

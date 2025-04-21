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
  <li
    class="flex items-center border rounded shadow-sm p-3 justify-between mb-2"
  >
    <label class="flex items-center gap-3">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      />
      <div class="mb-2">
        <h2
          class="font-semibold"
          :class="{ 'line-through text-gray-400': todo.completed }"
        >
          {{ todo.title }}
        </h2>
        <p
          class="text-sm text-gray-700"
          :class="{ 'line-through text-gray-400': todo.completed }"
        >
          {{ todo.body }}
        </p>
      </div>
    </label>
    <button
      class="text-red-500 hover:text-red-700"
      @click="emit('remove', todo.id)"
    >
      🗑️
    </button>
  </li>
</template>

<script setup lang="ts">
import type { Filter } from "@/types/todo";

const props = defineProps<{
  modelValue: Filter;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: Filter): void;
}>();

const filters: Filter[] = ["all", "completed", "pending"];
</script>

<template>
  <div class="flex justify-center gap-3 mb-4">
    <button
      v-for="f in filters"
      :key="f"
      :class="[
        'capitalize px-3 py-1 rounded',
        f === modelValue
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700',
      ]"
      @click="emit('update:modelValue', f)"
    >
      {{ f }}
    </button>
  </div>
</template>

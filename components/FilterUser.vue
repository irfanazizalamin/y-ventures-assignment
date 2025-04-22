<script setup lang="ts">
const props = defineProps<{
  modelValue: number | null;
  userIds: number[] | string[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number | null): void;
}>();

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  emit("update:modelValue", value === "null" ? null : Number(value));
}
</script>

<template>
  <div class="mb-4">
    <label for="user" class="block font-medium mb-1">Filter by User ID:</label>
    <select
      id="user"
      class="border rounded p-2"
      :value="modelValue ?? 'null'"
      @change="onChange"
    >
      <option value="null">All Users</option>
      <option
        v-for="id in userIds"
        :key="id"
        :value="id"
      >
        User {{ id }}
      </option>
    </select>
  </div>
</template>

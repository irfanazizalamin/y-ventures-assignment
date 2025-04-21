<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", text: string, description: string): void;
}>();

const input = ref("");
const description = ref("");

const submit = () => {
  if (!input.value.trim()) return;
  emit("submit", input.value, description.value);
  input.value = "";
  description.value = "";
};
</script>

<template>
  <div class="mb-4">
    <div class="block font-medium mb-1">Add Todo:</div>
    <div class="p-3 border rounded">
      <input
        v-model="input"
        placeholder="Add title..."
        class="border p-2 w-full rounded"
      />

      <textarea
        v-model="description"
        placeholder="Add description..."
        class="mt-4 border p-2 w-full rounded"
      />

      <div class="flex justify-end">
        <button
          @click="submit"
          @keyup.enter="submit"
          class="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

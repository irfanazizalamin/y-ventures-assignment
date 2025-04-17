<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit", text: string): void;
}>();

const input = ref("");

const submit = () => {
  if (!input.value.trim()) return;
  emit("submit", input.value);
  input.value = "";
};
</script>

<template>
  <div class="mb-4">
    <input
      v-model="input"
      placeholder="Add a task..."
      class="border p-2 w-full rounded"
      @keyup.enter="submit"
    />
  </div>
</template>

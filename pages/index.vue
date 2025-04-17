<script setup lang="ts">
import TodoInput from "@/components/TodoInput.vue";
import TodoItem from "@/components/TodoItem.vue";
import FilterTabs from "@/components/FilterTabs.vue";
import { useTodo } from "@/composables/useTodo";

const {
  filteredTodos,
  addTodo,
  toggleTodo,
  removeTodo,
  filter,
  fetchTodos,
  loading,
  error,
} = useTodo();

onMounted(() => {
  fetchTodos();
});
</script>

<template>
  <div class="p-4 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">To-Do List</h1>

    <TodoInput @submit="addTodo" />

    <FilterTabs :modelValue="filter" @update:modelValue="filter = $event" />

    <div v-if="error" class="text-red-500 text-center my-4">
      <p>{{ error }}</p>
    </div>

    <div v-if="loading" class="text-center my-4">
      <p>Loading...</p>
    </div>

    <div class="space-y-2">
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
      <p v-if="!filteredTodos.length" class="text-center text-gray-500">
        No tasks found.
      </p>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .p-4 {
    padding: 1rem;
  }
}
</style>

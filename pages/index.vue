<script setup lang="ts">
import TodoInput from '@/components/TodoInput.vue'
import TodoItem from '@/components/TodoItem.vue'
import FilterTabs from '@/components/FilterTabs.vue'

import type { Todo, Filter } from '@/types/todo'

const todos = ref<Todo[]>([
  { id: '1', title: 'Learn Nuxt 3', completed: true },
  { id: '2', title: 'Build a To-Do App', completed: false },
  { id: '3', title: 'Push to GitHub', completed: false }
])

const filter = ref<Filter>('all')

const filteredTodos = computed(() => {
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  if (filter.value === 'pending') return todos.value.filter(t => !t.completed)
  return todos.value
})

const addTodo = (title: string) => {
  todos.value.push({
    id: Date.now().toString(),
    title,
    completed: false
  })
}

const removeTodo = (id: string) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

const toggleTodo = (id: string) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}
</script>


<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-xl font-bold mb-4">📝 To-Do List</h1>

    <TodoInput @submit="addTodo" />

    <FilterTabs v-model="filter" />

    <ul>
      <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
      />
    </ul>
  </div>
</template>

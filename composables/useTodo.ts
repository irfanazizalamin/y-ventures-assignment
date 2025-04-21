import type { Todo, Filter } from "~/types/todo.ts";
import { useLocalStorage } from "~/utils/storage.js";

export const useTodo = () => {
  const todos = useLocalStorage<Todo[]>("todos", []);
  const filter = ref<Filter>("all");
  const loading = ref(false);
  const error = ref("");
  const userId = ref<number | null>(null);
  const isOnline = ref(true);

  const checkOnlineStatus = () => {
    isOnline.value = navigator.onLine;
  };

  const fetchTodos = async () => {
    loading.value = true;
    checkOnlineStatus();

    if (isOnline.value) {
      try {
        let url = "https://jsonplaceholder.typicode.com/posts";
        if (userId.value !== null) {
          url += `?userId=${userId.value}`;
        }

        const res = await $fetch<Todo[]>(url);
        todos.value = res.map((post) => ({
          ...post,
          id: post.id.toString(),
          completed: false,
          createdAt: Date.now(),
        }));
        localStorage.setItem("todos", JSON.stringify(todos.value));
        todos.value.sort((a, b) => b.createdAt - a.createdAt); // Sort todos by creation date
      } catch (e) {
        error.value = "Failed to load todos from API.";
      } finally {
        loading.value = false;
      }
    } else {
      // If offline, retrieve data from localStorage
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        todos.value = JSON.parse(storedTodos);
      } else {
        error.value = "No internet connection and no local data found.";
      }
      loading.value = false;
    }
  };

  const addTodo = async (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      userId: 11,
      title,
      body: title,
      completed: false,
      createdAt: Date.now(),
    };

    todos.value.push(newTodo);
    todos.value.sort((a, b) => b.createdAt - a.createdAt);
    localStorage.setItem("todos", JSON.stringify(todos.value));

    if (isOnline.value) {
      try {
        await $fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            title: newTodo.title,
            body: newTodo.title,
            userId: newTodo.userId,
          }),
        });
      } catch (e) {
        error.value = "Failed to add todo to the API.";
      }
    }
  };

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos.value));
  };

  const toggleTodo = (id: string) => {
    const todo = todos.value.find((todo: Todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(todos.value));
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = computed(() => {
    if (filter.value === "all") return todos.value;
    return todos.value.filter((todo: Todo) =>
      filter.value === "completed" ? todo.completed : !todo.completed
    );
  });

  watch(userId, fetchTodos);

  return {
    todos,
    filteredTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    filter,
    fetchTodos,
    loading,
    error,
    userId,
    checkOnlineStatus,
  };
};

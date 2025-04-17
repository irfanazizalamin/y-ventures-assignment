import type { Post } from "@/types/post";

export const usePosts = () => {
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref("");
  const userId = ref<number | null>(null);

  const fetchPosts = async () => {
    loading.value = true;
    try {
      let url = "https://jsonplaceholder.typicode.com/posts";
      if (userId.value !== null) {
        url += `?userId=${userId.value}`;
      }
      const res = await $fetch<Post[]>(url);
      posts.value = res;
    } catch (e) {
      error.value = "Failed to load posts.";
    } finally {
      loading.value = false;
    }
  };

  watch(userId, fetchPosts);

  return { posts, fetchPosts, loading, error, userId };
};

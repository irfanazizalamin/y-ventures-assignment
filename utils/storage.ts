export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const data = ref<T>(initialValue) as Ref<T>

  if (process.client) {
    const stored = localStorage.getItem(key)

    if (stored) {
      try {
        data.value = JSON.parse(stored)
      } catch (e) {
        console.warn(`Error parsing localStorage item for key "${key}"`, e)
      }
    }

    watch(
      data,
      (val) => {
        try {
          localStorage.setItem(key, JSON.stringify(val))
        } catch (e) {
          console.error(`Error saving to localStorage with key "${key}"`, e)
        }
      },
      { deep: true }
    )
  }

  return data
}

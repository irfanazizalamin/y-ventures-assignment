import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [],
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: true
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
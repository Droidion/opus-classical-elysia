import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  build: {
    modulePreload: {
      polyfill: false,
    },
    manifest: true,
    rollupOptions: {
      input: "/src/scripts.ts",
    },
  },
});

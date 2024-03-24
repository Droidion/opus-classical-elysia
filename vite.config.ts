import { defineConfig } from "vite";

export default defineConfig({
  build: {
    polyfillModulePreload: false,
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "/src/scripts.ts",
    },
  },
});

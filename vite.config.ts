import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [solidPlugin()],
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: [
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
      },
      {
        find: "@lib",
        replacement: fileURLToPath(new URL("./src/lib", import.meta.url)),
      },
      {
        find: "@db",
        replacement: fileURLToPath(new URL("./src/db", import.meta.url)),
      },
    ],
  },
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

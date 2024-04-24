/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "istanbul", // or 'v8'
      exclude: [
        ...configDefaults.exclude,
        "**/node_modules/**",
        "**/dist/**",
        "./src/config/**",
        "**/__mocks__/**",
        "**/main.tsx/**",
        "**/.eslintrc.cjs/**",
      ],
    },
  },
});

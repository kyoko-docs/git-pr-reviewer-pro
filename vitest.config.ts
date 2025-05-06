// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // node_modules と e2e フォルダを除外
    exclude: ["**/node_modules/**", "e2e/**"],
    environment: "jsdom",
    globals: true,
  },
});

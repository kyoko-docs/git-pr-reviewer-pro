import { defineConfig, devices } from "@playwright/test";
import path from "path";

export default defineConfig({
  testDir: ".",
  timeout: 30 * 1000,
  use: {
    baseURL: "http://localhost:5000",
    headless: true,
  },
  webServer: {
    command: "pnpm run preview",
    port: 5000,
    cwd: path.resolve(__dirname, ".."), // 実行ディレクトリをルートに設定
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});

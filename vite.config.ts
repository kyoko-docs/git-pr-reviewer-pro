import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest";

// Workaround for crxjs issue #846
/* eslint-disable @typescript-eslint/no-explicit-any */
const viteManifestHackIssue846: Plugin & {
  renderCrxManifest?: (manifest: any, bundle: any) => void;
} = {
  name: "vite-manifest-hack-issue846",
  renderCrxManifest(_manifest, bundle) {
    // Vite 5以降のビルドマニフェストをルートmanifest.jsonとして扱う
    if (bundle[".vite/manifest.json"]) {
      bundle["manifest.json"] = bundle[".vite/manifest.json"];
      bundle["manifest.json"].fileName = "manifest.json";
      delete bundle[".vite/manifest.json"];
    }
  },
};

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    viteManifestHackIssue846, // ← 追加
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        options: "options.html",
      },
    },
  },
});

// src/manifest.ts
export default {
  manifest_version: 3,
  name: "Git-PR Reviewer Pro",
  version: "0.0.1",
  description:
    "Fast file collapsing, AI summary, and progress bar for GitHub PRs.",
  options_page: "options.html",
  host_permissions: ["https://github.com/*"],
  action: {
    default_popup: "index.html",
    default_icon: {
      48: "icons/icon48.png",
      128: "icons/icon128.png",
    },
  },
  icons: {
    32: "icons/icon32.png",
    48: "icons/icon48.png",
    128: "icons/icon128.png",
  },
  permissions: ["storage"],
  background: {
    service_worker: "src/background.ts",
  },
  web_accessible_resources: [
    {
      matches: ["https://github.com/*"],
      resources: [
        "vendor/*", // HMR / preamble 等の出力先
        "assets/*.js", // content-script-preamble 等
      ],
    },
  ],
  commands: {
    "toggle-collapse": {
      suggested_key: {
        default: "Ctrl+Shift+X", // ← Windows/Linux 用
        mac: "Command+Shift+X", // ← mac 用
      },
      description: "Collapse/Expand all files",
    },
  },
  content_scripts: [
    {
      matches: ["https://github.com/*/*/pull/*/files*"],
      js: ["src/content/index.ts"],
    },
  ],
};

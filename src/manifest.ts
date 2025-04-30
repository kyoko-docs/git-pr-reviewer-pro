// src/manifest.ts
export default {
  manifest_version: 3,
  name: "Git-PR Reviewer Pro",
  version: "0.0.1",
  description:
    "Fast file collapsing, AI summary, and progress bar for GitHub PRs.",
  host_permissions: ["https://github.com/*"],
  action: {
    default_popup: "index.html",
    default_icon: "icon.png",
  },
  permissions: [],
  background: {
    service_worker: "src/background.ts",
  },
  content_scripts: [],
};

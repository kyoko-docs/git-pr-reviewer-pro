// src/lib/api.ts
export async function toggleCollapse(collapsed: boolean) {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs[0]?.id) throw new Error("No active tab");
  await chrome.tabs.sendMessage(tabs[0].id, collapsed ? "expand" : "collapse");
}

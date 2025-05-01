// src/background.ts

// キー入力を検知
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "toggle-collapse") return;

  // 現在の collapsed 状態を取得（undefined は false 扱い）
  const { collapsed } = await chrome.storage.local.get("collapsed");
  const nextCollapsed = !collapsed;

  // アクティブタブを取得
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  // content script にメッセージ送信
  chrome.tabs.sendMessage(
    tab.id,
    nextCollapsed ? "collapse" : "expand",
    (response) => {
      if (chrome.runtime.lastError) {
        console.warn(
          "[GPRP] sendMessage error:",
          chrome.runtime.lastError.message,
        );
      } else {
        console.log("[GPRP] toggled →", response);
      }
    },
  );

  // ストレージに次の状態を保存
  await chrome.storage.local.set({ collapsed: nextCollapsed });

  // バッジ更新：折りたたみ中は "C"、展開中はクリア
  const badgeText = nextCollapsed ? "C" : "";
  chrome.action.setBadgeText({ text: badgeText, tabId: tab.id });
});

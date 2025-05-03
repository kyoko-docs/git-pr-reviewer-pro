// src/content/index.ts
import {
  collapseAllContainers,
  expandAllContainers,
  attachToggleListeners,
} from "../lib/dom";

// ① 対象 URL 判定
if (!location.pathname.match(/^\/[^/]+\/[^/]+\/pull\/\d+\/files/)) {
  console.log("[GPRP] not a PR files page");
} else {
  console.log("[GPRP] content loaded");
  attachToggleListeners();
}

// ② collapseAll() 関数
function collapseAll() {
  collapseAllContainers();
  chrome.storage.local.set({ collapsed: true }).catch(console.error);
  console.log("[GPRP] collapseAll() executed");
  attachToggleListeners();
}

// ③ expandAll() 関数
function expandAll() {
  expandAllContainers();
  chrome.storage.local.set({ collapsed: false }).catch(console.error);
  console.log("[GPRP] expandAll() executed");
  attachToggleListeners();
}

// ④ メッセージリスナーで “collapse” / “expand” を受信
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg === "collapse") {
    collapseAll();
    sendResponse({ collapsed: true });
  } else if (msg === "expand") {
    expandAll();
    sendResponse({ collapsed: false });
  }
});

// ⑤ 初期ロード時に前回状態を読み込んで復元
chrome.storage.local.get("collapsed", (result) => {
  const collapsed = result.collapsed === true; // undefined は展開状態(false)
  if (collapsed) {
    collapseAll();
  } else {
    expandAll();
  }
});

// テスト用グローバル露出
/* eslint-disable @typescript-eslint/no-explicit-any */
(window as any).collapseAll = collapseAll;
(window as any).expandAll = expandAll;
/* eslint-enable @typescript-eslint/no-explicit-any */

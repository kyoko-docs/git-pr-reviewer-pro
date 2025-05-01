// src/content/index.ts

// ① 対象 URL 判定
if (!location.pathname.match(/^\/[^/]+\/[^/]+\/pull\/\d+\/files/)) {
  console.log("[GPRP] not a PR files page");
} else {
  console.log("[GPRP] content loaded");
}

// ② collapseAll() 関数
function collapseAll() {
  // GitHub の PR Files changed では
  // each file container が .js-details-container クラスを持つ div なのでここで取得
  document
    .querySelectorAll<HTMLElement>(".js-details-container")
    .forEach((container) => {
      container.classList.remove("open");
      container.classList.remove("Details--on");
      const content = container.querySelector<HTMLElement>(".js-file-content");
      if (content) content.style.display = "none";
    });
  chrome.storage.local.set({ collapsed: true }).catch(console.error);
  console.log("[GPRP] collapseAll() executed");
}

function expandAll() {
  document
    .querySelectorAll<HTMLElement>(".js-details-container")
    .forEach((container) => {
      container.classList.add("open");
      container.classList.add("Details--on");
      const content = container.querySelector<HTMLElement>(".js-file-content");
      if (content) content.style.display = "";
    });
  chrome.storage.local.set({ collapsed: false }).catch(console.error);
  console.log("[GPRP] expandAll() executed");
}

// ③ メッセージリスナーで “collapse” を受信したら実行
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg === "collapse") {
    collapseAll();
    sendResponse({ collapsed: true });
  } else if (msg === "expand") {
    expandAll();
    sendResponse({ collapsed: false });
  }
});

// ④ 初期ロード時に前回状態を読み込んで復元
// 初期ロード時（undefined対策付き）
chrome.storage.local.get("collapsed", (result) => {
  // undefined のときは「展開状態(false)」がデフォルト
  const collapsed = result.collapsed === true;
  if (collapsed) {
    collapseAll();
  } else {
    expandAll();
  }
});

// collapseAll のテスト用露出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).collapseAll = collapseAll;

// 追加：expandAll も同様に露出
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).expandAll = expandAll;

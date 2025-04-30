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
  const containers = document.querySelectorAll<HTMLElement>(
    ".js-details-container",
  );
  containers.forEach((container) => {
    // 折りたたみ状態をクラス駆動で解除
    container.classList.remove("open");
    container.classList.remove("Details--on");
    // .js-file-content（実際の diff 部分）を非表示に
    const content = container.querySelector<HTMLElement>(".js-file-content");
    if (content) content.style.display = "none";
  });
  console.log("[GPRP] collapseAll() executed");
}

// ③ メッセージリスナーで “collapse” を受信したら実行
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg === "collapse") {
    collapseAll();
    sendResponse({ collapsed: true });
  }
});

// collapseAll 定義のあとに追加
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).collapseAll = collapseAll;

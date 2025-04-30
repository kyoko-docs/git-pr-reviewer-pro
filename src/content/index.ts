// src/content/index.ts

// ① PR files URL かどうかチェック
if (!location.pathname.match(/^\/[^/]+\/[^/]+\/pull\/\d+\/files/)) {
  // GitHub の PR Files changed ページ以外なら何もしない
  console.log("[GPRP] not a PR files page");
} else {
  // PR Files changed ページなら動作確認用ログ
  console.log("[GPRP] content loaded");
}

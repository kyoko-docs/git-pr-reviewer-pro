import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [elapsedMs, setElapsedMs] = useState<number | null>(null);

  useEffect(() => {
    chrome.storage.local.get("collapsed", ({ collapsed: col }) => {
      setCollapsed(col === true);
    });
  }, []);

  const toggle = async () => {
    const start = performance.now();
    // ① アクティブタブを取得
    const tabs = await new Promise<chrome.tabs.Tab[]>((resolve) =>
      chrome.tabs.query({ active: true, currentWindow: true }, resolve),
    );
    if (!tabs[0]?.id) return;

    // ② コンテンツスクリプトにメッセージ送信
    await new Promise<void>((resolve) =>
      chrome.tabs.sendMessage(
        tabs[0].id!,
        collapsed ? "expand" : "collapse",
        () => resolve(),
      ),
    );

    const end = performance.now();
    setElapsedMs(Math.round(end - start));
    setCollapsed(!collapsed);
    console.log(`[GPRP] toggle took ${Math.round(end - start)} ms`);
  };

  return (
    <div style={{ width: 200, padding: 16, fontFamily: "sans-serif" }}>
      <h3>Git-PR Reviewer Pro</h3>
      <button onClick={toggle}>
        {collapsed ? "Expand All" : "Collapse All"}
      </button>
      {elapsedMs !== null && (
        <p style={{ marginTop: 8 }}>処理時間: {elapsedMs} ms</p>
      )}
    </div>
  );
};

const container = document.getElementById("root");
if (container) createRoot(container).render(<Popup />);

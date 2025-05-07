import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { toggleCollapse } from "../lib/api";
import "./Popup.css";
import "../styles/common.css";

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
    await toggleCollapse(collapsed);
    const end = performance.now();
    setElapsedMs(Math.round(end - start));
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="popup-container"
      style={{ width: 200, padding: 16, fontFamily: "sans-serif" }}
    >
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

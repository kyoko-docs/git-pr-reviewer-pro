// src/options/main.tsx
import { createRoot } from "react-dom/client";
import { ApiKey } from "./ApiKey";

const root = createRoot(document.getElementById("root")!);
root.render(<ApiKey />);

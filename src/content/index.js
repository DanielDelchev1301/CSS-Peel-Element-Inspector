import React from "react";
import { createRoot } from "react-dom/client";
import Overlay from "./components/Overlay.js";

const container = document.createElement("div");
container.id = "element-inspector-extension-container-shadow-host";
container.style.position = "absolute";
const shadow = container.attachShadow({ mode: "open" });
document.body.appendChild(container);

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = chrome.runtime.getURL("dist/styles/main.css");
shadow.appendChild(link);

const root = createRoot(shadow);
root.render(<Overlay />);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "enable") window.dispatchEvent(new Event("EXT_ENABLE"));
  if (msg.action === "disable") window.dispatchEvent(new Event("EXT_DISABLE"));
});
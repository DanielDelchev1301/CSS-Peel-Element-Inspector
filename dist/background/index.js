(() => {
  // src/background/index.js
  var activeTabs = {};
  chrome.action.onClicked.addListener((tab) => {
    const tabId = tab.id;
    if (activeTabs[tabId]) {
      chrome.tabs.sendMessage(tabId, { action: "disable" });
      delete activeTabs[tabId];
      chrome.action.setBadgeText({ tabId, text: "" });
    } else {
      chrome.tabs.sendMessage(tabId, { action: "enable" });
      activeTabs[tabId] = true;
      chrome.action.setBadgeText({ tabId, text: "ON" });
      chrome.action.setBadgeBackgroundColor({ tabId, color: "green" });
    }
  });
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "downloadAsset") {
      chrome.downloads.download(
        {
          url: msg.url,
          filename: msg.filename || msg.url.split("/").pop(),
          saveAs: false
        },
        (downloadId) => {
          if (chrome.runtime.lastError) {
            console.error("Download failed:", chrome.runtime.lastError);
            sendResponse({ success: false });
          } else {
            console.log("Download started, ID:", downloadId);
            sendResponse({ success: true });
          }
        }
      );
      return true;
    }
  });
})();
//# sourceMappingURL=index.js.map

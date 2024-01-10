chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    (tab.url.startsWith("https://twitter.com/i/communitynotes") ||
      tab.url.startsWith("https://twitter.com/i/birdwatch"))
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["./main.js"],
      });
    });
  }
});

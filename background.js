chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    //changeInfo.url &&
    changeInfo.status === "complete" &&
    (tab.url.startsWith("https://twitter.com/i/communitynotes") ||
      tab.url.startsWith("https://twitter.com/i/birdwatch"))
  ) {
    console.log("injected");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["./main.js"],
      });
    });
  }
});

/*chrome.webNavigation.onCommitted.addListener(function (details) {
  console.log(details.tabId);
  chrome.tabs.get(details.tabId, function(tab) {
    console.log(tab.url);
    if (tab.url.startsWith("https://twitter.com/i/communitynotes") ||
        tab.url.startsWith("https://twitter.com/i/birdwatch")
    ) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          files: ["./main.js"],
        });
      });
    }
  });
});
*/


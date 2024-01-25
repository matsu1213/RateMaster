let injectedTabs = new Set()

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    //changeInfo.url &&
    changeInfo.status === "complete" &&
    (tab.url.startsWith("https://twitter.com/i/communitynotes") ||
      tab.url.startsWith("https://twitter.com/i/birdwatch"))
  ) {
    if (injectedTabs.has(tabId)) {
      return;
    }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        files: ["./main.js"],
      });
    });
    injectedTabs.add(tabId);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  const { tabId } = details;
  injectedTabs.delete(tabId);
});

/*
let isProcessing = false;
chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.method === "GET" && !isProcessing) {
      isProcessing = true
      console.log("GET request completed:", details.url);
      fetch(details.url)
        .then(response => {
          console.log(response.status);

          //chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          //  chrome.tabs.sendMessage(tabs[0].id, { msg: "noteDetails"}, details)
          //})
          isProcessing = false;
        })
        .catch(error => {
          console.error("Error fetching response text:", error)
          isProcessing = false;
      });
    }
  },
  { urls: ['https://twitter.com/i/api/*BirdwatchFetchNotes*'] }
);
*/


chrome.commands.onCommand.addListener(function(command) {
  if (command === "rateNote") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { msg: "rateFirst"})
    })
  }
});


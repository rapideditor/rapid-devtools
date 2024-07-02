chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "sendElementProperties") {
      chrome.runtime.sendMessage({ action: "receiveElementProperties", data: message.data });
  }
});
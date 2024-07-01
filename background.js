chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "sendElementProperties") {
      // Forward the message to panel.js
      chrome.runtime.sendMessage({ action: "receiveElementProperties", data: message.data });
  }
});
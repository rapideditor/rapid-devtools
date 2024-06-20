// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript

chrome.runtime.onConnect.addListener(function (port) {
  var extensionListener = function (message, sender, sendResponse) {
    if (message.tabId && message.content) {
      //Evaluate script in inspectedPage
      //Pass message to inspectedPage
      // console.log("to current tab");
      chrome.tabs.sendMessage(message.tabId, message, sendResponse);

    } else {
      // This accepts messages from the inspectedPage and
      // sends them to the panel
      // console.log("to panel");
      port.postMessage(message);
    }
    sendResponse(message);
  };

  // Listens to messages sent from the panel
  chrome.runtime.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    chrome.runtime.onMessage.removeListener(extensionListener);
  });

  // port.onMessage.addListener(function (message) {
  //     port.postMessage(message);
  // });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  return true;
});
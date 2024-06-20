
// var s = document.createElement('script');
// s.src = chrome.extension.getURL('content.js');
// (document.head||document.documentElement).appendChild(s);
// s.onload = function() {
//     s.parentNode.removeChild(s);
// };

const btn = document.createElement("btn");
btn.innerHTML = "click send panel";
(document.body || document.documentElement).appendChild(btn);

btn.addEventListener("click", () => {
  console.log('click');
  sendObjectToDevTools({ content: "Changed by page" });
});

/**
 * Permite:
 * 1. Send messages/data to devtools panel
 * 2. Receive messages/data from the panel
 */

// 1
function sendObjectToDevTools(message) {
  // The callback here can be used to execute something on receipt
  chrome.runtime.sendMessage(message, function (message) {});
}
// 2
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({ status: "ok" });
  console.log("message from panel", message);
});
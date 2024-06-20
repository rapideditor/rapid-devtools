console.log("content.js loaded");

const btn = document.createElement("btn");
btn.innerHTML = "click send panel";
(document.body || document.documentElement).appendChild(btn);

btn.addEventListener("click", () => {
  console.log('click');
  sendObjectToDevTools({ content: "Changed by page" });
});

// 1 Send messages/data to devtools panel
function sendObjectToDevTools(message) {
  // The callback here can be used to execute something on receipt
  chrome.runtime.sendMessage(message, function (message) {});
}
// 2 Receive messages/data from the panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse({ status: "ok" });
  console.log("message from panel", message);
});
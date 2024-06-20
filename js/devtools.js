// JavaScript executed in a panel or sidebar pane has access to the the same APIs as the DevTools page.
// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("Rapid",              //title
                              "../assets/rapid_favicon.png",  //iconPath
                              "../frontend/panel.html",         //pagePath
                              function(panel) {});

var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
  // Handle responses from the background page, if any
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "content.js"
});
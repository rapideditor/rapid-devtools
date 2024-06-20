// Create a tab in the devtools area
// JavaScript executed in a panel or sidebar pane has access to the the same APIs as the DevTools page.
// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create(
  "Rapid",              //title
  "../assets/rapid_favicon.png",  //iconPath
  "../frontend/panel.html",         //pagePath
  function(panel) {}
);
// Can use
// chrome.devtools.*
// chrome.extension.*

// Create a tab in the devtools area
chrome.devtools.panels.create("Rapid",              //title
                              "rapid_favicon.svg",  //iconPath
                              "panel.html",         //pagePath
                              function(panel) {});

console.log(window.rapidContext)
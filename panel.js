// // Function to display the version in panel's UI
function displayRapidVersion(version) {
  const rapidVersionElement = document.getElementById('rapidVersion');
  if (version !== undefined) {
    rapidVersionElement.textContent = `Rapid Version Detected: ${version}`;
  } else {
    rapidVersionElement.textContent = "Rapid is not running"
  }
}

// Function to display history in panel's UI
function displayRapidHistory(history) {
  const rapidHistoryElement = document.getElementById('rapidHistory');
  rapidHistoryElement.textContent = "Rapid History:";

  for (let i = 0; i < history.length; i++) {
    const ele = history[i]
    let ol = document.createElement("ol");
    ol.innerText = `${i}) ${ele.annotation}`;
    rapidHistoryElement.appendChild(ol);
  }
}

//Code to inject script into Rapid window
var inject = function() {
  // load injected script
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.runtime.getURL('/injected.js'), false);
  xhr.send();
  var script = xhr.responseText;

  // inject into inspectedWindow
  chrome.devtools.inspectedWindow.eval(script);
};

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  console.log(msg)
  displayRapidVersion(msg.rapid.version)
  displayRapidHistory(msg.rapid.history)
});

inject();
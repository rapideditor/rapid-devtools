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
const displayRapidHistory = (history, currHistIndex) => {
  const rapidHistoryIndex = document.getElementById('rapidHistoryIndex');
  const rapidHistoryElement = document.getElementById('rapidHistory');
  rapidHistoryIndex.textContent = `Current Index: ${currHistIndex}`;
  rapidHistoryElement.textContent = `Rapid History:`;

  for (const i in history) {
    const histEl = history[i];

    let ol = document.createElement("ol");
    ol.innerText = `
      ${i}) ${histEl.annotation}
      Changes: ${Object.keys(histEl.didChange).map(el => el)}
    `;

    rapidHistoryElement.appendChild(ol);
  }
}

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg) {
  displayRapidVersion(msg.rapid.rapidVersion)
  displayRapidHistory(msg.rapid.diffObj, msg.rapid.currHistIndex)
});

//Inject script into Rapid
var inject = function() {
  // load injected script
  var xhr = new XMLHttpRequest();
  xhr.open('GET', chrome.runtime.getURL('/injected.js'), false);
  xhr.send();
  var script = xhr.responseText;

  // inject into inspectedWindow
  chrome.devtools.inspectedWindow.eval(script);
};

inject();
function fetchRapidVersion() {
  chrome.devtools.inspectedWindow.eval(
    `
    (function() {
      //Retrieve version from inspected tab's window
      return window.rapidContext.version;
    })();
    `,
    function(result, isException) {
      if (!isException) {
        displayRapidVersion(result);
        fetchRapidHistory(result)
      } else {
        console.error("Error fetching Rapid version:", isException);
      }
    }
  );
}

function fetchRapidHistory(version) {
  chrome.devtools.inspectedWindow.eval(
    `
    (function() {
      return window.rapidContext.systems.editor._history;
    })();
    `,
    function(result, isException) {
      if (!isException) {
        displayRapidHistory(version, result);
      } else {
        console.error("Error fetching Rapid version:", isException);
      }
    }
  );
}

// Function to display the version in panel's UI
function displayRapidVersion(version) {
  const rapidVersionElement = document.getElementById('rapidVersion');
  rapidVersionElement.textContent = version !== undefined ? `Rapid Version Detected: ${version}` : "Rapid is not running";
}

// Function to display history in panel's UI
function displayRapidHistory(version, history) {
  const rapidHistoryElement = document.getElementById('rapidHistory');
  rapidHistoryElement.textContent = "Rapid History:";

  for (let i = 1; i < history.length; i++) {
    const ele = history[i]
    let ol = document.createElement("ol");
    ol.innerText = `${i}) ${ele.annotation}`;
    rapidHistoryElement.appendChild(ol);
  }
}

// Initial fetch of 'rapidVersion' when panel is opened
fetchRapidVersion();

// Optional: Add listener for selection changes in the Elements panel
chrome.devtools.panels.elements.onSelectionChanged.addListener(fetchRapidVersion);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "receiveElementProperties") {
      const elementProperties = message.data;
      // Do something with the element properties, e.g., update the UI
      console.log("Received element properties in panel.js:", elementProperties);

      // Example: Update the UI
      document.getElementById('elementProperties').textContent = JSON.stringify(elementProperties, null, 2);
  }
});
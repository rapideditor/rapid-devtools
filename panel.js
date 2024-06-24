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
      } else {
        console.error("Error evaluating expression:", isException);
      }
    }
  );
}

// Function to display the version in panel's UI
function displayRapidVersion(rapidVersionValue) {
  const rapidVersionElement = document.getElementById('rapidVersion');
  rapidVersionElement.textContent = rapidVersionValue !== undefined ? `Rapid Version Detected: ${rapidVersionValue}` : "Rapid is not running";
}

// Initial fetch of 'rapidVersion' when panel is opened
fetchRapidVersion();

// Optional: Add listener for selection changes in the Elements panel
chrome.devtools.panels.elements.onSelectionChanged.addListener(fetchRapidVersion);
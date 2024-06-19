// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
//
// Can use:
// chrome.tabs.*
// chrome.extension.*

function inserted() {
	if (window.rapidContext) {
		console.log("Context",window.rapidContext)
		console.log("Version:",window.rapidContext.version)
	} else {
		console.log("Rapid not running")
	}
}
inserted();
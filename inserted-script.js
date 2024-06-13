// This is included and executed in the inspected page
function inserted() {
	if (window.rapidContext) {
		console.log("Context",window.rapidContext)
		console.log("Version:",window.rapidContext.version)
	} else {
		console.log("Rapid not running")
	}
}
inserted();
// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

document.getElementById("send").addEventListener("click", (e) => {
    console.log("click panel");

    // chrome.devtools.inspectedWindow.eval(console.log("test"));
    sendObjectToInspectedPage({action: "script", content: "../content-script.js"});
  });


/**
 * This creates and maintains the communication channel between the inspectedPage and the dev tools panel.
 */
(function createChannel() {
    //Create a port with background page for continous message communication
    var port = chrome.runtime.connect({
      name: "Sample Communication", //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
      console.log("receive panel", message);
    });
  })();

  /**
   * This sends an object to the background page where it can be relayed to the inspected page
   *  In this example, messages are JSON objects
   *  {
   *    content: [String|Object], data to be passed through
   *    tabId: [Automatically added]
   *  }
   * @param {Object} message
   */
  function sendToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    chrome.runtime.sendMessage(message);
  }

/*
function inserted() {
	if (window.rapidContext) {
		console.log("Context",window.rapidContext)
		console.log("Version:",window.rapidContext.version)
	} else {
		console.log("Rapid not running")
	}
}
inserted();

*/
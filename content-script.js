// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.
console.log("This prints to the console of the page (injected only if the page url matched)")

var s = document.createElement('script');
s.src = chrome.runtime.getURL('content.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};


document.querySelector('button').addEventListener('click', function() {
  sendObjectToDevTools({content: "Changed by page"});
});
function sendObjectToDevTools(message) {
  // The callback here can be used to execute something on receipt
  chrome.extension.sendMessage(message, function(message){});
}
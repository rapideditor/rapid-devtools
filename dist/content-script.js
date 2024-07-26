/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/content/content-script.js ***!
  \***************************************/
/*global chrome*/

window.addEventListener('message', function(event) {
  // Only accept messages from same frame
  if (event.source !== window) {
    return;
  }

  var message = event.data;

  //Only accept message with Rapid History
  if (typeof message !== 'object' || message === null || !message.rapid) {
    return;
  }

  chrome.runtime.sendMessage(message);
});
/******/ })()
;
//# sourceMappingURL=content-script.js.map
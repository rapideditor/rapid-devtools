/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/devtools/devtools.js ***!
  \**********************************/
// Make a shallow copy with a null prototype, so that sidebar does not
// expose prototype.
const page_getHistory = function () {
  let data = window.rapidContext ? window.rapidContext.systems.editor._history : {};
  let props = Object.getOwnPropertyNames(data);
  let copy = { __proto__: null };

  for (let i = 0; i < props.length; ++i){
    copy[props[i]] = data[props[i]]
  };

  return copy;
};

//Create DevTools Panel
chrome.devtools.panels.create(
  'Rapid',
  'assets/rapid_favicon.png',
  'panel.html',
  function (panel) {
    console.log("Panel created")
  }
);

//Elements Sidebar to display Rapid History
chrome.devtools.panels.elements.createSidebarPane(
  'Rapid Properties', //title of sidebar
  function (sidebar) {
    function updateElementProperties() {
      sidebar.setExpression(
        '(' + page_getHistory.toString() + ')()',
        'History'
      )
    }

    updateElementProperties();

    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties
    );
    window.addEventListener("click", updateElementProperties(), '*');
    window.addEventListener("keypress", updateElementProperties(), '*');
  }
);
/******/ })()
;
//# sourceMappingURL=devtools.js.map
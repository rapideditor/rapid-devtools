const page_getHistory = function () {
  let data = window.rapidContext ? window.rapidContext.systems.editor._history : {};
  // Make a shallow copy with a null prototype, so that sidebar does not
  // expose prototype.
  let props = Object.getOwnPropertyNames(data);
  let copy = { __proto__: null };
  for (let i = 0; i < props.length; ++i) copy[props[i]] = data[props[i]];
  return copy;
};

//Create panel
chrome.devtools.panels.create(
  'Rapid',
  'assets/rapid_favicon.png',
  'panel.html',
  function (panel) {
    console.log("Panel created")
  }
);

//Create sidebar
chrome.devtools.panels.elements.createSidebarPane(
  'Rapid Properties',
  function (sidebar) {
    function updateElementProperties() {
      sidebar.setExpression('(' + page_getHistory.toString() + ')()');
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties
    );
  }
);
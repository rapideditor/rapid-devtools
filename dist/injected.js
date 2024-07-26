/******/ (() => { // webpackBootstrap
/*!**********************************!*\
  !*** ./src/injected/injected.js ***!
  \**********************************/
console.log("DevTools script injected")

//SEND HISTORY TO CONTENT SCRIPT > SERVICE WORKER > DEVTOOLS
let rapidVersion = window.rapidContext.version;
let rapidHistory = window.rapidContext.systems.editor.history;
let currHistIndex = 0;
let diffObj = []

/*
rapid: {
  rapidVersion,
  rapidHistory,
  diffObj = [
    1: {
        annotation: 'Continued an area'
        didChange: {
          "geometry": true,
          "addition": true
        },
        changes: {
        0:
          {
            w-1:{
              base: {
                nodes: ['n-1', 'n-2', 'n-3', 'n-1'],
                tags: {area: 'yes'}
              },
              head: {
                nodes: ['n-1', 'n-2', 'n-3', 'n-4', 'n-1'],
                tags: {area: 'yes'}
              }
          },
        1:
          {
            n-4:{
              base: undefined,
              head: {
                nodes: ['n-1', 'n-2', 'n-3', 'n-4', 'n-1'],
                loc: [-121.764189, 37.2991402]
              }
          },
        }
      }
  ]
}
*/

//Test area: http://127.0.0.1:8080/#map=19.58/37.29942/-121.76374&background=Bing&datasets=fbRoads,msBuildings&disable_features=boundaries

const updateDifferences = () => {
  diffObj = [];
  diffObj.push(new diffEl());

  for (let i = 1; i < rapidHistory.length; i++) {
    let curr = rapidHistory[i].graph;
    let prev = rapidHistory[i-1].graph;

    let differences = new Rapid.Difference(prev,curr);

    diffObj.push(new diffEl(
      rapidHistory[i].annotation,
      differences.didChange,
      differences.changes ? Object.fromEntries(differences.changes) : {}
    ))
  }

  sendRapidContext();
}

// HISTORY ITEM OBJECT
class diffEl {
  constructor (annotation, didChange, changes) {
    this.annotation = annotation ? annotation : "No change made.";
    this.didChange = didChange ? didChange : "none";
    this.changes = changes ? changes : "";
  }
}

const historyUpdate = () => {
  rapidHistory = window.rapidContext.systems.editor.history.slice();
  currHistIndex = window.rapidContext.systems.editor.index;
  updateDifferences();
}

const sendRapidContext = () => {
  window.postMessage({rapid: {
    rapidVersion,
    currHistIndex,
    diffObj
  }}, '*');
}

sendRapidContext();

// UPDATE INFORMATION
//Hook into event emitter to send messages whenever there is a change in Rapid's history

//EditSystem
const editor = window.rapidContext.systems.editor;

editor
.on('merge', () => {
  historyUpdate();
})
.on('stagingchange', () => {
  historyUpdate()
})
.on('historyjump', () => {
  historyUpdate()
});
/******/ })()
;
//# sourceMappingURL=injected.js.map
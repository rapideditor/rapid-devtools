console.log("DevTools script injected")

//SEND HISTORY TO CONTENT SCRIPT > SERVICE WORKER > DEVTOOLS
let rapidVersion = window.rapidContext.version;
let rapidHistory = window.rapidContext.systems.editor.history;
let currHistIndex = 0;
let diffObj = {}

/*
Example of diffObj properties.

diffObj = {
  1: {
      annotation: 'Deleted an area'
      didChange: 'deletion'
      changes: {}
    }
}
*/

//Test area: http://127.0.0.1:8080/#map=19.58/37.29942/-121.76374&background=Bing&datasets=fbRoads,msBuildings&disable_features=boundaries

const updateDifferences = () => {
  diffObj = {};
  diffObj[0] = new diffEl();

  for (let i = 1; i < rapidHistory.length; i++) {
    let curr = rapidHistory[i].graph;
    let prev = rapidHistory[i-1].graph;

    let differences = new Rapid.Difference(prev,curr);

    diffObj[i] = new diffEl(
      rapidHistory[i].annotation,
      differences.didChange,
      differences.changes ? Object.fromEntries(differences.changes) : {}
    )
  }

  sendRapidContext();
}

class diffEl {
  constructor (annotation, didChange, changes) {
    this.annotation = annotation ? annotation : "No change made.";
    this.didChange = didChange ? didChange : "None.";
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

//Hook into event emitter to send messages whenever there is a change in Rapid's history
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
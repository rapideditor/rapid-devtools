let version = window.rapidContext.version;
let history = window.rapidContext.systems.editor.history;
let diff = {}

const updateDifferences = () => {
  for (let i = 1; i < history.length; i++) {
    let curr = history[i].graph;
    let prev = history[i-1].graph;

    diff[i] = new Rapid.Difference(prev,curr);
  }
}

const historyUpdate = () => {
  history = window.rapidContext.systems.editor.history.slice()
}

window.postMessage({rapid: {
  version,
  history,
  diff
}}, '*');

const handleChange = (e) => {
  historyUpdate();
  updateDifferences();

  window.postMessage({rapid: {
    version,
    history,
    diff
  }}, '*');

}

window.addEventListener("click", handleChange(), '*');
window.addEventListener("keypress", handleChange(), '*');


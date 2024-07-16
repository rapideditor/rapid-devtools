/*global chrome*/

//IMPORTS - REACT
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import RapidLogo from '../assets/rapid-logo.svg'
import './panel.css';

const Panel = () => {
  const [rapidContext, setRapidContext] = useState({})

  // Create a connection to the background page
  var backgroundPageConnection = chrome.runtime.connect({
    name: 'panel'
  });

  backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
  });

  backgroundPageConnection.onMessage.addListener(function(msg) {
    setRapidContext(msg.rapid)
  });

  useEffect(() => {
    //Inject script into Rapid
    var inject = function() {
      // load injected script
      var xhr = new XMLHttpRequest();
      xhr.open('GET', chrome.runtime.getURL('/injected.js'), false);
      xhr.send();
      var script = xhr.responseText;

      // inject into inspectedWindow
      chrome.devtools.inspectedWindow.eval(script);
    };

    inject();
  }, [])

  return (
    <>
      <h1 className="title">
          <img src ={RapidLogo} alt="Rapid Logo" id="logo"/> DevTools
      </h1>
      <div>
        {rapidContext.rapidVersion ? `Rapid Version Detected: ${rapidContext.rapidVersion}` : "Rapid is not running"}
      </div>
      <div>
        Current Index: {rapidContext.currHistIndex}
      </div>
    </>
  )
}

//RENDER
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container);
root.render(<Panel />);
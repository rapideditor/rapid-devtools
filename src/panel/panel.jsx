/*global chrome*/

//IMPORTS - REACT
import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import RapidHistory from './components/rapidHistory';
import RapidLogo from '../assets/rapid-logo.svg'
import './panel.css';

const Panel = () => {
  const [rapidContext, setRapidContext] = useState({})

  // CREATE CONNECTION TO BACKGROUND PAGE
  var backgroundPageConnection = chrome.runtime.connect({
    name: 'panel'
  });

  useEffect(() => {
    //Post message to background page
    backgroundPageConnection.postMessage({
      name: 'init',
      tabId: chrome.devtools.inspectedWindow.tabId
    });

    //Create message listener to background page
    backgroundPageConnection.onMessage.addListener(function(msg) {
      setRapidContext(msg.rapid)
    });

    //INJECT SCRIPT INTO RAPID
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
        {rapidContext.rapidVersion ?
        <div>
          <h1>Rapid Version Detected:</h1> {rapidContext.rapidVersion}
          <h1>Current Index:</h1> {rapidContext.currHistIndex}
          <RapidHistory history = {rapidContext.diffObj} currIndex={rapidContext.currHistIndex}/>
        </div>
        : "Rapid is not running"}
      </div>

    </>
  )
}

//RENDER
const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container);
root.render(<Panel />);
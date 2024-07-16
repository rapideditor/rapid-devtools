import React from "react";
import { createRoot } from 'react-dom/client';
import './popup.css'
import RapidLogo from '../assets/rapid-logo.svg'

const test = (
    <div>
        <h1 className="title">
            <img src ={RapidLogo} alt="Rapid Logo" id="logo"/> DevTools
        </h1>
        <p>test test test</p>
    </div>
)

const container = document.createElement('div')
document.body.appendChild(container)

const root = createRoot(container)
root.render(test)
import React from 'react';
import HistoryItemChange from './HistoryItemChange';
import './HistoryItem.css'

const HistoryItem = ({historyItem, currIndex, id}) => {
    return (
        <div
        className={currIndex === id ? "currIndex history-item" : "history-item"}
        key={id}>
            {console.log("HistoryItem",id,historyItem)}
            {`${id}) ${historyItem.annotation}`}
            <div id='history-detail-container' className='history-details'>
                <p>Change Type: {(id === 0) ? historyItem.didChange : Object.keys(historyItem.didChange).toString()}</p>
                {historyItem.changes ? Object.keys(historyItem.changes).map((change, i) => (
                    <>
                        {change[0] === "w" ? `Way ${change}:` : ""}
                        <HistoryItemChange key={i} change={historyItem.changes[change]}/>
                    </>
                )): ""}
            </div>
        </div>
    )
}

export default HistoryItem;

/*
EXAMPLE OF historyItem
    {
        annotation: 'Continued an area'
        didChange: {
          "geometry": true,
          "addition": true
        },
        changes: {
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
            n-4:{
              base: undefined,
              head: {
                nodes: ['n-1', 'n-2', 'n-3', 'n-4', 'n-1'],
                loc: [-121.764189, 37.2991402]
            }
        }
    }
*/
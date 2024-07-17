import React from 'react';
import './HistoryItem.css'

const HistoryItem = ({historyItem, currIndex, id}) => {

    return (
        <div className={currIndex === id ? "currIndex history-item" : "history-item"} key={id}>
            {console.log(historyItem)}
            {`${id}) ${historyItem.annotation}`}
            <p className='history-details'>Change: {(id === 0) ? historyItem.didChange : Object.keys(historyItem.didChange).toString()}</p>
        </div>
    )
}

export default HistoryItem;
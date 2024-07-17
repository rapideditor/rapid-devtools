import React, { createRef, useEffect } from 'react';
import HistoryItem from './historyItem';
import './RapidHistory.css'

const RapidHistory = ({history, currIndex}) => {
    const historyEndRef = createRef(null);
    const scrollToBottom = () => {
        historyEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
    })

    return (
        <div id='edit-history-container'>
            <h1>Edit History:</h1>
            {history.map((historyItem, i) => <HistoryItem
                                                    historyItem={historyItem}
                                                    currIndex={currIndex}
                                                    id={i}
                                                    key={i} />)}
            <div ref={historyEndRef}></div>
        </div>
    )
}

export default RapidHistory;
import React, { createRef, useEffect, useRef } from 'react';
import HistoryItem from './historyItem';

const RapidHistory = ({history, currIndex}) => {
    // const historyEndRef = createRef(null);
    const historyRef = useRef(null);
    const scrollToCurrent = () => {
        historyRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToCurrent();
    },[currIndex])

    return (
        <div id='edit-history-container'>
            <h1>Edit History:</h1>
            {history.map((historyItem, i) => <HistoryItem
                                                    historyItem={historyItem}
                                                    currIndex={currIndex}
                                                    id={i}
                                                    ref={currIndex === i ? historyRef : null}
                                                    key={i} />)}
        </div>
    )
}

export default RapidHistory;
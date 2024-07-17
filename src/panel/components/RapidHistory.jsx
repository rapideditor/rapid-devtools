import React from 'react';
import HistoryItem from './HistoryItem';

const RapidHistory = (history) => {

    return (
        <>
            {console.log("RapidHistory", history, history[0])}
            <HistoryItem historyItem={history[0]} />
        </>
    )
}

export default RapidHistory;
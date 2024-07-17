import React from 'react';
import HistoryItem from './historyItem';

const RapidHistory = ({history, currIndex}) => {

    return (
        <>
            <h1>Edit History:</h1>
            {history.map((historyItem, i) => <HistoryItem
                                                    historyItem={historyItem}
                                                    currIndex={currIndex}
                                                    id={i}
                                                    key={i} />)}
        </>
    )
}

export default RapidHistory;
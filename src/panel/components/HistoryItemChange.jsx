import React, { useEffect, useState } from "react";
import './HistoryItemChange.css'

const HistoryItemChange = ({change}) => {
  const baseNodes = change.base?.nodes;
  const headNodes = change.head?.nodes;
  const [nodeSet, setNodeSet] = useState([])
  const [newNodes, setNewNodes] = useState([]);
  const [oldNodes, setOldNodes] = useState([]);
  const newTags = change.head?.tags;

  useEffect(()=>{
    if (baseNodes && headNodes) {
      baseNodes.length > headNodes.length ? setNodeSet(baseNodes) : setNodeSet(headNodes);
    } else if (baseNodes) {
      setNodeSet(baseNodes);
    } else {
      setNodeSet(headNodes);
    }

    const nodeDiff = (nodes1, nodes2) => {
      const set1 = new Set(nodes1);
      const set2 = new Set(nodes2);

      const difference = [...set1].filter((element) => !set2.has(element));

      return difference;
    }

    setOldNodes(nodeDiff(baseNodes,headNodes));
    setNewNodes(nodeDiff(headNodes,baseNodes));
  },[])

  //Set styling for whether node is an addition or deletion
  const styleNodes = (node, oldNodes, newNodes) => {
    console.log("Style", node, oldNodes, newNodes)
    if (oldNodes.includes(node)) return "oldItem";
    if (newNodes.includes(node)) return "newItem";
  }

  return (
    <div className="history-details">
      {nodeSet ?
        <p id="way-nodes">
          Nodes: {nodeSet.map((node, i) => <span className={styleNodes(node, oldNodes, newNodes)} key={i}>{node} </span>)}
        </p>
      : ""}

      {newTags ?
        <p id="way-tags">
          Tags: {Object.entries(newTags).map((tags, i) => <p className="history-details" key={i}>{`${tags[0]}: ${tags[1]}`}</p>)}
        </p>
      : ""}
    </div>
  )

}

export default HistoryItemChange;

/*
EXAMPLE OF historyItemChange
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
*/
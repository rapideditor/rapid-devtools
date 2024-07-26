import React, { useEffect, useState } from "react";
import './HistoryItemChange.css'

const HistoryItemChange = ({change, annotation}) => {
  const baseNodes = change.base?.nodes;
  const headNodes = change.head?.nodes;
  const [nodeSet, setNodeSet] = useState([])
  const [newNodes, setNewNodes] = useState([]);
  const [oldNodes, setOldNodes] = useState([]);

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
      console.log("Difference",nodes1, nodes2, difference)
      return difference;
    }

    setOldNodes(nodeDiff(baseNodes,headNodes));
    setNewNodes(nodeDiff(headNodes,baseNodes));
  },[])



  const styleNodes = (node, oldNodes, newNodes) => {
    console.log("Style", node, oldNodes, newNodes)
    if (oldNodes.includes(node)) return "oldItem";
    if (newNodes.includes(node)) return "newItem";
  }

  return (
    <p>
      {console.log("HistoryItemChange",annotation,change)}
      {/* {baseNodes && !headNodes ? baseNodes.map((node, i) => <span className={styleNodes(node, oldNodes, newNodes)} key={i}> {node} </span>) : ""} */}
      {nodeSet ? nodeSet.map((node, i) => <span className={styleNodes(node, oldNodes, newNodes)} key={i}> {node} </span>) : ""}
    </p>
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
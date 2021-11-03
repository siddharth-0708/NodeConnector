import React, {useRef, useState} from "react";
import ForceGraph2D from "react-force-graph-2d";
import { graphData, maps, links } from "./react_nodalmap_test_data";

const App = () => {
  const forceRef = useRef();
  const [highLightNodes, setHighlightNodes] = useState([]);
  const [highlightLinks, setHighlightLinks] = useState([]);

  function handleNodeClick(node){
    if(highLightNodes.includes(node)){
      setHighlightNodes([]);
      setHighlightLinks([]);
      return;
    }
    var nodeData = [];
    nodeData.push(node);
    setHighlightNodes(nodeData);

    var linkData = [];
    for(let i = 0;i <links.length; i++){
      if(links[i].source.id === node.id || (links[i].target.id === node.id)){
        linkData.push(links[i]);
      }
    }
    setHighlightLinks(linkData);
  }
  return (
    <div>
      <div
        style={{
          border: "1px solid gray",
          marginTop: "20px"
        }}
      >
        <ForceGraph2D
          width={window.innerWidth}
          height={window.innerHeight}
          ref={forceRef}
          onNodeClick={handleNodeClick}
          graphData={graphData}
          cooldownTicks={50}
          nodeRelSize={7}
          nodeCanvasObjectMode={() => "after"}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = maps.get(node.id);
            const fontSize = 14 /globalScale * 1.2;
             
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            if(node.isPublic){
              ctx.fillStyle= "orange";
            } 
            if (globalScale >= 3.5) {
              ctx.fillText(label, node.x, node.y + 2.5);
            }
          }}
          linkColor={link => highlightLinks.includes(link) ? "yellow" : "black"}          
          linkWidth={link => highlightLinks.includes(link) ? 3 : 1}          
          enableNodeDrag={true}
        />
      </div>
    </div>
  );
};

export default App;

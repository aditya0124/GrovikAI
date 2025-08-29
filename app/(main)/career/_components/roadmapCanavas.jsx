// // import { useState, useCallback } from 'react';
// "use client";
// import { ReactFlow, Controls, MiniMap, Background,  } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
// import Turbonode from './Turbonode';
 

// const nodeTypes  = {
//     turbo :Turbonode
// }
 
// export default function RoadmapCanavas({initialNodes, initialEdges}) {
// //     const initialNodes = [
// //   { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1',  } },
// //   { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2', } },
// // ];
// // const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
  
 
//   return (
//     // <div style={{ width: '100vw', height: '100vh' }}>
//     <div className="w-full h-[600px]"> {/* 🔥 controlled height & width */}
//       <ReactFlow nodes={initialNodes}
//         edges={initialEdges}
//         nodeTypes={nodeTypes}
//         fitView
       
//         >
//     <Controls/>
//     {/* <MiniMap/> */}
//     <Background variant='dots' gaps = {12} size = {1}/>

//         </ReactFlow>
        
        

//     </div>
//   );
// }

"use client";
import { ReactFlow, Controls, Background, useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Turbonode from "./Turbonode";

const nodeTypes = {
  turbo: Turbonode,
};

export default function RoadmapCanvas({ initialNodes, initialEdges }) {
  // ✅ controlled state (makes nodes draggable & movable)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[600px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}   // ✅ allow drag updates
        onEdgesChange={onEdgesChange}   // ✅ allow edge updates
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={true}           // ✅ drag enabled
        nodesConnectable={true}         // ✅ allow connections
        elementsSelectable={true}       // ✅ allow selecting
        panOnDrag={true}                // ✅ drag the canvas
        zoomOnScroll={true}             // ✅ zoom with scroll

        zoomOnPinch={true}          // ✅ enable pinch-to-zoom on mobile
  panOnScroll={true}          // ✅ allow dragging with scroll/touch
  selectionOnDrag={true}      // ✅ better selection on touch
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
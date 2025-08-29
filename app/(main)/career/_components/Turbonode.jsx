"use client";
import { Handle, Position } from '@xyflow/react'
import Link from 'next/link'
import React from 'react'

const Turbonode = ({data}) => {
  return (
    <div className='rounded-lg border order-gray-300 bg-yellow-100 shadow-md w-64 p-5'>
        <div className='font-extrabold text-lg text-gray 800 '>{data.title}</div>
        <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{data.description}</p>

        <Link href = {data?.link} target= '_blank'className='text-blue-600 underline text-sm mt-2 inline-block'>
        Learn More
        </Link>

        {/* <Handle type ='target' position={Position.Top}/>
        <Handle type ='target' position={Position.Top}/> */}
        <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
        {/* handle importanat when connect two need together */}

    </div>
  )
}

export default Turbonode

// import { Handle, Position } from '@xyflow/react';
// import Link from 'next/link';

// export default function Turbonode({ data }) {
//   return (
//     <div className="w-64 h-40 bg-gray-900 border border-gray-700 rounded-xl shadow-lg flex flex-col justify-between p-4">
//       {/* Title */}
//       <h3 className="font-bold text-purple-400 text-lg truncate">{data.title}</h3>

//       {/* Description (trimmed to 50 chars) */}
//       <p className="text-gray-400 text-sm mt-2 line-clamp-2">
//         {data.description?.length > 50
//           ? data.description.slice(0, 50) + "..."
//           : data.description}
//       </p>

//       {/* Link */}
//       {data.link && (
//         <Link
//           href={data.link}
//           className="text-blue-400 text-sm mt-3 hover:underline"
//         >
//           Explore →
//         </Link>
//       )}

//       {/* Handles (for edges) */}
//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />
//     </div>
//   );
// }
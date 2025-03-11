// import { House } from './House'
// // import { Ground } from './Ground'
// import { houseTreeData } from '../../types/house'

// interface HouseRowProps { 
//   visibility: {
//     structure: boolean
//     pillars: boolean
//     pipes: boolean
//     reinforcement: boolean
//     walls: boolean
//     windows: boolean
//     stairs: boolean
//     gates: boolean
//     floors: boolean
//   }
//   nodeVisibility: Record<string, boolean>
// }

// export function HouseRow({ visibility, nodeVisibility }: HouseRowProps) {
//   // const spacing = 15 // Space between houses
  
//   return (
//     <group>
//       {/* Ground plane */}
//       {/* <Ground size={100} color="#e5e5e5" /> */}

//       {/* Row of 4 houses */}
//       {houseTreeData.map((houseNode) => (
//         <group 
//           key={houseNode.id}
//           position={houseNode.position}
//         >
//           <House 
//             visibility={visibility} 
//             houseId={houseNode.id}
//             nodeVisibility={nodeVisibility}
//             config={houseNode.config}
//           />
//         </group>
//       ))}
//     </group>
//   )
// } 
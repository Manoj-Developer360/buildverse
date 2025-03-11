// import { Wall, Floor, Stairs, Window, Pipe, Pillar, Gate } from './BuildingComponents'
// import { Vector3 } from 'three'
// import { GLTFModelLoader, preloadGLTFModel } from './GLTFModelLoader'

// interface HouseProps {
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
//   houseId: string
//   nodeVisibility: Record<string, boolean>
//   config?: HouseConfig
// }

// // Preload the restaurant model
// preloadGLTFModel('/assets/towers.glb');

// export function House({ visibility, houseId, nodeVisibility, config }: HouseProps) {
//   // Use config values if provided, otherwise use defaults
//   const FLOOR_HEIGHT = 3
//   const BUILDING_WIDTH = config?.width || 12
//   const BUILDING_DEPTH = config?.depth || 15
//   const WALL_HEIGHT = 2.7
//   const PARAPET_HEIGHT = 1
//   const WINDOW_WIDTH = 1.8
//   const WINDOW_HEIGHT = 1.5
//   const GATE_WIDTH = BUILDING_WIDTH/2 - 0.3 // Span between pillars minus small gap
//   const GATE_HEIGHT = 2.1

//   // Helper to get node visibility
//   const isVisible = (nodeId: string) => {
//     // split the nodeId by '-' and check if all the elements in the array are true
//     const nodeIdParts = nodeId.split('-');
//     let currentPart = '';
//     let allTrue = true;
//     nodeIdParts.forEach(part => {
//       currentPart += part + '-';
//       if (!nodeVisibility[currentPart.slice(0, -1)]) {
//         allTrue = false;
//       }
//     });
//     return allTrue;
//   }

//   return (
//     <group>
//       {/* Lights */}
//       <ambientLight intensity={0.5} />
//       <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
//       <pointLight position={[0, 10, 0]} intensity={1} color="white" />

//       {/* Floors */}
//       {visibility.floors && visibility.structure && (
//         <>
//           <Floor 
//             width={BUILDING_WIDTH} 
//             depth={BUILDING_DEPTH} 
//             position={[0, 0, 0]} 
//             color="#e5e5e5" 
//             visible={isVisible(`${houseId}-ground`)} 
//           />
//           <Floor 
//             width={BUILDING_WIDTH} 
//             depth={BUILDING_DEPTH} 
//             position={[0, FLOOR_HEIGHT, 0]} 
//             color="#f5f5f5" 
//             visible={isVisible(`${houseId}-first`)} 
//           />
//           <Floor width={BUILDING_WIDTH} depth={BUILDING_DEPTH} position={[0, FLOOR_HEIGHT*2, 0]} color="#f5f5f5" visible={isVisible(`${houseId}-second`)} />
//           <Floor width={BUILDING_WIDTH} depth={BUILDING_DEPTH} position={[0, FLOOR_HEIGHT*3, 0]} color="#d4d4d4" visible={isVisible(`${houseId}-third`)} />
//         </>
//       )}

//       {/* Walls */}
//       {visibility.walls && visibility.structure && (
//         <>
//           {/* Ground Floor Walls */}
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={WALL_HEIGHT} 
//             position={[0, WALL_HEIGHT/2, BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-ground-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={WALL_HEIGHT} 
//             position={[-BUILDING_WIDTH/2, WALL_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-ground-walls`)}
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={WALL_HEIGHT} 
//             position={[BUILDING_WIDTH/2, WALL_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-ground-walls`)}
//           />
          
//           {/* First Floor Walls */}
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={WALL_HEIGHT} 
//             position={[0, FLOOR_HEIGHT + WALL_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-first-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={WALL_HEIGHT} 
//             position={[0, FLOOR_HEIGHT + WALL_HEIGHT/2, BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-first-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={WALL_HEIGHT} 
//             position={[-BUILDING_WIDTH/2, FLOOR_HEIGHT + WALL_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-first-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={WALL_HEIGHT} 
//             position={[BUILDING_WIDTH/2, FLOOR_HEIGHT + WALL_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-first-walls`)} 
//           />
          
//           {/* Second Floor Walls */}
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={WALL_HEIGHT} 
//             position={[0, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-second-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={WALL_HEIGHT} 
//             position={[0, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-second-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={WALL_HEIGHT} 
//             position={[-BUILDING_WIDTH/2, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-second-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={WALL_HEIGHT} 
//             position={[BUILDING_WIDTH/2, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-second-walls`)} 
//           />

//           {/* Parapet Walls */}
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={PARAPET_HEIGHT} 
//             position={[0, FLOOR_HEIGHT*3 + PARAPET_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-third-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_WIDTH} 
//             height={PARAPET_HEIGHT} 
//             position={[0, FLOOR_HEIGHT*3 + PARAPET_HEIGHT/2, BUILDING_DEPTH/2]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-third-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={PARAPET_HEIGHT} 
//             position={[-BUILDING_WIDTH/2, FLOOR_HEIGHT*3 + PARAPET_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-third-walls`)} 
//           />
//           <Wall 
//             width={BUILDING_DEPTH} 
//             height={PARAPET_HEIGHT} 
//             position={[BUILDING_WIDTH/2, FLOOR_HEIGHT*3 + PARAPET_HEIGHT/2, 0]} 
//             rotation={[0, Math.PI/2, 0]} 
//             color="#8B4513"
//             visible={isVisible(`${houseId}-third-walls`)} 
//           />
//         </>
//       )}

//       {/* Windows */}
//       {visibility.windows && visibility.structure && (
//         <>
//           {/* First Floor Windows */}
//           <Window 
//             position={[-WINDOW_WIDTH*1.5, FLOOR_HEIGHT + WALL_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             width={WINDOW_WIDTH} 
//             height={WINDOW_HEIGHT} 
//             color="#87CEEB"
//             visible={isVisible(`${houseId}-first-windows`)} 
//           />
//           <Window position={[WINDOW_WIDTH*1.5, FLOOR_HEIGHT + WALL_HEIGHT/2, -BUILDING_DEPTH/2]} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} color="#87CEEB" visible={isVisible(`${houseId}-first-windows-right`)} />
//           <Window position={[-WINDOW_WIDTH*1.5, FLOOR_HEIGHT + WALL_HEIGHT/2, BUILDING_DEPTH/2]} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} color="#87CEEB" visible={isVisible(`${houseId}-first-windows-left`)} />
//           <Window position={[WINDOW_WIDTH*1.5, FLOOR_HEIGHT + WALL_HEIGHT/2, BUILDING_DEPTH/2]} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} color="#87CEEB" visible={isVisible(`${houseId}-first-windows-right`)} />

//           {/* Second Floor Windows */}
//           <Window 
//             position={[-WINDOW_WIDTH*1.5, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             width={WINDOW_WIDTH} 
//             height={WINDOW_HEIGHT} 
//             color="#87CEEB"
//             visible={isVisible(`${houseId}-second-windows`)} 
//           />
//           <Window position={[WINDOW_WIDTH*1.5, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, -BUILDING_DEPTH/2]} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} color="#87CEEB" visible={isVisible(`${houseId}-second-windows-right`)} />
//           <Window position={[-WINDOW_WIDTH*1.5, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, BUILDING_DEPTH/2]} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} color="#87CEEB" visible={isVisible(`${houseId}-second-windows-left`)} />
//           <Window position={[WINDOW_WIDTH*1.5, FLOOR_HEIGHT*2 + WALL_HEIGHT/2, BUILDING_DEPTH/2]} width={WINDOW_WIDTH} height={WINDOW_HEIGHT} color="#87CEEB" visible={isVisible(`${houseId}-second-windows-right`)} />
//         </>
//       )}

//       {/* Gates */}
//       {visibility.gates && visibility.structure && (
//         <>
//           <Gate 
//             position={[-BUILDING_WIDTH/4, GATE_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             width={GATE_WIDTH} 
//             height={GATE_HEIGHT} 
//             color={config?.color || "#8B4513"}
//             visible={isVisible(`${houseId}-ground-gates`)} 
//           />
//           <Gate 
//             position={[BUILDING_WIDTH/4, GATE_HEIGHT/2, -BUILDING_DEPTH/2]} 
//             width={GATE_WIDTH} 
//             height={GATE_HEIGHT} 
//             color={config?.color || "#8B4513"}
//             visible={isVisible(`${houseId}-ground-gates`)}
//           />
//         </>
//       )}

//       {visibility.pillars && (
//         <>
//           {[0, 1, 2].map((floor) => {
//             const floorName = ['ground', 'first', 'second'][floor];
//             const floorHeight = floor * FLOOR_HEIGHT;
//             return (
//               <group key={floor}>
//                 {/* Front Pillars */}
//                 {[-BUILDING_WIDTH/2, -BUILDING_WIDTH/4, 0, BUILDING_WIDTH/4, BUILDING_WIDTH/2].map((x, i) => (
//                   <Pillar
//                     key={`front-${i}`}
//                     position={[x, floorHeight + FLOOR_HEIGHT/2, -BUILDING_DEPTH/2]}
//                     height={FLOOR_HEIGHT}
//                     reinforced={visibility.reinforcement}
//                     color="#8B4513"
//                     visible={isVisible(`${houseId}-${floorName}-pillars`)}
//                   />
//                 ))}

//                 {/* Back Pillars */}
//                 {[-BUILDING_WIDTH/2, -BUILDING_WIDTH/4, 0, BUILDING_WIDTH/4, BUILDING_WIDTH/2].map((x, i) => (
//                   <Pillar
//                     key={`back-${i}`}
//                     position={[x, floorHeight + FLOOR_HEIGHT/2, BUILDING_DEPTH/2]}
//                     height={FLOOR_HEIGHT}
//                     reinforced={visibility.reinforcement}
//                     color="#8B4513"
//                     visible={isVisible(`${houseId}-${floorName}-pillars`)}
//                   />
//                 ))}

//                 {/* Side Pillars */}
//                 {[-BUILDING_DEPTH/4, 0, BUILDING_DEPTH/4].map((z, i) => (
//                   <>
//                     <Pillar
//                       key={`left-${i}`}
//                       position={[-BUILDING_WIDTH/2, floorHeight + FLOOR_HEIGHT/2, z]}
//                       height={FLOOR_HEIGHT}
//                       reinforced={visibility.reinforcement}
//                       color="#8B4513"
//                       visible={isVisible(`${houseId}-${floorName}-pillars`)}
//                     />
//                     <Pillar
//                       key={`right-${i}`}
//                       position={[BUILDING_WIDTH/2, floorHeight + FLOOR_HEIGHT/2, z]}
//                       height={FLOOR_HEIGHT}
//                       reinforced={visibility.reinforcement}
//                       color="#8B4513"
//                       visible={isVisible(`${houseId}-${floorName}-pillars`)}
//                     />
//                   </>
//                 ))}
//               </group>
//             );
//           })}
//         </>
//       )}

//       {visibility.pipes && (
//         <>
//           <Pipe
//             start={new Vector3(-BUILDING_WIDTH/2, 0, -BUILDING_DEPTH/2)}
//             end={new Vector3(-BUILDING_WIDTH/2, FLOOR_HEIGHT*3, -BUILDING_DEPTH/2)}
//             radius={0.1}
//             color="#8B4513"
//             visible={isVisible(`${houseId}-pipes`)}
//           />
//           <Pipe
//             start={new Vector3(BUILDING_WIDTH/2, 0, -BUILDING_DEPTH/2)}
//             end={new Vector3(BUILDING_WIDTH/2, FLOOR_HEIGHT*3, -BUILDING_DEPTH/2)}
//             radius={0.1}
//             color="#8B4513"
//             visible={isVisible(`${houseId}-pipes`)}
//           />
//         </>
//       )}

//       {/* Add the restaurant model using the new GLTFModelLoader */}
//       {/* {visibility.structure && (
//         <GLTFModelLoader 
//           modelPath="src/assets/towers.glb" // Path to the GLTF model
//           position={[200, 0, 0]} // Adjust position as needed
//           rotation={[0, 0, 0]} // Adjust rotation as needed
//           scale={1.5} // Adjust scale as needed
//           visible= {true}// {isVisible(`${houseId}-restaurant`)} // Control visibility
//           onClick={(partName) => console.log(`Clicked on: ${partName}`)} // Handle click
//         />
//       )} */}
//     </group>
//   )
// } 
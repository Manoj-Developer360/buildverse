import { useMemo } from 'react';
import * as THREE from 'three';

interface RoadConfig {
  start: [number, number];
  end: [number, number];
  width: number;
}

export const Terrain = () => {
  // Define road layout
  const roads = useMemo<RoadConfig[]>(() => [
    // Main roads
    { start: [-50, 0], end: [50, 0], width: 8 }, // East-West main road
    { start: [0, -50], end: [0, 50], width: 8 }, // North-South main road
    
    // Secondary roads
    { start: [-50, -20], end: [50, -20], width: 6 }, // Parallel roads
    { start: [-50, 20], end: [50, 20], width: 6 },
    { start: [-20, -50], end: [-20, 50], width: 6 },
    { start: [20, -50], end: [20, 50], width: 6 },
  ], []);

  // Create terrain with height variations
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(200, 200, 50, 50);
    const vertices = geo.attributes.position.array;
    
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 2];
      
      // Check if point is near any road
      const isNearRoad = roads.some(road => {
        const distToRoad = distanceToLine(
          [x, z],
          road.start,
          road.end
        );
        return distToRoad < road.width;
      });
      
      if (!isNearRoad) {
        // Add terrain variation away from roads
        vertices[i + 1] = Math.random() * 0.5 + 
          Math.sin(x * 0.5) * 0.5 + 
          Math.cos(z * 0.5) * 0.5;
      }
    }
    
    return geo;
  }, [roads]);

  return (
    <group>
      {/* Base terrain */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.1, 0]} 
        receiveShadow
      >
        <primitive object={geometry} />
        <meshStandardMaterial 
          color="#90AF90"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Roads */}
      {roads.map((road, index) => (
        <mesh
          key={`road-${index}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[
            (road.start[0] + road.end[0]) / 2,
            0,
            (road.start[1] + road.end[1]) / 2
          ]}
          receiveShadow
        >
          <planeGeometry 
            args={[
              road.width,
              Math.hypot(
                road.end[0] - road.start[0],
                road.end[1] - road.start[1]
              )
            ]} 
          />
          <meshStandardMaterial
            color="#454545"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Decorative elements */}
      {/* {generateDecorations()} */}
    </group>
  );
};

// Helper function to calculate distance from point to line segment
function distanceToLine(point: [number, number], lineStart: [number, number], lineEnd: [number, number]): number {
  const [x, y] = point;
  const [x1, y1] = lineStart;
  const [x2, y2] = lineEnd;
  
  const A = x - x1;
  const B = y - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = x - xx;
  const dy = y - yy;

  return Math.sqrt(dx * dx + dy * dy);
}

// Helper function to generate decorative elements
// function generateDecorations() {
//   return Array.from({ length: 100 }).map((_, i) => {
//     const x = (Math.random() - 0.5) * 180;
//     const z = (Math.random() - 0.5) * 180;
    
//     // Skip if too close to roads
//     if (Math.abs(x) < 20 || Math.abs(z) < 20) return null;
    
//     return (
//       <mesh
//         key={`decoration-${i}`}
//         position={[x, 0, z]}
//         rotation={[0, Math.random() * Math.PI * 2, 0]}
//       >
//         <dodecahedronGeometry args={[0.5 + Math.random()]} />
//         <meshStandardMaterial 
//           color={`rgb(${150 + Math.random() * 50}, ${150 + Math.random() * 50}, ${150 + Math.random() * 50})`}
//           roughness={0.8}
//           metalness={0.2}
//         />
//       </mesh>
//     );
//   });
// } 
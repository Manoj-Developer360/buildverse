import React from 'react';
import { Vector3 } from 'three';

const Stairs: React.FC<{ position: Vector3 }> = ({ position }) => {
  const stepHeight = 1;
  const stepDepth = 1;
  const numSteps = 15; // Number of steps

  return (
    <group position={position}>
      {[...Array(numSteps)].map((_, i) => (
        <mesh key={i} position={[0, i * stepHeight, -i * stepDepth]}>
          <boxGeometry args={[10, stepHeight, 1]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

export default Stairs; 
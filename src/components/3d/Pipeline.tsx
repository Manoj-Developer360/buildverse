import React from 'react';

const Pipeline: React.FC = () => {
  const pipes = [];
  const pipeRadius = 0.2; // Radius of the pipe
  const pipeLength = 5; // Length of each pipe

    // Create a pipe mesh
    pipes.push(
      <mesh key={Math.random()} position={[0, 2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[pipeRadius, pipeRadius, pipeLength, 16]} />
        <meshStandardMaterial color={"#8B4513"} /> {/* Brown color for the pipe */}
      </mesh>
    );

    pipes.push(
        <mesh key={Math.random()} position={[4, 2, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[pipeRadius, pipeRadius, pipeLength, 16]} />
          <meshStandardMaterial color={"#8B4513"} /> {/* Brown color for the pipe */}
        </mesh>
      );
    pipes.push(
        <mesh key={Math.random()} position={[4, -0.5, 0]} rotation={[0, 0, 1.5]}>
          <cylinderGeometry args={[pipeRadius, pipeRadius, 8, 16]} />
          <meshStandardMaterial color={"#8B4513"} /> {/* Brown color for the pipe */}
        </mesh>
    );
    pipes.push(
        <mesh key={Math.random()} position={[6, -1.2, -7.5]} rotation={[1.5, 0, 0]}>
          <cylinderGeometry args={[pipeRadius, pipeRadius, 15, 16]} />
          <meshStandardMaterial color={"#8B4513"} /> {/* Brown color for the pipe */}
        </mesh>
    );
    pipes.push(
        <mesh key={Math.random()} position={[7.5, -1.2, -7.5]} rotation={[1.5, 0, 0]}>
          <cylinderGeometry args={[pipeRadius, pipeRadius, 15, 16]} />
          <meshStandardMaterial color={"#8B4513"} /> {/* Brown color for the pipe */}
        </mesh>
    );
  return <group>{pipes}</group>;
};

export default Pipeline; 
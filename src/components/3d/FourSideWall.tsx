import { Vector3 } from 'three';
import { Wall } from './Wall';
import { Fence } from './Fence';

interface FourSideWallProps {
  X1: number;
  X2: number;
  Z1: number;
  Z2: number;
  WALL_HEIGHT: number;
  WALL_THICKNESS: number;
  FENCE_HEIGHT: number;
  FENCE_SPACING: number;
  FENCE_GROUP_POSITION: [number, number, number];
}

export function FourSideWall({
  X1,
  X2,
  Z1,
  Z2,
  WALL_HEIGHT,
  WALL_THICKNESS,
  FENCE_HEIGHT,
  FENCE_SPACING,
  FENCE_GROUP_POSITION
}: FourSideWallProps) {
  const MID_X = (X1 + X2) / 2;

  return (
    <>
      <group>
        {/* North wall */}
        <Wall 
          start={new Vector3(-1650, 0, 2505)}
          end={new Vector3(-1650, 0, -2800)}
          height={WALL_HEIGHT}
          thickness={WALL_THICKNESS}
          color="#8d6e63"
        />
        
        {/* South wall */}
        <Wall 
          start={new Vector3(1840, 0, 2505)}
          end={new Vector3(1840, 0, -2800)}
          height={WALL_HEIGHT}
          thickness={WALL_THICKNESS}
          color="#8d6e63"
        />
        
        {/* East wall split in two */}
        <Wall 
          start={new Vector3(-1650, 0, 2505)}
          end={new Vector3(520, 0, 2505)}
          height={WALL_HEIGHT}
          thickness={WALL_THICKNESS}
          color="#8d6e63"
        />

        <Wall 
          start={new Vector3(1210, 0, 2505)}
          end={new Vector3(1840, 0, 2505)}
          height={WALL_HEIGHT}
          thickness={WALL_THICKNESS}
          color="#8d6e63"
        />
        
        {/* West wall */}
        <Wall 
          start={new Vector3(-1650, 0, -2800)}
          end={new Vector3(1840, 0, -2800)}
          height={WALL_HEIGHT}
          thickness={WALL_THICKNESS}
          color="#8d6e63"
        />
      </group>
      
      {/* Add Fences on top of walls */}
      <group position={FENCE_GROUP_POSITION}>
        {/* North fence */}
        {/* <Fence 
          start={new Vector3(X1, 0, Z2)}
          end={new Vector3(X2, 0, Z2)}
          height={FENCE_HEIGHT}
          postSpacing={FENCE_SPACING}
          color="#8B4513"
        />
         */}
        {/* South fence */}
        {/* <Fence 
          start={new Vector3(X1, 0, Z1)}
          end={new Vector3(X2, 0, Z1)}
          height={FENCE_HEIGHT}
          postSpacing={FENCE_SPACING}
          color="#8B4513"
        /> */}
        
        {/* East fence */}
        {/* <Fence 
          start={new Vector3(X2, 0, Z2)}
          end={new Vector3(X2, 0, Z1)}
          height={FENCE_HEIGHT}
          postSpacing={FENCE_SPACING}
          color="#8B4513"
        /> */}
        
        {/* West fence */}
        {/* <Fence 
          start={new Vector3(X1, 0, Z2)}
          end={new Vector3(X1, 0, Z1)}
          height={FENCE_HEIGHT}
          postSpacing={FENCE_SPACING}
          color="#8B4513"
        /> */}
      </group>
    </>
  );
}

// Fixed the undefined MID_X issue — now it’s dynamically calculated. Let me know if anything else needs adjusting! 🚀

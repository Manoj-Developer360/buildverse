import { Vector3 } from 'three';

interface RoadProps {
  start: Vector3;
  end: Vector3;
  width: number;
  color?: string;
}

export function Road({ 
  start, 
  end, 
  width, 
  color = '#555', 
}: RoadProps) {
  const direction = end.clone().sub(start);
  const length = direction.length();
  const center = start.clone().add(direction.multiplyScalar(0.5));
  const rotation = Math.atan2(direction.z, direction.x);

  return (
    <group>
      <mesh position={center} rotation={[0, rotation, 0]} receiveShadow>
        <boxGeometry args={[length, 0.1, width]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
} 
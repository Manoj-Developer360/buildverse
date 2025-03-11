import { Vector3 } from 'three';

interface WallProps {
  start: Vector3;
  end: Vector3;
  height?: number;
  thickness?: number;
  color?: string;
  visible?: boolean;
}

export function Wall({
  start,
  end,
  height = 1,
  thickness = 0.3,
  color = '',
  visible = true
}: WallProps) {
  if (!visible) return null;

  // Calculate wall dimensions and position
  const direction = end.clone().sub(start);
  const length = direction.length();
  const center = start.clone().add(direction.multiplyScalar(0.5));
  const rotation = Math.atan2(direction.z, direction.x);

  return (
    <mesh
      position={center}
      rotation={[0, rotation, 0]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// I replaced the undefined X1 and X2 with the correct midpoint calculation using vectors. Let me know if anything else needs adjusting!

import { Vector3 } from 'three';
import { useMemo } from 'react';

interface FenceProps {
  start: Vector3;
  end: Vector3;
  height?: number;
  postSpacing?: number;
  postWidth?: number;
  railHeight?: number;
  railWidth?: number;
  color?: string;
  visible?: boolean;
}

export function Fence({
  start,
  end,
  height = 2,
  postSpacing = 2,
  postWidth = 0.15,
  railHeight = 0.1,
  railWidth = 0.05,
  color = '#8B4513',
  visible = true
}: FenceProps) {
  if (!visible) return null;

  // Calculate fence direction and length
  const direction = end.clone().sub(start);
  const length = direction.length();
  const numPosts = Math.ceil(length / postSpacing) + 1;

  // Create posts
  const posts = useMemo(() => {
    const posts = [];
    for (let i = 0; i < numPosts; i++) {
      const position = start.clone().add(
        direction.clone().multiplyScalar(i / (numPosts - 1))
      );
      posts.push(position);
    }
    return posts;
  }, [start, end, numPosts]);

  return (
    <group>
      {/* Posts */}
      {posts.map((position, index) => (
        <mesh
          key={`post-${index}`}
          position={position}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[postWidth, height*2, postWidth]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}

      {/* Rails */}
      {[height / 3, height * 2/3, height].map((railY, index) => (
        <mesh
          key={`rail-${index}`}
          position={start.clone().add(direction.clone().multiplyScalar(0.5)).add(new Vector3(0, railY, 0))}
          rotation={[0, Math.atan2(direction.x, direction.z), 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[railWidth, railHeight, length]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
} 

interface GroundProps {
  size?: number
  color?: string
  visible?: boolean
}

export function Ground({ 
  size = 100, 
  color = "#e5e5e5",
  visible = true 
}: GroundProps) {
  if (!visible) return null
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.1, 0]} 
      receiveShadow
    >
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
} 
import { Vector3, Euler } from 'three'

interface WallProps {
  width?: number
  height?: number
  depth?: number
  position: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  visible?: boolean
}

interface FloorProps {
  width: number
  depth: number
  position: [number, number, number]
  color?: string
  visible?: boolean
}

interface StairsProps {
  steps: number
  width: number
  height: number
  position: [number, number, number]
  rotation?: [number, number, number]
  visible?: boolean
}

interface WindowProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  width?: number
  height?: number
  visible?: boolean
}

interface DoorProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  width?: number
  height?: number
}

interface PipeProps {
  start: Vector3
  end: Vector3
  radius?: number
  color?: string
  visible?: boolean
}

interface PillarProps {
  position: [number, number, number]
  height: number
  width?: number
  reinforced?: boolean
  visible?: boolean
}

interface GateProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  width?: number
  height?: number
  visible?: boolean
}

export function Wall({ 
  width = 4,
  height = 3,
  depth = 0.2,
  position,
  rotation = [0, 0, 0],
  color = "#e5e5e5",
  visible = true
}: WallProps) {
  if (!visible) return null
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function Floor({ 
  width,
  depth,
  position,
  color = "#f5f5f5",
  visible = true
}: FloorProps) {
  if (!visible) return null
  return (
    <mesh position={position} rotation={[0, 0, 0]}>
      <boxGeometry args={[width, 0.2, depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function Stairs({ 
  steps,
  width,
  height,
  position,
  rotation = [0, 0, 0],
  visible = true
}: StairsProps) {
  const stepHeight = height / steps
  const stepDepth = 0.3

  return visible && (
    <group position={position} rotation={rotation}>
      {Array.from({ length: steps }).map((_, i) => (
        <mesh
          key={i}
          position={[0, (i * stepHeight) + stepHeight/2, i * stepDepth]}
        >
          <boxGeometry args={[width, stepHeight, stepDepth]} />
          <meshStandardMaterial color="#d4d4d4" />
        </mesh>
      ))}
    </group>
  )
}

export function Window({ position, rotation = [0, 0, 0], width = 1, height = 1.2, visible = true }: WindowProps) {
  return visible && (
    <group position={position} rotation={new Euler(...rotation)}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[width + 0.1, height + 0.1, 0.1]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      {/* Window glass */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width - 0.1, height - 0.1, 0.05]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transparent
          opacity={0.2}
          roughness={0}
          metalness={0.2}
          transmission={0.9}
        />
      </mesh>
    </group>
  )
}

export function Door({
  position,
  rotation = [0, 0, 0],
  width = 1,
  height = 2.1
}: DoorProps) {
  return (
    <group position={position} rotation={new Euler(...rotation)}>
      {/* Door frame */}
      <mesh>
        <boxGeometry args={[width + 0.1, height + 0.1, 0.1]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[width - 0.1, height - 0.1, 0.08]} />
        <meshStandardMaterial color="#854d0e" />
      </mesh>
      {/* Door handle */}
      <mesh 
        position={[width/2 - 0.2, 0, 0.06]} 
        rotation={[Math.PI/2, 0, 0]}
      >
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

export function Pipe({
  start,
  end,
  radius = 0.05,
  color = "#94a3b8",
  visible = true
}: PipeProps) {
  // Create a cylinder between two points
  const direction = new Vector3().subVectors(end, start)
  const height = direction.length()
  const position = start.add(direction.multiplyScalar(0.5))

  return visible && <mesh position={position.toArray()}>
    <cylinderGeometry args={[radius, radius, height, 8]} />
    <meshStandardMaterial color={color} />
  </mesh>
}

export function Pillar({ 
  position, 
  height, 
  width = 0.4,
  reinforced = true,
  visible = true
}: PillarProps) {
  return visible && (
    <group position={position}>
      {/* Main pillar structure */}
      <mesh>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Reinforcement bars */}
      {reinforced && (
        <>
          {/* Corner bars */}
          {[
            [-1, -1], [1, -1],
            [-1, 1], [1, 1]
          ].map(([x, z], i) => (
            <mesh
              key={i}
              position={[
                (width * 0.3) * x,
                0,
                (width * 0.3) * z
              ]}
            >
              <cylinderGeometry args={[0.02, 0.02, height, 8]} />
              <meshStandardMaterial color="#78716c" metalness={0.8} roughness={0.2} />
            </mesh>
          ))}

          {/* Horizontal ties every 0.3 units */}
          {Array.from({ length: Math.floor(height / 0.3) }).map((_, i) => (
            <group key={i} position={[0, i * 0.3 - height/2 + 0.15, 0]}>
              <mesh>
                <torusGeometry args={[width * 0.35, 0.01, 8, 4]} />
                <meshStandardMaterial color="#78716c" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          ))}
        </>
      )}
    </group>
  )
}

export function Gate({ 
  position, 
  rotation = [0, 0, 0], 
  width = 3,
  height = 2.1,
  visible = true
}: GateProps) {
  const barSpacing = 0.15
  const numBars = Math.floor(width / barSpacing) - 1

  return visible && (
    <group position={position} rotation={new Euler(...rotation)}>
      {/* Gate frame */}
      <mesh>
        <boxGeometry args={[width + 0.1, height + 0.1, 0.05]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Vertical bars */}
      {Array.from({ length: numBars }).map((_, i) => (
        <mesh
          key={`v-${i}`}
          position={[
            -width/2 + barSpacing * (i + 1),
            0,
            0
          ]}
        >
          <cylinderGeometry args={[0.02, 0.02, height - 0.1, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Horizontal bars */}
      {[-height/3, 0, height/3].map((y, i) => (
        <mesh
          key={`h-${i}`}
          position={[0, y, 0]}
          rotation={[0, 0, Math.PI/2]}
        >
          <cylinderGeometry args={[0.02, 0.02, width - 0.1, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Handle */}
      <mesh position={[width/2 - 0.2, 0, 0.04]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
} 
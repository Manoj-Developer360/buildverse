import { useGLTF } from '@react-three/drei'
import restaurantModel from '@/assets/restaurant.glb' // Import the restaurant model

interface ModelProps {
  modelPath: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  visible?: boolean
}

// Create a map of model IDs to their imported paths
const MODEL_PATHS = {
  'restaurant': restaurantModel, // Add the restaurant model
} as const

type ModelId = keyof typeof MODEL_PATHS

interface ModelLoaderProps extends Omit<ModelProps, 'modelPath'> {
  modelId: ModelId
}

export function ModelLoader({ modelId, position, rotation = [0, 0, 0], scale = 1 }: ModelLoaderProps) {
  const { scene } = useGLTF(MODEL_PATHS[modelId])
  
//   if (!visible) return null
  return (
    <primitive 
      object={scene.clone()} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

// Preload all models
Object.values(MODEL_PATHS).forEach(path => useGLTF.preload(path)) 
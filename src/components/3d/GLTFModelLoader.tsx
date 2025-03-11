import { useGLTF } from '@react-three/drei'
import { Mesh } from 'three'
import * as THREE from "three";
import { useEffect, useRef, Suspense } from 'react';

interface GLTFModelLoaderProps {
  modelPath: string; // Path to the GLTF model
  position?: [number, number, number]; // Position of the model
  rotation?: [number, number, number]; // Rotation of the model
  scale?: number; // Scale of the model
  visible?: boolean; // Visibility of the model
  isWireframe?: boolean; // Wireframe toggle
  onClick?: (partName: string) => void; // Optional click handler
}

export function GLTFModelLoader({
  modelPath,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  visible = true,
  isWireframe = false,
  onClick,
}: GLTFModelLoaderProps) {
  const { scene } = useGLTF(modelPath); // Load the GLTF model
  const originalMaterials = useRef<Map<Mesh, THREE.Material>>(new Map());

  useEffect(() => {
    // Store original materials if not already stored
    scene.traverse((child) => {
      if (child instanceof Mesh && !originalMaterials.current.has(child)) {
        originalMaterials.current.set(child, child.material);
      }
    });

    // Apply or remove wireframe based on isWireframe prop
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        if (isWireframe) {
          child.material = new THREE.MeshBasicMaterial({
            wireframe: true,
            color: 'gray',
          });
        } else {
          // Restore original material
          const originalMaterial = originalMaterials.current.get(child);
          if (originalMaterial) {
            child.material = originalMaterial;
          }
        }
      }
    });
  }, [scene, isWireframe]);

  if (!visible) return null;

  // Apply textures and handle interactions
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      
      if (child.material && !isWireframe) {
        child.material.needsUpdate = true;
        child.material.toneMapped = false;
        
        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
          child.material.map.flipY = false;
          child.material.map.needsUpdate = true;
        }
        if (child.material.roughnessMap) child.material.roughnessMap.needsUpdate = true;
        if (child.material.metalnessMap) child.material.metalnessMap.needsUpdate = true;
      }

      // Attach click handler
      child.userData.onClick = () => {
        if (onClick) {
          onClick(child.name);
        }
      };
    }
  });

  return (
    <Suspense fallback={<mesh><boxGeometry /></mesh>}>
      <primitive
        object={scene}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={(e: THREE.Event) => {
          const clickedObject = (e as any)?.intersections[0]?.object;
          if (clickedObject && clickedObject.userData.onClick) {
            clickedObject.userData.onClick();
          }
        }}
      />
    </Suspense>
  );
}

// Preload the model
export function preloadGLTFModel(modelPath: string) {
  useGLTF.preload(modelPath);
} 
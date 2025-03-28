import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Camera, Eye, Move } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
// import { Checkbox } from './ui/checkbox'
// import { HouseRow } from './3d/HouseRow'
// import * as THREE from "three";
// import { Terrain } from './3d/Terrain';
import { GLTFModelLoader } from "./3d/GLTFModelLoader";
import { Vector3 } from "three";
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { useLoader } from '@react-three/fiber'
// import { Fence } from './3d/Fence';
// import { Wall } from './3d/Wall';
// import { Road } from './3d/Road';
import { FourSideWall } from "./3d/FourSideWall";
import { gsap } from "gsap";
import InteractiveModel from "./3d/InteractiveModel";
import Roads from "./3d/Roads"; // Import the Roads component
import { SimpleEnvironment } from "./3d/SimpleEnvironment";

// interface VisibilityState {
//   structure: boolean
//   pillars: boolean
//   pipes: boolean
//   reinforcement: boolean
//   walls: boolean
//   windows: boolean
//   stairs: boolean
//   gates: boolean
//   floors: boolean
// }

interface Viewer3DProps {
  nodeVisibility: Record<string, boolean>;
  selectedPosition?: [number, number, number];
  onSwitchView: () => void;
}

// Movement speed configuration
const MOVEMENT_SPEED = 0.5;
// const GRAVITY = 9.8
const PLAYER_HEIGHT = 2;
const X1 = -400;
const X2 = 700;
const Z1 = -500;
const Z2 = 1700;
const WALL_HEIGHT = 100;
const WALL_THICKNESS = 0.5;
const FENCE_HEIGHT = 1.5;
const FENCE_SPACING = 4;
const FENCE_GROUP_POSITION = [0, 50, 0] as [number, number, number];
// const STARTING_POSITION = new Vector3(X1 + 12.5, 2, Z1); // Starting position on first road
const ROAD_HEIGHT = 0.1;

function WalkControls() {
  const { camera } = useThree();
  const moveForward = useRef(true);
  const moveBackward = useRef(true);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const velocity = useRef(new Vector3());

  const isOnRoad = (position: Vector3): boolean => {
    const roads = [
      {
        start: new Vector3(X1 + 12.5, 0, Z1),
        end: new Vector3(X1 + 12.5, 0, Z2),
      },
      
    ];

    return roads.some((road) => {
      const roadDir = road.end.clone().sub(road.start).normalize();
      const posToStart = position.clone().sub(road.start);
      const projection = posToStart.dot(roadDir);
      const roadLength = road.end.clone().sub(road.start).length();

      if (projection < 0 || projection > roadLength) return false;

      const distanceFromRoad = posToStart
        .sub(roadDir.multiplyScalar(projection))
        .length();
      return distanceFromRoad < 12.5; // Half of road width (25/2)
    });
  };

  useFrame(() => {
    if (
      moveForward.current ||
      moveBackward.current ||
      moveLeft.current ||
      moveRight.current
    ) {
      const forward = new Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const right = new Vector3();
      right.crossVectors(camera.up, forward).normalize();

      velocity.current.set(0, 0, 0);

      if (moveForward.current)
        velocity.current.add(forward.multiplyScalar(MOVEMENT_SPEED));
      if (moveBackward.current)
        velocity.current.add(forward.multiplyScalar(-MOVEMENT_SPEED));
      if (moveLeft.current)
        velocity.current.add(right.multiplyScalar(MOVEMENT_SPEED));
      if (moveRight.current)
        velocity.current.add(right.multiplyScalar(-MOVEMENT_SPEED));

      const nextPosition = camera.position.clone().add(velocity.current);

      if (isOnRoad(nextPosition)) {
        camera.position.add(velocity.current);
        camera.position.y = ROAD_HEIGHT + PLAYER_HEIGHT;
      }
    }
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          moveForward.current = true;
          break;
        case "ArrowDown":
        case "KeyS":
          moveBackward.current = true;
          break;
        case "ArrowLeft":
        case "KeyA":
          moveLeft.current = true;
          break;
        case "ArrowRight":
        case "KeyD":
          moveRight.current = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          moveForward.current = false;
          break;
        case "ArrowDown":
        case "KeyS":
          moveBackward.current = false;
          break;
        case "ArrowLeft":
        case "KeyA":
          moveLeft.current = false;
          break;
        case "ArrowRight":
        case "KeyD":
          moveRight.current = false;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return null;
}

function InitialPosition() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(X2 - 50, ROAD_HEIGHT + PLAYER_HEIGHT, Z2 - 400);
    camera.lookAt(X2 - 50, ROAD_HEIGHT + PLAYER_HEIGHT, Z2 - 400);
  }, []);

  return null;
}

// Create a custom hook for camera controls
function CameraControls({ position }: { position?: [number, number, number] }) {
  const { camera } = useThree();
  const orbitControlsRef = useRef<any>();

  useEffect(() => {
    if (position) {
      // Stop any ongoing animations
      gsap.killTweensOf(camera.position);
      gsap.killTweensOf(camera.rotation);

      // Animate camera position
      gsap.to(camera.position, {
        x: position[0] + 300,
        y: position[1] + 300,
        z: position[2] + 300,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(position[0], position[1], position[2]);
          if (orbitControlsRef.current) {
            orbitControlsRef.current.target.set(
              position[0],
              position[1],
              position[2]
            );
          }
        },
      });
    }
  }, [position, camera]);

  return (
    <OrbitControls
      ref={orbitControlsRef}
      enableDamping
      dampingFactor={0.05}
      maxDistance={2000}
      minDistance={100}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
    />
  );
}

export function Viewer3D({
  // nodeVisibility,
  selectedPosition,
  onSwitchView,
}: Viewer3DProps) {
  const [showControls, setShowControls] = useState(false);
  // const [visibility, setVisibility] = useState<VisibilityState>({
  //   structure: true,
  //   pillars: true,
  //   pipes: true,
  //   reinforcement: true,
  //   walls: true,
  //   windows: true,
  //   stairs: true,
  //   gates: true,
  //   floors: true
  // })

  // Update camera and target positions for better view of all houses
  // const [cameraPosition, setCameraPosition] = useState([0, 2, 5])
  // const [targetPosition, setTargetPosition] = useState([0, 4, 0])
  const [isWalking, setIsWalking] = useState(false);

  // useEffect(() => {
  //   if (showControls) {
  //     setCameraPosition([45, 45, 45])
  //     setTargetPosition([0, 6, 0])
  //   } else {
  //     setCameraPosition([0, 2, 5])
  //     setTargetPosition([0, 4, 0])
  //   }
  // }, [showControls])

  // const toggleWalkMode = () => {
  //   setIsWalking(!isWalking)
  // }

  // const navigateToPosition = (targetPos: [number, number, number]) => {
  //   const camera = document.querySelector('canvas')?.__threejs?.camera;
  //   if (camera) {
  //     gsap.to(camera.position, {
  //       x: targetPos[0],
  //       y: targetPos[1],
  //       z: targetPos[2],
  //       duration: 2,
  //       ease: "power2.inOut",
  //       onComplete: () => {
  //         camera.lookAt(targetPos[0], targetPos[1], targetPos[2] + 100);
  //       }
  //     });
  //   }
  // };

  return (
    <div className="relative h-full w-full bg-card rounded-lg border shadow-sm">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowControls(!showControls)}
          className="h-8 w-8"
        >
          <Eye className="h-4 w-4" />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsWalking(!isWalking)}
          className="h-8 w-8"
        >
          <Move className={`h-4 w-4 ${isWalking ? "text-primary" : ""}`} />
        </Button>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={onSwitchView}
          className="h-8 w-8"
          title="Switch to Inside View"
        >
          <Camera className="h-4 w-4" />
        </Button> */}
      </div>

      <Canvas>
        {!isWalking ? (
          <>
            <OrthographicCamera
              makeDefault
              position={[1500, 1000, 1500]}
              zoom={0.3}
              near={-10000}
              far={10000}
            />
            <CameraControls position={selectedPosition} />
          </>
        ) : (
          <>
            <PerspectiveCamera
              makeDefault
              position={[X2 - 50, ROAD_HEIGHT + PLAYER_HEIGHT, Z2 - 400]}
              fov={75}
              near={0.1}
              far={10000}
            />
            <PointerLockControls />
            <InitialPosition />
            <WalkControls />
          </>
        )}

        <SimpleEnvironment />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />



        
          
        

        {/* <Terrain />  */}

        {/* <HouseRow 
          visibility={visibility} 
          nodeVisibility={nodeVisibility}
        /> */}

        {/* <InteractiveModel
          position={[30, 210, -150]}
          title="Office"
          details="The college office is the centralized administrative hub that streamlines operations, 
          supports faculty and student services, and facilitates effective campus communication."
          number="1"
        />

        <InteractiveModel
          position={[500, 290, -950]}
          title="Block 1"
          details="A modern academic hub dedicated to the arts and humanities,
          featuring advanced lecture halls and specialized creative studios."
          number="2"
        />

        <InteractiveModel
          position={[90, 290, -950]} // Position for Main Office
          title="Block 2"
          details="A state-of-the-art engineering lab building equipped with cutting-edge facilities for ECE, EEE, and Civil disciplines."
          number="3"
        /> 

        <InteractiveModel
          position={[-300, 290, -950]} // Position for Main Office
          title="Block 3"
          details=" A dynamic technology center featuring advanced computing and cybersecurity resources for Computer Science,
           AI, and related fields."
          number="4"
        /> */}

          <GLTFModelLoader
          modelPath="building.glb" // Path to the GLTF model
          position={[-700, -49, 700]} // Adjust position as needed
          rotation={[0, 3.14, 0]} // Adjust rotation as needed
          scale={800} // Adjust scale as needed
          visible={true} // {isVisible(`${houseId}-restaurant`)} // Control visibility
          onClick={(partName) => console.log(`Clicked on: ${partName}`)} // Handle click
        />


        <GLTFModelLoader
          modelPath="/gate.glb" // Path to the GLTF model
          position={[850, -50, 2500]} // Adjust position as needed
          rotation={[0, 0, 0]} // Adjust rotation as needed
          scale={300} // Adjust scale as needed
          visible={true} // {isVisible(`${houseId}-restaurant`)} // Control visibility
          onClick={(partName) => console.log(`Clicked on: ${partName}`)} // Handle click
        />

        <GLTFModelLoader
          modelPath="soccer_stadium.glb"
          position={[-100, -25, -1600]}
          rotation={[0, 1.56, 0]}
          scale={1.3}
          visible={true}
          onClick={(partName) => console.log(`Clicked on: ${partName}`)}
          />
          
        <GLTFModelLoader
          modelPath="basket_ball_ground_3d_model.glb"
          position={[1420, 55, -2100]}
          rotation={[0, -1.56, 0]}
          scale={2}
          visible={true}
          onClick={(partName) => console.log(`Clicked on: ${partName}`)}
        />

       <GLTFModelLoader
          modelPath="cafe__clinic.glb"
          position={[2850, -50, -1100]}
          rotation={[0, -1.56, 0]}
          scale={8} 
          visible={true}
          onClick={(partName) => console.log(`Clicked on: ${partName}`)}
        />
        

        <GLTFModelLoader
          modelPath="proposta_12x30_sicredi_saltinho.glb"
          position={[-230, -50, 2200]}
          rotation={[0, 1.56, 0]}
          scale={1}
          visible={true}
          onClick={(partName) => console.log(`Clicked on: ${partName}`)}
        />
        
         
        { /* <Main Bash Road> */ }

        <mesh position={[90, -50, -148]}>
          <boxGeometry args={[3500, 1, 5307]} />
          <meshStandardMaterial color="#bdbdbd" />
        </mesh>
        
        <FourSideWall 
         X1={-750}
         X2={930}
         Z1={-1200}
         Z2={905}
         WALL_HEIGHT={WALL_HEIGHT}
         WALL_THICKNESS={WALL_THICKNESS}
         FENCE_HEIGHT={FENCE_HEIGHT}
         FENCE_SPACING={FENCE_SPACING}
         FENCE_GROUP_POSITION={FENCE_GROUP_POSITION}
       />

        {/* <gridHelper args={[100, 100]} /> */}
        {/* <axesHelper args={[5]} /> */}
        {/* Add Roads */}

        {/* <L1> */}
        <Roads />

        {isWalking && <Roads />}
      </Canvas>
    </div>
  );
}

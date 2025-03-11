import { useState, useRef, useEffect, startTransition } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PointerLockControls } from '@react-three/drei';
import { Button } from './ui/button';
import { Zap, Move, Grid, Wrench, Building2, Camera } from 'lucide-react';
import { GLTFModelLoader } from './3d/GLTFModelLoader';
import ElectricalWiring from './3d/ElectricalWiring';
import Pipeline from './3d/Pipeline';


interface VisibilityState {
  electrical: boolean;
  plumbing: boolean;
  building: boolean;
}


const WalkControls = () => {
  const { camera } = useThree();
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);

  useFrame(() => {
    const speed = 0.15;
    if (moveForward.current) camera.translateZ(-speed);
    if (moveBackward.current) camera.translateZ(speed);
    if (moveLeft.current) camera.translateX(-speed);
    if (moveRight.current) camera.translateX(speed);
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': moveForward.current = true; break;
        case 'KeyS': moveBackward.current = true; break;
        case 'KeyA': moveLeft.current = true; break;
        case 'KeyD': moveRight.current = true; break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': moveForward.current = false; break;
        case 'KeyS': moveBackward.current = false; break;
        case 'KeyA': moveLeft.current = false; break;
        case 'KeyD': moveRight.current = false; break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return null;
};

interface ViewerInsideBuildingProps {
  onSwitchView: () => void;
}

const ViewerInsideBuilding = ({ onSwitchView }: ViewerInsideBuildingProps) => {
  const [isWalking, setIsWalking] = useState(false);
  const [visibility, setVisibility] = useState<VisibilityState>({
    electrical: true,
    plumbing: true,
    building: true,
  });
  const [isWireframe, setIsWireframe] = useState(false);

  const handleElectricalToggle = () => {
    startTransition(() => {
      setVisibility(prev => ({ ...prev, electrical: !prev.electrical }));
    });
  };

  const handlePlumbingToggle = () => {
    startTransition(() => {
      setVisibility(prev => ({ ...prev, plumbing: !prev.plumbing }));
    });
  };

  const handleBuildingToggle = () => {
    startTransition(() => {
      setVisibility(prev => ({ ...prev, building: !prev.building }));
    });
  };

  return (
    <div className="relative h-full w-full bg-card rounded-lg border shadow-sm">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBuildingToggle}
          className="h-8 w-8"
        >
          <Building2 className={`h-4 w-4 ${visibility.building ? 'text-primary' : ''}`} />
          <span className="sr-only">Toggle Building</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleElectricalToggle}
          className="h-8 w-8"
        >
          <Zap className={`h-4 w-4 ${visibility.electrical ? 'text-primary' : ''}`} />
          <span className="sr-only">Toggle Electrical</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlumbingToggle}
          className="h-8 w-8"
        >
          <Wrench className={`h-4 w-4 ${visibility.plumbing ? 'text-primary' : ''}`} />
          <span className="sr-only">Toggle Plumbing</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsWalking(!isWalking)}
          className="h-8 w-8"
        >
          <Move className={`h-4 w-4 ${isWalking ? 'text-primary' : ''}`} />
          <span className="sr-only">Toggle Walking</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsWireframe(!isWireframe)}
          className="h-8 w-8"
        >
          <Grid className={`h-4 w-4 ${isWireframe ? 'text-primary' : ''}`} />
          <span className="sr-only">Toggle Wireframe</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onSwitchView}
          title="Switch to 3D View"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <Canvas camera={{ position: [10, 4, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Create the first floor */}
        {visibility.building && (
          <GLTFModelLoader 
            modelPath="/office.glb"
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1.5}
            visible={true}
            onClick={(partName) => console.log(`Clicked on: ${partName}`)}
            isWireframe={isWireframe}
          />
        )}
        {visibility.electrical && <ElectricalWiring />}
        {visibility.plumbing && <Pipeline />}
        {isWalking ? (
          <>
            <PointerLockControls />
            <WalkControls />
          </>
        ) : (
          <OrbitControls />
        )}
      </Canvas>
    </div>
  );
};

export default ViewerInsideBuilding;
import { useState } from 'react';
import { Html, Text, Billboard } from '@react-three/drei';
import { DoubleSide } from 'three';

interface InteractiveModelProps {
  position: [number, number, number];
  details: string;
  number?: string;
  title?: string;
}

const InteractiveModel: React.FC<InteractiveModelProps> = ({ 
  position, 
  details,
  number = "1",
  title = "Location"
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Billboard
      follow={true}
      position={position}
    >
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[50, 50, 5, 32]} />
        <meshPhysicalMaterial 
          color={hovered ? '#FFD700' : '#C0C0C0'}
          metalness={0.5}
          roughness={0.2}
          transparent={true}
          opacity={0.8}
          side={DoubleSide}
        />
      </mesh>
      
      <Text
        font='arial.ttf'
        position={[0, 0, 3]}
        fontSize={40}
        color={hovered ? 'white' : 'black'}
      >
        {number}
      </Text>

      {hovered && (
        <Html center distanceFactor={3}>
          <div style={{ 
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '15px 20px',
            borderRadius: '8px',
            minWidth: '200px',
            backdropFilter: 'blur(5px)',
            transform: 'translateY(-60px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{ 
              color: '#FFD700',
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {title}
            </h3>
            <div style={{
              color: 'white',
              fontSize: '14px',
              lineHeight: '1.4',
              textAlign: 'center',
              margin: '0'
            }}>
              {details}
            </div>
          </div>
        </Html>
      )}
    </Billboard>
  );
};

export default InteractiveModel; 
import React from 'react';
const ElectricalWiring: React.FC = () => {
  const wires = [];
    const wireLength = 13; // Random length between 5 and 15
    const wireRadius = 0.02; // Radius of the wire

    wires.push(
    <group position={[5.5, 4.5, -7.5]}>
        <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[wireRadius, wireRadius, wireLength, 16]} />
            <meshStandardMaterial color={"red"} />
        </mesh>
            <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[wireRadius, wireRadius, wireLength, 16]} />
            <meshStandardMaterial color={"green"} />
        </mesh>
            <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[wireRadius, wireRadius, wireLength, 16]} />
            <meshStandardMaterial color={"black"} />
        </mesh>
    </group>
    );
    wires.push(
        <group position={[7.5, 4.5, -7.5]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, wireLength, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, wireLength, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, wireLength, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    );
    wires.push(
        <group position={[6.6, 4.5, -7.5]} rotation={[0, 1.5, 0]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    )

    wires.push(
        <group position={[6.6, 4.5, -4.5]} rotation={[0, 1.5, 0]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    )

    wires.push(
        <group position={[6.6, 4.5, -12.5]} rotation={[0, 1.5, 0]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    )

    wires.push(
        <group position={[4.5, 3.5, -12.5]} rotation={[1.5, 0, 1.5]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    )

    wires.push(
        <group position={[4.5, 3.5, -2.5]} rotation={[1.5, 0, 1.5]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 2.5, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    )
    wires.push(
        <group position={[4.5, 3.5, -7.5]} rotation={[0, 0, 1.5]}>
            <mesh key={Math.random()} position={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 10, 16]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
                <mesh key={Math.random()} position={[0.1,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 10, 16]} />
                <meshStandardMaterial color={"green"} />
            </mesh>
                <mesh key={Math.random()} position={[0.2,0,0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[wireRadius, wireRadius, 10, 16]} />
                <meshStandardMaterial color={"black"} />
            </mesh>
        </group>
    )
  return <group>{wires}</group>;
};

export default ElectricalWiring; 
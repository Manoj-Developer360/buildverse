
export function SimpleEnvironment() {
  return (
    <>
      {/* Brighter ambient light for overall illumination */}
      <ambientLight intensity={1.2} color="#f0f0ff" />
      
      {/* Main directional light (sun) */}
      <directionalLight 
        position={[50, 100, 50]} 
        intensity={1.5}
        color="#fffaf0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Secondary directional light for fill */}
      <directionalLight 
        position={[-50, 50, -50]} 
        intensity={0.7}
        color="#e0f0ff"
      />
      
      {/* Hemisphere light for sky/ground color gradient */}
      <hemisphereLight 
        intensity={0.8}
        color="#b0d0ff" // Sky color (blue tint)
        groundColor="#ffe0c0" // Ground color (warm tint)
      />
      
      {/* Add some point lights to simulate city lights */}
      <pointLight position={[200, 20, 200]} intensity={0.8} color="#ffcc77" distance={500} />
      <pointLight position={[-200, 20, -200]} intensity={0.8} color="#77ccff" distance={500} />
      <pointLight position={[200, 20, -200]} intensity={0.8} color="#ff77cc" distance={500} />
      <pointLight position={[-200, 20, 200]} intensity={0.8} color="#ccff77" distance={500} />
      
      {/* Fog for city-like atmosphere */}
      
      {/* Sky color */}
      <color attach="background" args={['#e0e8ff']} />
    </>
  )
} 
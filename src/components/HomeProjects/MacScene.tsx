import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, QuadraticBezierLine, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function AppleMac({ imageUrl }: { imageUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Base colors derived from image
  const chassisColor = '#eaddcf';
  const ventColor = '#3e3831';
  const redButtonColor = '#de5246';
  const keyLight = '#dfd2c4';
  const keyDark = '#a89d91';

  // Materials
  const texture = useTexture(imageUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const chassisMat = useMemo(() => new THREE.MeshStandardMaterial({ color: chassisColor, roughness: 0.8 }), []);
  const ventMat = useMemo(() => new THREE.MeshStandardMaterial({ color: ventColor, roughness: 0.9 }), []);
  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#ffffff',
    map: texture,
    emissiveMap: texture,
    emissive: new THREE.Color(0xffffff), 
    emissiveIntensity: 0.8, 
    roughness: 0.2 
  }), [texture]);
  const redMat = useMemo(() => new THREE.MeshStandardMaterial({ color: redButtonColor, roughness: 0.5 }), []);
  
  // Wobbly subtle breath
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05 - 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* 1. Main Computer Body Group */}
      <group position={[0, 1.5, 0]}>
        {/* Main large back box */}
        <RoundedBox args={[2.4, 2.2, 2.0]} radius={0.08} smoothness={4} position={[0, 0.2, -0.2]} material={chassisMat} castShadow receiveShadow />
        
        {/* Elevating slope for monitor */}
        <RoundedBox args={[2.3, 0.7, 1.9]} radius={0.05} smoothness={4} position={[0, 1.35, -0.4]} rotation={[0.08, 0, 0]} material={chassisMat} castShadow />

        {/* Front Bezel frame */}
        <RoundedBox args={[2.45, 2.6, 0.25]} radius={0.06} smoothness={4} position={[0, 0.2, 0.85]} material={chassisMat} castShadow />

        {/* Screen Cutout / Bezel inner depth */}
        <RoundedBox args={[1.8, 1.4, 0.05]} radius={0.06} smoothness={4} position={[0, 0.7, 0.96]} material={ventMat} />

        {/* The Screen Surface Background (Black) */}
        <RoundedBox args={[1.7, 1.3, 0.05]} radius={0.05} smoothness={4} position={[0, 0.7, 0.98]}>
          <meshStandardMaterial color="#050505" roughness={0.2} />
        </RoundedBox>

        {/* The Active App Display (Perfect Square to match 1:1 Image) */}
        <RoundedBox args={[1.3, 1.3, 0.01]} radius={0.04} smoothness={2} position={[0, 0.7, 1.006]} material={screenMat} />

        {/* Floppy Drive Slot */}
        <mesh position={[0.4, -0.6, 0.95]}>
          <boxGeometry args={[0.9, 0.08, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Side Floppy Indentation (darkened slot extension) */}
        <mesh position={[0.85, -0.6, 0.96]} material={ventMat}>
          <boxGeometry args={[0.2, 0.1, 0.1]} />
        </mesh>

        {/* Red Button (Power) */}
        <mesh position={[-0.9, -0.6, 0.98]} material={redMat}>
          <boxGeometry args={[0.15, 0.15, 0.05]} />
        </mesh>

        {/* Dark square switch / logo near base */}
        <mesh position={[-0.6, -0.85, 0.98]} material={ventMat}>
          <boxGeometry args={[0.12, 0.12, 0.06]} />
        </mesh>

        {/* Side Vents - Right */}
        <group position={[1.25, -0.4, -0.5]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`vent-r-${i}`} position={[0, 0, i * 0.15]} material={ventMat}>
              <boxGeometry args={[0.05, 0.7, 0.05]} />
            </mesh>
          ))}
        </group>
        
        {/* Side Vents - Left */}
        <group position={[-1.25, -0.4, -0.5]}>
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={`vent-l-${i}`} position={[0, 0, i * 0.15]} material={ventMat}>
              <boxGeometry args={[0.05, 0.7, 0.05]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 2. Keyboard Group & Wedge */}
      <group position={[0, 0.2, 2.2]} rotation={[-0.08, 0, 0]}>
        {/* Keyboard base wedge */}
        <RoundedBox args={[2.8, 0.25, 1.4]} radius={0.05} smoothness={4} position={[0, 0, 0]} material={chassisMat} rotation={[0.08, 0, 0]} castShadow receiveShadow />
        
        {/* Keys */}
        <group position={[0, 0.18, 0]} rotation={[0.08, 0, 0]}>
          {Array.from({ length: 4 }).map((_, row) => 
            Array.from({ length: 14 }).map((_, col) => {
              // Scatter some dark keys on edges for contrast
              let matColor = keyLight;
              let width = 0.14;
              let xOffset = -1.05 + col * 0.165;
              const zOffset = -0.4 + row * 0.22;
              
              if (col === 0 || col === 13 || row === 0) matColor = keyDark;
              
              // Skip spacing for spacebar
              if (row === 3 && col > 3 && col < 10) return null;
              
              return (
                <mesh key={`key-${row}-${col}`} position={[xOffset, 0, zOffset]} castShadow>
                  <boxGeometry args={[width, 0.18, 0.15]} />
                  <meshStandardMaterial color={matColor} roughness={0.7} />
                </mesh>
              )
            })
          )}
          {/* Main Spacebar */}
          <mesh position={[0, 0, 0.26]} castShadow>
            <boxGeometry args={[1.05, 0.18, 0.15]} />
            <meshStandardMaterial color={keyLight} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* 3. Mouse & Wire */}
      <group position={[2.2, 0.15, 2.0]}>
        {/* Mouse body */}
        <RoundedBox args={[0.5, 0.25, 0.8]} radius={0.05} smoothness={4} material={chassisMat} castShadow />
        {/* Mouse button groove */}
        <mesh position={[0, 0.13, -0.2]} material={ventMat}>
          <boxGeometry args={[0.5, 0.02, 0.05]} />
        </mesh>
        <mesh position={[0, 0.13, -0.3]} material={ventMat}>
          <boxGeometry args={[0.02, 0.02, 0.2]} />
        </mesh>
        
        {/* Wire back to computer */}
        <QuadraticBezierLine 
          start={[0, -0.1, -0.4]} // mouse front/back relative
          mid={[-0.5, -0.1, -1.0]} // curved corner over desk
          end={[-1.2, 0, -1.5]}    // plugs into computer base
          color={ventColor}
          lineWidth={4}
        />
      </group>



    </group>
  );
}

export function MacScene({ imageUrl }: { imageUrl: string }) {
  return (
    <Canvas camera={{ position: [0, 4, 8], fov: 40 }} shadows>
      <ambientLight intensity={0.6} color="#fff1e6" />
      <directionalLight 
        position={[5, 0, 5]} 
        intensity={1.2} 
        color="#ffffff" 
        castShadow 
      />
      {/* Soft warm fill light */}
      <directionalLight position={[-8, 5, -5]} intensity={0.6} color="#ffd8b1" />
      
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1}
        zoom={1.2}
        rotation={[-0.05, Math.PI / 6, 0]}
        polar={[-0.1, 0.2]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float floatIntensity={0.3} rotationIntensity={0.05} speed={1}>
          <Suspense fallback={null}>
            <AppleMac imageUrl={imageUrl} />
          </Suspense>
        </Float>
      </PresentationControls>
      
      <ContactShadows position={[0, 0.02, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#3e3831" />
    </Canvas>
  );
}

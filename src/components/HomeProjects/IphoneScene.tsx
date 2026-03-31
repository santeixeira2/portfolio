import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function AppleIphone({ imageUrl }: { imageUrl: string }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Base colors for Premium Aluminum iPhone Pro
  const chassisColor = '#e4e5e7';
  const metallicEdgeColor = '#cecfd1';
  const buttonColor = '#cecfd1';
  const notchColor = '#000000';
  const glassBack = '#f2f3f5';

  // Materials
  const texture = useTexture(imageUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  
  const frameMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: metallicEdgeColor, 
    roughness: 0.1, 
    metalness: 0.8 
  }), []);

  const glassBackMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: glassBack, 
    roughness: 0.2, 
    metalness: 0.5 
  }), []);

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: '#ffffff',
    map: texture,
    emissiveMap: texture,
    emissive: new THREE.Color(0xffffff), 
    emissiveIntensity: 0.5, 
    roughness: 0.1 
  }), [texture]);
  
  const notchMat = useMemo(() => new THREE.MeshStandardMaterial({ color: notchColor, roughness: 0.1 }), []);
  const buttonMat = useMemo(() => new THREE.MeshStandardMaterial({ color: buttonColor, roughness: 0.5, metalness: 0.8 }), []);
  
  // Wobbly subtle breath
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Main Metallic Frame */}
      <RoundedBox args={[1.5, 3.0, 0.15]} radius={0.2} smoothness={4} material={frameMat} castShadow receiveShadow />
      
      {/* 2. Back Glass Panel */}
      <RoundedBox args={[1.48, 2.98, 0.16]} radius={0.2} smoothness={4} material={glassBackMat} castShadow receiveShadow />

      {/* 3. Screen Bezel (Black) */}
      <RoundedBox args={[1.45, 2.95, 0.17]} radius={0.18} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color={notchColor} roughness={0.2} />
      </RoundedBox>

      {/* 4. The Active App Display */}
      {/* We shift the texture coordinates if needed, but a standard texture spans exactly standard geometry */}
      <mesh position={[0, 0, 0.086]} material={screenMat}>
        <planeGeometry args={[1.35, 2.85]} />
      </mesh>

      {/* 5. Dynamic Island (Notch) */}
      <RoundedBox args={[0.4, 0.12, 0.005]} radius={0.06} smoothness={4} position={[0, 1.3, 0.088]} material={notchMat} />
      <mesh position={[0.12, 1.3, 0.09]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial color="#08080c" />
      </mesh>

      {/* 6. Side Buttons */}
      {/* Power Button (Right) */}
      <RoundedBox args={[0.04, 0.4, 0.04]} radius={0.01} smoothness={2} position={[0.76, 0.3, 0]} material={buttonMat} />
      {/* Volume Up (Left) */}
      <RoundedBox args={[0.04, 0.25, 0.04]} radius={0.01} smoothness={2} position={[-0.76, 0.5, 0]} material={buttonMat} />
      {/* Volume Down (Left) */}
      <RoundedBox args={[0.04, 0.25, 0.04]} radius={0.01} smoothness={2} position={[-0.76, 0.15, 0]} material={buttonMat} />
      {/* Action Button (Left) */}
      <RoundedBox args={[0.04, 0.12, 0.04]} radius={0.01} smoothness={2} position={[-0.76, 0.85, 0]} material={buttonMat} />

      {/* 7. Camera Bump (Back) */}
      <group position={[-0.35, 1.05, -0.08]}>
        {/* Main large bump island */}
        <RoundedBox args={[0.65, 0.7, 0.04]} radius={0.15} smoothness={4} material={glassBackMat} />
        {/* Lenses */}
        {/* Top left lens */}
        <cylinderGeometry args={[0.13, 0.13, 0.06, 16]} />
        <mesh position={[-0.15, 0.15, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Bottom left lens */}
        <mesh position={[-0.15, -0.15, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Right middle lens */}
        <mesh position={[0.15, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Flash */}
        <mesh position={[0.15, 0.2, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.04, 16]} />
          <meshStandardMaterial color="#fffbe6" emissive="#fffbe6" emissiveIntensity={0.8} />
        </mesh>
      </group>

    </group>
  );
}

export function IphoneScene({ imageUrl }: { imageUrl: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        color="#ffffff" 
        castShadow 
      />
      {/* Soft fill light on the phone */}
      <directionalLight position={[-8, 0, -5]} intensity={0.5} color="#b1d8ff" />
      
      <PresentationControls
        global={false}
        cursor={true}
        snap={true}
        speed={1}
        zoom={1.2}
        rotation={[0.1, -Math.PI / 6, 0]}
        polar={[-0.2, 0.2]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Float floatIntensity={0.4} rotationIntensity={0.1} speed={1.5}>
          <Suspense fallback={null}>
            <AppleIphone imageUrl={imageUrl} />
          </Suspense>
        </Float>
      </PresentationControls>
      
      <ContactShadows position={[0, -2.0, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#3e3831" />
    </Canvas>
  );
}

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Grid, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Import the downloaded GLB asset
import bustUrl from '../../assets/models/bust.glb?url';

function VaporwaveBust() {
  const { nodes } = useGLTF(bustUrl);
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate slowly
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  // Vaporwave toon gradient adapted for white marble
  const gradientMap = useMemo(() => {
    const colors = new Uint8Array([
      200, 200, 200, // Shadow
      240, 240, 240, // Midtone
      255, 255, 255  // Highlight
    ]);
    const texture = new THREE.DataTexture(colors, 3, 1, THREE.RGBFormat);
    texture.needsUpdate = true;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
  }, []);

  // The LeePerrySmith model exposes a Mesh primitive
  const geometry = useMemo(() => {
    const meshNode = Object.values(nodes).find(n => n.type === 'Mesh') as THREE.Mesh;
    return meshNode ? meshNode.geometry : new THREE.DodecahedronGeometry();
  }, [nodes]);

  return (
    <Float floatIntensity={1} rotationIntensity={0.2} speed={1.5}>
      <mesh 
        ref={meshRef} 
        position={[0, -1, 0]} 
        scale={0.5} // Bust is large, needs scaling down
        geometry={geometry}
      >
        <meshToonMaterial 
          color="#f5f5f5" 
          gradientMap={gradientMap}
        />
      </mesh>
    </Float>
  );
}

useGLTF.preload(bustUrl);

export function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {/* Background color for the scene */}
      <div style={{ position: 'absolute', inset: 0, background: '#0d0d12' }} />
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00ffff" />
        <directionalLight position={[-5, -5, -5]} intensity={2} color="#ff00ff" />
        
        <Suspense fallback={null}>
          <VaporwaveBust />
        </Suspense>
        
        {/* Vaporwave Neon Grid */}
        <Grid 
          position={[0, -2.5, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={1}
          cellColor="#ff00ff"
          sectionSize={2}
          sectionThickness={1.5}
          sectionColor="#00ffff"
          fadeDistance={10}
          fadeStrength={1}
        />

        {/* Floating particles (Stars/Orbs) */}
        {Array.from({ length: 30 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 10 - 5
            ]}
          >
            <octahedronGeometry args={[Math.random() * 0.15]} />
            <meshBasicMaterial color={Math.random() > 0.5 ? '#00ffff' : '#ff00ff'} opacity={0.5} transparent />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}

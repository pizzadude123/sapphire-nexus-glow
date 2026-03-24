import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SapphireGem = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    // Create a diamond/sapphire shape using LatheGeometry
    const points: THREE.Vector2[] = [];
    // Bottom point
    points.push(new THREE.Vector2(0, -1.4));
    // Lower body
    points.push(new THREE.Vector2(0.7, -0.3));
    // Widest point
    points.push(new THREE.Vector2(0.85, 0.1));
    // Upper facet
    points.push(new THREE.Vector2(0.6, 0.5));
    // Table edge
    points.push(new THREE.Vector2(0.35, 0.7));
    // Top
    points.push(new THREE.Vector2(0, 0.75));

    return new THREE.LatheGeometry(points, 8);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry} scale={1.3}>
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={512}
          transmission={0.95}
          roughness={0.05}
          thickness={0.5}
          ior={2.4}
          chromaticAberration={0.3}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          color="#1a5fff"
        />
      </mesh>
    </Float>
  );
};

export const SapphireScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-3, -2, 4]} intensity={0.8} color="#4488ff" />
        <pointLight position={[0, 3, 0]} intensity={1} color="#88bbff" />
        <SapphireGem />
      </Canvas>
    </div>
  );
};

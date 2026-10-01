"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Octahedron } from "@react-three/drei";
import * as THREE from "three";

function ScholarshipScene() {
  const prism1Ref = useRef<THREE.Mesh>(null);
  const prism2Ref = useRef<THREE.Mesh>(null);
  const prism3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (prism1Ref.current) {
      prism1Ref.current.rotation.x = t * 0.4;
      prism1Ref.current.rotation.y = t * 0.5;
    }
    if (prism2Ref.current) {
      prism2Ref.current.rotation.y = -t * 0.3;
      prism2Ref.current.rotation.z = t * 0.4;
    }
    if (prism3Ref.current) {
      prism3Ref.current.rotation.x = -t * 0.2;
      prism3Ref.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Golden Aid Prism */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={prism1Ref} position={[0, 0, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#fbbf24"
            roughness={0.1}
            metalness={0.9}
            emissive="#d97706"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Satellite Rose Prism 1 */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={prism2Ref} position={[1.8, 0.8, -0.5]} scale={0.6}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.8}
            emissive="#be123c"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Satellite Pink Prism 2 */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
        <mesh ref={prism3Ref} position={[-1.7, -0.7, -0.3]} scale={0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#db2777"
            roughness={0.2}
            metalness={0.8}
            emissive="#9d174d"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Aid Sparkles */}
      <Sparkles count={70} scale={[7, 7, 7]} size={2} speed={0.4} opacity={0.7} color="#fde68a" />
    </group>
  );
}

export default function ScholarshipParticlesCanvas({ className = "h-80 w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 5, 4]} intensity={1.6} color="#fef3c7" />
        <pointLight position={[-3, -3, -2]} intensity={1} color="#f59e0b" />
        <ScholarshipScene />
      </Canvas>
    </div>
  );
}

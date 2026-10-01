"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

function GeometricScene() {
  const mesh1Ref = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh1Ref.current) {
      mesh1Ref.current.rotation.x = t * 0.3;
      mesh1Ref.current.rotation.y = t * 0.4;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.y = -t * 0.25;
      mesh2Ref.current.rotation.z = t * 0.35;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Wireframe Mathematical Polyhedron */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh ref={mesh1Ref}>
          <icosahedronGeometry args={[1.6, 0]} />
          <meshStandardMaterial
            color="#e11d48"
            wireframe
            wireframeLinewidth={2}
            emissive="#be123c"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Inner Glowing Core */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={mesh2Ref}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#db2777"
            roughness={0.1}
            metalness={0.8}
            emissive="#9d174d"
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>

      {/* Math / Geometry Particles */}
      <Sparkles count={50} scale={[6, 6, 6]} size={2} speed={0.3} opacity={0.6} color="#fda4af" />
    </group>
  );
}

export default function GeometricMathCanvas({ className = "h-80 w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffe4e6" />
        <pointLight position={[-3, -3, -1]} intensity={1} color="#f43f5e" />
        <GeometricScene />
      </Canvas>
    </div>
  );
}

"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

function RiftScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Quantum Space Knot */}
      <Float speed={3} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
          <meshStandardMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.8}
            wireframe
            emissive="#be123c"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      <Sparkles count={80} scale={[8, 8, 8]} size={2} speed={0.5} opacity={0.6} color="#fda4af" />
    </group>
  );
}

export default function Spatial404Canvas({ className = "h-80 w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffe4e6" />
        <pointLight position={[-3, -3, -2]} intensity={1} color="#e11d48" />
        <RiftScene />
      </Canvas>
    </div>
  );
}

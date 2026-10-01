"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function StylizedAirplane() {
  const planeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (planeRef.current) {
      // Gentle banking and oscillation movement simulating flight
      planeRef.current.rotation.z = Math.sin(t * 1.5) * 0.12;
      planeRef.current.rotation.x = Math.cos(t * 1.2) * 0.08;
      planeRef.current.rotation.y = Math.PI * 0.2 + Math.sin(t * 0.8) * 0.1;
      planeRef.current.position.y = Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group ref={planeRef} scale={0.7} position={[0.2, 0, 0]}>
      {/* Fuselage (Body) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.35, 2.2, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Wings */}
      <mesh position={[-0.1, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 2.4, 0.04]} />
        <meshStandardMaterial color="#ec4899" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Tail Fin */}
      <mesh position={[-0.85, 0.35, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.35, 0.6, 0.03]} />
        <meshStandardMaterial color="#be185d" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Jet Engine Glow Pods */}
      <mesh position={[-0.1, -0.15, 0.65]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.1, -0.15, -0.65]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#f472b6" />
      <pointLight position={[0, 0, 2]} intensity={0.8} color="#ec4899" />

      {/* Jet Trajectory Particle Trail */}
      <Sparkles count={90} scale={[5, 3, 3]} size={1.5} speed={0.4} opacity={0.6} color="#fbcfe8" />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <StylizedAirplane />
      </Float>
    </>
  );
}

export default function AirplaneCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 4], fov: 45 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

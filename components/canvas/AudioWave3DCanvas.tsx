"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AudioWaveScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.4;
      const s = 1 + Math.sin(t * 2) * 0.06;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dynamic Acoustic Harmonic Sphere */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.3, 64, 64]} />
          <MeshDistortMaterial
            color="#e11d48"
            roughness={0.15}
            metalness={0.5}
            distort={0.45}
            speed={3}
            emissive="#9f1239"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Voice Frequency Waveform Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.035, 16, 100]} />
        <meshStandardMaterial color="#fb7185" emissive="#f43f5e" emissiveIntensity={0.8} />
      </mesh>

      {/* Sound Particle Vibrations */}
      <Sparkles count={55} scale={[7, 7, 7]} size={1.8} speed={0.5} opacity={0.6} color="#fbcfe8" />
    </group>
  );
}

export default function AudioWave3DCanvas({ className = "h-80 w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1.6} color="#ffe4e6" />
        <pointLight position={[-3, -3, -2]} intensity={0.9} color="#e11d48" />
        <AudioWaveScene />
      </Canvas>
    </div>
  );
}

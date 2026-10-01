"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function ContactOrbScene() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth mouse parallax on whole group
    if (groupRef.current) {
      const targetX = mouse.x * 0.4;
      const targetY = mouse.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX + t * 0.08, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY * 0.5, 0.05);
    }

    // Outer and inner orbital rings continuous rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.35;
      ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.25;
      ring2Ref.current.rotation.z = t * 0.3;
    }

    // Gentle core rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Glowing Admissions Sphere */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.35, 48, 48]} />
          <MeshDistortMaterial
            color="#e11d48"
            roughness={0.15}
            metalness={0.5}
            distort={0.28}
            speed={1.8}
            emissive="#9f1239"
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Ring */}
      <Torus ref={ring1Ref} args={[2.35, 0.035, 24, 120]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#fb7185"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </Torus>

      {/* Secondary Orbital Ring */}
      <Torus ref={ring2Ref} args={[2.85, 0.025, 24, 120]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#fda4af"
          emissive="#f43f5e"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </Torus>

      {/* Micro-sparkles & Constellation Aura */}
      <Sparkles count={55} scale={[7, 7, 7]} size={2} speed={0.4} opacity={0.55} color="#fecdd3" />
    </group>
  );
}

export default function ContactOrbCanvas({ className = "h-80 w-full" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`relative ${className} flex items-center justify-center`}>
        <div className="h-32 w-32 rounded-full bg-rose-500/20 blur-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[6, 6, 6]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -4, -3]} intensity={1.2} color="#e11d48" />
        <pointLight position={[3, -2, 4]} intensity={0.9} color="#fb7185" />
        <ContactOrbScene />
      </Canvas>
    </div>
  );
}

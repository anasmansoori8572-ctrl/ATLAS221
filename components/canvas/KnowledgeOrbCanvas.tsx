"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function KnowledgeOrbScene() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Mouse responsiveness with smooth lerp
    if (groupRef.current) {
      const targetX = mouse.x * 0.35;
      const targetY = mouse.y * 0.25;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetX + t * 0.09,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -targetY * 0.4,
        0.05
      );
    }

    // Continuous orbital rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.32;
      ring1Ref.current.rotation.y = t * 0.22;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.28;
      ring2Ref.current.rotation.z = t * 0.34;
    }

    // Knowledge core gentle rotation
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.45;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central 3D Knowledge Core */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.35, 48, 48]} />
          <MeshDistortMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.55}
            distort={0.3}
            speed={1.6}
            emissive="#881337"
            emissiveIntensity={0.65}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Knowledge Ring */}
      <Torus ref={ring1Ref} args={[2.3, 0.035, 24, 120]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <meshStandardMaterial
          color="#f43f5e"
          emissive="#fb7185"
          emissiveIntensity={0.7}
          roughness={0.25}
          metalness={0.75}
        />
      </Torus>

      {/* Secondary Orbital Ring */}
      <Torus ref={ring2Ref} args={[2.8, 0.025, 24, 120]} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <meshStandardMaterial
          color="#fda4af"
          emissive="#f43f5e"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.75}
        />
      </Torus>

      {/* Orbiting Knowledge Dust & Educational Nodes */}
      <Sparkles count={50} scale={[7, 7, 7]} size={2} speed={0.35} opacity={0.5} color="#fecdd3" />
    </group>
  );
}

export default function KnowledgeOrbCanvas({ className = "h-80 w-full" }: { className?: string }) {
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
        <KnowledgeOrbScene />
      </Canvas>
    </div>
  );
}

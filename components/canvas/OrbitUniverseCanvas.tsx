"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Torus, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function OrbitScene() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.35;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Pulsing Knowledge Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <MeshDistortMaterial
            color="#e11d48"
            roughness={0.2}
            metalness={0.6}
            distort={0.35}
            speed={2}
            emissive="#881337"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Orbital Ring 1 */}
      <Torus ref={ring1Ref} args={[2.2, 0.04, 16, 100]}>
        <meshStandardMaterial color="#f43f5e" emissive="#fb7185" emissiveIntensity={0.5} roughness={0.3} />
      </Torus>

      {/* Orbital Ring 2 */}
      <Torus ref={ring2Ref} args={[2.8, 0.03, 16, 100]}>
        <meshStandardMaterial color="#db2777" emissive="#f472b6" emissiveIntensity={0.4} roughness={0.3} />
      </Torus>

      {/* Constellation Sparkles */}
      <Sparkles count={60} scale={[8, 8, 8]} size={1.8} speed={0.4} opacity={0.5} color="#fbcfe8" />
    </group>
  );
}

export default function OrbitUniverseCanvas({ className = "h-80 w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffe4e6" />
        <pointLight position={[-4, -4, -2]} intensity={0.8} color="#e11d48" />
        <OrbitScene />
      </Canvas>
    </div>
  );
}

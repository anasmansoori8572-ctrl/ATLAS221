"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function TravelArc() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Globe Core */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.7}
          metalness={0.2}
          wireframe
          wireframeLinewidth={1.5}
        />
      </mesh>

      {/* Flight Path Arc 1 */}
      <mesh rotation={[0.4, 0.6, 0]}>
        <torusGeometry args={[2.0, 0.025, 16, 100, Math.PI * 1.3]} />
        <meshStandardMaterial color="#e11d48" emissive="#fb7185" emissiveIntensity={0.8} />
      </mesh>

      {/* Flight Path Arc 2 */}
      <mesh rotation={[-0.5, -0.8, 0.3]}>
        <torusGeometry args={[2.2, 0.02, 16, 100, Math.PI * 1.5]} />
        <meshStandardMaterial color="#db2777" emissive="#f472b6" emissiveIntensity={0.6} />
      </mesh>

      {/* Flight Path Arc 3 */}
      <mesh rotation={[1.1, 0.3, -0.4]}>
        <torusGeometry args={[1.8, 0.02, 16, 100, Math.PI * 1.2]} />
        <meshStandardMaterial color="#f43f5e" emissive="#fda4af" emissiveIntensity={0.6} />
      </mesh>

      {/* Waypoint Travel Particles */}
      <Sparkles count={50} scale={[6, 6, 6]} size={2} speed={0.4} opacity={0.6} color="#fda4af" />
    </group>
  );
}

export default function TravelNetworkCanvas({ className = "h-80 w-full" }: { className?: string }) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffe4e6" />
        <pointLight position={[-3, -3, -1]} intensity={0.9} color="#e11d48" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <TravelArc />
        </Float>
      </Canvas>
    </div>
  );
}

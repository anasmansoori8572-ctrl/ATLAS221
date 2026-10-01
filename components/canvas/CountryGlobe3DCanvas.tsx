"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Sphere } from "@react-three/drei";
import * as THREE from "three";

function DestinationGlobe({ accentColor = "#e11d48" }: { accentColor?: string }) {
  const globeRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group ref={globeRef}>
      {/* 3D Wireframe Globe with Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.4, 28, 28]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.6}
          metalness={0.4}
          wireframe
          wireframeLinewidth={1.2}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshStandardMaterial
          color={accentColor}
          roughness={0.3}
          metalness={0.7}
          emissive={accentColor}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Orbital Longitude / Latitude Coordinate Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 100]} />
        <meshStandardMaterial color="#f43f5e" emissive="#fb7185" emissiveIntensity={0.6} />
      </mesh>

      {/* Destination Beacon Particles */}
      <Sparkles count={45} scale={[5.5, 5.5, 5.5]} size={1.8} speed={0.35} opacity={0.6} color="#fda4af" />
    </group>
  );
}

export default function CountryGlobe3DCanvas({
  className = "h-80 w-full",
  accentColor = "#e11d48",
}: {
  className?: string;
  accentColor?: string;
}) {
  return (
    <div className={`relative ${className} pointer-events-none`}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 5, 4]} intensity={1.5} color="#ffe4e6" />
        <pointLight position={[-3, -3, -2]} intensity={0.9} color={accentColor} />
        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
          <DestinationGlobe accentColor={accentColor} />
        </Float>
      </Canvas>
    </div>
  );
}

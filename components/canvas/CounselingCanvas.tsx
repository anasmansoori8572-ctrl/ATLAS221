"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 6, 5]} intensity={1.9} color="#ffffff" />
      <pointLight position={[0, 0, 3]} intensity={0.9} color="#ec4899" />

      <Sparkles count={120} scale={[12, 8, 6]} size={1.4} speed={0.2} opacity={0.5} color="#fbcfe8" />
      <Sparkles count={60} scale={[12, 8, 6]} size={0.7} speed={0.12} opacity={0.3} color="#cbd5e1" />
    </>
  );
}

export default function CounselingCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

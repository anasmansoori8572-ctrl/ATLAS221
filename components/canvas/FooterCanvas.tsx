"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#ec4899" />

      <Sparkles count={80} scale={[14, 8, 6]} size={1.2} speed={0.15} opacity={0.35} color="#fbcfe8" />
      <Sparkles count={40} scale={[14, 8, 6]} size={0.7} speed={0.08} opacity={0.2} color="#cbd5e1" />
    </>
  );
}

export default function FooterCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

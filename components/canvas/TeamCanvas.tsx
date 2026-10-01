"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

export default function TeamCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.5} />
        <Sparkles
          count={80}
          scale={[16, 10, 6]}
          size={1.1}
          speed={0.12}
          opacity={0.3}
          color="#fbcfe8"
        />
        <Sparkles
          count={40}
          scale={[16, 10, 6]}
          size={0.6}
          speed={0.08}
          opacity={0.2}
          color="#cbd5e1"
        />
      </Canvas>
    </div>
  );
}

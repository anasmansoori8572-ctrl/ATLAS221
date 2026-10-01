"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import GraduationCapModel from "./GraduationCap";

const BASE_ROTATION_Y = 0.55;
const BASE_ROTATION_X = -0.05;

function Scene({ activeStepIndex = 0 }: { activeStepIndex?: number }) {
  const rigRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const currentScrollRot = useRef(0);

  useFrame((state) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.08;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.08;

    // Target rotation derived from active card step (60 deg rotation per step)
    const targetScrollRot = activeStepIndex * (Math.PI / 3);
    currentScrollRot.current += (targetScrollRot - currentScrollRot.current) * 0.08;

    if (rigRef.current) {
      rigRef.current.rotation.y = BASE_ROTATION_Y + currentScrollRot.current + pointer.current.x * 0.5;
      rigRef.current.rotation.x = BASE_ROTATION_X + Math.sin(currentScrollRot.current * 0.5) * 0.08 - pointer.current.y * 0.22;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight color="#ffffff" groundColor="#fbcfe8" intensity={0.8} />
      <directionalLight
        position={[3, 4, 4]}
        intensity={1.6}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 1.5, 2]} intensity={0.5} color="#f9a8d4" />
      <pointLight position={[0, -1, 3]} intensity={0.3} color="#ec4899" />

      <group ref={rigRef} rotation={[BASE_ROTATION_X, BASE_ROTATION_Y, 0]}>
        <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.25}>
          <group position={[0, -0.4, 0]} scale={1.6}>
            <GraduationCapModel />
          </group>
        </Float>
      </group>

      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.35}
        scale={7}
        blur={2.4}
        far={2}
        color="#4c0519"
      />
    </>
  );
}

export default function GraduationCapCanvas({
  activeStepIndex = 0,
}: {
  activeStepIndex?: number;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [1.6, 0.55, 6.2], fov: 38 }}
      className="!absolute inset-0"
      shadows
    >
      <Suspense fallback={null}>
        <Scene activeStepIndex={activeStepIndex} />
      </Suspense>
    </Canvas>
  );
}

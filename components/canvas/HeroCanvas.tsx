"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import Globe from "./Globe";

function OrbitRing({
  radius,
  tilt,
  speed,
  ringColor = "#1c1917",
  dotColor = "#ec4899",
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  ringColor?: string;
  dotColor?: string;
}) {
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!satelliteRef.current) return;
    const t = clock.getElapsedTime() * speed;
    satelliteRef.current.position.set(Math.cos(t) * radius, 0, Math.sin(t) * radius);
  });

  return (
    <group rotation={tilt}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.004, radius + 0.004, 128]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>
      <group ref={satelliteRef}>
        <mesh>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={dotColor} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={dotColor} transparent opacity={0.25} />
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  const rigRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const pointer = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    camera.position.set(0, 0, 10.5);
    gsap.to(camera.position, {
      z: 6.6,
      duration: 2.4,
      ease: "power3.out",
      delay: 0.2,
    });
  }, [camera]);

  useFrame((state) => {
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.14;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.14;

    if (rigRef.current) {
      rigRef.current.rotation.y = pointer.current.x * 0.55;
      rigRef.current.rotation.x = -pointer.current.y * 0.32;
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight color="#ffffff" groundColor="#fecdd3" intensity={1.15} />
      <directionalLight position={[3, 2.5, 6]} intensity={1.9} color="#ffffff" />
      <directionalLight position={[-4, -1.5, 5]} intensity={1.1} color="#fff1f2" />
      <pointLight position={[-5, -2, -3]} intensity={0.5} color="#ec4899" />
      <pointLight position={[2, -1, -4]} intensity={0.4} color="#f9a8d4" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />

      <Sparkles count={220} scale={[16, 9, 9]} size={1.3} speed={0.2} opacity={0.45} color="#fbcfe8" />

      <group ref={rigRef} position={[3.3, -0.05, 0]} scale={2.0}>
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.5}>
          <Globe />
        </Float>
        <OrbitRing radius={2.1} tilt={[Math.PI / 2.6, 0, 0]} speed={0.5} ringColor="#f472b6" dotColor="#ec4899" />
        <OrbitRing radius={2.5} tilt={[Math.PI / 1.9, 0.4, 0]} speed={-0.4} ringColor="#fbcfe8" dotColor="#be185d" />
        <OrbitRing radius={2.9} tilt={[Math.PI / 3.4, -0.5, 0.3]} speed={0.35} ringColor="#f472b6" dotColor="#9d174d" />
      </group>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 10.5], fov: 45 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Centered 3D Spherical Atlas Favicon Emblem
function CenteredAtlasSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Mesh>(null);

  // Load the authentic Atlas favicon texture
  const texture = useLoader(THREE.TextureLoader, "/assets/images/favicon.png");

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
    }
  }, [texture]);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Continuous slow, smooth Y-axis rotation in place
      groupRef.current.rotation.y += delta * 0.45;
      // Gentle harmonic tilt
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.05;
      groupRef.current.rotation.z = Math.cos(t * 0.5) * 0.03;
    }

    // Counter-rotating subtle orbital ring
    if (orbitRef.current && !reducedMotion) {
      orbitRef.current.rotation.x = t * 0.2;
      orbitRef.current.rotation.y = -t * 0.25;
    }

    if (ringRef.current && !reducedMotion) {
      ringRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={reducedMotion ? 0 : 1.6} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* 1. Core 3D Spherical Orb with Atlas Brand Color & Texture */}
        <mesh>
          <sphereGeometry args={[0.96, 64, 64]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.15}
            emissive="#881337"
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* 2. Front & Back High-Definition Planar Medallion Insets for crisp logo visibility */}
        <mesh position={[0, 0, 0.5]}>
          <circleGeometry args={[0.78, 48]} />
          <meshBasicMaterial map={texture} transparent opacity={0.95} />
        </mesh>
        <mesh position={[0, 0, -0.5]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.78, 48]} />
          <meshBasicMaterial map={texture} transparent opacity={0.95} />
        </mesh>

        {/* 3. Outer Crystal Gloss Shell for 3D Specular Depth */}
        <mesh>
          <sphereGeometry args={[1.01, 48, 48]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.35}
            roughness={0.08}
            metalness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            transmission={0.4}
            color="#ffe4e6"
          />
        </mesh>

        {/* 4. Physical Rose-Gold Equatorial Bevel Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.14, 0.024, 16, 64]} />
          <meshStandardMaterial
            color="#fb7185"
            emissive="#9f1239"
            emissiveIntensity={0.3}
            metalness={0.88}
            roughness={0.2}
          />
        </mesh>

        {/* 5. Tilted Orbital Energy Halo */}
        <mesh ref={orbitRef} rotation={[Math.PI / 3.5, Math.PI / 5, 0]}>
          <torusGeometry args={[1.42, 0.012, 16, 64]} />
          <meshStandardMaterial
            color="#fda4af"
            emissive="#f43f5e"
            emissiveIntensity={0.55}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* 6. Subtle Ambient Knowledge Dust */}
        <Sparkles
          count={18}
          scale={[4.2, 4.2, 4.2]}
          size={1.5}
          speed={0.2}
          opacity={0.3}
          color="#fecdd3"
        />
      </Float>
    </group>
  );
}

export default function AtlasFaviconBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // CRITICAL: STRICTLY EXCLUDE HOMEPAGE (/)
  if (pathname === "/") {
    return null;
  }

  if (!mounted) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none flex items-center justify-center"
    >
      {/* Centered Soft Atmospheric Glow (subtle, non-blurry, perfectly centered) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-rose-200/20 via-pink-100/10 to-transparent blur-2xl" />

      {/* Centered 3D Canvas Box: 280px-320px responsive medium visual diameter */}
      <div className="relative h-[320px] w-[320px] max-w-[85vw] max-h-[85vw]">
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0, 3.8], fov: 42 }}
          className="!absolute inset-0 pointer-events-none"
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[4, 5, 5]} intensity={2.0} color="#ffffff" />
          <pointLight position={[-3, -3, 2]} intensity={1.3} color="#e11d48" />
          <pointLight position={[3, 2, 4]} intensity={1.5} color="#fb7185" />
          <CenteredAtlasSphere />
        </Canvas>
      </div>
    </div>
  );
}

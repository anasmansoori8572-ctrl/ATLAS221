"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { JOURNEY_CARDS_DATA, type JourneyCardItem } from "@/components/sections/JourneyCards";

// Helper: Generates a 1024x1024 canvas texture for each card face matching atlasstudy.in exact UI design
function createCardCanvasTexture(card: JourneyCardItem) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const radius = 36;

  // 1. Off-white Card Background (#f3f4f6)
  ctx.fillStyle = "#f3f4f6";
  ctx.beginPath();
  ctx.roundRect(32, 32, 960, 960, radius);
  ctx.fill();

  // 2. Card Outer Border
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(32, 32, 960, 960, radius);
  ctx.stroke();

  // 3. Subtle World Map Vector Silhouette Background
  ctx.fillStyle = "#cbd5e1";
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.arc(320, 440, 220, 0, Math.PI * 2);
  ctx.arc(740, 520, 260, 0, Math.PI * 2);
  ctx.arc(500, 700, 180, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 4. Top Right Red "APPLY" Badge
  ctx.fillStyle = "#e11d48";
  ctx.beginPath();
  ctx.roundRect(720, 76, 210, 84, 12);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("APPLY", 825, 130);

  // 5. Center Illustrated Icon Container
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(220, 360, 84, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(220, 360, 80, 0, Math.PI * 2);
  ctx.fill();

  // Red accent badge on icon
  ctx.fillStyle = "#e11d48";
  ctx.beginPath();
  ctx.arc(255, 395, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("✓", 255, 404);

  // 6. Title
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 64px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(card.title, 96, 560);

  // Subtitle / Description text
  ctx.fillStyle = "#475569";
  ctx.font = "normal 34px sans-serif";
  const descText = card.description.length > 75 ? card.description.slice(0, 72) + "..." : card.description;
  ctx.fillText(descText, 96, 630);

  // 7. Bottom White Pill Button ("READY TO REPORT >" / "ONLINE SERVICES >" / "WHAT YOU NEED >")
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(96, 750, 490, 110, 16);
  ctx.fill();

  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "#e11d48";
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${card.cta} >`, 341, 818);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true; // Crucial for Three.js WebGL texture upload!
  return texture;
}

// 6 Target Rotations corresponding to 6 steps
const TARGET_ROTATIONS: [number, number, number][] = [
  [0, 0, 0],               // Step 0: Application (Front: +Z)
  [0, -Math.PI / 2, 0],    // Step 1: Visa Process (Right: +X)
  [Math.PI / 2, 0, 0],     // Step 2: Test Preparation (Top: +Y)
  [0, Math.PI / 2, 0],     // Step 3: Accommodation (Left: -X)
  [-Math.PI / 2, 0, 0],    // Step 4: Top Scholarships (Bottom: -Y)
  [0, Math.PI, 0],         // Step 5: University Shortlisting (Back: -Z)
];

// Physical Outer Card Surface Positions and Rotations (Size = 3.35 x 3.35 x 0.06, offset = 1.78)
const CARD_SURFACE_CONFIGS = [
  { cardIndex: 0, pos: [0, 0, 1.78], rot: [0, 0, 0] },                     // Front (+Z): Application
  { cardIndex: 1, pos: [1.78, 0, 0], rot: [0, Math.PI / 2, 0] },           // Right (+X): Visa Process
  { cardIndex: 2, pos: [0, 1.78, 0], rot: [-Math.PI / 2, 0, 0] },          // Top (+Y): Test Preparation
  { cardIndex: 3, pos: [-1.78, 0, 0], rot: [0, -Math.PI / 2, 0] },          // Left (-X): Accommodation
  { cardIndex: 4, pos: [0, -1.78, 0], rot: [Math.PI / 2, 0, 0] },          // Bottom (-Y): Top Scholarships
  { cardIndex: 5, pos: [0, 0, -1.78], rot: [0, Math.PI, 0] },              // Back (-Z): University Shortlisting
];

function CardPanelMesh({
  card,
  pos,
  rot,
}: {
  card: JourneyCardItem;
  pos: [number, number, number];
  rot: [number, number, number];
}) {
  const texture = useMemo(() => createCardCanvasTexture(card), [card]);

  return (
    <group position={pos} rotation={rot}>
      {/* 3D Physical Card Backing Panel */}
      <mesh>
        <boxGeometry args={[3.35, 3.35, 0.05]} />
        <meshStandardMaterial color="#f4f4f6" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Front Face Textured Plane */}
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[3.35, 3.35]} />
        <meshStandardMaterial map={texture} roughness={0.2} transparent />
      </mesh>
    </group>
  );
}

function DieCube({ activeStepIndex }: { activeStepIndex: number }) {
  const floatGroupRef = useRef<THREE.Group>(null);
  const cubeGroupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // GSAP 90-Degree Snapping Animation when activeStepIndex updates
  useEffect(() => {
    if (!cubeGroupRef.current) return;
    const targetRot = TARGET_ROTATIONS[activeStepIndex % TARGET_ROTATIONS.length];

    gsap.to(cubeGroupRef.current.rotation, {
      x: targetRot[0],
      y: targetRot[1],
      z: targetRot[2],
      duration: 1.2,
      ease: "back.out(1.4)",
    });
  }, [activeStepIndex]);

  // Antigravity Idle Float & Pointer Lag Loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (floatGroupRef.current) {
      floatGroupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
      floatGroupRef.current.position.x = Math.cos(t * 1.0) * 0.06;
      floatGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;

      pointer.current.x += (state.pointer.x - pointer.current.x) * 0.08;
      pointer.current.y += (state.pointer.y - pointer.current.y) * 0.08;

      floatGroupRef.current.rotation.y = pointer.current.x * 0.22;
      floatGroupRef.current.rotation.x = -pointer.current.y * 0.22;
    }
  });

  return (
    <group ref={floatGroupRef}>
      <group ref={cubeGroupRef}>
        {/* Inner Core Cube Box */}
        <mesh>
          <boxGeometry args={[3.48, 3.48, 3.48]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.4}
            metalness={0.5}
            emissive="#1e293b"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* 6 Physical 3D Card Panels mounted on 6 Outer Surfaces */}
        {CARD_SURFACE_CONFIGS.map((config) => (
          <CardPanelMesh
            key={config.cardIndex}
            card={JOURNEY_CARDS_DATA[config.cardIndex]}
            pos={config.pos as [number, number, number]}
            rot={config.rot as [number, number, number]}
          />
        ))}
      </group>
    </group>
  );
}

export default function JourneyDieCanvas({
  activeStepIndex = 0,
}: {
  activeStepIndex?: number;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8.8], fov: 45 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 7]} intensity={1.3} color="#ffffff" />
      <directionalLight position={[-5, -6, -4]} intensity={0.6} color="#e2e8f0" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#ffffff" />

      <DieCube activeStepIndex={activeStepIndex} />
    </Canvas>
  );
}

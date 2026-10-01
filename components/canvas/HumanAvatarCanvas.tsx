"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";

export type PoseType = "sitting" | "standing" | "waving" | "thinking" | string;

// Generate a procedural patterned canvas texture matching the shirt in avatar.png
function useShirtTexture() {
  return useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Dark slate/charcoal base
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, 512, 512);

      // Abstract geometric pattern overlay matching avatar.png pattern
      const colors = ["#334155", "#475569", "#0f172a", "#1e293b", "#384e6e"];
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const w = 15 + Math.random() * 35;
        const h = 15 + Math.random() * 35;
        ctx.moveTo(x, y);
        ctx.lineTo(x + w, y + h * 0.3);
        ctx.lineTo(x + w * 0.7, y + h);
        ctx.lineTo(x - w * 0.2, y + h * 0.8);
        ctx.closePath();
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    return texture;
  }, []);
}

// 3D Head Mesh texture-mapped with user's face photos (av1.png front, av3.png side profile, av4.png back head)
function FacePhotoHead({ isWireframe }: { isWireframe: boolean }) {
  const [frontFace, sideProfile, backHead] = useTexture([
    "/team/av1.png",
    "/team/av3.png",
    "/team/av4.png",
  ]);

  if (isWireframe) {
    return (
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.44, 0.52, 0.44]} />
        <meshBasicMaterial wireframe color="#38bdf8" />
      </mesh>
    );
  }

  return (
    <group>
      {/* 3D Multi-Material Head Cube mapping exact photo angles */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.5, 0.42]} />
        <meshStandardMaterial attach="material-0" map={sideProfile} roughness={0.4} />
        <meshStandardMaterial attach="material-1" map={sideProfile} roughness={0.4} />
        <meshStandardMaterial attach="material-2" color="#1a1514" roughness={0.9} />
        <meshStandardMaterial attach="material-3" color="#d4a373" roughness={0.6} />
        <meshStandardMaterial attach="material-4" map={frontFace} roughness={0.3} />
        <meshStandardMaterial attach="material-5" map={backHead} roughness={0.5} />
      </mesh>

      {/* High-definition Front Face Photo overlay */}
      <mesh position={[0, 0.005, 0.212]}>
        <planeGeometry args={[0.42, 0.49]} />
        <meshStandardMaterial map={frontFace} transparent opacity={0.98} roughness={0.3} />
      </mesh>
    </group>
  );
}

// 3D Human Character Component
function HumanCharacter({ pose, pointer }: { pose: PoseType; pointer: React.RefObject<{ x: number; y: number }> }) {
  const shirtTexture = useShirtTexture();
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Smooth mouse look-at tracking
  useFrame(() => {
    if (headRef.current && pointer.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pointer.current.x * 0.35, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -pointer.current.y * 0.25, 0.1);
    }
    if (groupRef.current && pointer.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.current.x * 0.15, 0.08);
    }
  });

  const isWireframe = pose === "wireframe";

  // Common materials
  const skinMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshStandardMaterial color="#d4a373" roughness={0.6} metalness={0.1} />
  );

  const hairMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshStandardMaterial color="#1a1514" roughness={0.9} />
  );

  const shirtMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : shirtTexture ? (
    <meshStandardMaterial map={shirtTexture} roughness={0.7} />
  ) : (
    <meshStandardMaterial color="#1e293b" roughness={0.7} />
  );

  const pantsMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshStandardMaterial color="#1e2430" roughness={0.8} />
  );

  const shoeMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
  );

  const shoeSwooshMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshStandardMaterial color="#0f172a" roughness={0.4} />
  );

  const glassesFrameMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
  );

  const glassesLensMaterial = isWireframe ? (
    <meshBasicMaterial wireframe color="#38bdf8" />
  ) : (
    <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.05} ior={1.5} />
  );

  return (
    <group ref={groupRef} position={[0, pose === "sitting" ? -0.4 : -1.3, 0]} scale={1.1}>
      {/* ==================== 1. HEAD & FACE ==================== */}
      <group ref={headRef} position={[0, pose === "sitting" ? 1.75 : 2.5, 0]}>
        {/* Photo-mapped 3D Face Mesh */}
        <FacePhotoHead isWireframe={isWireframe} />
        {/* Neck */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.13, 0.15, 0.2, 16]} />
          {skinMaterial}
        </mesh>
        {/* Hair Volume */}
        <group position={[0, 0.22, 0.02]}>
          <mesh position={[0, 0.08, -0.02]}>
            <boxGeometry args={[0.46, 0.22, 0.48]} />
            {hairMaterial}
          </mesh>
          {/* Hair Top Styled Tufts */}
          <mesh position={[-0.1, 0.18, 0.05]} rotation={[0.1, 0, 0.2]}>
            <boxGeometry args={[0.22, 0.12, 0.35]} />
            {hairMaterial}
          </mesh>
          <mesh position={[0.1, 0.18, 0.02]} rotation={[0.15, 0, -0.15]}>
            <boxGeometry args={[0.2, 0.14, 0.32]} />
            {hairMaterial}
          </mesh>
        </group>
        {/* Glasses */}
        <group position={[0, 0.03, 0.23]}>
          {/* Left Lens Frame */}
          <mesh position={[-0.11, 0, 0]}>
            <torusGeometry args={[0.085, 0.015, 12, 24]} />
            {glassesFrameMaterial}
          </mesh>
          {/* Left Lens */}
          <mesh position={[-0.11, 0, 0]}>
            <circleGeometry args={[0.08, 24]} />
            {glassesLensMaterial}
          </mesh>
          {/* Right Lens Frame */}
          <mesh position={[0.11, 0, 0]}>
            <torusGeometry args={[0.085, 0.015, 12, 24]} />
            {glassesFrameMaterial}
          </mesh>
          {/* Right Lens */}
          <mesh position={[0.11, 0, 0]}>
            <circleGeometry args={[0.08, 24]} />
            {glassesLensMaterial}
          </mesh>
          {/* Nose Bridge */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
            {glassesFrameMaterial}
          </mesh>
        </group>
        {/* Beard / Mustache Shading */}
        {!isWireframe && (
          <mesh position={[0, -0.16, 0.225]}>
            <boxGeometry args={[0.3, 0.12, 0.01]} />
            <meshStandardMaterial color="#2d221c" roughness={0.9} />
          </mesh>
        )}
      </group>

      {/* ==================== 2. TORSO & ARMS ==================== */}
      <group position={[0, pose === "sitting" ? 1.05 : 1.7, 0]}>
        {/* Main Shirt Torso */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.62, 0.85, 0.38]} />
          {shirtMaterial}
        </mesh>
        {/* Shirt Collar */}
        <mesh position={[0, 0.44, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.36, 0.08, 0.3]} />
          {shirtMaterial}
        </mesh>

        {/* Arms Logic based on pose */}
        {pose === "sitting" ? (
          /* Sitting Pose Arms (typing/holding laptop) */
          <>
            {/* Left Arm */}
            <group position={[-0.38, 0.2, 0]}>
              <mesh position={[0, -0.22, 0.15]} rotation={[0.9, 0.2, -0.2]}>
                <cylinderGeometry args={[0.09, 0.08, 0.45, 16]} />
                {shirtMaterial}
              </mesh>
              {/* Forearm & Folded Sleeve Cuff */}
              <mesh position={[0.06, -0.42, 0.34]} rotation={[1.3, 0.3, -0.4]}>
                <cylinderGeometry args={[0.075, 0.065, 0.4, 16]} />
                {skinMaterial}
              </mesh>
              {/* Hand */}
              <mesh position={[0.08, -0.52, 0.48]}>
                <boxGeometry args={[0.08, 0.05, 0.12]} />
                {skinMaterial}
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.38, 0.2, 0]}>
              <mesh position={[0, -0.22, 0.15]} rotation={[0.9, -0.2, 0.2]}>
                <cylinderGeometry args={[0.09, 0.08, 0.45, 16]} />
                {shirtMaterial}
              </mesh>
              {/* Forearm & Hand */}
              <mesh position={[-0.06, -0.42, 0.34]} rotation={[1.3, -0.3, 0.4]}>
                <cylinderGeometry args={[0.075, 0.065, 0.4, 16]} />
                {skinMaterial}
              </mesh>
              <mesh position={[-0.08, -0.52, 0.48]}>
                <boxGeometry args={[0.08, 0.05, 0.12]} />
                {skinMaterial}
              </mesh>
            </group>
          </>
        ) : (
          /* Standing & Wireframe Arms */
          <>
            {/* Left Arm */}
            <group position={[-0.38, 0.2, 0]}>
              <mesh position={[-0.05, -0.28, 0.04]} rotation={[0.1, 0, 0.15]}>
                <cylinderGeometry args={[0.09, 0.075, 0.55, 16]} />
                {shirtMaterial}
              </mesh>
              <mesh position={[-0.08, -0.62, 0.06]}>
                <boxGeometry args={[0.08, 0.12, 0.09]} />
                {skinMaterial}
              </mesh>
            </group>
            {/* Right Arm */}
            <group position={[0.38, 0.2, 0]}>
              <mesh position={[0.05, -0.28, 0.04]} rotation={[0.1, 0, -0.15]}>
                <cylinderGeometry args={[0.09, 0.075, 0.55, 16]} />
                {shirtMaterial}
              </mesh>
              <mesh position={[0.08, -0.62, 0.06]}>
                <boxGeometry args={[0.08, 0.12, 0.09]} />
                {skinMaterial}
              </mesh>
            </group>
          </>
        )}
      </group>

      {/* ==================== 3. LEGS & FEET ==================== */}
      {pose === "sitting" ? (
        /* Seated Leg Geometry */
        <group position={[0, 0.55, 0]}>
          {/* Pelvis / Seat area */}
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[0.58, 0.32, 0.48]} />
            {pantsMaterial}
          </mesh>
          {/* Left Thigh (Forward) */}
          <mesh position={[-0.18, -0.05, 0.38]} rotation={[1.45, 0.1, 0]}>
            <cylinderGeometry args={[0.12, 0.1, 0.56, 16]} />
            {pantsMaterial}
          </mesh>
          {/* Left Lower Leg (Vertical down) */}
          <mesh position={[-0.18, -0.42, 0.62]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.095, 0.08, 0.5, 16]} />
            {pantsMaterial}
          </mesh>
          {/* Left Sneaker */}
          <group position={[-0.18, -0.7, 0.68]}>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.15, 0.12, 0.28]} />
              {shoeMaterial}
            </mesh>
            <mesh position={[-0.08, 0, 0.06]}>
              <boxGeometry args={[0.01, 0.04, 0.18]} />
              {shoeSwooshMaterial}
            </mesh>
          </group>

          {/* Right Thigh (Crossed over left thigh) */}
          <mesh position={[0.12, 0.08, 0.36]} rotation={[1.4, -0.3, -0.2]}>
            <cylinderGeometry args={[0.12, 0.1, 0.58, 16]} />
            {pantsMaterial}
          </mesh>
          {/* Right Lower Leg */}
          <mesh position={[0.08, -0.28, 0.64]} rotation={[0.3, -0.2, 0]}>
            <cylinderGeometry args={[0.095, 0.08, 0.5, 16]} />
            {pantsMaterial}
          </mesh>
          {/* Right Sneaker */}
          <group position={[0.06, -0.56, 0.72]}>
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.15, 0.12, 0.28]} />
              {shoeMaterial}
            </mesh>
            <mesh position={[0.08, 0, 0.06]}>
              <boxGeometry args={[0.01, 0.04, 0.18]} />
              {shoeSwooshMaterial}
            </mesh>
          </group>
        </group>
      ) : (
        /* Standing Leg Geometry */
        <group position={[0, 0.75, 0]}>
          {/* Pelvis */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.58, 0.25, 0.36]} />
            {pantsMaterial}
          </mesh>
          {/* Left Leg */}
          <group position={[-0.17, -0.38, 0]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.09, 0.85, 16]} />
              {pantsMaterial}
            </mesh>
            {/* Sneaker */}
            <group position={[0, -0.48, 0.06]}>
              <mesh>
                <boxGeometry args={[0.16, 0.12, 0.32]} />
                {shoeMaterial}
              </mesh>
              <mesh position={[-0.085, 0, 0]}>
                <boxGeometry args={[0.01, 0.04, 0.18]} />
                {shoeSwooshMaterial}
              </mesh>
            </group>
          </group>
          {/* Right Leg */}
          <group position={[0.17, -0.38, 0]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.09, 0.85, 16]} />
              {pantsMaterial}
            </mesh>
            {/* Sneaker */}
            <group position={[0, -0.48, 0.06]}>
              <mesh>
                <boxGeometry args={[0.16, 0.12, 0.32]} />
                {shoeMaterial}
              </mesh>
              <mesh position={[0.085, 0, 0]}>
                <boxGeometry args={[0.01, 0.04, 0.18]} />
                {shoeSwooshMaterial}
              </mesh>
            </group>
          </group>
        </group>
      )}

      {/* ==================== 4. PROPS: LAPTOP & ARMCHAIR (SITTING) ==================== */}
      {pose === "sitting" && (
        <group position={[0, 0, 0]}>
          {/* Sleek Armchair Base */}
          <mesh position={[0, 0.35, -0.15]}>
            <boxGeometry args={[0.95, 0.65, 0.8]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.85, -0.48]}>
            <boxGeometry args={[0.95, 0.8, 0.22]} />
            <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </mesh>
          {/* Left & Right Armrests */}
          <mesh position={[-0.48, 0.65, -0.1]}>
            <boxGeometry args={[0.16, 0.45, 0.75]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          <mesh position={[0.48, 0.65, -0.1]}>
            <boxGeometry args={[0.16, 0.45, 0.75]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>

          {/* 3D Laptop on Lap */}
          <group position={[0, 0.88, 0.36]} rotation={[-0.1, 0, 0]}>
            {/* Base / Keyboard section */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.48, 0.018, 0.34]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Screen Lid (Opened at 105 degrees) */}
            <group position={[0, 0.01, -0.16]} rotation={[-1.75, 0, 0]}>
              <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.48, 0.32, 0.012]} />
                <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Glowing Screen Display */}
              <mesh position={[0, 0.16, 0.007]}>
                <planeGeometry args={[0.44, 0.28]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            </group>
          </group>
        </group>
      )}
    </group>
  );
}

// Circular Glowing Pedestal Stage
function StagePedestal() {
  return (
    <group position={[0, -1.8, 0]}>
      {/* Base Cylinder Ring */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.1, 64]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Outer Neon Glow Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.18, 64]} />
        <meshBasicMaterial color="#ec4899" side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Neon Glow Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.55, 64]} />
        <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Scene({ pose, onPoseChange }: { pose: PoseType; onPoseChange: (p: PoseType) => void }) {
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-4, 3, -2]} intensity={1.1} color="#38bdf8" />
      <pointLight position={[0, 2, 3]} intensity={1.5} color="#ec4899" />
      <pointLight position={[0, -1, 2]} intensity={0.8} color="#f472b6" />

      <Sparkles count={100} scale={[8, 6, 6]} size={1.5} speed={0.2} opacity={0.5} color="#fbcfe8" />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
        <HumanCharacter pose={pose} pointer={pointer} />
      </Float>

      <StagePedestal />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
      />

      {/* HTML Overlay Pose Selector Controls */}
      <Html position={[0, -2.1, 0]} center transform={false}>
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/80 p-1.5 backdrop-blur-md shadow-xl select-none">
          <button
            onClick={() => onPoseChange("sitting")}
            className={`rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-all ${pose === "sitting"
                ? "bg-linear-to-r from-rose-600 to-rose-500 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
          >
            Sitting (Laptop)
          </button>
          <button
            onClick={() => onPoseChange("standing")}
            className={`rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-all ${pose === "standing"
                ? "bg-linear-to-r from-rose-600 to-rose-500 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
          >
            Standing
          </button>
          <button
            onClick={() => onPoseChange("wireframe")}
            className={`rounded-full px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase transition-all ${pose === "wireframe"
                ? "bg-linear-to-r from-sky-500 to-blue-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
          >
            3D Wireframe
          </button>
        </div>
      </Html>
    </>
  );
}

export default function HumanAvatarCanvas() {
  const [pose, setPose] = useState<PoseType>("sitting");

  return (
    <div className="relative h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0.4, 5.2], fov: 45 }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene pose={pose} onPoseChange={setPose} />
        </Suspense>
      </Canvas>
    </div>
  );
}

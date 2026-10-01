"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const INK = "#161225";
const INK_DEEP = "#0d0a17";
const PINK = "#db2777";
const GOLD = "#d4af37";
const PAGES = "#faf5ef";

function usePageTexture() {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#f7f1e4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 3) {
      const shade = y % 6 === 0 ? "#d9cdb4" : "#e9dfc9";
      ctx.fillStyle = shade;
      ctx.fillRect(0, y, canvas.width, 1);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    return texture;
  }, []);
}

function PageEdge({
  width,
  height,
  position,
  rotationY = 0,
  texture,
  repeatY,
}: {
  width: number;
  height: number;
  position: [number, number, number];
  rotationY?: number;
  texture: THREE.CanvasTexture | null;
  repeatY: number;
}) {
  const tex = useMemo(() => {
    if (!texture) return null;
    const t = texture.clone();
    t.repeat.set(1, repeatY);
    t.needsUpdate = true;
    return t;
  }, [texture, repeatY]);

  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={tex ?? undefined} color={tex ? "#ffffff" : PAGES} roughness={0.92} />
    </mesh>
  );
}

function useBaseProfile() {
  return useMemo(() => {
    const pts = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.46, 0.0),
      new THREE.Vector2(0.52, 0.07),
      new THREE.Vector2(0.5, 0.18),
      new THREE.Vector2(0.4, 0.32),
      new THREE.Vector2(0.3, 0.42),
      new THREE.Vector2(0.22, 0.47),
      new THREE.Vector2(0.19, 0.5),
    ];
    return new THREE.LatheGeometry(pts, 40);
  }, []);
}

const TASSEL_DROP_END = new THREE.Vector3(0.97, -0.62, 0.14);

function useTassel() {
  return useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.065, 0),
      new THREE.Vector3(0.5, 0.05, 0.06),
      new THREE.Vector3(0.88, 0.03, 0.12),
      new THREE.Vector3(1.0, -0.1, 0.14),
      TASSEL_DROP_END,
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.014, 8, false);
  }, []);
}

const FRINGE_STRANDS = [
  { angle: -0.22, len: 0.32 },
  { angle: -0.14, len: 0.36 },
  { angle: -0.06, len: 0.4 },
  { angle: 0.02, len: 0.42 },
  { angle: 0.1, len: 0.38 },
  { angle: 0.18, len: 0.34 },
  { angle: 0.26, len: 0.3 },
];

function TasselFringe({ color }: { color: string }) {
  return (
    <group position={[TASSEL_DROP_END.x, TASSEL_DROP_END.y, TASSEL_DROP_END.z]}>
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.05} />
      </mesh>
      {FRINGE_STRANDS.map((s, i) => (
        <mesh
          key={i}
          position={[Math.sin(s.angle) * 0.02, -s.len / 2 - 0.02, Math.cos(s.angle) * 0.02]}
          rotation={[s.angle * 0.5, 0, s.angle]}
        >
          <cylinderGeometry args={[0.006, 0.004, s.len, 6]} />
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function Book({
  y,
  color,
  rotation,
  size = [1.7, 0.26, 1.2] as [number, number, number],
  pageTexture,
}: {
  y: number;
  color: string;
  rotation: number;
  size?: [number, number, number];
  pageTexture: THREE.CanvasTexture | null;
}) {
  const [w, h, d] = size;
  const coverT = 0.045;
  const spineW = 0.16;
  const edgeInset = 0.045;

  const pagesW = w - spineW - edgeInset;
  const pagesH = h - coverT * 2;
  const pagesD = d - edgeInset * 2;
  const pagesX = -w / 2 + spineW + pagesW / 2;

  const spineColor = useMemo(() => new THREE.Color(color).multiplyScalar(0.82), [color]);
  const repeatY = Math.max(2, Math.round(pagesH * 26));

  return (
    <group position={[0, y, 0]} rotation={[0, rotation, 0]}>
      <RoundedBox
        args={[w, coverT, d]}
        radius={0.03}
        smoothness={4}
        position={[0, h / 2 - coverT / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.08} />
      </RoundedBox>

      <RoundedBox
        args={[w, coverT, d]}
        radius={0.03}
        smoothness={4}
        position={[0, -h / 2 + coverT / 2, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.08} />
      </RoundedBox>

      <RoundedBox
        args={[spineW, h, d]}
        radius={0.045}
        smoothness={4}
        position={[-w / 2 + spineW / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={spineColor} roughness={0.45} metalness={0.06} />
      </RoundedBox>

      <mesh position={[pagesX, 0, 0]} receiveShadow>
        <boxGeometry args={[pagesW, pagesH, pagesD]} />
        <meshStandardMaterial color={PAGES} roughness={0.95} />
      </mesh>

      <PageEdge
        width={pagesD}
        height={pagesH}
        position={[pagesX + pagesW / 2 + 0.001, 0, 0]}
        rotationY={Math.PI / 2}
        texture={pageTexture}
        repeatY={repeatY}
      />
      <PageEdge
        width={pagesW}
        height={pagesH}
        position={[pagesX, 0, pagesD / 2 + 0.001]}
        texture={pageTexture}
        repeatY={repeatY}
      />
      <PageEdge
        width={pagesW}
        height={pagesH}
        position={[pagesX, 0, -pagesD / 2 - 0.001]}
        rotationY={Math.PI}
        texture={pageTexture}
        repeatY={repeatY}
      />
    </group>
  );
}

const BOTTOM_BOOK_H = 0.26;
const TOP_BOOK_H = 0.24;
const TOP_BOOK_Y = 0.26;
const CAP_REST_Y = TOP_BOOK_Y + TOP_BOOK_H / 2;

export default function GraduationCapModel() {
  const capRef = useRef<THREE.Group>(null);
  const baseGeo = useBaseProfile();
  const tasselGeo = useTassel();
  const pageTexture = usePageTexture();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (capRef.current) {
      capRef.current.position.y = CAP_REST_Y + Math.sin(t * 0.9) * 0.006;
    }
  });

  return (
    <group>
      <Book y={0} color={INK_DEEP} rotation={-0.12} size={[1.75, BOTTOM_BOOK_H, 1.25]} pageTexture={pageTexture} />
      <Book y={TOP_BOOK_Y} color={PINK} rotation={0.16} size={[1.6, TOP_BOOK_H, 1.15]} pageTexture={pageTexture} />

      <group ref={capRef} position={[0, CAP_REST_Y, 0]}>
        <mesh geometry={baseGeo} castShadow receiveShadow>
          <meshStandardMaterial color={INK} roughness={0.4} metalness={0.15} />
        </mesh>

        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <boxGeometry args={[2.05, 2.05, 0.09]} />
          <meshStandardMaterial color={INK} roughness={0.35} metalness={0.2} />
        </mesh>

        <mesh position={[0, 0.545, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
          <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.85} />
        </mesh>

        <group position={[0, 0.55, 0]}>
          <mesh geometry={tasselGeo} castShadow>
            <meshStandardMaterial color={INK_DEEP} roughness={0.55} metalness={0.1} />
          </mesh>
          <TasselFringe color={INK_DEEP} />
        </group>
      </group>
    </group>
  );
}

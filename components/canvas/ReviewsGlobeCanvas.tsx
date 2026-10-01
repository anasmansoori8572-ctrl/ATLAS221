"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Html, OrbitControls, Sparkles, useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { latLongToVector3 } from "@/lib/utils";

export interface ReviewMarker {
  id: string;
  headline: string;
  comment: string;
  author: string;
  country: string;
  flag: string;
  rating: number;
  date: string;
  avatar: string;
  lat: number;
  lon: number;
}

export const REVIEWS_DATA: ReviewMarker[] = [
  {
    id: "preeti",
    headline: "Thank You Atlas!...",
    comment:
      "Thank You. We are committed to provide best services to our clients. Because of our Trust Worthy approach towards work, Atlas Study Consultants is the Best Abroad Education Consultant in Kanpur and North Ireland.",
    author: "Preeti Khanna",
    country: "Ireland",
    flag: "🇮🇪",
    rating: 5,
    date: "Oct 09, 2021",
    avatar: "/reviews/preeti-khanna.jpg",
    lat: 53.4,
    lon: -7.6,
  },
  {
    id: "kumar",
    headline: "Smooth & Efficient Service!...",
    comment:
      "Thru Atlas study consultants I got my brother admitted in medical degree course for abroad education. I spoke to couple of consultants and found Atlas Study Consultants as one of best abroad consultants.",
    author: "Kumar Abhishek",
    country: "India",
    flag: "🇮🇳",
    rating: 5,
    date: "Aug 10, 2023",
    avatar: "/reviews/kumar-abhishek.jpg",
    lat: 20.5,
    lon: 78.9,
  },
  {
    id: "arlo",
    headline: "Highly Recommended!...",
    comment:
      "Awesome customer service, they know what they are doing. Straight to the point, help with the forms if you need it. Amazing results always. We 100% recommend to others know what they are doing.",
    author: "Arlo Sebastian",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    date: "Oct 09, 2021",
    avatar: "/reviews/arlo-sebastian.jpg",
    lat: -25.2,
    lon: 133.7,
  },
];

const RADIUS = 1.55;

// Standalone shader for the Reviews globe — separate uniform/material identity from the hero globe
// (no shared `extend()` registration), tuned so the surface never reads fully black at any rotation.
const ReviewEarthMaterial = shaderMaterial(
  {
    dayMap: null,
    normalMap: null,
    specularMap: null,
    emissiveMap: null,
    emissiveColor: new THREE.Color("#fbbf24"),
    sunDirection: new THREE.Vector3(2.2, 1.8, 4.5).normalize(),
  },
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  `
    uniform sampler2D dayMap;
    uniform sampler2D normalMap;
    uniform sampler2D specularMap;
    uniform sampler2D emissiveMap;
    uniform vec3 emissiveColor;
    uniform vec3 sunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 earthTex = texture2D(dayMap, vUv).rgb;
      float specMask = texture2D(specularMap, vUv).r;

      vec3 normalTex = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
      vec3 N = normalize(vNormal + normalTex * 0.25);
      vec3 L = normalize(sunDirection);
      vec3 V = normalize(vViewPosition);

      // Lighting floor keeps the surface visibly rich on the "night" side too —
      // it never crushes to black as the globe rotates.
      float NdotL = max(dot(N, L), 0.0);
      float lightFactor = mix(0.42, 1.05, smoothstep(-0.3, 0.5, NdotL));

      vec3 H = normalize(L + V);
      float spec = pow(max(dot(N, H), 0.0), 22.0) * specMask * 0.35;

      float nightFactor = smoothstep(0.25, -0.25, NdotL);
      float emissiveTex = texture2D(emissiveMap, vUv).r;
      vec3 nightLights = emissiveColor * emissiveTex * nightFactor * 1.6;

      vec3 finalColor = earthTex * lightFactor + vec3(spec) + nightLights;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

const ReviewAtmosphereMaterial = shaderMaterial(
  {
    glowColor: new THREE.Color("#fb7185"),
    intensity: 1.2,
    power: 2.8,
  },
  `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform vec3 glowColor;
    uniform float intensity;
    uniform float power;
    varying vec3 vNormal;
    void main() {
      float rim = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
      gl_FragColor = vec4(glowColor, clamp(rim, 0.0, 1.0) * intensity);
    }
  `
);

extend({ ReviewEarthMaterial, ReviewAtmosphereMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    reviewEarthMaterial: Record<string, unknown>;
    reviewAtmosphereMaterial: Record<string, unknown>;
  }
}

function useReviewEarthTextures() {
  const [map, normalMap, specularMap, emissiveMap, cloudMap] = useTexture(
    [
      "/earth/earth_day.jpg",
      "/earth/earth_normal.jpg",
      "/earth/earth_specular.jpg",
      "/earth/earth_lights.png",
      "/earth/earth_clouds.png",
    ],
    (textures) => {
      const texs = Array.isArray(textures) ? textures : [textures];
      texs.forEach((tex) => {
        if (tex) {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 8;
        }
      });
    }
  );
  return { map, normalMap, specularMap, emissiveMap, cloudMap };
}

function ReviewPin({
  review,
  active,
  onSelect,
  occluder,
}: {
  review: ReviewMarker;
  active: boolean;
  onSelect: () => void;
  occluder: React.RefObject<THREE.Mesh | null>;
}) {
  const position = useMemo(
    () => latLongToVector3(review.lat, review.lon, RADIUS + 0.02),
    [review.lat, review.lon]
  );
  const outward = useMemo(() => position.clone().normalize(), [position]);
  const stemQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), outward),
    [outward]
  );
  const [hovered, setHovered] = useState(false);

  const STEM_LENGTH = 0.26;
  const pinColor = active ? "#ffffff" : hovered ? "#fecdd3" : "#e11d48";

  return (
    <group position={position}>
      <mesh
        position={outward.clone().multiplyScalar(STEM_LENGTH * 0.55)}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Pin Line: a thin stem standing radially outward from the surface point */}
      <mesh position={outward.clone().multiplyScalar(STEM_LENGTH / 2)} quaternion={stemQuat}>
        <cylinderGeometry args={[0.004, 0.004, STEM_LENGTH, 8]} />
        <meshBasicMaterial color={pinColor} />
      </mesh>
      <mesh position={outward.clone().multiplyScalar(STEM_LENGTH)} scale={active ? 1.3 : 1}>
        <sphereGeometry args={[0.018, 16, 16]} />
        <meshBasicMaterial color={pinColor} />
      </mesh>

      <group position={outward.clone().multiplyScalar(STEM_LENGTH)}>
        <Html
          distanceFactor={8}
          occlude={[occluder as React.RefObject<THREE.Object3D>]}
          className="pointer-events-none select-none"
        >
          <div
            className={`-translate-x-1/2 -translate-y-[105%] flex w-14 flex-col items-center gap-0.5 rounded-lg border px-1.5 py-1.5 text-center backdrop-blur-md transition-all duration-200 ${
              active
                ? "border-rose-300/60 bg-rose-600/95 scale-105"
                : "border-rose-300/30 bg-slate-950/90"
            } ${hovered && !active ? "scale-105" : ""}`}
          >
            <img
              src={review.avatar}
              alt={review.author}
              className="h-5 w-5 shrink-0 rounded-full border border-white/60 object-cover"
            />
            <span
              className={`w-full truncate text-[8px] font-bold leading-tight ${active ? "text-white" : "text-rose-50"}`}
            >
              {review.author}
            </span>
            <span className={`w-full truncate text-[7px] leading-tight ${active ? "text-rose-100" : "text-rose-300/80"}`}>
              {review.country} {review.flag}
            </span>
          </div>
        </Html>
      </group>
    </group>
  );
}

function PremiumReviewGlobe({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);

  const { map, normalMap, specularMap, emissiveMap, cloudMap } = useReviewEarthTextures();

  useFrame((_, delta) => {
    if (globeGroupRef.current) globeGroupRef.current.rotation.y += delta * 0.15;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.22;
  });

  return (
    <group ref={globeGroupRef}>
      {/* Photorealistic Earth Surface (never crushes to black on the night side) */}
      <mesh ref={earthMeshRef}>
        <sphereGeometry args={[RADIUS, 96, 96]} />
        <reviewEarthMaterial
          dayMap={map}
          normalMap={normalMap}
          specularMap={specularMap}
          emissiveMap={emissiveMap}
        />
      </mesh>

      {/* Soft Cloud Layer */}
      <mesh ref={cloudRef} scale={1.012}>
        <sphereGeometry args={[RADIUS, 72, 72]} />
        <meshStandardMaterial
          map={cloudMap}
          alphaMap={cloudMap}
          transparent
          opacity={0.55}
          color="#ffffff"
          depthWrite={false}
          roughness={0.9}
        />
      </mesh>

      {/* Rose Atmosphere Glow (brand-matched, layered for depth) */}
      <mesh scale={1.05}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <reviewAtmosphereMaterial
          glowColor={new THREE.Color("#9f1239")}
          intensity={1.1}
          power={2.8}
          transparent
          side={THREE.BackSide}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.16}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <reviewAtmosphereMaterial
          glowColor={new THREE.Color("#fb7185")}
          intensity={0.65}
          power={2.8}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.3}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <reviewAtmosphereMaterial
          glowColor={new THREE.Color("#fff1f2")}
          intensity={0.35}
          power={3.4}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Review Location Pin Badges */}
      {REVIEWS_DATA.map((review) => (
        <ReviewPin
          key={review.id}
          review={review}
          active={review.id === activeId}
          onSelect={() => setActiveId(review.id)}
          occluder={earthMeshRef}
        />
      ))}
    </group>
  );
}

export default function ReviewsGlobeCanvas({
  activeId,
  setActiveId,
}: {
  activeId: string;
  setActiveId: (id: string) => void;
}) {
  return (
    <div className="relative h-[480px] sm:h-[540px] lg:h-[600px] w-full cursor-grab active:cursor-grabbing">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[70%] w-[70%] rounded-full bg-rose-500/10 blur-[90px]" />
      </div>

      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[12, 12, 6]} intensity={1.8} />

        <Sparkles count={70} scale={[12, 10, 6]} size={1.1} speed={0.12} opacity={0.3} color="#fbcfe8" />

        <Suspense fallback={null}>
          <PremiumReviewGlobe activeId={activeId} setActiveId={setActiveId} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.55}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}

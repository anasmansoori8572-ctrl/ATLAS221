"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Html, shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { latLongToVector3 } from "@/lib/utils";

const RADIUS = 1.6;

const STUDY_HUBS = [
  { name: "United Kingdom", lat: 54, lon: -2 },
  { name: "United States", lat: 39, lon: -98 },
  { name: "Canada", lat: 56, lon: -106 },
  { name: "Ireland", lat: 53, lon: -8 },
  { name: "Australia", lat: -25, lon: 133 },
];

const AtmosphereMaterial = shaderMaterial(
  {
    glowColor: new THREE.Color("#f472b6"),
    intensity: 1.6,
    power: 2.5,
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

const EarthSurfaceMaterial = shaderMaterial(
  {
    dayMap: null,
    normalMap: null,
    specularMap: null,
    emissiveMap: null,
    oceanColor: new THREE.Color("rgb(245, 220, 222)"), // Custom Ocean rgb(245, 220, 222)
    landColor: new THREE.Color("#f472b6"),             // Pastel Pink Land
    emissiveColor: new THREE.Color("#be185d"), // Magenta city night lights
    sunDirection: new THREE.Vector3(3.0, 2.5, 6.0).normalize(),
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
    uniform vec3 oceanColor;
    uniform vec3 landColor;
    uniform vec3 emissiveColor;
    uniform vec3 sunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      float specMask = texture2D(specularMap, vUv).r;

      vec4 dayTex = texture2D(dayMap, vUv);
      float landLuma = dot(dayTex.rgb, vec3(0.299, 0.587, 0.114));

      // Land: Pastel Pink with detailed terrain luminance shading
      vec3 landBase = mix(landColor * 0.85, landColor * 1.12, landLuma);
      
      // Ocean: Very very light soft pink
      vec3 baseColor = mix(landBase, oceanColor, specMask);

      vec3 normalTex = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
      vec3 N = normalize(vNormal + normalTex * 0.35);
      vec3 L = normalize(sunDirection);
      vec3 V = normalize(vViewPosition);

      float NdotL = max(dot(N, L), 0.0);
      float lightFactor = smoothstep(-0.25, 0.35, NdotL);

      vec3 H = normalize(L + V);
      float NdotH = max(dot(N, H), 0.0);
      float spec = pow(NdotH, 24.0) * specMask * 0.7;

      float nightFactor = 1.0 - lightFactor;
      float emissiveTex = texture2D(emissiveMap, vUv).r;
      vec3 nightLights = emissiveColor * emissiveTex * nightFactor * 2.2;

      vec3 finalColor = baseColor * (0.50 + lightFactor * 0.70) + vec3(spec * 1.0, spec * 0.85, spec * 0.95) + nightLights;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ AtmosphereMaterial, EarthSurfaceMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    atmosphereMaterial: Record<string, unknown>;
    earthSurfaceMaterial: Record<string, unknown>;
  }
}

function useEarthTextures() {
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

function HubMarker({
  lat,
  lon,
  name,
  occluder,
}: {
  lat: number;
  lon: number;
  name: string;
  occluder: React.RefObject<THREE.Mesh | null>;
}) {
  const position = useMemo(() => latLongToVector3(lat, lon, RADIUS + 0.015), [lat, lon]);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime();
    const scale = 1 + Math.sin(t * 2 + lat) * 0.25 + 0.25;
    ringRef.current.scale.setScalar(scale);
    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = Math.max(0, 0.6 - (scale - 1) * 0.6);
  });

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : "#be185d"} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.032, 0.042, 32]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <Html
        distanceFactor={8}
        occlude={[occluder as React.RefObject<THREE.Object3D>]}
        className="pointer-events-none select-none"
      >
        <div
          className={`-translate-x-1/2 translate-y-[-160%] whitespace-nowrap rounded-full border border-pink-300/30 bg-[#1e0a18]/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-pink-100 backdrop-blur-md transition-all duration-200 ${
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

export default function Globe() {
  const surfaceRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);

  const { map, normalMap, specularMap, emissiveMap, cloudMap } = useEarthTextures();

  useFrame((_, delta) => {
    if (surfaceRef.current) surfaceRef.current.rotation.y += delta * 0.70;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.95;
  });

  return (
    <group>
      <mesh ref={surfaceRef}>
        <sphereGeometry args={[RADIUS, 128, 128]} />
        <earthSurfaceMaterial
          dayMap={map}
          normalMap={normalMap}
          specularMap={specularMap}
          emissiveMap={emissiveMap}
        />
      </mesh>

      {/* White Clouds Layer */}
      <mesh ref={cloudRef} scale={1.012}>
        <sphereGeometry args={[RADIUS, 96, 96]} />
        <meshStandardMaterial
          map={cloudMap}
          alphaMap={cloudMap}
          transparent
          opacity={0.8}
          color="#ffffff"
          depthWrite={false}
          roughness={0.8}
        />
      </mesh>

      {/* Inner Atmosphere Glow */}
      <mesh scale={1.045}>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <atmosphereMaterial
          glowColor={new THREE.Color("#831843")}
          intensity={1.4}
          power={2.6}
          transparent
          side={THREE.BackSide}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Mid Atmosphere Glow */}
      <mesh scale={1.14}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <atmosphereMaterial
          glowColor={new THREE.Color("#f472b6")}
          intensity={0.8}
          power={2.6}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Atmosphere Glow */}
      <mesh scale={1.32}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <atmosphereMaterial
          glowColor={new THREE.Color("#fff1f5")}
          intensity={0.5}
          power={3.4}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {STUDY_HUBS.map((hub) => (
        <HubMarker key={hub.name} {...hub} occluder={surfaceRef} />
      ))}
    </group>
  );
}

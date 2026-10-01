"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { latLongToVector3 } from "@/lib/utils";

export interface NetworkLocation {
  id: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  flag: string;
  isHQ?: boolean;
}

export const SUPPORT_LOCATIONS: NetworkLocation[] = [
  {
    id: "india",
    name: "Kanpur HQ",
    country: "India (Headquarters)",
    city: "Kanpur, Uttar Pradesh",
    lat: 26.8467,
    lon: 80.9462,
    flag: "🇮🇳",
    isHQ: true,
  },
  {
    id: "uk",
    name: "London Support Desk",
    country: "United Kingdom",
    city: "London",
    lat: 51.5074,
    lon: -0.1278,
    flag: "🇬🇧",
  },
  {
    id: "ireland",
    name: "Dublin Liaison",
    country: "Ireland",
    city: "Dublin",
    lat: 53.3498,
    lon: -6.2603,
    flag: "🇮🇪",
  },
  {
    id: "canada",
    name: "Toronto Hub",
    country: "Canada",
    city: "Toronto",
    lat: 43.6532,
    lon: -79.3832,
    flag: "🇨🇦",
  },
  {
    id: "australia",
    name: "Sydney Hub",
    country: "Australia",
    city: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
    flag: "🇦🇺",
  },
];

const EARTH_RADIUS = 2.0;

// 3D Vertical Marker anchored to Earth surface and rotating with Earth geometry
function LocationMarker({
  location,
  position,
  isHighlighted,
}: {
  location: NetworkLocation;
  position: THREE.Vector3;
  isHighlighted: boolean;
}) {
  const normal = useMemo(() => position.clone().normalize(), [position]);
  const beamHeight = location.isHQ ? 0.35 : isHighlighted ? 0.32 : 0.22;
  const tipPos = useMemo(
    () => position.clone().add(normal.clone().multiplyScalar(beamHeight)),
    [position, normal, beamHeight]
  );

  const beamLineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints([position, tipPos]);
    const mat = new THREE.LineBasicMaterial({
      color: location.isHQ ? 0xe11d48 : isHighlighted ? 0xf43f5e : 0xfb7185,
      linewidth: 2,
      transparent: true,
      opacity: isHighlighted ? 1 : 0.75,
    });
    return new THREE.Line(geo, mat);
  }, [position, tipPos, location.isHQ, isHighlighted]);

  return (
    <group>
      {/* Surface Anchor Ring */}
      <mesh position={position.clone().add(normal.clone().multiplyScalar(0.01))}>
        <ringGeometry args={[0.03, 0.08, 18]} />
        <meshBasicMaterial
          color={location.isHQ ? "#e11d48" : isHighlighted ? "#f43f5e" : "#fda4af"}
          side={THREE.DoubleSide}
          transparent
          opacity={isHighlighted || location.isHQ ? 0.95 : 0.6}
        />
      </mesh>

      {/* Vertical Light Beam */}
      <primitive object={beamLineObj} />

      {/* Floating 3D Node Sphere */}
      <mesh position={tipPos}>
        <sphereGeometry args={[location.isHQ ? 0.085 : isHighlighted ? 0.075 : 0.05, 16, 16]} />
        <meshStandardMaterial
          color={location.isHQ ? "#ffffff" : isHighlighted ? "#ffffff" : "#f43f5e"}
          emissive={location.isHQ ? "#e11d48" : isHighlighted ? "#f43f5e" : "#be123c"}
          emissiveIntensity={isHighlighted || location.isHQ ? 1.5 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Pulsing Beacon Ring */}
      <mesh position={tipPos}>
        <ringGeometry args={[0.07, 0.12, 16]} />
        <meshBasicMaterial
          color={location.isHQ ? "#fb7185" : isHighlighted ? "#f43f5e" : "#fda4af"}
          side={THREE.DoubleSide}
          transparent
          opacity={isHighlighted ? 0.85 : 0.4}
        />
      </mesh>

      {/* 3D Floating Tooltip Label */}
      <Html
        position={[tipPos.x, tipPos.y + 0.12, tipPos.z]}
        center
        distanceFactor={8}
        className="pointer-events-none select-none transition-all duration-300"
      >
        <div
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-md backdrop-blur-md whitespace-nowrap transition-transform duration-300 ${
            isHighlighted || location.isHQ
              ? "bg-slate-900/90 text-white border border-rose-500 scale-110 shadow-rose-500/30"
              : "bg-white/85 text-slate-800 border border-slate-200/80"
          }`}
        >
          <span>{location.flag}</span>
          <span>{location.name}</span>
        </div>
      </Html>
    </group>
  );
}

// 3D Curved Route Arc connecting India HQ to international support hubs
function GlobalRouteArc({
  start,
  end,
  isHighlighted,
  progress,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  isHighlighted: boolean;
  progress: number;
}) {
  const { linePoints, beadPos } = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const distance = start.distanceTo(end);
    const elevation = EARTH_RADIUS + Math.max(0.4, distance * 0.38);
    mid.normalize().multiplyScalar(elevation);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(45);
    const currentPoint = curve.getPoint(progress);

    return { linePoints: points, beadPos: currentPoint };
  }, [start, end, progress]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  const lineObject = useMemo(() => {
    const material = new THREE.LineBasicMaterial({
      color: isHighlighted ? 0xffffff : 0xf43f5e,
      opacity: isHighlighted ? 0.95 : 0.45,
      transparent: true,
      linewidth: isHighlighted ? 2.5 : 1,
    });
    return new THREE.Line(lineGeometry, material);
  }, [lineGeometry, isHighlighted]);

  return (
    <group>
      {/* Route Arcing Line */}
      <primitive object={lineObject} />

      {/* Flowing Energy Particle Pulse */}
      <mesh position={beadPos}>
        <sphereGeometry args={[isHighlighted ? 0.06 : 0.04, 12, 12]} />
        <meshBasicMaterial color={isHighlighted ? "#ffffff" : "#fb7185"} />
      </mesh>
    </group>
  );
}

// Realistic Earth Sphere with Day Map, Normal Relief, Specular Ocean Mask & Clouds
function RealisticEarthMesh() {
  const [dayMap, normalMap, specularMap, cloudsMap] = useTexture([
    "/earth/earth_day.jpg",
    "/earth/earth_normal.jpg",
    "/earth/earth_specular.jpg",
    "/earth/earth_clouds.png",
  ]);

  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (cloudsRef.current) {
      // Subtle cloud drift relative to Earth surface
      cloudsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* 1. Base Earth Sphere (Realistic Continents & Oceans) */}
      <mesh receiveShadow castShadow>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(0.85, 0.85)}
          roughnessMap={specularMap}
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>

      {/* 2. Dynamic Atmosphere Cloud Layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[EARTH_RADIUS * 1.015, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Soft Atmospheric Fresnel Halo Glow */}
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS * 1.05, 32, 32]} />
        <meshBasicMaterial
          color="#fda4af"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function EarthNetworkScene({
  activeCardId,
  dragRotation,
  isDragging,
}: {
  activeCardId: string | null;
  dragRotation: React.MutableRefObject<{ x: number; y: number }>;
  isDragging: React.MutableRefObject<boolean>;
}) {
  const earthGroupRef = useRef<THREE.Group>(null);
  const [progress, setProgress] = useState(0);

  // Convert real geographic lat/long to 3D Cartesian coordinates
  const locationNodes = useMemo(() => {
    return SUPPORT_LOCATIONS.map((loc) => ({
      ...loc,
      pos: latLongToVector3(loc.lat, loc.lon, EARTH_RADIUS),
    }));
  }, []);

  const indiaHQ = locationNodes.find((n) => n.id === "india") || locationNodes[0];
  const internationalHubs = locationNodes.filter((n) => n.id !== "india");

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    setProgress((t * 0.3) % 1);

    if (earthGroupRef.current) {
      if (activeCardId && !isDragging.current) {
        // Find targeted location coordinates
        let targetNode = locationNodes.find((n) => n.id === activeCardId);

        if (!targetNode && activeCardId === "canada_australia") {
          targetNode = locationNodes.find((n) => n.id === "canada");
        }

        if (targetNode) {
          // Calculate rotation angle to center target node directly towards the camera
          const targetY = -Math.atan2(targetNode.pos.x, targetNode.pos.z) + Math.PI / 8;
          const targetX = Math.asin(targetNode.pos.y / EARTH_RADIUS) * 0.45;

          dragRotation.current.y = THREE.MathUtils.lerp(dragRotation.current.y, targetY, 0.05);
          dragRotation.current.x = THREE.MathUtils.lerp(dragRotation.current.x, targetX, 0.05);
        }
      }

      // Sync the Earth group orientation directly from the physics dragRotation ref
      earthGroupRef.current.rotation.y = dragRotation.current.y;
      earthGroupRef.current.rotation.x = dragRotation.current.x;
    }
  });

  return (
    <group ref={earthGroupRef}>
      {/* Realistic 3D Earth with Continents, Relief & Clouds */}
      <Suspense
        fallback={
          <mesh>
            <sphereGeometry args={[EARTH_RADIUS, 32, 32]} />
            <meshStandardMaterial color="#1e293b" wireframe />
          </mesh>
        }
      >
        <RealisticEarthMesh />
      </Suspense>

      {/* 3D Location Markers anchored on Earth's surface */}
      {locationNodes.map((loc) => {
        const isHighlighted =
          activeCardId === loc.id ||
          (activeCardId === "canada_australia" && (loc.id === "canada" || loc.id === "australia")) ||
          (activeCardId === "india" && loc.id === "india");

        return (
          <LocationMarker
            key={loc.id}
            location={loc}
            position={loc.pos}
            isHighlighted={!!isHighlighted}
          />
        );
      })}

      {/* 3D Curved Global Flight/Counseling Routes */}
      {internationalHubs.map((dest) => {
        const isHighlighted =
          activeCardId === dest.id ||
          (activeCardId === "canada_australia" && (dest.id === "canada" || dest.id === "australia")) ||
          activeCardId === "india";

        return (
          <GlobalRouteArc
            key={dest.id}
            start={indiaHQ.pos}
            end={dest.pos}
            isHighlighted={!!isHighlighted}
            progress={progress}
          />
        );
      })}

      {/* Surrounding Spatial Atmosphere Particles */}
      <Sparkles count={40} scale={[7.5, 7.5, 7.5]} size={1.8} speed={0.3} opacity={0.35} color="#fda4af" />
    </group>
  );
}

export default function GlobalNetworkCanvas({
  activeCardId = null,
  className = "h-[420px] sm:h-[480px] w-full",
}: {
  activeCardId?: string | null;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Physics Drag & Inertia state
  const dragRotation = useRef({ x: 0.12, y: 0.5 });
  const velocity = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const [cursorGrab, setCursorGrab] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation Frame Loop for Physical Inertia & Damping
  useEffect(() => {
    let animId: number;
    let running = true;

    const updatePhysics = () => {
      if (!running) return;

      if (!isDragging.current && !activeCardId) {
        // Apply smooth velocity damping
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;

        dragRotation.current.y += velocity.current.y;
        dragRotation.current.x = Math.max(
          -Math.PI / 2.5,
          Math.min(Math.PI / 2.5, dragRotation.current.x + velocity.current.x)
        );

        // Natural idle rotation when velocity settles
        if (Math.abs(velocity.current.x) < 0.0001 && Math.abs(velocity.current.y) < 0.0001) {
          dragRotation.current.y += 0.002;
        }
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
    };
  }, [activeCardId]);

  // Pointer Drag Handlers with PointerCapture for robust dragging without page scroll lock
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only drag on primary click or touch
    if (e.button !== 0 && e.pointerType === "mouse") return;

    isDragging.current = true;
    setCursorGrab(true);
    previousPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - previousPointer.current.x;
    const deltaY = e.clientY - previousPointer.current.y;
    previousPointer.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.0055;
    const rotDeltaY = deltaX * sensitivity;
    const rotDeltaX = deltaY * sensitivity;

    dragRotation.current.y += rotDeltaY;
    dragRotation.current.x = Math.max(
      -Math.PI / 2.5,
      Math.min(Math.PI / 2.5, dragRotation.current.x + rotDeltaX)
    );

    // Track momentary velocity for smooth inertia throw
    velocity.current = { x: rotDeltaX * 0.8, y: rotDeltaY * 0.8 };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    setCursorGrab(false);

    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  if (!mounted) {
    return (
      <div className={`relative ${className} flex items-center justify-center`}>
        <div className="h-48 w-48 rounded-full border-2 border-rose-300 bg-rose-50/60 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative ${className} ${
        cursorGrab ? "cursor-grabbing" : "cursor-grab"
      } touch-pan-y select-none`}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={1.2} />
        {/* Sun Direction Lighting (Day/Night Terminator Effect) */}
        <directionalLight position={[6, 5, 6]} intensity={2.2} color="#ffffff" castShadow />
        <pointLight position={[-6, -4, -4]} intensity={0.6} color="#e11d48" />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#fda4af" />

        <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
          <EarthNetworkScene
            activeCardId={activeCardId}
            dragRotation={dragRotation}
            isDragging={isDragging}
          />
        </Float>
      </Canvas>
    </div>
  );
}

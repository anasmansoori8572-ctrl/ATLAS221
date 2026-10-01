"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight, MapPin } from "lucide-react";

export interface CountryProfile {
  name: string;
  flag: string;
  description: string;
  image: string;
  lat: number;
  lon: number;
}

export const COUNTRIES_DATA: CountryProfile[] = [
  {
    name: "Canada",
    flag: "🇨🇦",
    description: "High-quality education, multicultural environment, global career opportunities.",
    image: "/assets/atlas/source-images/countries/Canada.png",
    lat: 56,
    lon: -106,
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    description: "Global recognition, cultural diversity, research opportunities, prestigious degrees.",
    image: "/assets/atlas/source-images/countries/uk.png",
    lat: 54,
    lon: -2,
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    description: "Scholarships, cultural experience, renowned institutions, global networking.",
    image: "/assets/atlas/source-images/countries/italy.png",
    lat: 42,
    lon: 12,
  },
  {
    name: "France",
    flag: "🇫🇷",
    description: "Scholarships, cultural experience, prestigious institutions, global networking, diverse programs.",
    image: "/assets/atlas/source-images/countries/france.png",
    lat: 46,
    lon: 2,
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    description: "High-quality education, low tuition, diverse programs, vibrant culture.",
    image: "/assets/atlas/source-images/countries/germany.png",
    lat: 51,
    lon: 10,
  },
  {
    name: "China",
    flag: "🇨🇳",
    description: "Affordable education, cultural immersion, diverse academic opportunities, global networking.",
    image: "/assets/atlas/source-images/countries/china.png",
    lat: 35,
    lon: 105,
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    description: "English-speaking hub, strong tech industry links, EU access, high graduate employability.",
    image: "/assets/atlas/source-images/countries/Ireland.png",
    lat: 53,
    lon: -8,
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    description: "World-class universities, safe environment, strategic Pacific gateway, strong job market.",
    image: "/assets/atlas/source-images/countries/Australia.png",
    lat: -25,
    lon: 133,
  },
  {
    name: "UAE",
    flag: "🇦🇪",
    description: "Modern campuses, tax-free earnings, multicultural hub, growing global university partnerships.",
    image: "/assets/atlas/source-images/countries/UAE.png",
    lat: 24,
    lon: 54,
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    description: "Internationally recognized degrees, scenic beauty, welcoming atmosphere, cultural diversity.",
    image: "/assets/atlas/source-images/countries/newzealand.png",
    lat: -41,
    lon: 174,
  },
  {
    name: "United States",
    flag: "🇺🇸",
    description: "Global recognition, diverse programs, research opportunities, cultural exposure.",
    image: "/assets/atlas/source-images/countries/USA.png",
    lat: 39,
    lon: -98,
  },
];

// --- World map backdrop -------------------------------------------------------
// /public/High-Resolution-World-Map.jpg is a standard equirectangular political map,
// but cropped tighter at the poles than a pure -90..90 projection, so the linear
// coefficients below are calibrated against visible country-label positions in that
// specific file rather than derived from a textbook projection formula.
function coordToPercent(lon: number, lat: number) {
  const x = 0.311 * lon + 46.2;
  const y = -0.607 * lat + 60.6;
  return { x, y };
}

function WorldMapBackdrop() {
  const pins = useMemo(
    () =>
      COUNTRIES_DATA.map((c) => ({
        name: c.name,
        flag: c.flag,
        ...coordToPercent(c.lon, c.lat),
      })).filter((p) => !(p.x >= 38 && p.x <= 58 && p.y >= 15 && p.y <= 48)),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <Image
        src="/High-Resolution-World-Map.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-[0.18] blur-[1px]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950" />

      {pins.map((pin) => (
        <div
          key={pin.name}
          className="group/pin absolute -translate-x-1/2 -translate-y-full transition-transform duration-300"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          {/* Subtle location point dot & pulse ring */}
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2.5 w-2.5 rounded-full bg-rose-500/40 animate-ping" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />

          {/* Professional Lucide MapPin with sharp tip and flag badge */}
          <div className="relative flex flex-col items-center">
            <div className="relative flex items-center justify-center drop-shadow-[0_4px_12px_rgba(244,63,94,0.6)]">
              <MapPin size={24} strokeWidth={2} className="text-rose-400 fill-slate-950/90" />
              <span className="absolute top-1 text-[10px]">
                {pin.flag}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const COUNT = COUNTRIES_DATA.length;
const AUTO_SPEED = 0.35; // slots per second (faster continuous 3D orbital loop)
const MAX_ROTATE = 68; // degrees turn at orbital edges

// Wraps a slot value into (-COUNT/2, COUNT/2] so the deck loops seamlessly in 3D.
function wrapSlot(value: number) {
  const half = COUNT / 2;
  let v = value;
  while (v > half) v -= COUNT;
  while (v <= -half) v += COUNT;
  return v;
}

function CountryCard({ country }: { country: CountryProfile }) {
  return (
    <div className="group relative flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-slate-900/80 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300">
      {/* Photo Slot (stock placeholder until real per-country photography is supplied) */}
      <div className="relative aspect-3/2 w-full shrink-0 overflow-hidden">
        <Image
          src={country.image}
          alt={country.name}
          fill
          sizes="(max-width: 768px) 90vw, 45vw"
          className="object-cover grayscale-[15%]"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-rose-950/45 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-slate-950/10" />

        {/* Circular Flag Badge */}
        <div className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/70 bg-white text-lg shadow-lg">
          {country.flag}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
        <h3 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">{country.name}</h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-slate-400 sm:text-sm">{country.description}</p>

        <button className="mt-auto inline-flex w-fit items-center gap-1.5 pt-1 text-[11px] font-bold uppercase tracking-wider text-rose-400 sm:text-xs">
          Explore Programs
          <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}

function CoverflowCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const radiusXRef = useRef(380);
  const radiusZRef = useRef(260);
  const cardWidthRef = useRef(230);
  const cardHeightRef = useRef(340);

  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const hoverPausedRef = useRef(false);
  const inViewRef = useRef(true);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateSpacing = () => {
      const w = viewport.clientWidth;
      // Calculate orbital radii and card dimensions responsive to screen size
      const radiusX = Math.min(720, Math.max(220, w * 0.36));
      const radiusZ = Math.min(320, Math.max(160, radiusX * 0.65));
      const cardWidth = Math.min(360, Math.max(210, w * 0.28));
      const cardHeight = cardWidth * (2 / 3) + 190;

      radiusXRef.current = radiusX;
      radiusZRef.current = radiusZ;
      cardWidthRef.current = cardWidth;
      cardHeightRef.current = cardHeight;
      viewport.style.height = `${cardHeight + 40}px`;
    };
    updateSpacing();

    const resizeObserver = new ResizeObserver(updateSpacing);
    resizeObserver.observe(viewport);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(viewport);

    const render = () => {
      const radiusX = radiusXRef.current;
      const radiusZ = radiusZRef.current;
      const width = cardWidthRef.current;
      const height = cardHeightRef.current;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        // Map slot position to orbital angle theta in [-PI, PI]
        const raw = wrapSlot(i + progressRef.current);
        const theta = (raw / COUNT) * 2 * Math.PI;

        // Elliptical 3D track positions
        const translateX = radiusX * Math.sin(theta);
        const translateZ = radiusZ * (Math.cos(theta) - 1);

        // Dynamic 3D rotation turning cards back into depth as they move off-center
        const rotateY = Math.sin(theta) * MAX_ROTATE;

        // Depth scale and depth-driven z-index stacking
        const cosFactor = (Math.cos(theta) + 1) / 2; // 1.0 at front, 0.0 at back
        const scale = 0.58 + 0.42 * cosFactor;
        const opacity = 0.28 + 0.72 * cosFactor;
        const zIndex = Math.round(cosFactor * 100) + 10;

        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(Math.max(0, opacity));
        el.style.zIndex = String(zIndex);
      });
    };

    const onTick = (_time: number, deltaTime: number) => {
      if (!draggingRef.current && !hoverPausedRef.current && inViewRef.current) {
        progressRef.current += (deltaTime / 1000) * AUTO_SPEED;
      }
      render();
    };

    gsap.ticker.add(onTick);
    render();

    return () => {
      gsap.ticker.remove(onTick);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onPointerEnter = () => {
      hoverPausedRef.current = true;
    };

    const onPointerLeaveHover = () => {
      hoverPausedRef.current = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      hoverPausedRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartProgressRef.current = progressRef.current;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      // Convert drag pixel delta to orbital progress units
      progressRef.current = dragStartProgressRef.current + (dx / radiusXRef.current) * 1.8;
    };

    const endDrag = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // pointer already released
      }
    };

    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointerleave", onPointerLeaveHover);
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointerleave", endDrag);

    return () => {
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointerleave", onPointerLeaveHover);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointerleave", endDrag);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="relative h-90 w-full cursor-grab touch-pan-y select-none overflow-hidden sm:h-100"
      style={{ perspective: "1500px" }}
    >
      {COUNTRIES_DATA.map((country, i) => (
        <div
          key={country.name}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ willChange: "transform, opacity" }}
        >
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
}

function ParticleField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="!absolute inset-0"
    >
      <Sparkles count={120} scale={[16, 9, 6]} size={1} speed={0.12} opacity={0.35} color="#fbcfe8" />
    </Canvas>
  );
}

export default function CountriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".countries-reveal", {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="countries-section"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-950 via-[#150a14] to-slate-950 py-24"
    >
      {/* Ambient Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[460px] w-[460px] rounded-full bg-rose-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[460px] w-[460px] rounded-full bg-pink-600/10 blur-[130px]" />

      <WorldMapBackdrop />
      <ParticleField />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 md:px-10 lg:px-16">
        {/* Section Heading */}
        <div className="countries-reveal max-w-2xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-400" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-300">
              Countries We Offer
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-400" />
          </div>

          <h2 className="mt-5 text-2xl font-medium text-slate-300 sm:text-3xl">Abroad Scholarships</h2>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Best Countries For Education
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="font-serif text-4xl italic text-rose-500 sm:text-5xl">Education</span>
            <ArrowDownRight size={28} className="mt-3 text-rose-500" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      <div className="countries-reveal relative mx-auto w-full max-w-[1900px] px-4 sm:px-8">
        <CoverflowCarousel />
      </div>
    </section>
  );
}

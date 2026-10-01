"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Award,
  Globe2,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Compass,
  Plane,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FLAG_HUBS = ["🇬🇧", "🇺🇸", "🇨🇦", "🇦🇺", "🇮🇪", "🇩🇪", "🇫🇷", "🇳🇿"];

function ParticleField() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      className="!absolute inset-0"
    >
      <Sparkles count={100} scale={[14, 10, 6]} size={1} speed={0.12} opacity={0.3} color="#fbcfe8" />
    </Canvas>
  );
}

function BentoCard({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: (-y / (rect.height / 2)) * 5, y: (x / (rect.width / 2)) * 5 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
          hovered ? "translateY(-4px) scale(1.015)" : "scale(1)"
        }`,
      }}
      className={cn(
        "group relative overflow-hidden rounded-[28px] border transition-transform duration-300",
        dark
          ? "border-rose-900/40 bg-linear-to-br from-slate-950 via-slate-900 to-rose-950 text-white shadow-[0_20px_45px_-15px_rgba(190,24,93,0.5)]"
          : "border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-[0_15px_35px_rgba(15,23,42,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(225,29,72,0.18)] hover:border-rose-200",
        className
      )}
    >
      {children}
    </div>
  );
}

function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(counter.val).toLocaleString();
      },
    });
  }, [value]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

function ProgressRing({ value }: { value: number }) {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ringRef.current || !labelRef.current) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: value,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ringRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        const v = counter.val;
        ringRef.current?.style.setProperty(
          "background",
          `conic-gradient(#e11d48 ${v * 3.6}deg, #fce7f3 0deg)`
        );
        if (labelRef.current) labelRef.current.textContent = `${Math.round(v)}%`;
      },
    });
  }, [value]);

  return (
    <div ref={ringRef} className="relative h-14 w-14 shrink-0 rounded-full sm:h-16 sm:w-16">
      <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-white">
        <span ref={labelRef} className="text-xs font-extrabold text-rose-600 sm:text-sm">
          0%
        </span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
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

      gsap.to(".about-float-icon", {
        y: "-=14",
        rotation: 6,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.6,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24 px-6 md:px-10 lg:px-16"
    >
      {/* Background Soft Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-rose-200/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-pink-200/20 blur-[130px]" />

      <ParticleField />

      {/* Ambient Floating Accent Icons */}
      <Compass className="about-float-icon pointer-events-none absolute right-[8%] top-[12%] hidden h-10 w-10 text-rose-300/40 lg:block" strokeWidth={1.25} />
      <Plane className="about-float-icon pointer-events-none absolute left-[6%] bottom-[16%] hidden h-8 w-8 -rotate-12 text-pink-300/40 lg:block" strokeWidth={1.25} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-14">
        {/* LEFT: Interactive Bento Stat Grid */}
        <div className="about-reveal grid grid-cols-2 gap-5">
          {/* Hero Stat: Years of Experience */}
          <BentoCard dark className="col-span-2 p-7 sm:p-9">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(244,114,182,0.9) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative z-10 flex items-center justify-between gap-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30">
                  <Award size={20} strokeWidth={2} />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-rose-300">
                  Reliable Service
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Trusted study-abroad guidance since 2010.
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center justify-center rounded-full border border-rose-400/25 bg-rose-950/40 px-6 py-5 text-center shadow-[0_0_40px_-8px_rgba(244,63,94,0.5)]">
                <CountUp
                  value={14}
                  suffix="+"
                  className="bg-linear-to-r from-white via-rose-200 to-pink-300 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl"
                />
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-rose-200/80">
                  Years Experienced
                </span>
              </div>
            </div>
          </BentoCard>

          {/* Countries Reach */}
          <BentoCard className="flex flex-col justify-between p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
              <Globe2 size={20} strokeWidth={2} />
            </div>
            <div className="mt-4">
              <CountUp value={25} suffix="+" className="text-2xl font-extrabold text-slate-900" />
              <p className="text-xs font-semibold text-slate-500">Countries Reached</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {FLAG_HUBS.map((flag) => (
                <span
                  key={flag}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 text-xs ring-1 ring-slate-100 transition-transform duration-200 group-hover:scale-105"
                >
                  {flag}
                </span>
              ))}
              <span className="flex h-6 items-center rounded-full bg-rose-50 px-1.5 text-[9px] font-bold text-rose-600">
                +17
              </span>
            </div>
          </BentoCard>

          {/* Students Guided */}
          <BentoCard className="flex flex-col justify-between p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
              <GraduationCap size={20} strokeWidth={2} />
            </div>
            <div className="mt-4">
              <CountUp value={10} suffix="k+" className="text-2xl font-extrabold text-slate-900" />
              <p className="text-xs font-semibold text-slate-500">Students Guided</p>
            </div>
            <div className="mt-4 flex items-end gap-1">
              {[40, 65, 50, 85, 70, 95].map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-full bg-linear-to-t from-rose-500 to-pink-400 transition-all duration-500 group-hover:from-rose-600 group-hover:to-pink-300"
                  style={{ height: `${h * 0.28}px` }}
                />
              ))}
            </div>
          </BentoCard>

          {/* Visa Success Ring */}
          <BentoCard className="col-span-2 flex items-center gap-5 p-6">
            <ProgressRing value={98} />
            <div className="flex flex-1 items-center justify-between gap-4">
              <div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                  <ShieldCheck size={16} strokeWidth={2} />
                </div>
                <p className="mt-2 text-sm font-bold text-slate-900">Visa Success Rate</p>
                <p className="text-xs text-slate-500">Backed by documentation experts</p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-600 ring-1 ring-emerald-100 sm:inline-flex">
                Verified
              </span>
            </div>
          </BentoCard>
        </div>

        {/* RIGHT: Narrative Copy */}
        <div className="flex flex-col items-start gap-6">
          <div className="about-reveal inline-flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              About Atlas Study
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
          </div>

          <h2 className="about-reveal text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Reliable Guidance,
            <br />
            <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
              Trusted Since 2010
            </span>
          </h2>

          <p className="about-reveal text-base leading-relaxed text-slate-600 sm:text-lg">
            Atlas is one of the leading study-abroad consultancies in international
            education services. Our aim is to reduce the high cost of education by
            focusing on securing the maximum scholarships for meritorious students.
          </p>

          <p className="about-reveal text-base leading-relaxed text-slate-600 sm:text-lg">
            Our extensive network of approachable experts helps you identify and
            secure the right university, course, and country. Over a decade of
            experience, combined with the latest technology, turns your ambition to
            study abroad into a clear launchpad for academic and professional success.
          </p>

          <div className="about-reveal flex flex-wrap gap-4 pt-2">
            <button className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_-5px_rgba(225,29,72,0.45)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_35px_-5px_rgba(219,39,119,0.55)]">
              More Details
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button className="rounded-full border border-slate-900/15 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-900/25 hover:bg-slate-50">
              Book Free Counseling
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  PhoneCall,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import AirplaneCanvas from "@/components/canvas/AirplaneCanvas";

export interface TestPrepProgram {
  id: string;
  title: string;
  badge: string;
  image: string;
  duration: string;
  targetScore: string;
  highlights: string[];
  color: string;
}

export const TEST_PREP_DATA: TestPrepProgram[] = [
  {
    id: "ielts",
    title: "IELTS Classes",
    badge: "IELTS™",
    image: "/assets/atlas/source-images/test-prep/IELTS.jpg",
    duration: "4 - 8 Weeks",
    targetScore: "Band 7.5+",
    highlights: ["1-on-1 Speaking Practice", "Unlimited Mock Tests"],
    color: "#e11d48",
  },
  {
    id: "toefl",
    title: "TOEFL Classes",
    badge: "ETS TOEFL",
    image: "/assets/atlas/source-images/test-prep/TOEFL.jpg",
    duration: "4 - 6 Weeks",
    targetScore: "100+ Score",
    highlights: ["Official ETS Material", "Certified Instructors"],
    color: "#2563eb",
  },
  {
    id: "pte",
    title: "PTE Classes",
    badge: "Pearson PTE",
    image: "/assets/atlas/source-images/test-prep/PTE.jpg",
    duration: "3 - 6 Weeks",
    targetScore: "79+ Score",
    highlights: ["AI Scoring System", "Computer Mock Labs"],
    color: "#0284c7",
  },
  {
    id: "sat",
    title: "SAT Classes",
    badge: "SAT®",
    image: "/assets/atlas/source-images/test-prep/SAT.jpg",
    duration: "8 - 12 Weeks",
    targetScore: "Math & Verbal Drills",
    highlights: ["Math & Verbal Drills", "Top Ivy League Mentors"],
    color: "#be185d",
  },
];

function TestPrepCard({ program }: { program: TestPrepProgram }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = (- (y - rect.height / 2) / (rect.height / 2)) * 7;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 7;
    
    setTilt({ x: rotateX, y: rotateY });
    setMousePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] border border-slate-200/90 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-all duration-300 hover:border-rose-300/90 hover:shadow-[0_30px_70px_-12px_rgba(225,29,72,0.28)]"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
          isHovered ? "translateY(-6px) scale(1.02)" : "scale(1)"
        }`,
      }}
    >
      {/* Interactive Radial Spotlight Follower */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[30px] z-10"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(244,63,94,0.12), transparent 40%)`,
        }}
      />

      {/* Top Animated Laser Gradient Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-rose-600 via-pink-500 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20" />

      {/* Photo Container */}
      <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100">
        <Image
          src={program.image}
          alt={program.title}
          fill
          sizes="(max-width: 768px) 100vw, 30vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Ambient Vignette & Shimmer */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-black/15" />

        {/* Floating Brand Crest Badge */}
        <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-xs font-black text-slate-900 shadow-md backdrop-blur-md transition-transform duration-300 group-hover:translate-y-[-2px]">
          <ShieldCheck size={14} className="text-rose-600" />
          <span>{program.badge}</span>
        </div>

        {/* Target Score Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full border border-white/40 bg-slate-900/90 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-rose-400/60">
          <Award size={14} className="text-rose-400" />
          <span>{program.targetScore}</span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 relative z-20">
        <div>
          {/* Title & Duration Badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl transition-colors duration-200 group-hover:text-rose-600">
              {program.title}
            </h3>
            <span className="flex items-center gap-1 rounded-lg border border-rose-100 bg-rose-50/90 px-2.5 py-1 text-[11px] font-bold text-rose-700 shrink-0 shadow-2xs">
              <Clock size={12} className="text-rose-500" />
              {program.duration}
            </span>
          </div>

          {/* Highlights List with Micro Animations */}
          <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-slate-100">
            {program.highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 group/item">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 transition-transform duration-300 group-hover/item:scale-125 group-hover/item:text-emerald-400" />
                <span className="transition-colors group-hover/item:text-slate-900">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liquid Shimmer Action CTA Button */}
        <div className="mt-6">
          <button className="w-full relative overflow-hidden inline-flex items-center justify-between rounded-xl bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 px-5 py-3 text-xs font-extrabold text-white shadow-[0_10px_25px_rgba(225,29,72,0.3)] transition-all duration-300 group-hover:shadow-[0_15px_35px_rgba(225,29,72,0.5)] group-hover:scale-[1.02] active:scale-98">
            {/* Liquid Shimmer Effect Line */}
            <span className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-[300%]" />
            <span className="relative z-10">Explore Program</span>
            <ArrowUpRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function HelixArcGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = TEST_PREP_DATA.length;

  // Auto-running continuous animated card loop
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, count]);

  return (
    <div className="relative w-full py-6 flex flex-col items-center">
      {/* 3D Arc Viewport Container with Wide Breathing Room for Front Active Card */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative h-[540px] sm:h-[580px] w-full max-w-6xl overflow-hidden cursor-grab touch-pan-y select-none"
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {TEST_PREP_DATA.map((program, i) => {
          let offset = i - activeIndex;
          if (offset < -1) offset += count;
          if (offset > 2) offset -= count;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          const angle = offset * 0.52; // Wider arc spread so front card is 100% clear & uncluttered!

          const translateX = Math.sin(angle) * 450;
          const translateZ = (Math.cos(angle) - 1) * 260;
          const rotateY = ((angle * 180) / Math.PI) * 0.65;
          const scale = isCenter ? 1.05 : Math.max(0.72, 1 - absOffset * 0.16);
          const opacity = isCenter ? 1 : Math.max(0.4, 1 - absOffset * 0.4);
          const blur = isCenter ? "none" : absOffset > 1.2 ? "blur(2px)" : "blur(1px)";
          const zIndex = isCenter ? 100 : Math.round(40 - absOffset * 15);

          return (
            <div
              key={program.id}
              onClick={() => setActiveIndex(i)}
              className="absolute left-1/2 top-1/2 w-[320px] sm:w-[350px] transition-all duration-800 ease-out cursor-pointer"
              style={{
                transform: `translate(-50%, -50%) translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                filter: blur,
                zIndex,
                willChange: "transform, opacity, filter",
              }}
            >
              <TestPrepCard program={program} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TestPrepSection() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/20 to-white py-24 px-6 md:px-10 lg:px-16">
      {/* Background Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl flex flex-col gap-20">
        {/* ================= TOP SECTION: HELIX ARC 3D GALLERY ================= */}
        <div>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  Test Preparation
                </span>
                <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                <span className="text-slate-900">Highly Qualified & </span>
                <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Experienced Trainers
                </span>
              </h2>
            </div>

            <button className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-xs transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 shrink-0">
              VIEW MORE
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* HelixArc Auto-Running 3D Gallery Viewport */}
          <div className="mt-4">
            <HelixArcGallery />
          </div>
        </div>

        {/* ================= BOTTOM SECTION: DREAM DESTINATION 3D BANNER ================= */}
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-r from-[#0b1329] via-[#141e38] to-[#0f172a] shadow-[0_30px_70px_rgba(0,0,0,0.35)] text-white">
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-rose-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-blue-500/15 blur-[100px]" />

          <div className="grid grid-cols-1 items-center lg:grid-cols-12">
            {/* Left Traveler Image */}
            <div className="relative h-[340px] sm:h-[400px] lg:h-full lg:col-span-5 overflow-hidden">
              <Image
                src="/testprep/traveler.png"
                alt="Study in Your Dream Destination"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0b1329] via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-[#0b1329]" />

              {/* Passport Verified Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/80 px-4 py-1.5 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>100% Visa Guidance</span>
              </div>
            </div>

            {/* Right Banner Content & 3D Airplane Canvas */}
            <div className="relative flex flex-col justify-center p-8 sm:p-12 lg:col-span-7 lg:p-16">
              {/* 3D Airplane Canvas Container */}
              <div className="pointer-events-none absolute right-4 top-4 h-56 w-56 sm:h-72 sm:w-72 opacity-90">
                <AirplaneCanvas />
              </div>

              <div className="relative z-10 max-w-xl">
                <h3 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Study in Your Dream Destination
                </h3>
                <p className="mt-3 text-sm text-slate-300 sm:text-base font-normal">
                  Everything from University application to Visa guidance
                </p>

                {/* Outcome Checkmarks */}
                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={18} className="text-rose-500 shrink-0" />
                    <span>University Shortlisting & Profile Building</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={18} className="text-rose-500 shrink-0" />
                    <span>Visa Process & Financial Documentation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                    <CheckCircle2 size={18} className="text-rose-500 shrink-0" />
                    <span>Scholarships & Pre-Departure Briefings</span>
                  </div>
                </div>

                {/* Contact Us CTA Button */}
                <div className="mt-10">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2.5 rounded-full bg-rose-600 px-7 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(225,29,72,0.35)] transition-all duration-300 hover:bg-rose-700 hover:scale-105 active:scale-95"
                  >
                    <PhoneCall size={16} />
                    CONTACT US NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

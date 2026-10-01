"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GraduationCapCanvas from "@/components/canvas/GraduationCapCanvas";
import JourneyDieCanvas from "@/components/canvas/JourneyDieCanvas";
import { JOURNEY_CARDS_DATA } from "@/components/sections/JourneyCards";

gsap.registerPlugin(ScrollTrigger);

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-rose-400/20 blur-xs"
          style={{
            width: `${(i % 4) * 4 + 4}px`,
            height: `${(i % 4) * 4 + 4}px`,
            top: `${(i * 17) % 100}%`,
            left: `${(i * 23) % 100}%`,
            animation: `pulse ${(i % 3) + 2}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingIcons() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[8%] top-[18%] h-14 w-14 rounded-2xl border border-rose-200/50 bg-white/70 p-3 shadow-lg backdrop-blur-md transition-transform duration-700 hover:rotate-6">
        <span className="text-2xl">🎓</span>
      </div>
      <div className="absolute right-[10%] top-[25%] h-14 w-14 rounded-2xl border border-rose-200/50 bg-white/70 p-3 shadow-lg backdrop-blur-md transition-transform duration-700 hover:-rotate-6">
        <span className="text-2xl">✈️</span>
      </div>
      <div className="absolute left-[12%] bottom-[20%] h-14 w-14 rounded-2xl border border-rose-200/50 bg-white/70 p-3 shadow-lg backdrop-blur-md transition-transform duration-700 hover:scale-110">
        <span className="text-2xl">🌍</span>
      </div>
      <div className="absolute right-[8%] bottom-[22%] h-14 w-14 rounded-2xl border border-rose-200/50 bg-white/70 p-3 shadow-lg backdrop-blur-md transition-transform duration-700 hover:scale-110">
        <span className="text-2xl">🏛️</span>
      </div>
    </div>
  );
}

function MobileCardsList() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {JOURNEY_CARDS_DATA.map((card) => {
        const IconComponent = card.Icon;
        return (
          <div
            key={card.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider">
                Step {card.stepNumber}
              </span>
              <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-[10px] font-bold text-rose-600">
                {card.tag}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <IconComponent size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
            </div>

            <p className="text-xs leading-relaxed text-slate-600">{card.description}</p>
            <div className="text-[11px] font-semibold text-emerald-600">{card.highlight}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) return;

      const section = sectionRef.current;
      if (!section) return;

      const totalCards = JOURNEY_CARDS_DATA.length;

      // Pinned GSAP ScrollTrigger Timeline for 3D Die Rotation
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${totalCards * 85}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              totalCards - 1,
              Math.floor(self.progress * totalCards)
            );
            setActiveIndex(idx);
          },
        },
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(refreshTimer);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="journey-section"
      className="relative min-h-screen w-full overflow-hidden bg-linear-to-b from-white via-rose-50/60 to-white"
    >
      {/* Background Soft Glow Effects */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-rose-200/25 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[460px] w-[460px] rounded-full bg-pink-200/25 blur-[110px]" />

      <ParticleField />
      <FloatingIcons />

      <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-16 md:px-10 lg:px-16">
        {/* Section Heading Area */}
        <div className="max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Welcome to Atlas Study
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            A One-Stop Solution For All
          </h2>
          <h2 className="text-3xl font-bold leading-tight tracking-tight bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent sm:text-5xl lg:text-6xl">
            Your Study Abroad Needs
          </h2>
        </div>

        {/* Section Main Grid Layout */}
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:gap-12 md:grid-cols-2">
          {/* LEFT COLUMN: 3D Graduation Cap Model */}
          <div className="relative h-120 md:h-150">
            <GraduationCapCanvas activeStepIndex={activeIndex} />
          </div>

          {/* RIGHT COLUMN: 3D Die Canvas View ONLY */}
          <div className="hidden md:flex w-full justify-center md:justify-start">
            <div className="relative h-[520px] sm:h-[600px] w-full max-w-[640px]">
              <JourneyDieCanvas activeStepIndex={activeIndex} />
            </div>
          </div>

          {/* MOBILE LIST LAYOUT (< md) */}
          <div className="block md:hidden w-full">
            <MobileCardsList />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white to-transparent" />
    </section>
  );
}

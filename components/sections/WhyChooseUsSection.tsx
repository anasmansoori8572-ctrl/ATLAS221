"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Send, MessagesSquare, Globe2, Wallet, ChevronRight, type LucideIcon } from "lucide-react";

interface ChooseUsFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: ChooseUsFeature[] = [
  {
    icon: Send,
    title: "Fast Offer Letters",
    description: "Streamlined applications get you a confirmed university offer in record time.",
  },
  {
    icon: MessagesSquare,
    title: "University Interview",
    description: "Mock sessions and expert coaching before every real admissions interview.",
  },
  {
    icon: Globe2,
    title: "Visa Assistance",
    description: "End-to-end documentation support for a smooth, stress-free visa approval.",
  },
  {
    icon: Wallet,
    title: "Cost-Effective",
    description: "Transparent pricing with no hidden fees anywhere in the counselling process.",
  },
];

function ChooseUsCard({ feature }: { feature: ChooseUsFeature }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (-(y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

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
      className="group relative flex flex-col gap-4"
      style={{ perspective: "800px" }}
    >
      <div
        className="relative flex flex-col gap-4"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? "none" : "transform 0.4s ease-out",
        }}
      >
        {/* Cursor-follow spotlight, sits flat on the card plane */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(220px circle at ${mousePos.x}% ${mousePos.y}%, rgba(225,29,72,0.1), transparent 60%)`,
          }}
        />

        {/* Icon sits highest above the card plane, so it visibly separates from the text as the card tilts */}
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-[0_10px_25px_-8px_rgba(225,29,72,0.35)] transition-transform duration-300 group-hover:-translate-y-1"
          style={{ transform: "translateZ(46px)" }}
        >
          <Icon size={26} strokeWidth={1.75} />
        </div>

        <div style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-lg font-bold text-slate-900">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{feature.description}</p>
        </div>

        <button
          type="button"
          aria-label={`Learn more about ${feature.title}`}
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-rose-600"
          style={{ transform: "translateZ(20px)" }}
        >
          <span className="flex items-center gap-0.5">
            <span className="h-1 w-1 rounded-full bg-rose-600" />
            <span className="h-1 w-1 rounded-full bg-rose-600" />
            <span className="h-1 w-1 rounded-full bg-rose-600" />
          </span>
          <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export default function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".choose-us-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".choose-us-card", {
        rotateX: 28,
        opacity: 0,
        transformOrigin: "top center",
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/20 to-white py-24 px-6 md:px-10 lg:px-16"
    >
      {/* Background Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-[120px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center">
        {/* Section Header */}
        <div className="choose-us-reveal flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Why Choose Us
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
          </div>
          <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="text-slate-900">One-to-One Counselling </span>
            <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
              Services for Our Students
            </span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div
          className="mt-16 grid w-full grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200"
          style={{ perspective: "1200px" }}
        >
          {FEATURES.map((feature) => (
            <div key={feature.title} className="choose-us-card lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <ChooseUsCard feature={feature} />
            </div>
          ))}
        </div>

        <div className="choose-us-reveal mt-16 h-px w-full bg-slate-200" />
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import {
  ClipboardCheck,
  Globe2,
  BookOpen,
  Home,
  Award,
  GraduationCap,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

export interface JourneyCardItem {
  id: string;
  stepNumber: string;
  tag: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  highlight: string;
}

export const JOURNEY_CARDS_DATA: JourneyCardItem[] = [
  {
    id: "application",
    stepNumber: "01",
    tag: "APPLY",
    Icon: ClipboardCheck,
    title: "Application",
    description:
      "End-to-end guidance for crafting winning Statements of Purpose (SOPs), Letters of Recommendation (LORs), resume editing, and error-free form submissions.",
    cta: "READY TO REPORT",
    highlight: "✓ 98.4% Acceptance Rate",
  },
  {
    id: "visa",
    stepNumber: "02",
    tag: "APPLY",
    Icon: Globe2,
    title: "Visa Process",
    description:
      "Complete visa documentation support, financial proof verification, and 1-on-1 mock interview preparation with experienced immigration counselors.",
    cta: "ONLINE SERVICES",
    highlight: "✓ 1-on-1 Mock Interviews",
  },
  {
    id: "testprep",
    stepNumber: "03",
    tag: "APPLY",
    Icon: BookOpen,
    title: "Test Preparation",
    description:
      "Comprehensive coaching for IELTS, TOEFL, GRE, GMAT, and SAT with certified trainers, mock tests, and personalized performance feedback.",
    cta: "WHAT YOU NEED",
    highlight: "✓ Certified Top Trainers",
  },
  {
    id: "accommodation",
    stepNumber: "04",
    tag: "APPLY",
    Icon: Home,
    title: "Accommodation",
    description:
      "Pre-departure briefings, verified student accommodation booking near campus, flight booking assistance, and active alumni network connections.",
    cta: "ONLINE SERVICES",
    highlight: "✓ Verified Safe Stays",
  },
  {
    id: "scholarships",
    stepNumber: "05",
    tag: "APPLY",
    Icon: Award,
    title: "Top Scholarships",
    description:
      "Access merit-based, institutional, and government scholarship opportunities to reduce tuition fees and lower the overall cost of study abroad.",
    cta: "ONLINE SERVICES",
    highlight: "✓ $5M+ Aid Secured",
  },
  {
    id: "shortlisting",
    stepNumber: "06",
    tag: "APPLY",
    Icon: GraduationCap,
    title: "University Shortlisting",
    description:
      "Personalized profiling to match your academic background, career goals, and budget with top global universities in the US, UK, Canada, Australia, and Europe.",
    cta: "WHAT YOU NEED",
    highlight: "✓ 500+ Top Partner Unis",
  },
];

export function CardContent({
  card,
  isActive = true,
}: {
  card: JourneyCardItem;
  isActive?: boolean;
}) {
  const { tag, Icon, title, description, cta, highlight } = card;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] border p-7 sm:p-8 transition-all duration-300 ${
        isActive
          ? "border-slate-200 bg-[#f4f4f6] shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl"
          : "border-slate-200 bg-[#f4f4f6]/80 shadow-md backdrop-blur-md opacity-50"
      }`}
      style={{
        transform: isActive
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
              isHovered ? "translateY(-6px) scale(1.015)" : "scale(1)"
            }`
          : undefined,
      }}
    >
      {/* Top Header Row: Icon Container & Red APPLY Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-slate-300 bg-white text-slate-800 shadow-xs">
            <Icon size={26} strokeWidth={2} />
            <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
              ✓
            </span>
          </div>
        </div>

        {/* APPLY Red Pill Badge */}
        <div className="rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs">
          {tag}
        </div>
      </div>

      {/* Card Middle: Title & Description */}
      <div className="relative z-10 my-4">
        <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight transition-colors group-hover:text-rose-600">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base font-normal">
          {description}
        </p>
      </div>

      {/* Card Bottom: White CTA Button */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-2.5 py-1">
          <span>{highlight}</span>
        </div>

        <button className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-rose-600 border border-slate-200 shadow-xs transition-all duration-300 hover:bg-rose-50 hover:scale-105 active:scale-95">
          <span className="relative z-10">{cta}</span>
          <ChevronRight
            size={14}
            className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

export default function MobileCardsList() {
  return (
    <div className="flex w-full flex-col gap-6">
      {JOURNEY_CARDS_DATA.map((card) => (
        <div key={card.title} className="w-full min-h-[300px]">
          <CardContent card={card} isActive={true} />
        </div>
      ))}
    </div>
  );
}

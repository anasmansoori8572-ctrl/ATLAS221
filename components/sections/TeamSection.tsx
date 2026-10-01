"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Mail, Sparkles, Award } from "lucide-react";
import TeamCanvas from "@/components/canvas/TeamCanvas";

function LinkedinIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  email: string;
  metrics: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mr. Rakim Sultan",
    role: "FOUNDER & MANAGING DIRECTOR",
    image: "/assets/atlas/source-images/team/rakim.jpg",
    bio: "Pioneering international education consultancy with 15+ years of strategic leadership and global university partnerships.",
    linkedin: "https://linkedin.com",
    email: "mailto:rakim@atlasstudy.com",
    metrics: ["15+ Yrs Leadership", "500+ Partner Unis", "10k+ Visas Secured"],
  },
  {
    name: "Mr. Zaid Sultan",
    role: "DIRECTOR UNIVERSITY RELATIONS",
    image: "/assets/atlas/source-images/team/Zaid.png",
    bio: "Spearheading global university alliances, institutional scholarships, and direct admissions channels across US, UK, Canada & Europe.",
    linkedin: "https://linkedin.com",
    email: "mailto:zaid@atlasstudy.com",
    metrics: ["Global Uni Alliances", "$5M+ Aid Secured", "Direct Admissions"],
  },
  {
    name: "Mr. Abdul Ali",
    role: "HEAD STUDENT RECRUITER",
    image: "/assets/atlas/source-images/team/ali.jpeg",
    bio: "Leading student profile evaluation, SOP/LOR mentoring, and personalized university roadmapping for top global institutions.",
    linkedin: "https://linkedin.com",
    email: "mailto:abdul@atlasstudy.com",
    metrics: ["Top SOP Mentorship", "98% Acceptance Rate", "Personalized Counseling"],
  },
];

function TeamCard({ member }: { member: TeamMember }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY });
    setGlarePos({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="team-card-reveal group relative flex h-[520px] w-full flex-col justify-end overflow-visible pt-16 transition-all duration-300"
      style={{
        perspective: "1000px",
      }}
    >
      {/* 3D TILTED CHASSIS CONTAINER */}
      <div
        className="relative flex flex-1 flex-col justify-between overflow-visible rounded-[32px] border border-slate-200/90 bg-linear-to-b from-white/90 via-rose-50/40 to-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-200 group-hover:border-rose-300 group-hover:shadow-[0_30px_70px_rgba(225,29,72,0.14)]"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
            isHovered ? "translateY(-8px) scale(1.02)" : "scale(1)"
          }`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Specular Holographic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)`,
          }}
        />

        {/* Ambient Radial Backlight Glow behind Subject (softens cutout edges & preserves Zaid's ear) */}
        <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-linear-to-b from-rose-400/25 via-pink-400/15 to-transparent blur-2xl transition-all duration-500 group-hover:scale-125" />

        {/* LAYER 2: 3D POP-OUT SUBJECT (Extends above top card boundary into real space) */}
        <div
          className="pointer-events-none absolute -top-16 inset-x-0 h-[300px] z-20 flex items-end justify-center transition-transform duration-300"
          style={{
            transform: `translateZ(45px) ${isHovered ? "scale(1.05) translateY(-4px)" : "scale(1)"}`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative h-full w-full max-w-[280px]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-contain object-bottom drop-shadow-[0_15px_25px_rgba(15,23,42,0.25)] transition-transform duration-500 group-hover:drop-shadow-[0_25px_35px_rgba(225,29,72,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Floating Quick Action Glass Badges (LinkedIn & Email) */}
        <div
          className="absolute left-4 top-6 flex flex-col gap-2 z-30 transition-transform duration-300"
          style={{ transform: "translateZ(60px)" }}
        >
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group/icon flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600/90 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-rose-600 hover:scale-110 active:scale-95"
            title="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={member.email}
            className="group/icon flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600/90 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-rose-600 hover:scale-110 active:scale-95"
            title="Send Email"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Quick Achievement Pill (Top Right) */}
        <div
          className="absolute top-6 right-4 z-30 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[11px] font-bold text-slate-800 shadow-xs backdrop-blur-md transition-transform duration-300"
          style={{ transform: "translateZ(60px)" }}
        >
          <Sparkles size={12} className="text-rose-600" />
          <span>Expert Leader</span>
        </div>

        {/* LAYER 3: FLOATING UI & DESIGNATION PLANE (Bottom Section) */}
        <div
          className="relative z-30 flex flex-col justify-end pt-[220px] transition-transform duration-300"
          style={{ transform: "translateZ(65px)" }}
        >
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 sm:text-2xl tracking-tight transition-colors group-hover:text-rose-600">
              {member.name}
            </h3>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-rose-600">
              {member.role}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 font-normal line-clamp-2">
              {member.bio}
            </p>
          </div>

          {/* Bottom Metrics Pill Tags */}
          <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80">
            {member.metrics.map((metric) => (
              <span
                key={metric}
                className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-100"
              >
                <Award size={11} className="text-rose-500" />
                {metric}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.fromTo(
        ".team-card-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="team-section"
      className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white py-24 px-6 md:px-10 lg:px-16"
    >
      {/* Background Soft Glow Effects */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[460px] w-[460px] rounded-full bg-pink-200/20 blur-[120px]" />

      <TeamCanvas />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Expert Team Members
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-slate-900">Our Team </span>
            <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
              at Your Service
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-2xl">
            Dedicated international education leaders and admissions advisors committed to guiding your study abroad journey from profile building to campus arrival.
          </p>
        </div>

        {/* 3D Spatial Grid Container */}
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-3 lg:gap-10 pt-10">
          {TEAM_MEMBERS.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

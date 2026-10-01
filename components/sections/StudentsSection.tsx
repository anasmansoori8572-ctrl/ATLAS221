"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowDownRight, Building2, Sparkles, Quote, RotateCcw } from "lucide-react";

export interface StudentProfile {
  name: string;
  country: string;
  flag: string;
  university: string;
  location: string;
  image: string;
  accentColor: string;
  highlights: string[];
  story: string;
}

export const STUDENTS_DATA: StudentProfile[] = [
  {
    name: "NITIN OJHA",
    country: "CANADA",
    flag: "🇨🇦",
    university: "University of Waterloo",
    location: "Ontario, Canada",
    image: "/assets/atlas/source-images/students/nitin.jpg",
    accentColor: "#ef4444",
    highlights: ["PR Holder", "Working in MNC", "Kind and Supportive"],
    story:
      "Atlas Study helped me shortlist top Canadian universities, craft a winning SOP, and navigate my visa process. Today I am a PR holder working at a leading global tech firm in Canada!",
  },
  {
    name: "VISHANT VALENTINE",
    country: "UNITED KINGDOM",
    flag: "🇬🇧",
    university: "University of Manchester",
    location: "England, UK",
    image: "/assets/atlas/source-images/home/VISHANT.jpg",
    accentColor: "#3b82f6",
    highlights: ["Scholarship Received", "Working in MNC", "Gentlemen & Cooperative"],
    story:
      "Secured a prestigious merit scholarship at University of Manchester! The 1-on-1 mock interviews and financial proof guidance from Atlas made my UK admission seamless.",
  },
  {
    name: "AASHIMA GOGIA",
    country: "USA",
    flag: "🇺🇸",
    university: "Northeastern University",
    location: "Boston, USA",
    image: "/assets/atlas/source-images/home/AASHIMA.png",
    accentColor: "#2563eb",
    highlights: ["Completed Studies", "Working in MNC", "Smart Leader"],
    story:
      "From GRE test preparation to landing at Northeastern in Boston, Atlas Study guided my profile building and scholarship application. Proud to now be working in a top US MNC!",
  },
  {
    name: "ANKITA KAPOOR",
    country: "AUSTRALIA",
    flag: "🇦🇺",
    university: "University of Sydney",
    location: "Sydney, Australia",
    image: "/assets/atlas/source-images/home/ANKITA.png",
    accentColor: "#10b981",
    highlights: ["Scholarship Received", "Great Academic Record", "Intelligent & Smart"],
    story:
      "Achieved my dream of studying at University of Sydney with full scholarship support. Atlas provided complete documentation verification and pre-departure assistance!",
  },
];

function FlippableStudentCard({ student }: { student: StudentProfile }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[500px] w-full [perspective:1000px]"
    >
      {/* 3D Inner Card Container */}
      <div
        className={`relative h-full w-full rounded-[28px] transition-all duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)] shadow-[0_25px_60px_-12px_rgba(225,29,72,0.25)]" : "shadow-[0_15px_35px_rgba(15,23,42,0.05)]"
        }`}
        style={{
          transform: !isFlipped
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "rotateY(180deg)",
        }}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/80 bg-white [backface-visibility:hidden]">
          {/* Top Ambient Highlight Shimmer */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-transparent via-rose-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Student Photo */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
            <Image
              src={student.image}
              alt={student.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Floating Flag Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full border border-white/40 bg-slate-900/80 px-3.5 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-md">
              <span>{student.flag}</span>
              <span className="tracking-wider">{student.country}</span>
            </div>

            {/* Flip Hint Badge */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-bold text-rose-300 backdrop-blur-md opacity-90 transition-opacity group-hover:opacity-100">
              <RotateCcw size={11} className="animate-spin-slow" />
              <span>Hover for story</span>
            </div>
          </div>

          {/* Card Body Details */}
          <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl transition-colors duration-200 group-hover:text-rose-600">
                {student.name}
              </h3>
              <div className="mt-1 flex items-center gap-1 text-xs font-bold text-rose-600 tracking-wider">
                <span>{student.country}</span>
              </div>
              <div className="mt-3 flex items-start gap-2 text-slate-600">
                <Building2 size={16} className="mt-0.5 shrink-0 text-slate-400" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold text-slate-800">{student.university}</p>
                  <p className="text-slate-500 font-medium">{student.location}</p>
                </div>
              </div>
            </div>

            {/* Bullets */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
              {student.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <ArrowDownRight size={14} className="shrink-0 text-rose-500 font-bold" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BACK FACE (STUDENT CONCISE STORY) */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border border-rose-500/30 bg-linear-to-br from-slate-950 via-slate-900 to-rose-950 p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-2xl">
          {/* Top Row: Flag & Quote Icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-950/60 px-3.5 py-1 text-xs font-bold text-rose-200 backdrop-blur-md">
              <span>{student.flag}</span>
              <span className="tracking-wider">{student.country} ALUMNI</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Quote size={20} />
            </div>
          </div>

          {/* Concise Student Success Story */}
          <div className="my-auto py-4">
            <h4 className="text-lg font-bold text-white tracking-tight">
              {student.name}
            </h4>
            <p className="text-xs font-semibold text-rose-400 mt-0.5">
              {student.university}
            </p>

            <blockquote className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-200 font-normal italic border-l-2 border-rose-500 pl-3.5">
              &ldquo;{student.story}&rdquo;
            </blockquote>
          </div>

          {/* Bottom Card Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Atlas Success
            </span>

            <span className="text-[10px] font-medium text-slate-400">
              Atlas Study Alumni
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/30 to-white py-24 px-6 md:px-10 lg:px-16">
      {/* Background Soft Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-[500px] w-[500px] rounded-full bg-pink-200/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
              Global Alumni & Success Stories
            </span>
            <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
          </div>

          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-slate-900">Our </span>
            <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
              Global Students
            </span>
          </h2>
          <div className="mt-3 h-1.5 w-20 rounded-full bg-linear-to-r from-rose-500 to-pink-500" />

          <p className="mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Empowering ambitious minds to reach top global universities in Canada, United Kingdom, USA, and Australia.
          </p>
        </div>

        {/* Student Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STUDENTS_DATA.map((student) => (
            <FlippableStudentCard key={student.name} student={student} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  User,
  MessageCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Globe2,
  Award,
  TrendingUp,
} from "lucide-react";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  comments: number;
  readTime: string;
  icon: typeof GraduationCap;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "admission-open",
    title: "Your Pathway to Success: Admission Open for Exciting New Opportunities",
    category: "ADMISSION OPEN",
    date: "September 2026",
    author: "Atlas Editorial Team",
    excerpt:
      "Admission Open: Unveiling New Horizons of Knowledge and Discovery. Explore upcoming Fall and Spring intakes across UK, USA, Canada, Australia, and European universities with early scholarship benefits.",
    image: "/assets/atlas/source-images/blog/9814.png",
    comments: 36,
    readTime: "5 min read",
    icon: GraduationCap,
  },
  {
    slug: "uk-graduate-route-visa-guide",
    title: "UK 2-Year Graduate Route Visa: Comprehensive Eligibility & Application Guide",
    category: "VISA UPDATES",
    date: "August 2026",
    author: "Admissions Team",
    excerpt:
      "Understand how Indian students can work in the UK for 2 years post-graduation without job sponsorship, and transition smoothly into Tier-2 skilled worker visas.",
    image: "/assets/atlas/source-images/blog/4417.png",
    comments: 24,
    readTime: "7 min read",
    icon: Globe2,
  },
  {
    slug: "ielts-vs-pte-vs-duolingo",
    title: "IELTS vs PTE vs Duolingo: Which English Test Should You Choose for Study Abroad?",
    category: "TEST PREPARATION",
    date: "July 2026",
    author: "Test Prep Faculty",
    excerpt:
      "A direct breakdown of scoring scales, test difficulty, preparation timelines, and university acceptance across USA, UK, Canada, and Australia.",
    image: "/assets/atlas/source-images/test-prep/IELTS.jpg",
    comments: 42,
    readTime: "6 min read",
    icon: BookOpen,
  },
  {
    slug: "italy-dsu-regional-scholarships",
    title: "How to Study in Italy 100% Free: Complete Guide to DSU & ER.GO Regional Scholarships",
    category: "SCHOLARSHIPS",
    date: "June 2026",
    author: "Scholarship Desk",
    excerpt:
      "Learn how family income evaluation (ISEE Parificato) unlocks 100% tuition waivers, free hostel accommodation, meal cards, and up to €8,000 annual cash stipends.",
    image: "/assets/atlas/source-images/countries/country-2.jpg",
    comments: 51,
    readTime: "8 min read",
    icon: Award,
  },
];

// Interactive 3D Editorial Card Component with Local Coordinate Tilt & Cursor Spotlight
function Editorial3DCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  const [isVisible, setIsVisible] = useState(false);
  const Icon = post.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const xPct = clientX / rect.width;
    const yPct = clientY / rect.height;

    // Calculate 3D tilt angles: max +/- 7 degrees
    const rotateX = (0.5 - yPct) * 14;
    const rotateY = (xPct - 0.5) * 14;

    setTilt({
      rotateX,
      rotateY,
      glareX: xPct * 100,
      glareY: yPct * 100,
      isHovered: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  }, []);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
      className="perspective-1000 h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.018, 1.018, 1.018)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: tilt.isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200/90 bg-white/95 shadow-sm transition-shadow duration-500 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/10 backdrop-blur-xs"
      >
        {/* Dynamic Cursor Spotlight Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[28px]"
          style={{
            opacity: tilt.isHovered ? 1 : 0,
            background: `radial-gradient(circle 380px at ${tilt.glareX}% ${tilt.glareY}%, rgba(254, 205, 211, 0.28), rgba(244, 63, 94, 0.05), transparent 70%)`,
          }}
        />

        {/* Top Image Box with Depth & Category Badge */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            priority={index < 2}
          />

          {/* Subtle Dark Vignette & Edge Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

          {/* Floating Category Badge with 3D Elevation */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 px-3.5 py-1.5 text-[11px] font-black tracking-wider text-white shadow-lg shadow-rose-900/30 ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
              <Icon size={12} className="text-rose-100" />
              {post.category}
            </span>
          </div>

          {/* Read Time Tag */}
          <div className="absolute top-4 right-4 z-10">
            <span className="rounded-full bg-slate-900/75 px-3 py-1 text-[10px] font-bold tracking-wide text-slate-200 backdrop-blur-md border border-white/10">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Editorial Card Body */}
        <div className="relative z-10 flex flex-1 flex-col justify-between p-7 sm:p-8">
          <div>
            {/* Meta Row: Date & Author */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold mb-3.5">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} className="text-rose-600 shrink-0" />
                {post.date}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-rose-600 shrink-0" />
                {post.author}
              </span>
            </div>

            {/* Article Title */}
            <h2 className="text-xl sm:text-[22px] font-extrabold text-slate-900 leading-snug group-hover:text-rose-600 transition-colors duration-300 line-clamp-2">
              <Link href={`/blog/${post.slug}`} className="focus:outline-hidden">
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Interactive Bar: Read Full Article & Engagement */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-rose-600 group-hover:text-rose-700 transition-colors"
            >
              <span>Read Full Article</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1.5 text-rose-600"
              />
            </Link>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
              <MessageCircle size={14} className="text-slate-400" />
              <span>{post.comments} comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogMotionExperience() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/25 to-white overflow-hidden">
      {/* Background Knowledge Ambient Depth Accents */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Subheading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/80 px-3.5 py-1 text-xs font-extrabold tracking-wider text-rose-700 mb-3">
              <Sparkles size={13} className="text-rose-600" />
              <span>EDITORIAL ARCHIVE & ADMISSIONS INTELLIGENCE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Articles & Official Advisories
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <TrendingUp size={15} className="text-rose-600" />
            <span>Curated by Certified Overseas Counselors</span>
          </div>
        </div>

        {/* 2-Column Responsive 3D Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {BLOG_POSTS.map((post, index) => (
            <Editorial3DCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

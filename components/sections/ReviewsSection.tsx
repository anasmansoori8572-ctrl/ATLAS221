"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import ReviewsGlobeCanvas, { REVIEWS_DATA } from "@/components/canvas/ReviewsGlobeCanvas";

export default function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>("preeti");

  const activeIndex = REVIEWS_DATA.findIndex((r) => r.id === activeId);
  const activeReview = REVIEWS_DATA[activeIndex !== -1 ? activeIndex : 0];

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + REVIEWS_DATA.length) % REVIEWS_DATA.length;
    setActiveId(REVIEWS_DATA[nextIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % REVIEWS_DATA.length;
    setActiveId(REVIEWS_DATA[nextIdx].id);
  };

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      gsap.fromTo(
        ".reviews-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="reviews-section"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-950 via-[#0b1329] to-slate-950 py-20 px-6 md:px-10 lg:px-16 text-white"
    >
      {/* Low-Visibility Background Image Overlay using public/review-bg.png */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-15 mix-blend-screen">
        <Image
          src="/review-bg.png"
          alt="Review Section Background"
          fill
          priority
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Ambient Background Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-rose-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-sky-600/10 blur-[140px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-8">

        {/* LEFT COLUMN: 3D PHOTOREALISTIC EARTH GLOBE WITH MINI PIN BADGES */}
        <div className="reviews-reveal w-full lg:w-1/2 flex justify-center items-center">
          <ReviewsGlobeCanvas activeId={activeId} setActiveId={setActiveId} />
        </div>

        {/* RIGHT COLUMN: SECTION TITLE & ACTIVE REVIEW SPOTLIGHT CARD */}
        <div className="reviews-reveal w-full lg:w-1/2 flex flex-col items-start text-left max-w-xl">

          {/* Header Row & Arrow Nav */}
          <div className="w-full flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-400" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400">
                Client Reviews
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-400" />
            </div>

            {/* Navigation Carousel Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-md active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-md active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-white">Feedback From </span>
            <span className="bg-linear-to-r from-white via-rose-400 to-pink-500 bg-clip-text text-transparent">
              Our Clients
            </span>
          </h2>

          <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
            Explore authentic experiences from students and families who achieved their dream university admissions with Atlas Study.
          </p>

          {/* SPOTLIGHT REVIEW CARD (Compact, Sleek Authentic Styling) */}
          <div className="mt-5 w-full max-w-[440px] rounded-[20px] overflow-hidden border border-slate-800/80 bg-slate-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500">
            {/* Top Dark Navy Container */}
            <div className="relative bg-[#111c35] p-4 sm:p-5 text-left border-l-4 border-rose-500">
              <h3 className="text-base font-extrabold text-rose-400 tracking-tight">
                {activeReview.headline}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
                {activeReview.comment}
              </p>
            </div>

            {/* Bottom White Container with Overlapping Avatar */}
            <div className="relative bg-white p-4 sm:p-5 pt-5 text-slate-900 text-left">
              {/* Overlapping Circular Avatar */}
              <div className="absolute -top-5 left-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-rose-500 bg-white shadow-md overflow-hidden z-10">
                <Image
                  src={activeReview.avatar}
                  alt={activeReview.author}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Red Quote Badge */}
              <span className="absolute -top-3.5 right-5 font-serif text-2xl font-black text-rose-600 leading-none">
                ”
              </span>

              {/* 5 Gold Star Rating */}
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(activeReview.rating)].map((_, idx) => (
                  <Star key={idx} size={13} fill="currentColor" />
                ))}
              </div>

              {/* Client Details */}
              <div className="mt-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-slate-900">
                  <span>{activeReview.author}</span>
                  <span className="text-rose-600 font-bold">, {activeReview.country} {activeReview.flag}</span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 mt-0.5">{activeReview.date}</p>
              </div>
            </div>
          </div>

          {/* Quick Review Selection Selector Dots */}
          <div className="mt-5 flex items-center gap-2">
            {REVIEWS_DATA.map((rev) => (
              <button
                key={rev.id}
                onClick={() => setActiveId(rev.id)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeId === rev.id ? "w-8 bg-rose-500" : "w-2.5 bg-slate-700 hover:bg-slate-500"
                  }`}
                aria-label={`Select review from ${rev.author}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

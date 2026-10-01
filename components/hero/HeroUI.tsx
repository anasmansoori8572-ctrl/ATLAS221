"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const TRUST_METRICS = [
  "500+ University Partners",
  "98% Visa Success",
  "10k+ Students Served",
];

function GlassButton({
  children,
  variant = "primary",
  className,
  href,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  href?: string;
}) {
  const baseClasses = cn(
    "pointer-events-auto rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 inline-flex items-center justify-center",
    variant === "primary" &&
      "bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 text-white shadow-[0_8px_25px_-5px_rgba(225,29,72,0.45)] hover:shadow-[0_10px_35px_-5px_rgba(219,39,119,0.55)] hover:scale-[1.03]",
    variant === "ghost" &&
      "border border-slate-900/15 bg-white text-slate-900 shadow-sm hover:bg-slate-50 hover:border-slate-900/25",
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return <button className={baseClasses}>{children}</button>;
}

export default function HeroUI() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        y: 24,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".hero-headline-line",
          { y: 40, opacity: 0, duration: 0.8, stagger: 0.1 },
          "-=0.4"
        )
        .from(".hero-desc", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          ".trust-item",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.3"
        );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none relative z-10 flex min-h-[calc(100vh-100px)] flex-col justify-between px-6 pb-10 pt-8 sm:px-10 lg:px-16"
    >
      <div className="flex max-w-xl flex-1 flex-col items-start justify-center gap-6 py-12">
        <div className="hero-badge pointer-events-auto inline-flex items-center gap-3">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
            Global Education Consultancy
          </span>
          <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
        </div>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          <span className="hero-headline-line block overflow-hidden">
            Your Gateway To
          </span>
          <span className="hero-headline-line block overflow-hidden bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
            Studying Abroad
          </span>
        </h1>

        <p className="hero-desc text-base leading-relaxed text-slate-600 sm:text-lg">
          End-to-end guidance for university admissions, test preparation
          (IELTS, GRE, GMAT), and visa processing for top global
          destinations.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <div className="hero-cta">
            <GlassButton variant="primary" href="/contact#contact">
              Book Free Counseling
            </GlassButton>
          </div>
          <div className="hero-cta">
            <GlassButton variant="ghost" href="/countries">
              Explore Destinations
            </GlassButton>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-slate-900/8 bg-white/70 px-6 py-4 shadow-[0_8px_32px_-16px_rgba(15,23,42,0.2)] backdrop-blur-md">
        {TRUST_METRICS.map((metric, i) => (
          <span key={metric} className="flex items-center gap-3">
            <span className="trust-item text-sm font-medium text-slate-700">
              {metric}
            </span>
            {i < TRUST_METRICS.length - 1 && (
              <span
                className={cn(
                  "hidden h-1 w-1 rounded-full sm:block",
                  i % 2 === 0 ? "bg-rose-500/60" : "bg-pink-500/60"
                )}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

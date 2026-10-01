"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

interface PerspectiveImageCardProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  badge?: string;
  badgeIcon?: React.ReactNode;
  priority?: boolean;
  children?: React.ReactNode;
}

export default function PerspectiveImageCard({
  src,
  alt,
  className = "h-64 sm:h-72 w-full",
  badge,
  badgeIcon,
  priority = false,
  children,
}: PerspectiveImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, isHovered: false });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = x / rect.width;
      const yPct = y / rect.height;

      const rotateX = (0.5 - yPct) * 12;
      const rotateY = (xPct - 0.5) * 12;

      setTilt({ rotateX, rotateY, isHovered: true });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          tilt.isHovered && !reducedMotion
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: tilt.isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={`group relative overflow-hidden rounded-[26px] border border-rose-200/80 bg-linear-to-b from-white via-rose-50/30 to-white p-2.5 shadow-lg shadow-rose-900/5 transition-shadow duration-500 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/15 ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-slate-950">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Subtle Dark Vignette & Edge Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Optional Badge */}
        {badge && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 px-3.5 py-1 text-[11px] font-black tracking-wider text-white shadow-lg shadow-rose-900/30 ring-1 ring-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
              {badgeIcon}
              {badge}
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

interface Spotlight3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  glareColor?: string;
  onClick?: () => void;
}

export default function Spotlight3DCard({
  children,
  className = "",
  maxTilt = 7,
  glareOpacity = 0.12,
  glareColor = "rgba(244, 63, 94, 0.12)",
  onClick,
}: Spotlight3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
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

      const rotX = (0.5 - yPct) * (maxTilt * 2);
      const rotY = (xPct - 0.5) * (maxTilt * 2);

      setTilt({
        rotateX: rotX,
        rotateY: rotY,
        glareX: xPct * 100,
        glareY: yPct * 100,
        isHovered: true,
      });
    },
    [reducedMotion, maxTilt]
  );

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform:
          tilt.isHovered && !reducedMotion
            ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.018, 1.018, 1.018)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: tilt.isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={`group relative overflow-hidden rounded-[24px] border border-slate-200/90 bg-white/95 p-6 shadow-sm transition-shadow duration-500 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/10 backdrop-blur-xs ${className}`}
    >
      {/* Cursor Spotlight Glare Sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-[24px]"
        style={{
          opacity: tilt.isHovered && !reducedMotion ? glareOpacity * 8 : 0,
          background: `radial-gradient(circle 340px at ${tilt.glareX}% ${tilt.glareY}%, ${glareColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

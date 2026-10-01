"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  showArrow?: boolean;
}

export default function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  variant = "primary",
  showArrow = true,
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPos({ x: x * 0.15, y: y * 0.15 });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  const baseStyles =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-extrabold transition-all duration-300 active:scale-95";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-slate-900 via-rose-600 to-pink-600 text-white shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.03]",
    secondary:
      "bg-white text-slate-800 border border-slate-200/90 shadow-xs hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-600",
    outline:
      "border-2 border-rose-600 text-rose-600 bg-transparent hover:bg-rose-600 hover:text-white shadow-xs hover:shadow-rose-500/30",
  };

  const style = {
    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
    transition: pos.x === 0 && pos.y === 0 ? "transform 0.4s ease-out" : "transform 0.1s ease-out",
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </button>
  );
}

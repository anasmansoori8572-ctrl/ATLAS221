"use client";

import React, { useRef, useEffect, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    return () => {
      if (currentDom) observer.unobserve(currentDom);
    };
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(24px)";
      case "down":
        return "translateY(-24px)";
      case "left":
        return "translateX(24px)";
      case "right":
        return "translateX(-24px)";
      case "none":
        return "none";
    }
  };

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0,0,0)" : getInitialTransform(),
        transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

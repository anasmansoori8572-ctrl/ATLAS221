"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis with self-managed high-precision autoRaf and autoResize
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      autoResize: true,
      overscroll: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Make lenis globally accessible for components/sections that trigger dynamic height changes
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    // Recalculate dimensions on initial layout settlement
    const timer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      delete (window as unknown as { lenis?: Lenis }).lenis;
      lenis.destroy();
    };
  }, []);

  // Whenever pathname changes, trigger immediate resize and reset so scroll never locks
  useEffect(() => {
    const activeLenis = (window as unknown as { lenis?: Lenis }).lenis;
    if (activeLenis) {
      activeLenis.resize();
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  return <>{children}</>;
}

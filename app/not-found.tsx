import type { Metadata } from "next";
import Link from "next/link";
import Spatial404Canvas from "@/components/canvas/Spatial404Canvas";
import { Home, Compass, PhoneCall, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Atlas Study",
  description: "The page you are looking for does not exist or has been moved.",
};

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-white via-rose-50/40 to-white px-6 py-20 text-center">
      {/* 3D Spatial Quantum Rift Canvas */}
      <Spatial404Canvas className="h-64 sm:h-80 w-full max-w-lg" />

      <div className="relative z-10 mx-auto max-w-2xl mt-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-rose-600 ring-1 ring-rose-200">
          404 ERROR
        </div>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
          Oops! The page you are looking for does not exist, has been moved, or is temporarily unavailable. Let&apos;s get you back on track toward your global education goals.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105"
          >
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/countries"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-xs transition-all hover:border-rose-300 hover:bg-slate-50"
          >
            <Compass size={16} />
            <span>Explore Destinations</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

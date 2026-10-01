"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  canvas?: React.ReactNode;
}

export default function PageHeader({
  badge,
  title,
  titleHighlight,
  description,
  breadcrumbs,
  canvas,
}: PageHeaderProps) {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/50 to-white pt-10 pb-14 px-6 md:px-10 lg:px-16 border-b border-rose-100/60">
      {/* Background Soft Glow Bulbs */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[380px] w-[380px] rounded-full bg-rose-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-pink-200/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Text & Breadcrumbs (7 Cols) */}
          <div className={cn("flex flex-col items-start gap-4", canvas ? "lg:col-span-7" : "lg:col-span-12")}>
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-rose-600 transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <span key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-slate-400" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-rose-600 transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-rose-600">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>

            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                {badge}
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {title}{" "}
              {titleHighlight && (
                <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              )}
            </h1>

            {/* Description */}
            {description && (
              <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {description}
              </p>
            )}
          </div>

          {/* Right 3D Canvas Visual (5 Cols) */}
          {canvas && (
            <div className="lg:col-span-5 flex items-center justify-center">
              {canvas}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

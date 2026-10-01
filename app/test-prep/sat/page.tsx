import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import AudioWave3DCanvas from "@/components/canvas/AudioWave3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { Award, CheckCircle2, Clock, BookOpen, Mic, FileText, Headphones, ArrowRight, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "Digital SAT Preparation | Atlas Study",
  description: "Expert guidance for the adaptive Digital SAT. Master Bluebook exam strategies, Desmos calculator shortcuts, and reading comprehension logic.",
};

const STATS = [
  { label: "Target Score", value: "1480 - 1580+", icon: Award },
  { label: "Desmos Mastery", value: "Live Workshops", icon: BookOpen },
  { label: "Adaptive Drills", value: "Module 1 & 2 Hard", icon: Clock },
  { label: "Scholarship Target", value: "Up to 100% Aid", icon: CheckCircle2 },
];

export default function SATPrepPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="DIGITAL SAT® COACHING"
        title="Digital SAT Preparation"
        titleHighlight="Score 1500+ for Undergrad Scholarships"
        description="Expert guidance for the adaptive Digital SAT. Master Bluebook exam strategies, Desmos calculator shortcuts, and reading comprehension logic."
        breadcrumbs={[{ label: "Test Prep", href: "/coaching" }, { label: "Digital SAT Training" }]}
        canvas={<AudioWave3DCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Stats Ribbon */}
      <section className="relative w-full py-12 px-6 md:px-10 lg:px-16 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="flex items-center gap-4 rounded-[20px] bg-slate-50 p-5 border border-slate-200/80">
              <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                <s.icon size={22} />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold text-slate-900 block">{s.value}</span>
                <span className="text-xs text-slate-500 block">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Showcase & Curriculum */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              PROVEN CURRICULUM
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              High-Scoring Methodologies & Personalized Training
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Expert guidance for the adaptive Digital SAT. Master Bluebook exam strategies, Desmos calculator shortcuts, and reading comprehension logic.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Certified master trainers with 10+ years coaching experience</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Free updated official study material & full-length mock portal access</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">1-on-1 personalized doubt clearing and score diagnostics</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="/assets/atlas/source-images/test-prep/SAT.jpg"
                  alt="Digital SAT Training Prep Course"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-bold text-rose-400 block">Official Material</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Digital SAT Training Masterclass</h4>
                </div>
              </div>

              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="/assets/atlas/source-images/test-prep/coaching-18.jpg"
                  alt="Digital SAT Training Classroom Experience"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-bold text-emerald-400 block">Mock Testing Labs</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Real Test Simulation</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-slate-50/50">
        <div className="mx-auto max-w-4xl">
          <CounselingForm />
        </div>
      </section>
    </main>
  );
}

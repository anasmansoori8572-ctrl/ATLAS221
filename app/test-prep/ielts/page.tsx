import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import AudioWave3DCanvas from "@/components/canvas/AudioWave3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Award, CheckCircle2, Clock, BookOpen, Mic, FileText, Headphones, ArrowRight, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "IELTS Coaching Classes | Atlas Study",
  description: "Master IELTS Academic and General Training with Atlas Study. Expert trainers, daily 1-on-1 speaking practice, weekly essay evaluations, and 20+ mock exams.",
};

const STATS = [
  { label: "Target Band", value: "7.5 - 8.5", icon: Award },
  { label: "Mock Tests", value: "20+ Full Length", icon: BookOpen },
  { label: "Class Batch Size", value: "Small (10 max)", icon: Clock },
  { label: "Success Rate", value: "99% Qualify", icon: CheckCircle2 },
];

export default function IELTSPrepPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="IELTS™ COACHING"
        title="IELTS Coaching Classes"
        titleHighlight="Guaranteed Band 7.5+ Strategy"
        description="Master IELTS Academic and General Training with Atlas Study. Expert trainers, daily 1-on-1 speaking practice, weekly essay evaluations, and 20+ mock exams."
        breadcrumbs={[{ label: "Test Prep", href: "/coaching" }, { label: "IELTS Academic & General" }]}
        canvas={<AudioWave3DCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Stats Ribbon */}
      <section className="relative w-full py-12 px-6 md:px-10 lg:px-16 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-[20px] bg-slate-50 p-5 border border-slate-200/80 transition-all duration-300 hover:border-rose-300 hover:shadow-md hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                  <s.icon size={22} />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 block">{s.value}</span>
                  <span className="text-xs text-slate-500 block">{s.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Visual Showcase & Curriculum */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <ScrollReveal direction="left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
                PROVEN CURRICULUM
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                High-Scoring Methodologies & Personalized Training
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Master IELTS Academic and General Training with Atlas Study. Expert trainers, daily 1-on-1 speaking practice, weekly essay evaluations, and 20+ mock exams.
              </p>

              <div className="space-y-3 mt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 transition-transform duration-300 hover:translate-x-1">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span className="text-xs font-semibold text-slate-800">
                    Certified master trainers with 10+ years coaching experience
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 transition-transform duration-300 hover:translate-x-1">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span className="text-xs font-semibold text-slate-800">
                    Free updated official study material & full-length mock portal access
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 transition-transform duration-300 hover:translate-x-1">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span className="text-xs font-semibold text-slate-800">
                    1-on-1 personalized doubt clearing and score diagnostics
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Spotlight3DCard className="p-0 h-64 sm:h-72 overflow-hidden bg-slate-950">
                  <div className="relative h-full w-full">
                    <Image
                      src="/assets/atlas/source-images/test-prep/IELTS.jpg"
                      alt="IELTS Academic & General Prep Course"
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <span className="text-[11px] font-extrabold text-rose-400 block uppercase tracking-wider">
                        Official Material
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        IELTS Academic & General Masterclass
                      </h4>
                    </div>
                  </div>
                </Spotlight3DCard>

                <Spotlight3DCard className="p-0 h-64 sm:h-72 overflow-hidden bg-slate-950">
                  <div className="relative h-full w-full">
                    <Image
                      src="/assets/atlas/source-images/test-prep/coaching-14.jpg"
                      alt="IELTS Academic & General Classroom Experience"
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <span className="text-[11px] font-extrabold text-emerald-400 block uppercase tracking-wider">
                        Mock Testing Labs
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">Real Test Simulation</h4>
                    </div>
                  </div>
                </Spotlight3DCard>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-slate-50/50">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <CounselingForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

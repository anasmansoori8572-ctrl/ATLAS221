import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import ScholarshipParticlesCanvas from "@/components/canvas/ScholarshipParticlesCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import PerspectiveImageCard from "@/components/motion/PerspectiveImageCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { Award, Sparkles, CheckCircle2, DollarSign, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Abroad Scholarships — 2 Crores+ Financial Aid & Grants | Atlas Study",
  description:
    "Explore world top scholarships for Indian students. Complete guidance for UK Chevening, US Fulbright, Canadian Vanier, Australian Go8, and European full tuition fee waivers.",
};

const SCHOLARSHIP_PROGRAMS = [
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    grants: [
      "Chevening Scholarships (100% Tuition + Living)",
      "GREAT Scholarships (£10,000)",
      "Vice-Chancellor Excellence Awards (Up to 50%)",
      "Commonwealth Scholarships",
    ],
    amount: "Up to 100% Waiver",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    grants: [
      "Fulbright-Nehru Master’s Fellowships",
      "Institutional Merit Awards ($5,000–$25,000/yr)",
      "Graduate Assistantships (TA/RA Full Stipend)",
      "Ivy League Need-Blind Aid",
    ],
    amount: "$5,000 to Full Aid",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    grants: [
      "Vanier Canada Graduate Scholarships ($50,000/yr)",
      "University International Entrance Awards ($2,000–$20,000)",
      "Lester B. Pearson International Scholarship",
      "Provincial Merit Grants",
    ],
    amount: "CAD $2k to $50k",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    grants: [
      "Australia Awards",
      "Destination Australia Scholarships ($15,000/yr)",
      "Group of Eight (Go8) Global Excellence Grants",
      "Vice-Chancellor’s International Scholarships",
    ],
    amount: "Up to AUD $40,000",
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    grants: [
      "100% Regional DSU Scholarships",
      "ER.GO Regional Grants",
      "Free Campus Accommodation + Meals",
      "Annual Cash Stipend (€6,000–€8,000)",
    ],
    amount: "100% Free + Stipend",
  },
  {
    country: "Germany & France",
    flag: "🇩🇪 🇫🇷",
    grants: [
      "DAAD German Academic Exchange Service",
      "Charpak French Government Scholarships",
      "Eiffel Excellence Scholarship Programme",
      "Zero Tuition Fees at Public German Unis",
    ],
    amount: "Zero Tuition + Grants",
  },
];

export default function ScholarshipPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="2 CRORES+ AID SECURED"
        title="Explore World’s Top"
        titleHighlight="Scholarships & Grants"
        description="Our central aim is to reduce the high cost of overseas education by maximizing scholarship aid and financial grants for ambitious, meritorious students."
        breadcrumbs={[{ label: "Scholarships" }]}
        canvas={<ScholarshipParticlesCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Stats Ribbon */}
      <section className="relative w-full py-12 px-6 md:px-10 lg:px-16 bg-white border-b border-rose-100">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <ScrollReveal delay={50}>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-black text-rose-600">2 Crores+</div>
              <div className="text-xs font-bold text-slate-600 mt-1">Scholarships Disbursed</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-black text-slate-900">85%+</div>
              <div className="text-xs font-bold text-slate-600 mt-1">Students Receive Aid</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-black text-rose-600">100%</div>
              <div className="text-xs font-bold text-slate-600 mt-1">Waivers in Italy & Germany</div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100/80 transition-transform duration-300 hover:scale-105">
              <div className="text-3xl font-black text-slate-900">25+</div>
              <div className="text-xs font-bold text-slate-600 mt-1">Countries Supported</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Visual Infographic & Strategy Section with 3D Depth */}
      <section className="relative w-full py-16 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <PerspectiveImageCard
                src="/assets/atlas/source-images/misc/statistics-2.jpg"
                alt="Atlas Study Scholarship Statistics & Aid Distribution"
                className="h-[340px] sm:h-[420px] w-full"
                priority
              />
            </ScrollReveal>
          </div>
          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
                MAXIMIZING STUDENT AID
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Strategic Scholarship Profiling
              </h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Applying for financial aid is far more than meeting GPA thresholds. Our dedicated scholarship desk aligns your academic papers, research proposals, statement of purpose, and community achievements with the exact evaluation rubrics of global scholarship boards.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 transition-transform duration-300 hover:translate-x-1">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span className="text-xs font-semibold text-slate-800">
                    Direct university dean scholarship recommendations
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 transition-transform duration-300 hover:translate-x-1">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span className="text-xs font-semibold text-slate-800">
                    100% tuition waiver application formatting for Europe
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 transition-transform duration-300 hover:translate-x-1">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                  <span className="text-xs font-semibold text-slate-800">
                    Graduate assistantship (TA/RA) CV structuring for USA & Canada
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Country Scholarships Breakdown with 3D Spotlight Cards */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/30 to-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  FUNDING OPPORTUNITIES
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
                Scholarships by Destination Country
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SCHOLARSHIP_PROGRAMS.map((sp, index) => (
              <ScrollReveal key={sp.country} delay={index * 80}>
                <Spotlight3DCard className="h-full p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl drop-shadow-xs">{sp.flag}</span>
                        <h3 className="font-bold text-slate-900 text-lg">{sp.country}</h3>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700 border border-emerald-200/60">
                        {sp.amount}
                      </span>
                    </div>

                    <ul className="mt-5 flex flex-col gap-2.5">
                      {sp.grants.map((g, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <CheckCircle2 size={13} className="text-rose-600 shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all duration-300 group-hover:bg-rose-600 shadow-md group-hover:shadow-rose-600/30"
                    >
                      <span>Apply for Scholarship Aid</span>
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </Spotlight3DCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <CounselingForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

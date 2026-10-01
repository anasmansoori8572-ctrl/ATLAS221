import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CountryGlobe3DCanvas from "@/components/canvas/CountryGlobe3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { CheckCircle2, GraduationCap, DollarSign, Clock, ShieldCheck, Award, BookOpen, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Study in Dubai & UAE — Universities, Cost & Visa | Atlas Study",
  description: "Earn an accredited British, Australian, or American degree in Dubai with zero tax, rapid career growth, and direct post-study hiring.",
};

const STATS = [
  { label: "Global Branch Campuses", value: "30+ Elite Campuses", icon: GraduationCap },
  { label: "Average Tuition / Year", value: "AED 35k - 75k", icon: DollarSign },
  { label: "Income Tax", value: "0% Tax-Free Earnings", icon: Clock },
  { label: "Visa Grant Rate", value: "100% Success", icon: Award },
];

export default function StudyInDestinationPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="STUDY IN UAE"
        title="Study in Dubai & UAE"
        titleHighlight="Tax-Free Dynamic Economy & Leading Global Branch Campuses"
        description="Earn an accredited British, Australian, or American degree in Dubai with zero tax, rapid career growth, and direct post-study hiring."
        breadcrumbs={[{ label: "Countries", href: "/countries" }, { label: "United Arab Emirates" }]}
        canvas={<CountryGlobe3DCanvas accentColor="#e11d48" className="h-72 sm:h-80 w-full" />}
      />

      {/* Quick Stats Strip */}
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

      {/* Visual Showcase & Narrative Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-600">
              WHY CHOOSE UNITED ARAB EMIRATES
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              World-Class Academia & High Post-Study Career Prospects
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Studying in United Arab Emirates provides access to globally recognized qualifications, industry-linked curricula, and diverse international campuses. Atlas Study guides you through every step: university profiling, admission filings, scholarship waivers, and visa endorsement.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Direct institutional tie-ups & application fee waivers</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Dedicated assistance with post-study stayback visa filing</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">1-on-1 consular visa interview preparation and mock sessions</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-950 group">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <Image
                  src="/assets/atlas/source-images/countries/dubai.png"
                  alt="United Arab Emirates Campus & Landscape"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* 3D Atlas Country Cutout Graphic */}
                <div className="absolute bottom-4 right-4 h-32 w-32 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/assets/atlas/source-images/countries/UAE.png"
                    alt="United Arab Emirates Cutout"
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>

                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Destination</span>
                  <h3 className="text-2xl font-black text-white">United Arab Emirates</h3>
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

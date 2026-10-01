import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import TravelNetworkCanvas from "@/components/canvas/TravelNetworkCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import {
  GraduationCap,
  Home,
  Briefcase,
  Compass,
  Users,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Visa & Immigration Services — 98% Visa Success Rate | Atlas Study",
  description:
    "Comprehensive visa guidance for Student, Residence PR, Business, Tourist, Conference, and Medical visas with Atlas Study Consultants.",
};

const VISA_TYPES = [
  {
    name: "Student Visa",
    href: "/visa/student",
    badge: "Most Popular",
    desc: "End-to-end guidance for UK CAS, US F-1 (I-20), Canada SDS, Australia Subclass 500, and European Type D national student visas.",
    icon: GraduationCap,
    image: "/assets/atlas/source-images/visa/visa-1.jpg",
  },
  {
    name: "Residence Visa (PR)",
    href: "/visa/residence",
    badge: "Skilled Migration",
    desc: "Canada Express Entry, Provincial Nominee Programs (PNP), and Australia General Skilled Migration (Subclass 189/190/491).",
    icon: Home,
    image: "/assets/atlas/source-images/visa/visa-2.jpg",
  },
  {
    name: "Business Visa",
    href: "/visa/business",
    badge: "Corporate",
    desc: "Global business delegation, investor travel, trade exhibitions, partnership negotiations, and multinational corporate travel.",
    icon: Briefcase,
    image: "/assets/atlas/source-images/visa/visa-3.jpg",
  },
  {
    name: "Tourist & Visitor Visa",
    href: "/visa/tourist",
    badge: "Holiday Travel",
    desc: "Schengen 29-country visas, UK Standard Visitor (6-month), US B1/B2, Canada Visitor Visa (V-1), and Dubai e-visas.",
    icon: Compass,
    image: "/assets/atlas/source-images/visa/visa-4.jpg",
  },
  {
    name: "Conference Visa",
    href: "/visa/conference",
    badge: "Academic",
    desc: "Visas for international symposiums, research congresses, paper presentations, and government ministry event clearances.",
    icon: Users,
    image: "/assets/atlas/source-images/visa/visa-5.jpg",
  },
  {
    name: "Medical Visa",
    href: "/visa/medical",
    badge: "Healthcare",
    desc: "Fast-track documentation for overseas hospital treatment, doctor referral letters, and accompanying attendant visas (MED-X).",
    icon: HeartPulse,
    image: "/assets/atlas/source-images/visa/visa-6.jpg",
  },
];

const METHODOLOGY = [
  {
    step: "01",
    title: "Profile Evaluation",
    desc: "Assessing academic background, funds, ties, and selecting the optimal visa stream.",
  },
  {
    step: "02",
    title: "Document Checklist",
    desc: "Structuring financial proof, tax filings, affidavit drafts, and CA statements.",
  },
  {
    step: "03",
    title: "Embassy Filing",
    desc: "Error-free portal application, fee disbursement, and biometric slot booking.",
  },
  {
    step: "04",
    title: "SOP Crafting",
    desc: "Writing a tailored Statement of Purpose establishing genuine temporary intent.",
  },
  {
    step: "05",
    title: "Mock Visa Drills",
    desc: "1-on-1 consular interview practice with former visa counselors.",
  },
];

export default function VisaOverviewPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="VISA & IMMIGRATION"
        title="Global Visa Assistance &"
        titleHighlight="98% Success Rate"
        description="Comprehensive documentation, strict financial vetting, and rigorous 1-on-1 mock consular interview preparation."
        breadcrumbs={[{ label: "Visa Services" }]}
        canvas={<TravelNetworkCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* 5-Step Methodology */}
      <section className="relative w-full py-16 px-6 md:px-10 lg:px-16 bg-white border-b border-rose-100">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl font-extrabold sm:text-3xl text-slate-900">
                Our 5-Step Visa Methodology
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                A systematic process ensuring zero errors and prompt embassy approvals.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {METHODOLOGY.map((m, index) => (
              <ScrollReveal key={m.step} delay={index * 60}>
                <div className="group rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 flex flex-col justify-between transition-all duration-300 hover:border-rose-300 hover:bg-white hover:shadow-lg hover:-translate-y-1 h-full">
                  <div>
                    <span className="text-2xl font-black text-rose-600 transition-transform duration-300 group-hover:scale-110 inline-block">
                      {m.step}
                    </span>
                    <h3 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Categories Grid with 3D Depth */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/30 to-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  CATEGORIES COVERED
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
                Explore Our Visa Categories
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VISA_TYPES.map((visa, index) => (
              <ScrollReveal key={visa.name} delay={index * 80}>
                <Spotlight3DCard className="h-full p-0 overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Visual Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <Image
                        src={visa.image}
                        alt={visa.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/95 backdrop-blur-md text-rose-600 shadow-md ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110">
                        <visa.icon size={20} />
                      </div>

                      <span className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1 text-[10px] font-extrabold text-white shadow-md">
                        {visa.badge}
                      </span>
                    </div>

                    <div className="p-7">
                      <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {visa.name}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                        {visa.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-7 pb-7 pt-0">
                    <div className="pt-4 border-t border-slate-100">
                      <Link
                        href={visa.href}
                        className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-600 shadow-md group-hover:shadow-rose-600/30"
                      >
                        <span>View Requirements & Checklist</span>
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
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

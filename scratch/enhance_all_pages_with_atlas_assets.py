import os
import re

print("Starting systematic image & visual upgrade across all Atlas pages...")

# 1. Update Countries Page (app/countries/page.tsx)
countries_page_code = """import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import CountryGlobe3DCanvas from "@/components/canvas/CountryGlobe3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { ArrowUpRight, GraduationCap, DollarSign, Clock, CheckCircle2, ShieldCheck, Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Study Abroad Country Destinations — 25+ Global Hubs | Atlas Study",
  description:
    "Explore top international study destinations: United Kingdom, USA, Canada, Australia, Ireland, Germany, France, Italy, New Zealand, UAE, and China with Atlas Study.",
};

const COUNTRIES = [
  {
    name: "United Kingdom",
    slug: "uk",
    legacyId: "5",
    flag: "🇬🇧",
    tagline: "World's #1 Academic Heritage & 2-Year Post-Study Work Visa",
    tuition: "£12,000 - £26,000 / yr",
    stayback: "2 Years (Graduate Route)",
    intakes: "Sept / Jan / May",
    features: ["1-Year Masters Programs", "Russell Group Prestigious Universities", "IELTS Waiver Available", "20 hrs/week Part-Time Work"],
    image: "/assets/atlas/source-images/countries/uk.png",
    scenery: "/assets/atlas/source-images/countries/country-1.jpg",
  },
  {
    name: "United States",
    slug: "usa",
    legacyId: "",
    flag: "🇺🇸",
    tagline: "Global Tech Innovation & 3-Year STEM OPT Extensions",
    tuition: "$20,000 - $45,000 / yr",
    stayback: "1 to 3 Years (OPT / STEM)",
    intakes: "Fall (Aug) / Spring (Jan)",
    features: ["Ivy League & Tier 1 Research", "3-Year STEM Extension", "CPT & On-Campus RA/TA Ships", "Merit & Dean Scholarships"],
    image: "/assets/atlas/source-images/countries/USA.png",
    scenery: "/assets/atlas/source-images/countries/country-2.jpg",
  },
  {
    name: "Canada",
    slug: "canada",
    legacyId: "3",
    flag: "🇨🇦",
    tagline: "World-Class Quality & Most Direct Post-Graduation PR Pathways",
    tuition: "CAD $16,000 - $32,000 / yr",
    stayback: "Up to 3 Years (PGWP)",
    intakes: "Fall (Sept) / Winter (Jan) / Summer",
    features: ["Direct Express Entry & PNP PR", "Co-op Paid Internship Programs", "Spouse Open Work Permit", "SDS Fast-Track Visa Stream"],
    image: "/assets/atlas/source-images/countries/Canada.png",
    scenery: "/assets/atlas/source-images/countries/country-3.jpg",
  },
  {
    name: "Australia",
    slug: "australia",
    legacyId: "2",
    flag: "🇦🇺",
    tagline: "High Quality of Life, Group of Eight & Vibrant Multicultural Cities",
    tuition: "AUD $22,000 - $42,000 / yr",
    stayback: "2 to 4 Years (Subclass 485)",
    intakes: "Feb / July / Nov",
    features: ["Group of Eight (Go8) Ranking", "Generous Post-Study Work Rights", "High Minimum Wage for Part-Time", "Regional Area PR Bonus Points"],
    image: "/assets/atlas/source-images/countries/Australia.png",
    scenery: "/assets/atlas/source-images/countries/country-4.jpg",
  },
  {
    name: "Ireland",
    slug: "ireland",
    legacyId: "7",
    flag: "🇮🇪",
    tagline: "Silicon Valley of Europe & 2-Year Third Level Graduate Scheme",
    tuition: "€10,000 - €22,000 / yr",
    stayback: "2 Years (Masters Stamp 1G)",
    intakes: "Autumn (Sept) / Spring (Jan)",
    features: ["European HQ of Google, Meta, Apple", "100% English-Speaking Eurozone", "Generous Government Scholarships", "Highest Tech Starting Salaries"],
    image: "/assets/atlas/source-images/countries/Ireland.png",
    scenery: "/assets/atlas/source-images/countries/country-6.jpg",
  },
  {
    name: "Germany",
    slug: "germany",
    legacyId: "10",
    flag: "🇩🇪",
    tagline: "Zero or Low Tuition at World-Renowned Public Universities",
    tuition: "€0 - €3,000 / yr (Public Unis)",
    stayback: "18 Months Job Seeking Visa",
    intakes: "Winter (Oct) / Summer (April)",
    features: ["TU9 Engineering Powerhouses", "English-Taught Master Programs", "Strong Automotive & Industrial Core", "EU Blue Card Eligibility"],
    image: "/assets/atlas/source-images/countries/germany.png",
    scenery: "/assets/atlas/source-images/countries/country-5.jpg",
  },
  {
    name: "France",
    slug: "france",
    legacyId: "8",
    flag: "🇫🇷",
    tagline: "Global Hub for Luxury, Business Grande Écoles & European Culture",
    tuition: "€8,000 - €20,000 / yr",
    stayback: "2 Years (APS Visa / Masters)",
    intakes: "Sept / Feb",
    features: ["Triple-Accredited Business Schools", "CAF Government Housing Subsidy", "English-Taught Tech & Management", "5-Year Schengen Travel Visa Grant"],
    image: "/assets/atlas/source-images/countries/france.png",
    scenery: "/assets/atlas/source-images/countries/country-7.jpg",
  },
  {
    name: "Italy",
    slug: "italy",
    legacyId: "9",
    flag: "🇮🇹",
    tagline: "Historic Excellence, 100% Regional DSU Scholarships & Low Fees",
    tuition: "€1,000 - €4,000 / yr",
    stayback: "1 Year Post-Study Visa",
    intakes: "Sept / Oct",
    features: ["Up to 100% DSU Regional Grants", "Politecnico di Milano & Bologna", "Design, Architecture & Fashion Hub", "Low Cost of Living in Europe"],
    image: "/assets/atlas/source-images/countries/italy.png",
    scenery: "/assets/atlas/source-images/countries/country-1.jpg",
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    legacyId: "6",
    flag: "🇳🇿",
    tagline: "Top 3% Globally Ranked Universities & Unmatched Safety",
    tuition: "NZD $20,000 - $35,000 / yr",
    stayback: "Up to 3 Years Post-Study",
    intakes: "Feb / July",
    features: ["Green List Fast-Track Residency", "All 8 Public Unis in QS Top 500", "Safe & Welcoming Environment", "Spouse Full-Time Work Rights"],
    image: "/assets/atlas/source-images/countries/newzealand.png",
    scenery: "/assets/atlas/source-images/countries/country-2.jpg",
  },
  {
    name: "United Arab Emirates",
    slug: "uae",
    legacyId: "4",
    flag: "🇦🇪",
    tagline: "Tax-Free Dynamic Economy & Leading Global Branch Campuses",
    tuition: "AED 35,000 - 75,000 / yr",
    stayback: "Golden Visa Opportunities",
    intakes: "Sept / Jan",
    features: ["Campuses of UK, Aus, US Unis", "Tax-Free Earning & Rapid Growth", "Strategic Proximity to India", "100% Student Visa Grant Success"],
    image: "/assets/atlas/source-images/countries/UAE.png",
    scenery: "/assets/atlas/source-images/countries/dubai.png",
  },
  {
    name: "China",
    slug: "china",
    legacyId: "11",
    flag: "🇨🇳",
    tagline: "Affordable High-Tech Education & Chinese Government Scholarships (CSC)",
    tuition: "RMB 18,000 - 35,000 / yr",
    stayback: "Internship & Work Visa",
    intakes: "Sept / March",
    features: ["Fully-Funded CSC Scholarships", "World-Class Infrastructure & Labs", "Clinical Medicine (MBBS) in English", "Low Cost of Living"],
    image: "/assets/atlas/source-images/countries/china.png",
    scenery: "/assets/atlas/source-images/countries/country-4.jpg",
  },
];

export default function CountriesPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="STUDY DESTINATIONS"
        title="Explore World-Class"
        titleHighlight="Study Abroad Destinations"
        description="Choose from over 25+ premier international education destinations with tailored admission guidance, scholarship assistance, and visa processing."
        breadcrumbs={[{ label: "Countries" }]}
        canvas={<CountryGlobe3DCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Grid of Countries */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                DISCOVER YOUR FUTURE
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
              Top Global Education Hubs
            </h2>
            <p className="mt-4 text-slate-600 text-sm">
              Click on any destination to view in-depth details on universities, scholarships, tuition costs, and post-study work permits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES.map((c) => (
              <div
                key={c.slug}
                className="group relative flex flex-col justify-between rounded-[26px] border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Visual Header with authentic Atlas country image banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={c.scenery}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  {/* Country Flag Badge & Atlas Cutout Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 border border-white/20">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-xs font-bold text-white">{c.name}</span>
                  </div>

                  <Link
                    href={`/countries/${c.slug}`}
                    className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-rose-600 group-hover:scale-110"
                    aria-label={`View details for ${c.name}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>

                  {/* High-res Country Cutout Graphic Overlay */}
                  <div className="absolute -bottom-4 right-4 h-24 w-24 opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-2xl pointer-events-none">
                    <Image
                      src={c.image}
                      alt={`${c.name} landmark`}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="p-7 pt-5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-xs font-semibold text-rose-600 leading-relaxed">
                      {c.tagline}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 rounded-[16px] bg-slate-50 p-3.5 text-xs">
                      <div>
                        <span className="text-slate-600 block text-[11px]">Avg. Tuition</span>
                        <span className="font-bold text-slate-900 mt-0.5 block">{c.tuition}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block text-[11px]">Stayback Visa</span>
                        <span className="font-bold text-slate-900 mt-0.5 block">{c.stayback}</span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                        Key Highlights
                      </span>
                      <ul className="flex flex-col gap-2">
                        {c.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Major Intakes: <strong className="text-slate-800">{c.intakes}</strong>
                    </span>
                    <Link
                      href={`/countries/${c.slug}`}
                      className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      Explore Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
"""

with open("app/countries/page.tsx", "w") as f:
    f.write(countries_page_code)
print("Updated app/countries/page.tsx successfully!")

# 2. Update Visa Page (app/visa/page.tsx)
visa_page_code = """import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import TravelNetworkCanvas from "@/components/canvas/TravelNetworkCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { GraduationCap, Home, Briefcase, Compass, Users, HeartPulse, CheckCircle2, ArrowRight } from "lucide-react";

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
  { step: "01", title: "Profile Evaluation", desc: "Assessing academic background, funds, ties, and selecting the optimal visa stream." },
  { step: "02", title: "Document Checklist", desc: "Structuring financial proof, tax filings, affidavit drafts, and CA statements." },
  { step: "03", title: "Embassy Filing", desc: "Error-free portal application, fee disbursement, and biometric slot booking." },
  { step: "04", title: "SOP Crafting", desc: "Writing a tailored Statement of Purpose establishing genuine temporary intent." },
  { step: "05", title: "Mock Visa Drills", desc: "1-on-1 consular interview practice with former visa counselors." },
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
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-extrabold sm:text-3xl text-slate-900">
              Our 5-Step Visa Methodology
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              A systematic process ensuring zero errors and prompt embassy approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {METHODOLOGY.map((m) => (
              <div key={m.step} className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-black text-rose-600">{m.step}</span>
                  <h3 className="mt-2 text-sm font-bold text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Categories Grid */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-linear-to-b from-white via-rose-50/30 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                CATEGORIES COVERED
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
              Explore Our Visa Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VISA_TYPES.map((visa) => (
              <div
                key={visa.name}
                className="group flex flex-col justify-between rounded-[28px] border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-2xl hover:-translate-y-1.5"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={visa.image}
                    alt={visa.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 backdrop-blur-md text-rose-600 shadow-md">
                    <visa.icon size={20} />
                  </div>

                  <span className="absolute top-4 right-4 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-extrabold text-white shadow-md">
                    {visa.badge}
                  </span>
                </div>

                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {visa.name}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {visa.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <Link
                      href={visa.href}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all group-hover:bg-linear-to-r group-hover:from-rose-600 group-hover:to-pink-600"
                    >
                      <span>View Requirements & Checklist</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <CounselingForm />
        </div>
      </section>
    </main>
  );
}
"""

with open("app/visa/page.tsx", "w") as f:
    f.write(visa_page_code)
print("Updated app/visa/page.tsx successfully!")

# 3. Update Scholarship Page (app/scholarship/page.tsx)
scholarship_page_code = """import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import ScholarshipParticlesCanvas from "@/components/canvas/ScholarshipParticlesCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
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
    grants: ["Chevening Scholarships (100% Tuition + Living)", "GREAT Scholarships (£10,000)", "Vice-Chancellor Excellence Awards (Up to 50%)", "Commonwealth Scholarships"],
    amount: "Up to 100% Waiver",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    grants: ["Fulbright-Nehru Master’s Fellowships", "Institutional Merit Awards ($5,000–$25,000/yr)", "Graduate Assistantships (TA/RA Full Stipend)", "Ivy League Need-Blind Aid"],
    amount: "$5,000 to Full Aid",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    grants: ["Vanier Canada Graduate Scholarships ($50,000/yr)", "University International Entrance Awards ($2,000–$20,000)", "Lester B. Pearson International Scholarship", "Provincial Merit Grants"],
    amount: "CAD $2k to $50k",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    grants: ["Australia Awards", "Destination Australia Scholarships ($15,000/yr)", "Group of Eight (Go8) Global Excellence Grants", "Vice-Chancellor’s International Scholarships"],
    amount: "Up to AUD $40,000",
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    grants: ["100% Regional DSU Scholarships", "ER.GO Regional Grants", "Free Campus Accommodation + Meals", "Annual Cash Stipend (€6,000–€8,000)"],
    amount: "100% Free + Stipend",
  },
  {
    country: "Germany & France",
    flag: "🇩🇪 🇫🇷",
    grants: ["DAAD German Academic Exchange Service", "Charpak French Government Scholarships", "Eiffel Excellence Scholarship Programme", "Zero Tuition Fees at Public German Unis"],
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
          <div className="p-4 rounded-2xl bg-rose-50/50">
            <div className="text-3xl font-black text-rose-600">2 Crores+</div>
            <div className="text-xs font-bold text-slate-600 mt-1">Scholarships Disbursed</div>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50/50">
            <div className="text-3xl font-black text-slate-900">85%+</div>
            <div className="text-xs font-bold text-slate-600 mt-1">Students Receive Aid</div>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50/50">
            <div className="text-3xl font-black text-rose-600">100%</div>
            <div className="text-xs font-bold text-slate-600 mt-1">Waivers in Italy & Germany</div>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50/50">
            <div className="text-3xl font-black text-slate-900">25+</div>
            <div className="text-xs font-bold text-slate-600 mt-1">Countries Supported</div>
          </div>
        </div>
      </section>

      {/* Visual Infographic & Strategy Section */}
      <section className="relative w-full py-16 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-950">
              <Image
                src="/assets/atlas/source-images/misc/statistics-2.jpg"
                alt="Atlas Study Scholarship Statistics & Aid Distribution"
                width={800}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
          <div className="lg:col-span-6">
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
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Direct university dean scholarship recommendations</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">100% tuition waiver application formatting for Europe</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Graduate assistantship (TA/RA) CV structuring for USA & Canada</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country Scholarships Breakdown */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-linear-to-b from-white via-rose-50/30 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                FUNDING OPPORTUNITIES
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
              Scholarships by Destination Country
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SCHOLARSHIP_PROGRAMS.map((sp) => (
              <div
                key={sp.country}
                className="group flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{sp.flag}</span>
                      <h3 className="font-bold text-slate-900 text-lg">{sp.country}</h3>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-colors group-hover:bg-rose-600"
                  >
                    <span>Apply for Scholarship Aid</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <CounselingForm />
        </div>
      </section>
    </main>
  );
}
"""

with open("app/scholarship/page.tsx", "w") as f:
    f.write(scholarship_page_code)
print("Updated app/scholarship/page.tsx successfully!")

# 4. Update Contact Page (app/contact/page.tsx)
contact_page_code = """import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import OrbitUniverseCanvas from "@/components/canvas/OrbitUniverseCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { MapPin, Phone, Mail, Clock, Globe2, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — Worldwide Offices & Counseling | Atlas Study",
  description:
    "Get in touch with Atlas Study Consultants. Visit our Kanpur head office or connect with our international counselor network.",
};

const WORLDWIDE_OFFICES = [
  {
    country: "India (Headquarters)",
    city: "Kanpur, Uttar Pradesh",
    address: "1st Floor, MLC Building, 111-A/19, Ashok Nagar, G.T Road, Above Arora Travels, Near Hotel Kanha Continental, Kanpur - 208010, Uttar Pradesh.",
    phone: "+91 9956902444",
    email: "admissions@atlasstudy.in",
    flag: "🇮🇳",
  },
  {
    country: "United Kingdom",
    city: "London Support Center",
    address: "7220 Dean Martin Drive Suite, London & Global Operations Desk",
    phone: "07520.664.45",
    email: "support@atlasstudy.in",
    flag: "🇬🇧",
  },
  {
    country: "Ireland",
    city: "Dublin Liaison Office",
    address: "148, Global Factory Street, Dublin & North Ireland Desk",
    phone: "+321.45.67890",
    email: "ireland@atlasstudy.in",
    flag: "🇮🇪",
  },
  {
    country: "Canada & Australia",
    city: "Student Support Hubs",
    address: "PO Box 515381, Los Angeles / Toronto / Sydney Support Desks",
    phone: "+888.520.6644",
    email: "admissions@atlasstudy.in",
    flag: "🇨🇦",
  },
];

export default function ContactPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="GET IN TOUCH"
        title="Contact Our Global"
        titleHighlight="Admissions Team"
        description="Have questions regarding courses, eligibility, or scholarships? Connect with our dedicated counselors today."
        breadcrumbs={[{ label: "Contact Us" }]}
        canvas={<OrbitUniverseCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Main Contact Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                CENTRAL HEADQUARTERS
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900">
              Visit Us or Schedule a Consultation
            </h2>

            <p className="text-sm leading-relaxed text-slate-600">
              Our central admissions hub in Kanpur is open Monday to Saturday. Walk in for a profile assessment or book a slot with our senior counselors.
            </p>

            {/* Authentic Atlas Office Image */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
              <Image
                src="/assets/atlas/source-images/misc/contact-1.png"
                alt="Atlas Study Head Office Counseling Desk"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain bg-slate-50 p-2"
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Location</div>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    1st Floor, MLC Building, 111-A/19, Ashok Nagar, G.T Road, Above Arora Travels, Near Hotel Kanha Continental, Kanpur - 208010, Uttar Pradesh.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone Support</div>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    +91 9956902444 / +91 9651586666
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Official Email</div>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    admissions@atlasstudy.in
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5 pt-4 border-t border-slate-200/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-white">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Counseling Hours</div>
                  <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    Mon – Sat: 10:00 AM – 6:30 PM (Sunday Closed)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Counseling Form (7 Cols) */}
          <div className="lg:col-span-7">
            <CounselingForm />
          </div>
        </div>
      </section>

      {/* Worldwide Offices */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-slate-50/50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Global Support Centers
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Connecting students across the globe with our regional study abroad advisors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORLDWIDE_OFFICES.map((office) => (
              <div
                key={office.country}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{office.flag}</span>
                    <span className="text-sm font-bold text-slate-900">{office.country}</span>
                  </div>
                  <div className="text-xs font-semibold text-rose-600 mb-2">{office.city}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{office.address}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <div><strong>Tel:</strong> {office.phone}</div>
                  <div className="mt-1"><strong>Email:</strong> {office.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
"""

with open("app/contact/page.tsx", "w") as f:
    f.write(contact_page_code)
print("Updated app/contact/page.tsx successfully!")

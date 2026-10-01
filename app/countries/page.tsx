import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import CountryGlobe3DCanvas from "@/components/canvas/CountryGlobe3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
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
    features: [
      "1-Year Masters Programs",
      "Russell Group Prestigious Universities",
      "IELTS Waiver Available",
      "20 hrs/week Part-Time Work",
    ],
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
    features: [
      "Ivy League & Tier 1 Research",
      "3-Year STEM Extension",
      "CPT & On-Campus RA/TA Ships",
      "Merit & Dean Scholarships",
    ],
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
    features: [
      "Direct Express Entry & PNP PR",
      "Co-op Paid Internship Programs",
      "Spouse Open Work Permit",
      "SDS Fast-Track Visa Stream",
    ],
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
    features: [
      "Group of Eight (Go8) Ranking",
      "Generous Post-Study Work Rights",
      "High Minimum Wage for Part-Time",
      "Regional Area PR Bonus Points",
    ],
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
    features: [
      "European HQ of Google, Meta, Apple",
      "100% English-Speaking Eurozone",
      "Generous Government Scholarships",
      "Highest Tech Starting Salaries",
    ],
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
    features: [
      "TU9 Engineering Powerhouses",
      "English-Taught Master Programs",
      "Strong Automotive & Industrial Core",
      "EU Blue Card Eligibility",
    ],
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
    features: [
      "Triple-Accredited Business Schools",
      "CAF Government Housing Subsidy",
      "English-Taught Tech & Management",
      "5-Year Schengen Travel Visa Grant",
    ],
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
    features: [
      "Up to 100% DSU Regional Grants",
      "Politecnico di Milano & Bologna",
      "Design, Architecture & Fashion Hub",
      "Low Cost of Living in Europe",
    ],
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
    features: [
      "Green List Fast-Track Residency",
      "All 8 Public Unis in QS Top 500",
      "Safe & Welcoming Environment",
      "Spouse Full-Time Work Rights",
    ],
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
    features: [
      "Campuses of UK, Aus, US Unis",
      "Tax-Free Earning & Rapid Growth",
      "Strategic Proximity to India",
      "100% Student Visa Grant Success",
    ],
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
    features: [
      "Fully-Funded CSC Scholarships",
      "World-Class Infrastructure & Labs",
      "Clinical Medicine (MBBS) in English",
      "Low Cost of Living",
    ],
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

      {/* Grid of Countries with 3D Depth */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  DISCOVER YOUR FUTURE
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
                Top Global Education Hubs
              </h2>
              <p className="mt-4 text-slate-600 text-sm">
                Click on any destination to view in-depth details on universities, scholarships, tuition costs, and post-study work permits.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES.map((c, index) => (
              <ScrollReveal key={c.slug} delay={index * 60}>
                <Spotlight3DCard className="h-full p-0 overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Visual Header with authentic Atlas country image banner */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                      <Image
                        src={c.scenery}
                        alt={c.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                      {/* Country Flag Badge & Atlas Cutout Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-slate-900/85 backdrop-blur-md px-3 py-1 border border-white/20 shadow-md">
                        <span className="text-xl">{c.flag}</span>
                        <span className="text-xs font-bold text-white">{c.name}</span>
                      </div>

                      <Link
                        href={`/countries/${c.slug}`}
                        className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-rose-600 group-hover:scale-110 shadow-md"
                        aria-label={`View details for ${c.name}`}
                      >
                        <ArrowUpRight size={18} />
                      </Link>

                      {/* High-res Country Cutout Graphic Overlay with 3D Float */}
                      <div className="absolute -bottom-4 right-4 h-24 w-24 opacity-90 transition-transform duration-500 ease-out group-hover:scale-115 group-hover:-rotate-3 drop-shadow-2xl pointer-events-none">
                        <Image
                          src={c.image}
                          alt={`${c.name} landmark`}
                          fill
                          sizes="96px"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="p-7 pt-5">
                      <p className="text-xs font-semibold text-rose-600 leading-relaxed">
                        {c.tagline}
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3 rounded-[16px] bg-slate-50 p-3.5 text-xs border border-slate-100">
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
                  </div>

                  <div className="px-7 pb-7 pt-0">
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
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
                </Spotlight3DCard>
              </ScrollReveal>
            ))}
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

import os

# Define country metadata mapping
countries = [
    {
        "slug": "uk",
        "name": "United Kingdom",
        "title": "Study in the United Kingdom",
        "badge": "STUDY IN UK",
        "highlight": "Academic Heritage & Global Prestige",
        "desc": "Global recognition, 1-year intensive Master degrees, 2-year Graduate Route work visa, and world-renowned Russell Group universities.",
        "image": "/assets/atlas/source-images/countries/uk.png",
        "scenery": "/assets/atlas/source-images/countries/country-1.jpg",
        "stats": [
            {"label": "Russell Group Universities", "value": "24 Elite"},
            {"label": "Average Tuition / Year", "value": "£12k - £26k"},
            {"label": "Graduate Route Stayback", "value": "2 - 3 Years"},
            {"label": "Masters Duration", "value": "1 Year Fast-Track"}
        ]
    },
    {
        "slug": "usa",
        "name": "United States",
        "title": "Study in the United States",
        "badge": "STUDY IN USA",
        "highlight": "World Top 100 Universities & STEM OPT",
        "desc": "Access Ivy League, Tier-1 research universities, 3-year STEM OPT work permit, and extensive on-campus assistantships.",
        "image": "/assets/atlas/source-images/countries/USA.png",
        "scenery": "/assets/atlas/source-images/countries/country-2.jpg",
        "stats": [
            {"label": "Top 100 Global Unis", "value": "50+ US Unis"},
            {"label": "Average Tuition / Year", "value": "$20k - $45k"},
            {"label": "STEM OPT Stayback", "value": "Up to 3 Years"},
            {"label": "Scholarship Aid", "value": "Up to 100% Aid"}
        ]
    },
    {
        "slug": "canada",
        "name": "Canada",
        "title": "Study in Canada",
        "badge": "STUDY IN CANADA",
        "highlight": "Post-Graduation Work Permit & PR Pathways",
        "desc": "Affordable world-class education, safe multicultural cities, 3-year PGWP, and clear permanent residency streams.",
        "image": "/assets/atlas/source-images/countries/Canada.png",
        "scenery": "/assets/atlas/source-images/countries/country-3.jpg",
        "stats": [
            {"label": "Post-Grad Work Permit", "value": "Up to 3 Years"},
            {"label": "Average Tuition / Year", "value": "CAD $16k - $32k"},
            {"label": "Permanent Residency", "value": "Express Entry & PNP"},
            {"label": "Work While Studying", "value": "24 hrs/week"}
        ]
    },
    {
        "slug": "australia",
        "name": "Australia",
        "title": "Study in Australia",
        "badge": "STUDY IN AUSTRALIA",
        "highlight": "Group of Eight Excellence & High Quality of Life",
        "desc": "Globally ranked institutions, generous post-study work visas, high student minimum wage, and warm lifestyle.",
        "image": "/assets/atlas/source-images/countries/Australia.png",
        "scenery": "/assets/atlas/source-images/countries/country-4.jpg",
        "stats": [
            {"label": "Group of Eight (Go8)", "value": "World Top 50"},
            {"label": "Average Tuition / Year", "value": "AUD $22k - $42k"},
            {"label": "Post-Study Work Visa", "value": "2 to 4 Years"},
            {"label": "Hourly Student Wage", "value": "AUD $24.10/hr"}
        ]
    },
    {
        "slug": "germany",
        "name": "Germany",
        "title": "Study in Germany",
        "badge": "STUDY IN GERMANY",
        "highlight": "Zero Tuition Fees & Engineering Powerhouse",
        "desc": "World-class public universities with €0 tuition, 18-month job search visa, and Europe's largest industrial economy.",
        "image": "/assets/atlas/source-images/countries/germany.png",
        "scenery": "/assets/atlas/source-images/countries/country-5.jpg",
        "stats": [
            {"label": "Public Uni Tuition", "value": "€0 / Free Tuition"},
            {"label": "Job Seeking Visa", "value": "18 Months"},
            {"label": "TU9 Tech Universities", "value": "World Leaders"},
            {"label": "Part-Time Work Limit", "value": "140 Full Days/Yr"}
        ]
    },
    {
        "slug": "ireland",
        "name": "Ireland",
        "title": "Study in Ireland",
        "badge": "STUDY IN IRELAND",
        "highlight": "European Silicon Valley & High Tech Careers",
        "desc": "European headquarters for Google, Apple, Meta, Pfizer, and TikTok with 2-year post-study work visa for Masters graduates.",
        "image": "/assets/atlas/source-images/countries/Ireland.png",
        "scenery": "/assets/atlas/source-images/countries/country-6.jpg",
        "stats": [
            {"label": "Masters Stayback Visa", "value": "2 Years (Stamp 1G)"},
            {"label": "Average Tuition / Year", "value": "€10k - €22k"},
            {"label": "Tech Starting Salaries", "value": "€45k - €65k"},
            {"label": "Language", "value": "100% English Euro"}
        ]
    },
    {
        "slug": "france",
        "name": "France",
        "title": "Study in France",
        "badge": "STUDY IN FRANCE",
        "highlight": "Top Business Grande Écoles & Government Housing Subsidy",
        "desc": "Triple-accredited management schools, low state university fees, CAF student rent subsidies, and 5-year Schengen travel visas.",
        "image": "/assets/atlas/source-images/countries/france.png",
        "scenery": "/assets/atlas/source-images/countries/country-7.jpg",
        "stats": [
            {"label": "Post-Study Visa (APS)", "value": "2 Years"},
            {"label": "Average Tuition / Year", "value": "€8k - €20k"},
            {"label": "CAF Housing Subsidy", "value": "Up to 40% Rent Back"},
            {"label": "Schengen Visa", "value": "5-Year Travel Grant"}
        ]
    },
    {
        "slug": "italy",
        "name": "Italy",
        "title": "Study in Italy",
        "badge": "STUDY IN ITALY",
        "highlight": "100% Regional DSU Scholarships & Design Heritage",
        "desc": "Europe's most affordable study destination with comprehensive regional grants covering 100% tuition, free housing, and cash stipends.",
        "image": "/assets/atlas/source-images/countries/italy.png",
        "scenery": "/assets/atlas/source-images/countries/country-1.jpg",
        "stats": [
            {"label": "Regional DSU Aid", "value": "100% Fee + Stipend"},
            {"label": "Average Tuition / Year", "value": "€1,000 - €4,000"},
            {"label": "Post-Study Visa", "value": "1 Year"},
            {"label": "Top Programs", "value": "Design & Engineering"}
        ]
    },
    {
        "slug": "new-zealand",
        "name": "New Zealand",
        "title": "Study in New Zealand",
        "badge": "STUDY IN NEW ZEALAND",
        "highlight": "Top 3% Globally Ranked Universities & Green List PR",
        "desc": "100% of New Zealand universities are ranked in the QS World Top 500, offering generous stayback work visas and fast-track residency.",
        "image": "/assets/atlas/source-images/countries/newzealand.png",
        "scenery": "/assets/atlas/source-images/countries/country-2.jpg",
        "stats": [
            {"label": "Post-Study Work Visa", "value": "Up to 3 Years"},
            {"label": "Average Tuition / Year", "value": "NZD $20k - $35k"},
            {"label": "All 8 Public Unis", "value": "QS World Top 500"},
            {"label": "Spouse Work Rights", "value": "Full-Time Open Work"}
        ]
    },
    {
        "slug": "uae",
        "name": "United Arab Emirates",
        "title": "Study in Dubai & UAE",
        "badge": "STUDY IN UAE",
        "highlight": "Tax-Free Dynamic Economy & Leading Global Branch Campuses",
        "desc": "Earn an accredited British, Australian, or American degree in Dubai with zero tax, rapid career growth, and direct post-study hiring.",
        "image": "/assets/atlas/source-images/countries/UAE.png",
        "scenery": "/assets/atlas/source-images/countries/dubai.png",
        "stats": [
            {"label": "Global Branch Campuses", "value": "30+ Elite Campuses"},
            {"label": "Average Tuition / Year", "value": "AED 35k - 75k"},
            {"label": "Income Tax", "value": "0% Tax-Free Earnings"},
            {"label": "Visa Grant Rate", "value": "100% Success"}
        ]
    },
    {
        "slug": "china",
        "name": "China",
        "title": "Study in China",
        "badge": "STUDY IN CHINA",
        "highlight": "CSC Full Scholarships & World-Class Tech Infrastructure",
        "desc": "High-tech academic infrastructure, English-medium MBBS medical programs, fully-funded government scholarships, and low living expenses.",
        "image": "/assets/atlas/source-images/countries/china.png",
        "scenery": "/assets/atlas/source-images/countries/country-4.jpg",
        "stats": [
            {"label": "Chinese Gov (CSC) Aid", "value": "Full Tuition + Stipend"},
            {"label": "Average Tuition / Year", "value": "RMB 18k - 35k"},
            {"label": "English MBBS Medical", "value": "WHO / NMC Approved"},
            {"label": "Living Cost", "value": "Very Affordable"}
        ]
    }
]

template = """import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import CountryGlobe3DCanvas from "@/components/canvas/CountryGlobe3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { CheckCircle2, GraduationCap, DollarSign, Clock, ShieldCheck, Award, BookOpen, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "__PAGE_TITLE__ — Universities, Cost & Visa | Atlas Study",
  description: "__PAGE_DESC__",
};

const STATS = [
  { label: "__STAT0_LABEL__", value: "__STAT0_VAL__", icon: GraduationCap },
  { label: "__STAT1_LABEL__", value: "__STAT1_VAL__", icon: DollarSign },
  { label: "__STAT2_LABEL__", value: "__STAT2_VAL__", icon: Clock },
  { label: "__STAT3_LABEL__", value: "__STAT3_VAL__", icon: Award },
];

export default function StudyInDestinationPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="__PAGE_BADGE__"
        title="__PAGE_TITLE__"
        titleHighlight="__PAGE_HIGHLIGHT__"
        description="__PAGE_DESC__"
        breadcrumbs={[{ label: "Countries", href: "/countries" }, { label: "__COUNTRY_NAME__" }]}
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
              WHY CHOOSE __COUNTRY_NAME_UPPER__
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              World-Class Academia & High Post-Study Career Prospects
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Studying in __COUNTRY_NAME__ provides access to globally recognized qualifications, industry-linked curricula, and diverse international campuses. Atlas Study guides you through every step: university profiling, admission filings, scholarship waivers, and visa endorsement.
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
                  src="__SCENERY_IMG__"
                  alt="__COUNTRY_NAME__ Campus & Landscape"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* 3D Atlas Country Cutout Graphic */}
                <div className="absolute bottom-4 right-4 h-32 w-32 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="__COUNTRY_IMG__"
                    alt="__COUNTRY_NAME__ Cutout"
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>

                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Destination</span>
                  <h3 className="text-2xl font-black text-white">__COUNTRY_NAME__</h3>
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
"""

for c in countries:
    code = template
    code = code.replace("__PAGE_TITLE__", c["title"])
    code = code.replace("__PAGE_DESC__", c["desc"])
    code = code.replace("__PAGE_BADGE__", c["badge"])
    code = code.replace("__PAGE_HIGHLIGHT__", c["highlight"])
    code = code.replace("__COUNTRY_NAME__", c["name"])
    code = code.replace("__COUNTRY_NAME_UPPER__", c["name"].upper())
    code = code.replace("__SCENERY_IMG__", c["scenery"])
    code = code.replace("__COUNTRY_IMG__", c["image"])
    code = code.replace("__STAT0_LABEL__", c["stats"][0]["label"])
    code = code.replace("__STAT0_VAL__", c["stats"][0]["value"])
    code = code.replace("__STAT1_LABEL__", c["stats"][1]["label"])
    code = code.replace("__STAT1_VAL__", c["stats"][1]["value"])
    code = code.replace("__STAT2_LABEL__", c["stats"][2]["label"])
    code = code.replace("__STAT2_VAL__", c["stats"][2]["value"])
    code = code.replace("__STAT3_LABEL__", c["stats"][3]["label"])
    code = code.replace("__STAT3_VAL__", c["stats"][3]["value"])

    dest_path = f"app/countries/{c['slug']}/page.tsx"
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    with open(dest_path, "w") as f:
        f.write(code)
    print(f"Updated {dest_path}")

print("All country detail pages updated cleanly!")

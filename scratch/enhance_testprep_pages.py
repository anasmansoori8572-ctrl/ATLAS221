import os

test_prep_courses = [
    {
        "slug": "ielts",
        "name": "IELTS Academic & General",
        "badge": "IELTS™ COACHING",
        "title": "IELTS Coaching Classes",
        "highlight": "Guaranteed Band 7.5+ Strategy",
        "desc": "Master IELTS Academic and General Training with Atlas Study. Expert trainers, daily 1-on-1 speaking practice, weekly essay evaluations, and 20+ mock exams.",
        "image": "/assets/atlas/source-images/test-prep/IELTS.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-14.jpg",
        "stats": [
            {"label": "Target Band", "value": "7.5 - 8.5"},
            {"label": "Mock Tests", "value": "20+ Full Length"},
            {"label": "Class Batch Size", "value": "Small (10 max)"},
            {"label": "Success Rate", "value": "99% Qualify"}
        ]
    },
    {
        "slug": "gre",
        "name": "GRE General Training",
        "badge": "GRE® MASTERCLASS",
        "title": "GRE Exam Preparation",
        "highlight": "Score 325+ Quantitative & Verbal",
        "desc": "Comprehensive GRE coaching with advanced quantitative shortcut techniques, high-frequency 3,000+ vocabulary mastery, and analytical writing scoring strategies.",
        "image": "/assets/atlas/source-images/test-prep/GRE.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-15.jpg",
        "stats": [
            {"label": "Target Score", "value": "320 - 335+"},
            {"label": "Practice Questions", "value": "5,000+ Bank"},
            {"label": "Quant Shortcuts", "value": "100+ Formulas"},
            {"label": "AWA Score", "value": "4.5 - 5.5+"}
        ]
    },
    {
        "slug": "gmat",
        "name": "GMAT Focus Edition",
        "badge": "GMAT® FOCUS EDITION",
        "title": "GMAT Coaching & Strategy",
        "highlight": "Score 705+ for Top Business Schools",
        "desc": "Target top 20 global MBA business schools with focused Data Insights, Quantitative reasoning, and Verbal precision training.",
        "image": "/assets/atlas/source-images/test-prep/GMAT.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-16.jpg",
        "stats": [
            {"label": "Target Score", "value": "695 - 735+"},
            {"label": "Data Insights", "value": "Full Coverage"},
            {"label": "1-on-1 Mentoring", "value": "Weekly Sessions"},
            {"label": "MBA Admissions", "value": "Ivy League & Tier 1"}
        ]
    },
    {
        "slug": "toefl",
        "name": "TOEFL iBT Training",
        "badge": "TOEFL® iBT COACHING",
        "title": "TOEFL iBT Preparation",
        "highlight": "Score 105+ for US & Global Unis",
        "desc": "Master computer-delivered TOEFL iBT with real-time audio note-taking techniques, integrated writing feedback, and timed speaking response training.",
        "image": "/assets/atlas/source-images/test-prep/TOEFL.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-17.jpg",
        "stats": [
            {"label": "Target Score", "value": "105 - 118+"},
            {"label": "Speech Analysis", "value": "AI + Trainer"},
            {"label": "Simulated Labs", "value": "15+ Full iBTs"},
            {"label": "Acceptance", "value": "160+ Countries"}
        ]
    },
    {
        "slug": "sat",
        "name": "Digital SAT Training",
        "badge": "DIGITAL SAT® COACHING",
        "title": "Digital SAT Preparation",
        "highlight": "Score 1500+ for Undergrad Scholarships",
        "desc": "Expert guidance for the adaptive Digital SAT. Master Bluebook exam strategies, Desmos calculator shortcuts, and reading comprehension logic.",
        "image": "/assets/atlas/source-images/test-prep/SAT.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-18.jpg",
        "stats": [
            {"label": "Target Score", "value": "1480 - 1580+"},
            {"label": "Desmos Mastery", "value": "Live Workshops"},
            {"label": "Adaptive Drills", "value": "Module 1 & 2 Hard"},
            {"label": "Scholarship Target", "value": "Up to 100% Aid"}
        ]
    },
    {
        "slug": "pte",
        "name": "PTE Academic Training",
        "badge": "PTE ACADEMIC™ COACHING",
        "title": "PTE Academic Classes",
        "highlight": "Score 79+ (8 Band Equivalent)",
        "desc": "Fast-track your Australia, UK, and New Zealand visa qualifications with computer-scored PTE templates, repeat sentence drills, and dictation algorithms.",
        "image": "/assets/atlas/source-images/test-prep/PTE.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-14.jpg",
        "stats": [
            {"label": "Target Score", "value": "79 - 90 Max"},
            {"label": "AI Portal Access", "value": "Unlimited Scoring"},
            {"label": "Fast Results", "value": "48 Hours"},
            {"label": "Visa Acceptance", "value": "100% Aus / UK / NZ"}
        ]
    },
    {
        "slug": "duolingo",
        "name": "Duolingo English Test (DET)",
        "badge": "DUOLINGO DET COACHING",
        "title": "Duolingo English Test Prep",
        "highlight": "Score 130+ Fast-Track Certification",
        "desc": "Complete at-home English test certification accepted by 4,000+ universities worldwide. Master adaptive subscores, interactive reading, and interview videos.",
        "image": "/assets/atlas/source-images/test-prep/DUOLINGO.jpg",
        "secondary_image": "/assets/atlas/source-images/test-prep/coaching-15.jpg",
        "stats": [
            {"label": "Target Score", "value": "130 - 150+"},
            {"label": "Test Duration", "value": "1 Hour Online"},
            {"label": "Results In", "value": "48 Hours"},
            {"label": "Unis Accepting", "value": "4,000+ Global"}
        ]
    }
]

template = """import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import AudioWave3DCanvas from "@/components/canvas/AudioWave3DCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { Award, CheckCircle2, Clock, BookOpen, Mic, FileText, Headphones, ArrowRight, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "__PAGE_TITLE__ | Atlas Study",
  description: "__PAGE_DESC__",
};

const STATS = [
  { label: "__STAT0_LABEL__", value: "__STAT0_VAL__", icon: Award },
  { label: "__STAT1_LABEL__", value: "__STAT1_VAL__", icon: BookOpen },
  { label: "__STAT2_LABEL__", value: "__STAT2_VAL__", icon: Clock },
  { label: "__STAT3_LABEL__", value: "__STAT3_VAL__", icon: CheckCircle2 },
];

export default function __PAGE_COMPONENT__() {
  return (
    <main className="w-full">
      <PageHeader
        badge="__PAGE_BADGE__"
        title="__PAGE_TITLE__"
        titleHighlight="__PAGE_HIGHLIGHT__"
        description="__PAGE_DESC__"
        breadcrumbs={[{ label: "Test Prep", href: "/coaching" }, { label: "__PAGE_NAME__" }]}
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
              __PAGE_DESC__
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
                  src="__IMG_1__"
                  alt="__PAGE_NAME__ Prep Course"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-bold text-rose-400 block">Official Material</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">__PAGE_NAME__ Masterclass</h4>
                </div>
              </div>

              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="__IMG_2__"
                  alt="__PAGE_NAME__ Classroom Experience"
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
"""

for t in test_prep_courses:
    comp_name = f"{t['slug'].upper()}PrepPage"
    code = template.replace("__PAGE_TITLE__", t["title"])
    code = code.replace("__PAGE_DESC__", t["desc"])
    code = code.replace("__PAGE_BADGE__", t["badge"])
    code = code.replace("__PAGE_HIGHLIGHT__", t["highlight"])
    code = code.replace("__PAGE_NAME__", t["name"])
    code = code.replace("__PAGE_COMPONENT__", comp_name)
    code = code.replace("__IMG_1__", t["image"])
    code = code.replace("__IMG_2__", t["secondary_image"])
    code = code.replace("__STAT0_LABEL__", t["stats"][0]["label"])
    code = code.replace("__STAT0_VAL__", t["stats"][0]["value"])
    code = code.replace("__STAT1_LABEL__", t["stats"][1]["label"])
    code = code.replace("__STAT1_VAL__", t["stats"][1]["value"])
    code = code.replace("__STAT2_LABEL__", t["stats"][2]["label"])
    code = code.replace("__STAT2_VAL__", t["stats"][2]["value"])
    code = code.replace("__STAT3_LABEL__", t["stats"][3]["label"])
    code = code.replace("__STAT3_VAL__", t["stats"][3]["value"])

    # Update app/test-prep/[slug]/page.tsx
    dest1 = f"app/test-prep/{t['slug']}/page.tsx"
    os.makedirs(os.path.dirname(dest1), exist_ok=True)
    with open(dest1, "w") as f:
        f.write(code)
    print(f"Updated {dest1}")

    # Also update root alias app/[slug]/page.tsx
    dest2 = f"app/{t['slug']}/page.tsx"
    os.makedirs(os.path.dirname(dest2), exist_ok=True)
    with open(dest2, "w") as f:
        f.write(code)
    print(f"Updated {dest2}")

print("Test prep pages updated successfully!")

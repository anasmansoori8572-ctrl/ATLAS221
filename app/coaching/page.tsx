import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import GeometricMathCanvas from "@/components/canvas/GeometricMathCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Award, BookOpen, CheckCircle2, Clock, Sparkles, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Test Preparation Programs — IELTS, GRE, GMAT, TOEFL, SAT, PTE | Atlas Study",
  description:
    "Master global standardized exams with Atlas Study Consultants. Certified trainers, simulated computer mock labs, and personalized 1-on-1 feedback.",
};

const COURSES = [
  {
    name: "IELTS Preparation",
    code: "IELTS™",
    href: "/test-prep/ielts",
    image: "/assets/atlas/source-images/test-prep/IELTS.jpg",
    target: "Band 7.5+",
    duration: "4 - 8 Weeks",
    desc: "Comprehensive Listening, Reading, Writing, and 1-on-1 Speaking mock interviews with certified examiners.",
    features: ["Daily 1-on-1 Speaking Drills", "Weekly Essay Rubric Scoring", "20+ Full Computer/Paper Mocks"],
  },
  {
    name: "GRE Coaching",
    code: "ETS GRE®",
    href: "/test-prep/gre",
    image: "/assets/atlas/source-images/test-prep/GRE.jpg",
    target: "320+ Score",
    duration: "8 - 12 Weeks",
    desc: "Master Quantitative & Verbal reasoning shortcuts, vocabulary building systems, and computer-adaptive mocks.",
    features: ["100+ Hours Live Training", "Shortcut Math Labs & Geometry", "15+ Full Adaptive Mock Tests"],
  },
  {
    name: "GMAT Focus Edition",
    code: "GMAT Focus",
    href: "/test-prep/gmat",
    image: "/assets/atlas/source-images/test-prep/GMAT.jpg",
    target: "695+ Score",
    duration: "10 - 12 Weeks",
    desc: "Target top business schools with intensive Data Insights, Critical Reasoning, and Quantitative problem-solving.",
    features: ["750+ Percentile Mentors", "Dedicated Data Insights Lab", "Targeted Review & Edit Strategy"],
  },
  {
    name: "TOEFL iBT Classes",
    code: "ETS TOEFL",
    href: "/test-prep/toefl",
    image: "/assets/atlas/source-images/test-prep/TOEFL.jpg",
    target: "100+ Score",
    duration: "4 - 6 Weeks",
    desc: "Shorter 2-hour test structure training using official ETS diagnostic courseware and speech analysis.",
    features: ["Official ETS Courseware", "Academic Synthesis Drills", "Accent Neutralization Labs"],
  },
  {
    name: "Digital SAT Prep",
    code: "Digital SAT®",
    href: "/test-prep/sat",
    image: "/assets/atlas/source-images/test-prep/SAT.jpg",
    target: "1450+ Score",
    duration: "8 - 12 Weeks",
    desc: "High-school prep for US undergrad admissions & full merit scholarships with Bluebook testing simulations.",
    features: ["Official Bluebook Simulations", "Desmos Calculator Mastery", "Ivy League Faculty Mentors"],
  },
  {
    name: "Pearson PTE Academic",
    code: "Pearson PTE",
    href: "/test-prep/pte",
    image: "/assets/atlas/source-images/test-prep/PTE.jpg",
    target: "79+ Score",
    duration: "3 - 6 Weeks",
    desc: "AI-scoring technology practice in our dedicated computer lab with automated speech and writing feedback.",
    features: ["AI Voice Recognition Labs", "48-Hour Fast Results Prep", "High-Frequency Question Banks"],
  },
  {
    name: "Duolingo English Test",
    code: "Duolingo DET",
    href: "/test-prep/duolingo",
    image: "/assets/atlas/source-images/test-prep/DUOLINGO.jpg",
    target: "125+ Score",
    duration: "2 - 4 Weeks",
    desc: "Fast-track 1-hour adaptive at-home exam coaching accepted by 4,500+ global universities.",
    features: ["Video Interview Practice", "Adaptive Subscore Mastery", "Typing Speed Enhancement"],
  },
];

export default function CoachingOverviewPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="TEST PREPARATION"
        title="Highly Qualified &"
        titleHighlight="Experienced Trainers"
        description="Empower your international admissions journey with world-class test preparation, AI-driven mock labs, and personalized 1-on-1 mentor guidance."
        breadcrumbs={[{ label: "Test Prep", href: "/coaching" }, { label: "Overview" }]}
        canvas={<GeometricMathCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Course Grid with 3D Spotlight Cards */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  STANDARDIZED EXAMS
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
                Our Core Coaching Programs
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Small batch sizes (10–15 students), updated official courseware, and individual doubt-clearing sessions.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, index) => (
              <ScrollReveal key={course.name} delay={index * 70}>
                <Spotlight3DCard className="h-full p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                        {course.code}
                      </span>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                        Target: {course.target}
                      </span>
                    </div>

                    <div className="relative mt-4 h-40 w-full overflow-hidden rounded-2xl bg-slate-950">
                      <Image
                        src={course.image}
                        alt={course.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {course.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <Clock size={13} className="text-rose-600" />
                      <span>Duration: {course.duration}</span>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {course.desc}
                    </p>

                    <ul className="mt-5 flex flex-col gap-2">
                      {course.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="shrink-0 text-emerald-600" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <Link
                      href={course.href}
                      className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-600 shadow-md group-hover:shadow-rose-600/30"
                    >
                      <span>View Exam Syllabus & Strategy</span>
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
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <CounselingForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

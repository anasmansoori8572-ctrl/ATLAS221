import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import OrbitUniverseCanvas from "@/components/canvas/OrbitUniverseCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import PerspectiveImageCard from "@/components/motion/PerspectiveImageCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import {
  Award,
  Compass,
  Target,
  Eye,
  Gem,
  CheckCircle2,
  Users,
  ShieldCheck,
  Clock,
  ArrowRight,
  Download,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Trusted Immigration & Study Abroad Consultant | Atlas Study",
  description:
    "Reliable Service Since 2010. Atlas Study Consultants is a leading study abroad consultancy in North India providing university admissions, maximum scholarships, and visa assistance.",
};

const WHY_CHOOSE_US = [
  {
    title: "Direct Interviews",
    desc: "1-on-1 personalized profile evaluation and direct university admissions interview coaching.",
    icon: Users,
  },
  {
    title: "Cost-Effective",
    desc: "100% transparent process focused on securing maximum merit-based institutional scholarships.",
    icon: Award,
  },
  {
    title: "Faster Processing",
    desc: "Accelerated CAS, I-20, and offer letter generation through direct partner university channels.",
    icon: Clock,
  },
  {
    title: "Trusted by Clients",
    desc: "Over 14 years of proven excellence guiding 20,000+ students across North India and globally.",
    icon: ShieldCheck,
  },
  {
    title: "Visa Assistance",
    desc: "Comprehensive visa documentation, financial proofing, and embassy mock interview preparation.",
    icon: CheckCircle2,
  },
  {
    title: "24/7 Support",
    desc: "Round-the-clock student assistance from course shortlisting to post-arrival accommodation.",
    icon: Compass,
  },
];

const STATS = [
  { name: "Student Visa Success", percent: 98, color: "from-rose-500 to-pink-500" },
  { name: "Residence & PR Visa", percent: 92, color: "from-rose-600 to-pink-600" },
  { name: "Tourist & Visitor Visa", percent: 86, color: "from-slate-800 to-slate-900" },
  { name: "Business & Corporate Visa", percent: 78, color: "from-rose-700 to-red-600" },
];

export default function AboutPage() {
  return (
    <main className="w-full">
      {/* 1. Page Header with 3D Orbit Universe Visual */}
      <PageHeader
        badge="ABOUT ATLAS STUDY"
        title="Trusted Study Abroad &"
        titleHighlight="Immigration Consultant"
        description="Reliable Service Since 2010. Empowering students with top university admissions, maximum scholarship aid, and guaranteed visa guidance across 25+ global destinations."
        breadcrumbs={[{ label: "About Us" }]}
        canvas={<OrbitUniverseCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* 2. Main Narrative & Founder Story Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            {/* Left Column: Visual Bento & Founder Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ScrollReveal delay={100} direction="left">
                <Spotlight3DCard
                  maxTilt={8}
                  glareColor="rgba(244, 63, 94, 0.2)"
                  className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white border-rose-500/30 shadow-2xl p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300 ring-1 ring-rose-400/30">
                      <Award size={24} />
                    </div>
                    <span className="rounded-full bg-rose-500/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-rose-300 ring-1 ring-rose-400/30">
                      Est. 2010
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="text-5xl font-black tracking-tight text-white sm:text-6xl">
                      14<span className="text-rose-400">+</span>
                    </div>
                    <p className="mt-1 text-sm font-bold uppercase tracking-wider text-rose-200">
                      Years of Proven Excellence
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-300">
                      Headquartered in Kanpur with branch operations serving ambitious students nationwide across North India.
                    </p>
                  </div>
                </Spotlight3DCard>
              </ScrollReveal>

              {/* Founder Profile Card with 3D Spotlight */}
              <ScrollReveal delay={200} direction="left">
                <Spotlight3DCard className="p-5 bg-slate-50/90 border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-rose-500 shrink-0">
                      <Image
                        src="/assets/atlas/source-images/team/rakim.jpg"
                        alt="Mr. Rakim Sultan"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">Mr. Rakim Sultan</h4>
                      <p className="text-xs font-semibold text-rose-600">Founder & Managing Director</p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        15+ years of strategic leadership & global university partnerships.
                      </p>
                    </div>
                  </div>
                </Spotlight3DCard>
              </ScrollReveal>
            </div>

            {/* Right Column: Detailed Narrative Text (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <ScrollReveal delay={150}>
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                    OUR PHILOSOPHY
                  </span>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
                </div>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Because it helps to study abroad with someone who{" "}
                  <span className="bg-gradient-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
                    knows the way.
                  </span>
                </h2>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                  Atlas is one of the premier study abroad consultancies in international education services. Our central mission is to reduce the high cost of overseas education by focusing on providing maximum scholarships to meritorious students.
                </p>

                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  Our extensive network of approachable experts helps you identify and secure the university where you can thrive. We connect you directly to your desired course in the most suitable institution in over 25 countries — turning your plan into a launchpad for lifelong professional success.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 w-full sm:w-auto">
                  <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4 transition-transform duration-300 hover:scale-105">
                    <div className="text-2xl font-black text-slate-900">20,000+</div>
                    <div className="text-xs font-bold text-slate-500">Students Guided</div>
                  </div>
                  <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4 transition-transform duration-300 hover:scale-105">
                    <div className="text-2xl font-black text-slate-900">1,200+</div>
                    <div className="text-xs font-bold text-slate-500">Partner Universities</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, Values Statements with 3D Tilt */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-slate-900 text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,72,0.15),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-400" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-rose-300">
                  CORE PILLARS
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-400" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-white">
                Mission, Vision & Global Values
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <ScrollReveal delay={100}>
              <Spotlight3DCard
                glareColor="rgba(244, 63, 94, 0.2)"
                className="bg-slate-950/70 border-slate-800 text-white h-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600/20 text-rose-400 ring-1 ring-rose-500/30">
                  <Target size={24} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Our Mission</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                  To democratize access to world-class higher education by eliminating financial friction, securing top scholarships, and offering transparent, end-to-end admission guidance.
                </p>
              </Spotlight3DCard>
            </ScrollReveal>

            {/* Vision */}
            <ScrollReveal delay={200}>
              <Spotlight3DCard
                glareColor="rgba(236, 72, 153, 0.2)"
                className="bg-slate-950/70 border-slate-800 text-white h-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600/20 text-pink-400 ring-1 ring-pink-500/30">
                  <Eye size={24} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Our Vision</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                  To be India&apos;s most reliable, ethical, and technology-driven overseas education consultancy, empowering 100,000+ global scholars by 2030.
                </p>
              </Spotlight3DCard>
            </ScrollReveal>

            {/* Values */}
            <ScrollReveal delay={300}>
              <Spotlight3DCard
                glareColor="rgba(244, 63, 94, 0.2)"
                className="bg-slate-950/70 border-slate-800 text-white h-full"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600/20 text-rose-400 ring-1 ring-rose-500/30">
                  <Gem size={24} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Core Values</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-400">
                  Integrity, uncompromising student-centricity, excellence in document verification, and proactive mentorship that extends beyond admissions into career growth.
                </p>
              </Spotlight3DCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (6 3D Feature Cards Grid) */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/30 to-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  WHY CHOOSE ATLAS
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
                Reasons For Choosing Us
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Comprehensive guidance from standardized test preparation to final embassy visa approval.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <Spotlight3DCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-600 group-hover:text-white transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </Spotlight3DCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistical Performance Section & Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Statistics Bars (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal direction="left">
              <div>
                <div className="inline-flex items-center gap-3">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                    VERIFIED IMPACT
                  </span>
                  <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
                </div>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl text-slate-900">
                  The Impact of Our Competitive Efforts
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  Our strict documentation quality benchmarks guarantee high visa approval ratios across all visa streams.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {STATS.map((stat) => (
                  <div key={stat.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>{stat.name}</span>
                      <span className="text-rose-600">{stat.percent}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                        style={{ width: `${stat.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/50 p-5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Official Report</h4>
                  <p className="text-[11px] text-slate-500">Download Atlas Annual Admissions Report</p>
                </div>
                <Link
                  href="/contact"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-rose-600 transition-colors"
                >
                  <Download size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Counseling Lead Form (7 Cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <CounselingForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}

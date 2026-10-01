import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import OrbitUniverseCanvas from "@/components/canvas/OrbitUniverseCanvas";
import FaqAccordion from "@/components/shared/FaqAccordion";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { MessageSquare, Phone, Mail, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ's) — Study Abroad & Visas | Atlas Study",
  description:
    "Find answers to frequently asked questions regarding study abroad applications, English language test waivers, visa processing, scholarships, and costs.",
};

export default function FaqPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="MOST COMMON Q & A"
        title="Frequently Asked"
        titleHighlight="Questions"
        description="Everything you need to know about university admissions, eligibility criteria, scholarships, visa documentation, and life abroad."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "FAQ’s" }]}
        canvas={<OrbitUniverseCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Main FAQ Section with Scroll Reveal */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <FaqAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Help & Free Counseling Form */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Assistance Info (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollReveal direction="left">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  NEED MORE CLARITY?
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>

              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
                Have Specific Questions About Your Profile?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Every student&apos;s academic background, test scores, and budget are unique. Talk directly with a certified Atlas Study advisor to get tailored advice for your target country and intake.
              </p>

              <div className="mt-6">
                <Spotlight3DCard className="p-6 bg-rose-50/60 border-rose-200/80">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/20">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        Central Helpline
                      </div>
                      <a
                        href="tel:+919956902444"
                        className="text-sm font-black text-slate-900 hover:text-rose-600 transition-colors"
                      >
                        +91 9956902444
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 pt-4 mt-4 border-t border-rose-200/60">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 text-white shadow-md shadow-rose-500/20">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                        Admissions Email
                      </div>
                      <a
                        href="mailto:admissions@atlasstudy.in"
                        className="text-sm font-black text-slate-900 hover:text-rose-600 transition-colors"
                      >
                        admissions@atlasstudy.in
                      </a>
                    </div>
                  </div>
                </Spotlight3DCard>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Counseling Form (7 Cols) */}
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import OrbitUniverseCanvas from "@/components/canvas/OrbitUniverseCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import Spotlight3DCard from "@/components/motion/Spotlight3DCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { Award, GraduationCap, ShieldCheck, Mail, Phone, ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Leadership Team — Expert Counselors & Mentors | Atlas Study",
  description:
    "Meet our expert leadership team at Atlas Study Consultants. Dedicated admissions mentors and visa experts guiding students to top global universities.",
};

const TEAM_MEMBERS = [
  {
    name: "Mr. Rakim Sultan",
    role: "Founder & Managing Director",
    image: "/assets/atlas/source-images/team/rakim.jpg",
    bio: "Pioneering international education consultancy with 15+ years of strategic leadership, overseas institutional alliances, and scholarship facilitation.",
    metrics: ["15+ Yrs Experience", "500+ Partner Unis", "10k+ Visas Secured"],
    email: "rakim@atlasstudy.com",
  },
  {
    name: "Mr. Zaid Sultan",
    role: "Director of University Relations",
    image: "/assets/atlas/source-images/team/Zaid.png",
    bio: "Spearheading global university delegations, institutional tie-ups, and direct admissions channels across UK, USA, Canada, Ireland, and Europe.",
    metrics: ["Direct Admissions", "$5M+ Aid Secured", "Global Alliances"],
    email: "zaid@atlasstudy.com",
  },
  {
    name: "Mr. Abdul Ali",
    role: "Head Student Recruiter & Counselor",
    image: "/assets/atlas/source-images/team/ali.jpeg",
    bio: "Leading student profile assessment, SOP/LOR drafting, university shortlisting, and 1-on-1 consular visa mock interview coaching.",
    metrics: ["Top SOP Mentor", "98% Visa Rate", "Personalized Counseling"],
    email: "abdul@atlasstudy.com",
  },
];

export default function TeamPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="EXPERT LEADERSHIP"
        title="Our Team At"
        titleHighlight="Your Service"
        description="Dedicated international education consultants, certified trainers, and former visa officers committed to turning your study abroad dream into reality."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our Team" }]}
        canvas={<OrbitUniverseCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Leadership Showcase Grid with 3D Depth */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-rose-600" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  ADMISSIONS EXPERTS
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-rose-600" />
              </div>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-slate-900">
                Meet Our Leadership & Mentors
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Over a decade of expertise in international university admissions, scholarship securing, and visa approvals.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 120}>
                <Spotlight3DCard
                  maxTilt={8}
                  glareColor="rgba(244, 63, 94, 0.18)"
                  className="h-full p-8"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* 3D Elevated Portrait with Glow Ring */}
                    <div className="relative h-44 w-44 overflow-hidden rounded-full ring-4 ring-rose-100 group-hover:ring-rose-400 group-hover:scale-105 transition-all duration-500 shadow-xl shadow-rose-950/10">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="mt-6 text-xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-rose-600">
                      {member.role}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 w-full">
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {member.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full bg-rose-50 px-2.5 py-1 text-[10px] font-extrabold text-rose-700 border border-rose-100 transition-transform duration-300 group-hover:scale-105"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`mailto:${member.email}`}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-rose-600 shadow-md hover:shadow-rose-600/30"
                    >
                      <Mail size={13} />
                      <span>{member.email}</span>
                    </a>
                  </div>
                </Spotlight3DCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Counseling Form Section */}
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

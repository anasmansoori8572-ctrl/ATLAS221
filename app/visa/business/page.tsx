import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import TravelNetworkCanvas from "@/components/canvas/TravelNetworkCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Travel & Global Investor Visa Programs | Atlas Study",
  description: "Fast-track business delegation travel, investor immigration, corporate branch transfers, and commercial meeting visas.",
};

export default function BusinessVisaPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="BUSINESS VISA SERVICES"
        title="Business Travel & Global Investor Visa Programs"
        titleHighlight="Commercial Mobility Worldwide"
        description="Fast-track business delegation travel, investor immigration, corporate branch transfers, and commercial meeting visas."
        breadcrumbs={[{ label: "Visa", href: "/visa" }, { label: "Business & Investor Visa" }]}
        canvas={<TravelNetworkCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Visual Showcase Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                BUSINESS VISA CATEGORIES
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              End-to-End Filing, Documentation & Mock Verification
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Fast-track business delegation travel, investor immigration, corporate branch transfers, and commercial meeting visas.
            </p>

            <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Corporate sponsor invitations & commercial partnership vetting</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">High net-worth investor visa portfolio structuring</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Multi-entry commercial permits with 1-year to 10-year validity</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Expedited embassy appointment bookings and consular clearances</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="/assets/atlas/source-images/visa/visa-3.jpg"
                  alt="Business & Investor Visa Overview"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-bold text-rose-400 block">Verified Protocols</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Accredited Visa Counsel</h4>
                </div>
              </div>

              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="/assets/atlas/source-images/visa/visa-9.jpg"
                  alt="Business & Investor Visa Documentation"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] font-bold text-emerald-400 block">98% Success</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">Consular Interview Ready</h4>
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

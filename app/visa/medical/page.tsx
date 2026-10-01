import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import TravelNetworkCanvas from "@/components/canvas/TravelNetworkCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Overseas Medical Treatment & Attendant Visas | Atlas Study",
  description: "Emergency medical visa assistance for patients and accompanying family attendants seeking specialized treatments abroad.",
};

export default function MedicalVisaPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="MEDICAL VISA SERVICES"
        title="Overseas Medical Treatment & Attendant Visas"
        titleHighlight="Priority Healthcare Mobility"
        description="Emergency medical visa assistance for patients and accompanying family attendants seeking specialized treatments abroad."
        breadcrumbs={[{ label: "Visa", href: "/visa" }, { label: "Medical & Attendant Visa" }]}
        canvas={<TravelNetworkCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Visual Showcase Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                MEDICAL VISA FACILITATION
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              End-to-End Filing, Documentation & Mock Verification
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Emergency medical visa assistance for patients and accompanying family attendants seeking specialized treatments abroad.
            </p>

            <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Hospital acceptance letter & specialist physician referral validation</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Immediate urgent priority embassy filing and expedited interview waivers</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Medical attendant (MED-X) co-traveler visa endorsement</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={18} />
                <span className="text-xs font-semibold text-slate-800">Medical insurance and hospital treatment quotation verification</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="/assets/atlas/source-images/visa/visa-6.jpg"
                  alt="Medical & Attendant Visa Overview"
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
                  src="/assets/atlas/source-images/visa/visa-12.jpg"
                  alt="Medical & Attendant Visa Documentation"
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

import os

# 1. Visa subpages mapping
visa_pages = [
    {
        "slug": "student",
        "name": "Student Visa Guidance",
        "badge": "STUDENT VISA SERVICES",
        "title": "Student Visa Application & Documentation Support",
        "highlight": "98% Approval Track Record",
        "desc": "Navigate complex embassy requirements with zero stress. Atlas Study has secured 10,000+ student visas with a 98%+ approval track record.",
        "image": "/assets/atlas/source-images/visa/visa-1.jpg",
        "secondary_image": "/assets/atlas/source-images/visa/visa-7.jpg",
        "category_title": "Student Visa Streamlines",
        "points": [
            "Confirmation of Acceptance for Studies (CAS) & Form I-20 handling",
            "Blocked Account / GIC setup and 28-day fund verification",
            "Tailored Statement of Purpose (SOP) addressing Genuine Temporary Entrant criteria",
            "Consular 1-on-1 interview training with certified ex-visa officers"
        ]
    },
    {
        "slug": "residence",
        "name": "Permanent Residence Visa",
        "badge": "RESIDENCE VISA SERVICES",
        "title": "Permanent Residence & Skilled Migration Support",
        "highlight": "Fast-Track Immigration Pathways",
        "desc": "Comprehensive assessment and application filing for Canada Express Entry, Provincial Nominees, and Australian General Skilled Migration.",
        "image": "/assets/atlas/source-images/visa/visa-2.jpg",
        "secondary_image": "/assets/atlas/source-images/visa/visa-8.jpg",
        "category_title": "PR Pathways Covered",
        "points": [
            "Comprehensive CRS points calculation & optimization strategies",
            "Educational Credential Assessment (ECA) via WES, IQAS, or ICAS",
            "Provincial Nominee Program (PNP) state nomination submissions",
            "Post-landing settlement support and permanent resident card assistance"
        ]
    },
    {
        "slug": "business",
        "name": "Business & Investor Visa",
        "badge": "BUSINESS VISA SERVICES",
        "title": "Business Travel & Global Investor Visa Programs",
        "highlight": "Commercial Mobility Worldwide",
        "desc": "Fast-track business delegation travel, investor immigration, corporate branch transfers, and commercial meeting visas.",
        "image": "/assets/atlas/source-images/visa/visa-3.jpg",
        "secondary_image": "/assets/atlas/source-images/visa/visa-9.jpg",
        "category_title": "Business Visa Categories",
        "points": [
            "Corporate sponsor invitations & commercial partnership vetting",
            "High net-worth investor visa portfolio structuring",
            "Multi-entry commercial permits with 1-year to 10-year validity",
            "Expedited embassy appointment bookings and consular clearances"
        ]
    },
    {
        "slug": "tourist",
        "name": "Tourist & Visitor Visa",
        "badge": "TOURIST VISA SERVICES",
        "title": "Tourist, Visitor & Family Reunion Visa Processing",
        "highlight": "Hassle-Free Global Leisure Travel",
        "desc": "Smooth application filing for Schengen 29-nation visas, UK Visitor visas, US B1/B2, and Canadian tourist permits.",
        "image": "/assets/atlas/source-images/visa/visa-4.jpg",
        "secondary_image": "/assets/atlas/source-images/visa/visa-10.jpg",
        "category_title": "Tourist Coverage",
        "points": [
            "Complete Schengen itinerary design and hotel/flight reservation documentation",
            "Financial proof verification and sponsorship declaration drafting",
            "Biometric appointment procurement at VFS / TLScontact centers",
            "Urgent express processing for family emergencies and holiday trips"
        ]
    },
    {
        "slug": "conference",
        "name": "Conference & Academic Visa",
        "badge": "CONFERENCE VISA SERVICES",
        "title": "International Conference & Research Symposium Visas",
        "highlight": "Academic & Scientific Delegations",
        "desc": "Official visa clearance for scholars, professors, students, and researchers attending world congresses, summits, and symposiums.",
        "image": "/assets/atlas/source-images/visa/visa-5.jpg",
        "secondary_image": "/assets/atlas/source-images/visa/visa-11.jpg",
        "category_title": "Conference Protocols",
        "points": [
            "Ministry of External Affairs (MEA) and Home Affairs clearance liaison",
            "Official host organizer invitation letter verification",
            "Expedited interview appointment handling for academic deadlines",
            "Short-term research presentation and exchange visitor endorsements"
        ]
    },
    {
        "slug": "medical",
        "name": "Medical & Attendant Visa",
        "badge": "MEDICAL VISA SERVICES",
        "title": "Overseas Medical Treatment & Attendant Visas",
        "highlight": "Priority Healthcare Mobility",
        "desc": "Emergency medical visa assistance for patients and accompanying family attendants seeking specialized treatments abroad.",
        "image": "/assets/atlas/source-images/visa/visa-6.jpg",
        "secondary_image": "/assets/atlas/source-images/visa/visa-12.jpg",
        "category_title": "Medical Visa Facilitation",
        "points": [
            "Hospital acceptance letter & specialist physician referral validation",
            "Immediate urgent priority embassy filing and expedited interview waivers",
            "Medical attendant (MED-X) co-traveler visa endorsement",
            "Medical insurance and hospital treatment quotation verification"
        ]
    }
]

visa_template = """import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import TravelNetworkCanvas from "@/components/canvas/TravelNetworkCanvas";
import CounselingForm from "@/components/shared/CounselingForm";
import { CheckCircle2, ShieldCheck, Clock, FileText, ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "__PAGE_TITLE__ | Atlas Study",
  description: "__PAGE_DESC__",
};

export default function __PAGE_COMPONENT__() {
  return (
    <main className="w-full">
      <PageHeader
        badge="__PAGE_BADGE__"
        title="__PAGE_TITLE__"
        titleHighlight="__PAGE_HIGHLIGHT__"
        description="__PAGE_DESC__"
        breadcrumbs={[{ label: "Visa", href: "/visa" }, { label: "__PAGE_NAME__" }]}
        canvas={<TravelNetworkCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Visual Showcase Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                __CATEGORY_TITLE__
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              End-to-End Filing, Documentation & Mock Verification
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              __PAGE_DESC__
            </p>

            <div className="space-y-3">
              __POINTS_HTML__
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-[24px] overflow-hidden border border-slate-200/80 shadow-xl h-64 sm:h-72 bg-slate-900 group">
                <Image
                  src="__IMG_1__"
                  alt="__PAGE_NAME__ Overview"
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
                  src="__IMG_2__"
                  alt="__PAGE_NAME__ Documentation"
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
"""

for v in visa_pages:
    points_html = "\n".join([
        f'              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">\n                <CheckCircle2 className="text-emerald-600 shrink-0" size={{18}} />\n                <span className="text-xs font-semibold text-slate-800">{pt}</span>\n              </div>'
        for pt in v["points"]
    ])
    comp_name = f"{v['slug'].title()}VisaPage"
    code = visa_template.replace("__PAGE_TITLE__", v["title"])
    code = code.replace("__PAGE_DESC__", v["desc"])
    code = code.replace("__PAGE_BADGE__", v["badge"])
    code = code.replace("__PAGE_HIGHLIGHT__", v["highlight"])
    code = code.replace("__PAGE_NAME__", v["name"])
    code = code.replace("__PAGE_COMPONENT__", comp_name)
    code = code.replace("__CATEGORY_TITLE__", v["category_title"].upper())
    code = code.replace("__IMG_1__", v["image"])
    code = code.replace("__IMG_2__", v["secondary_image"])
    code = code.replace("__POINTS_HTML__", points_html)

    dest = f"app/visa/{v['slug']}/page.tsx"
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w") as f:
        f.write(code)
    print(f"Updated {dest}")

print("Visa detail pages updated successfully!")

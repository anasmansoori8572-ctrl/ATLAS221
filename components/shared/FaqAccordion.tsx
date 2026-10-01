"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "Which country is better for immigration and study abroad?",
    a: "Top destinations such as the United Kingdom, Canada, Australia, Ireland, and Germany offer distinct advantages. For example, the UK offers 2-year graduate stayback, Canada provides clear Express Entry PR pathways, Germany offers tuition-free public education, and Ireland hosts the European headquarters of major tech and pharma giants. Our counselors evaluate your individual academic profile to identify the ideal destination.",
    category: "General",
  },
  {
    q: "How can I get a student visa?",
    a: "Getting a student visa requires an unconditional letter of acceptance (or CAS/I-20/CoE), proof of financial funds for tuition and living costs, academic credentials, language test scorecards (IELTS/PTE/TOEFL/Duolingo), and a compelling Statement of Purpose (SOP). Atlas Study handles end-to-end documentation and provides 1-on-1 mock consular interview preparation.",
    category: "Visa",
  },
  {
    q: "How much does study abroad counseling cost with Atlas Study?",
    a: "Atlas Study offers 100% free initial profile evaluations, university shortlisting, and scholarship assessments. We believe in reducing the financial burden on families by securing maximum institutional and government merit aid.",
    category: "Fees",
  },
  {
    q: "How do I contact an Atlas Study Consultant?",
    a: "You can reach us by calling our central admissions helpline at +91 9956902444 or visiting our Kanpur headquarters at 1st Floor, MLC Building, 111-A/19, Ashok Nagar, G.T Road, Kanpur - 208010, Uttar Pradesh. You can also book an appointment online via our website form.",
    category: "General",
  },
  {
    q: "Do I qualify for IELTS / English Language waivers?",
    a: "Yes! Many universities across the UK, Ireland, France, and Europe offer English test waivers if you have scored 70%+ in Class 12 English from CBSE, ICSE, or select state boards, or if your undergraduate degree was conducted entirely in English (Medium of Instruction - MOI certificate).",
    category: "Application",
  },
  {
    q: "How can I extend my visa or transition to a Post-Study Work Permit?",
    a: "Most major destinations offer streamlined post-study work routes upon graduation: 2 years in the UK (Graduate Route), 3 years in Canada (PGWP), 2 to 4 years in Australia (Subclass 485), 2 years in Ireland (Third Level Graduate Scheme), and 18 months in Germany (Job Seeker Visa). Atlas Study assists alumni with documentation support.",
    category: "Visa",
  },
  {
    q: "What types of ID and documents are acceptable as proof-of-identity?",
    a: "A valid international passport (with at least 6 months validity beyond your intended period of stay), national ID (Aadhaar card/PAN), original academic transcripts, and official bank balance certificates are standard requirements.",
    category: "Application",
  },
  {
    q: "How do I apply for merit-based and government scholarships?",
    a: "Atlas Study specializes in securing scholarships ranging from £2,000 to full 100% tuition waivers (including Chevening, GREAT, Commonwealth, Fulbright-Nehru, Italian DSU regional awards, and German DAAD funding). We help you prepare your scholarship essays and meet early funding deadlines.",
    category: "Fees",
  },
];

const CATEGORIES = ["All Topics", "General", "Visa", "Application", "Fees"];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All Topics");

  const filteredFaqs =
    selectedCategory === "All Topics"
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setOpenIndex(null);
            }}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition-all",
              selectedCategory === cat
                ? "bg-slate-900 text-white shadow-md scale-105"
                : "bg-white text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-600"
            )}
          >
            #{cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-3.5">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-300 bg-white",
                isOpen
                  ? "border-rose-300 shadow-[0_10px_30px_-10px_rgba(225,29,72,0.12)] ring-1 ring-rose-200"
                  : "border-slate-200/80 hover:border-rose-200 shadow-xs"
              )}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between p-5 text-left transition-colors"
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors",
                      isOpen
                        ? "bg-linear-to-r from-rose-600 to-pink-600 text-white shadow-xs"
                        : "bg-rose-50 text-rose-600"
                    )}
                  >
                    Q{idx + 1}
                  </div>
                  <span className="text-sm font-bold text-slate-900 sm:text-base">
                    {faq.q}
                  </span>
                </div>

                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-transform duration-300",
                    isOpen && "rotate-180 bg-rose-50 text-rose-600"
                  )}
                >
                  <ChevronDown size={16} />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-rose-100 bg-rose-50/20 px-6 py-4.5 text-xs sm:text-sm leading-relaxed text-slate-600 animate-in fade-in-50 duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

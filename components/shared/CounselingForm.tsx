"use client";

import { useState } from "react";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CounselingFormProps {
  className?: string;
  defaultCountry?: string;
}

export default function CounselingForm({ className, defaultCountry = "United Kingdom" }: CounselingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: defaultCountry,
    courseLevel: "Masters",
    stream: "Engineering",
    email: "",
    query: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div
      id="contact"
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-rose-200/80 bg-white/95 p-7 sm:p-9 shadow-[0_20px_50px_-15px_rgba(225,29,72,0.12)] backdrop-blur-xl",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-rose-100/50 blur-3xl" />

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
            <CheckCircle2 size={36} />
          </div>
          <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
            Counseling Request Received!
          </h3>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            Thank you, <span className="font-semibold text-slate-800">{formData.firstName}</span>. An expert Atlas Study abroad advisor will get in touch with you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-slate-800"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-rose-600">
              <Sparkles size={12} />
              <span>Get In Touch</span>
            </div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Book Free Counseling Session
            </h3>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Please fill the form to get a free consultation. After you submit the form, a certified counselor will get in touch with you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* First Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">First Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. John"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Last Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Doe"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              />
            </div>

            {/* Preferred Country */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Course Country *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              >
                <option value="United Kingdom">United Kingdom (UK)</option>
                <option value="United States">United States (USA)</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Ireland">Ireland</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="New Zealand">New Zealand</option>
                <option value="United Arab Emirates">UAE / Dubai</option>
                <option value="China">China</option>
              </select>
            </div>

            {/* Course Level */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700">Course Level *</label>
              <select
                value={formData.courseLevel}
                onChange={(e) => setFormData({ ...formData, courseLevel: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              >
                <option value="Bachelors">Undergraduate / Bachelors (B.Sc, BA, B.Tech)</option>
                <option value="Masters">Postgraduate / Masters (MS, MBA, M.Sc, MA)</option>
                <option value="PhD">Doctoral / PhD</option>
                <option value="Diploma">Postgraduate Diploma / Certificate</option>
              </select>
            </div>

            {/* Select Stream */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Select Stream *</label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              >
                <option value="Engineering">Engineering, AI & Computer Science</option>
                <option value="Business">Business, Finance, Analytics & Management</option>
                <option value="Health">Health, Medicine, Nursing & Biotechnology</option>
                <option value="Arts">Humanities, Law, Media & Architecture</option>
              </select>
            </div>

            {/* Query */}
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">Your Query / Target Intake</label>
              <textarea
                rows={3}
                placeholder="Mention your target intake (e.g. Fall 2026), GPA, or specific questions..."
                value={formData.query}
                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                className="rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 outline-none transition-all focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-5px_rgba(225,29,72,0.45)] transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_-5px_rgba(219,39,119,0.55)] disabled:opacity-70"
          >
            <span>{loading ? "Submitting Application..." : "Submit Free Counseling Request"}</span>
            <Send size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>
      )}
    </div>
  );
}

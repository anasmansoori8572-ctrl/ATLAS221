"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CheckCircle2 } from "lucide-react";
import CounselingCanvas from "@/components/canvas/CounselingCanvas";

// Partner / Media Brands for Top Marquee Banner matching atlasstudy.in
const MEDIA_PARTNERS = [
  { name: "DAILY NEWS", subtitle: "NEW GENERATION" },
  { name: "TECHNOLOGY", subtitle: "HIGH PERFORMANCE" },
  { name: "CYBERTECH", subtitle: "SECURITY MADE SIMPLE" },
  { name: "FURTURATECH", subtitle: "INNOVATIVE SOLUTION" },
  { name: "ART STUDIO", subtitle: "CREATIVE HUB" },
  { name: "GLOBAL PRESS", subtitle: "ABROAD ADMISSIONS" },
  { name: "EDU HUB", subtitle: "WORLDWIDE COUNSEL" },
];

export default function CounselingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftSpatialRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  const [leftTilt, setLeftTilt] = useState({ x: 0, y: 0 });
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [rightTilt, setRightTilt] = useState({ x: 0, y: 0 });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    level: "",
    stream: "",
    email: "",
    query: "",
  });

  // Left Column 3D Parallax Tilt Handler
  const handleLeftMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!leftSpatialRef.current) return;
    const rect = leftSpatialRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (-(y - rect.height / 2) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setLeftTilt({ x: rotateX, y: rotateY });
  };

  const handleLeftMouseEnter = () => setIsLeftHovered(true);

  const handleLeftMouseLeave = () => {
    setIsLeftHovered(false);
    setLeftTilt({ x: 0, y: 0 });
  };

  // Right Form Card 3D Parallax Tilt Handler
  const handleRightMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rightCardRef.current) return;
    const rect = rightCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (-(y - rect.height / 2) / (rect.height / 2)) * 6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

    setRightTilt({ x: rotateX, y: rotateY });
  };

  const handleRightMouseLeave = () => {
    setRightTilt({ x: 0, y: 0 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1200);
  };

  useGSAP(
    () => {
      gsap.from(".counseling-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="counseling-section"
      className="relative w-full overflow-hidden bg-linear-to-b from-slate-950 via-[#0d1527] to-slate-950 text-white"
    >
      {/* ================= 1. RED MARQUEE TICKER BANNER (NO DOTS) ================= */}
      <div className="relative w-full overflow-hidden border-b border-rose-500/30 bg-linear-to-r from-rose-700 via-red-600 to-rose-700 py-3.5 shadow-[0_10px_30px_rgba(225,29,72,0.4)] z-20">
        <div className="flex w-max items-center gap-12 animate-marquee whitespace-nowrap">
          {[...MEDIA_PARTNERS, ...MEDIA_PARTNERS, ...MEDIA_PARTNERS, ...MEDIA_PARTNERS].map((partner, i) => (
            <span key={i} className="inline-flex items-center gap-3 font-sans shrink-0">
              <span className="text-xs font-black tracking-widest text-white uppercase drop-shadow-xs">
                {partner.name}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-rose-200/90 uppercase">
                {partner.subtitle}
              </span>
              <span className="mx-4 text-rose-300/40 text-xs font-light">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Ambient Background Soft Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-rose-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[520px] w-[520px] rounded-full bg-sky-600/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* ================= 2. LEFT COLUMN: 3D SPATIAL COUNSELOR WORKING ON MACBOOK (NO CAPSULES!) ================= */}
          <div className="counseling-reveal lg:col-span-6 relative flex flex-col items-center">
            {/* Background 3D Floating Books Canvas */}
            <div className="pointer-events-none absolute -top-16 -left-12 h-[400px] w-[400px] opacity-80 z-0">
              <CounselingCanvas />
            </div>

            {/* OPEN 3D SPATIAL STAGE */}
            <div
              ref={leftSpatialRef}
              onMouseMove={handleLeftMouseMove}
              onMouseEnter={handleLeftMouseEnter}
              onMouseLeave={handleLeftMouseLeave}
              className="relative h-[480px] sm:h-[540px] w-full max-w-[560px] cursor-grab select-none overflow-visible z-10"
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="relative h-full w-full transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${leftTilt.x}deg) rotateY(${leftTilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 3D COUNSELOR WORKING ON MACBOOK LAPTOP CUTOUT */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center transition-transform duration-300"
                  style={{
                    transform: `translateZ(45px) ${isLeftHovered ? "scale(1.05) translateY(-8px)" : "scale(1)"}`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src="/counselor-working-laptop.png"
                      alt="Counselor Working on MacBook Laptop"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain object-center drop-shadow-[0_25px_50px_rgba(15,23,42,0.7)]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= 3. RIGHT COLUMN: 3D GLASSMOPHIC FORM ================= */}
          <div className="counseling-reveal lg:col-span-6 relative w-full">
            <div
              ref={rightCardRef}
              onMouseMove={handleRightMouseMove}
              onMouseLeave={handleRightMouseLeave}
              className="relative w-full rounded-[32px] border border-white/15 bg-linear-to-b from-white/95 via-slate-50/95 to-white p-7 sm:p-9 shadow-[0_30px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl text-slate-900 transition-all duration-200"
              style={{
                perspective: "1000px",
                transform: `rotateX(${rightTilt.x}deg) rotateY(${rightTilt.y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Form Title Block */}
              <div>
                <span className="text-xs font-extrabold tracking-widest text-rose-600 uppercase">
                  GET IN TOUCH
                </span>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Book Free Counseling Session
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  Please fill the form to get a free consultation. After you submit the form, a counselor will get in touch with you.
                </p>
              </div>

              {formSubmitted ? (
                /* SUCCESS CONFIRMATION STATE */
                <div className="my-8 flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="mt-4 text-xl font-extrabold text-slate-900">Session Request Received!</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm">
                    Thank you <strong className="text-rose-600">{formData.firstName || "Student"}</strong>! Our senior abroad education counselor will contact you shortly at <strong className="text-slate-800">{formData.phone || "your phone"}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        phone: "",
                        country: "",
                        level: "",
                        stream: "",
                        email: "",
                        query: "",
                      });
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700 underline"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                /* MAIN FORM INPUTS GRID */
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  {/* Row 1: First Name | Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name *"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name *"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone | Course Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                      />
                    </div>
                    <div>
                      <select
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-700 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                      >
                        <option value="" disabled>Course Country</option>
                        <option value="UK">United Kingdom 🇬🇧</option>
                        <option value="USA">United States 🇺🇸</option>
                        <option value="Canada">Canada 🇨🇦</option>
                        <option value="Australia">Australia 🇦🇺</option>
                        <option value="Ireland">Ireland 🇮🇪</option>
                        <option value="Italy">Italy 🇮🇹</option>
                        <option value="Germany">Germany 🇩🇪</option>
                        <option value="France">France 🇫🇷</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Course Level | Select Stream */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <select
                        required
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-700 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                      >
                        <option value="" disabled>Course Level</option>
                        <option value="Bachelors">Bachelors Degree</option>
                        <option value="Masters">Masters Degree</option>
                        <option value="PhD">Doctorate / PhD</option>
                        <option value="Diploma">Diploma / Certificate</option>
                      </select>
                    </div>
                    <div>
                      <select
                        required
                        value={formData.stream}
                        onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-700 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                      >
                        <option value="" disabled>Select Stream</option>
                        <option value="Engineering">Engineering & Tech</option>
                        <option value="Business">Business & Management</option>
                        <option value="IT">IT & Computer Science</option>
                        <option value="Health">Health & Medicine</option>
                        <option value="Arts">Arts & Design</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Email Address */}
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                    />
                  </div>

                  {/* Row 5: Your Query */}
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Your Query / Preferred Intake / Questions..."
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON WITH LIQUID SHIMMER */}
                  <div className="mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-fit overflow-hidden rounded-xl border border-rose-600 bg-white px-8 py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-rose-600 shadow-md transition-all duration-300 hover:bg-rose-600 hover:text-white hover:shadow-[0_10px_25px_rgba(225,29,72,0.4)] active:scale-98 disabled:opacity-50"
                    >
                      {/* Liquid Shimmer Line */}
                      <span className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-rose-100/50 to-transparent -skew-x-12 -translate-x-full transition-transform duration-700 group-hover:translate-x-[300%]" />
                      <span className="relative z-10 flex items-center gap-2">
                        {isSubmitting ? "PROCESSING..." : "SUBMIT >"}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

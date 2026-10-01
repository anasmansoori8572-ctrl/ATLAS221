"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe2,
  Building2,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Navigation,
  Compass,
  ExternalLink,
} from "lucide-react";
import ContactOrbCanvas from "@/components/canvas/ContactOrbCanvas";
import GlobalNetworkCanvas from "@/components/canvas/GlobalNetworkCanvas";
import CounselingForm from "@/components/shared/CounselingForm";

interface OfficeInfo {
  id: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  flag: string;
  badge?: string;
}

const WORLDWIDE_OFFICES: OfficeInfo[] = [
  {
    id: "india",
    country: "India (Headquarters)",
    city: "Kanpur, Uttar Pradesh",
    address:
      "1st Floor, MLC Building, 111-A/19, Ashok Nagar, G.T Road, Above Arora Travels, Near Hotel Kanha Continental, Kanpur - 208010, Uttar Pradesh.",
    phone: "+91 9956902444",
    email: "admissions@atlasstudy.in",
    flag: "🇮🇳",
    badge: "Central HQ",
  },
  {
    id: "uk",
    country: "United Kingdom",
    city: "London Support Center",
    address: "7220 Dean Martin Drive Suite, London & Global Operations Desk",
    phone: "07520.664.45",
    email: "support@atlasstudy.in",
    flag: "🇬🇧",
    badge: "Europe Hub",
  },
  {
    id: "ireland",
    country: "Ireland",
    city: "Dublin Liaison Office",
    address: "148, Global Factory Street, Dublin & North Ireland Desk",
    phone: "+321.45.67890",
    email: "ireland@atlasstudy.in",
    flag: "🇮🇪",
    badge: "Liaison Desk",
  },
  {
    id: "canada_australia",
    country: "Canada & Australia",
    city: "Student Support Hubs",
    address: "PO Box 515381, Toronto / Sydney Regional Support Desks",
    phone: "+888.520.6644",
    email: "admissions@atlasstudy.in",
    flag: "🇨🇦 🇦🇺",
    badge: "Pacific Hubs",
  },
];

// Interactive 3D Tilt Card with cursor spotlight
function ContactDetailCard({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  subValue?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = (-(y - rect.height / 2) / (rect.height / 2)) * 7;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 7;

    setTilt({ x: rotX, y: rotY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xs transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10 cursor-default"
      style={{
        perspective: "1000px",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(260px circle at ${spotlight.x}px ${spotlight.y}px, rgba(244,63,94,0.08), transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        {/* 3D Pop-out Icon */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-rose-600 via-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
          style={{ transform: "translateZ(18px)" }}
        >
          <Icon size={19} />
        </div>
        <div className="flex-1" style={{ transform: "translateZ(10px)" }}>
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
            {label}
          </div>
          <p className="mt-1 text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
            {value}
          </p>
          {subValue && (
            <p className="mt-0.5 text-xs font-semibold text-rose-600">
              {subValue}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// 3D Tilt Headquarters Image Card
function HeadquartersImageCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = (-(y - rect.height / 2) / (rect.height / 2)) * 8;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setTilt({ x: rotX, y: rotY });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      className="group relative h-64 sm:h-72 w-full overflow-hidden rounded-3xl border border-rose-200/80 bg-linear-to-b from-white via-rose-50/40 to-white p-3 shadow-lg shadow-rose-900/5 transition-all duration-300"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Background Soft Glow Bulbs */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-300/30 blur-2xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-pink-300/30 blur-2xl" />

      {/* 2.5D Image Layer */}
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl bg-white transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "scale(1.03)" : "scale(1)"}`,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src="/assets/atlas/source-images/misc/contact-1.png"
          alt="Atlas Study Head Office Counseling Desk"
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-contain object-center p-2 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Subtle Bottom Badge Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-white/95 px-3.5 py-2 backdrop-blur-md border border-slate-200/70 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-800">Kanpur Admissions Hub Active</span>
          </div>
          <span className="text-[10px] font-semibold text-rose-600 uppercase tracking-wider">Walk-in Open</span>
        </div>
      </div>
    </div>
  );
}

// Original Atlas Website Location Map with 3D Depth (New York Only)
function OriginalAtlasMapCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const mapCardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapCardRef.current) return;
    const rect = mapCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = (-(y - rect.height / 2) / (rect.height / 2)) * 3.5;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;

    setTilt({ x: rotX, y: rotY });
  };

  return (
    <div
      ref={mapCardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative w-full overflow-hidden rounded-3xl border border-rose-200/80 bg-white shadow-xl shadow-slate-900/5 transition-transform duration-300"
      style={{
        perspective: "1000px",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-xs">
            <Compass size={18} />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 block">
              Explore Our Office Worldwide
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              New York International Liaison & Operations Hub
            </span>
          </div>
        </div>

        <a
          href="https://maps.google.com/?q=New+York+NY"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-rose-600 border border-rose-200 shadow-2xs transition-all hover:bg-rose-50 hover:scale-105"
        >
          <span>Open Full Navigation</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Interactive Google Map Frame (New York Location Only) */}
      <div className="relative h-[320px] sm:h-[380px] w-full bg-slate-100">
        <iframe
          title="Atlas Study New York Worldwide Location Map"
          src="https://maps.google.com/maps?q=New+York%2C%20NY%20USA&t=&z=12&ie=UTF8&iwloc=&output=embed"
          className="h-full w-full border-0 grayscale-[0.15] contrast-[1.05]"
          loading="lazy"
        />

        {/* Floating Location Marker Card Overlay */}
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-2xl bg-white/95 p-3.5 shadow-lg border border-slate-200/80 backdrop-blur-md max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-600 animate-ping" />
            <span className="text-xs font-extrabold text-slate-900">New York Center</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-tight">
            New York, NY — United States Global Desk & International Operations.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ContactMotionExperience() {
  const [hoveredOffice, setHoveredOffice] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* ================= HERO SECTION WITH 3D ORB ================= */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/60 to-white pt-10 pb-16 px-6 md:px-10 lg:px-16 border-b border-rose-100/60">
        {/* Soft Spatial Background Glows */}
        <div className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-rose-200/25 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-pink-200/25 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-6">
            <Link href="/" className="hover:text-rose-600 transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-rose-600">Contact Us</span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-rose-200 bg-rose-50/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-rose-600 shadow-2xs">
                <Sparkles size={13} className="text-rose-500 animate-pulse" />
                <span>Get In Touch</span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Contact Our Global{" "}
                <span className="bg-linear-to-r from-slate-900 via-rose-600 to-pink-500 bg-clip-text text-transparent">
                  Admissions Team
                </span>
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Have questions regarding courses, eligibility, or scholarships? Connect with our certified study-abroad counselors for personalized one-on-one guidance.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-rose-500/40"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="tel:+919956902444"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-5 py-3 text-xs font-bold text-slate-800 shadow-xs transition-all duration-300 hover:border-rose-400 hover:bg-rose-50/50 hover:text-rose-600"
                >
                  <Phone size={14} className="text-rose-600" />
                  <span>+91 9956902444</span>
                </a>
              </div>
            </div>

            {/* Right 3D Contact Orb Canvas (5 Cols) */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <ContactOrbCanvas className="h-72 sm:h-84 w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTACT & FORM SECTION ================= */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Headquarters Info & 3D Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-linear-to-r from-transparent to-rose-600" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
                CENTRAL HEADQUARTERS
              </span>
              <span className="h-px w-8 bg-linear-to-l from-transparent to-rose-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Visit Us or Schedule a Consultation
            </h2>

            <p className="text-sm leading-relaxed text-slate-600">
              Our central admissions hub in Kanpur is open Monday to Saturday. Walk in for a comprehensive profile evaluation or book a digital appointment with our country heads.
            </p>

            {/* 3D Interactive Headquarters Image Card */}
            <HeadquartersImageCard />

            {/* 4 Interactive 3D Contact Cards */}
            <div className="flex flex-col gap-3.5">
              <ContactDetailCard
                icon={MapPin}
                label="Head Office Location"
                value="1st Floor, MLC Building, 111-A/19, Ashok Nagar, G.T Road, Above Arora Travels, Near Hotel Kanha Continental, Kanpur - 208010, Uttar Pradesh."
              />

              <ContactDetailCard
                icon={Phone}
                label="Direct Admissions Helpline"
                value="+91 9956902444"
                subValue="+91 9651586666"
              />

              <ContactDetailCard
                icon={Mail}
                label="Official Admissions Email"
                value="admissions@atlasstudy.in"
                subValue="support@atlasstudy.in"
              />

              <ContactDetailCard
                icon={Clock}
                label="Counseling & Office Hours"
                value="Mon – Sat: 10:00 AM – 6:30 PM"
                subValue="Sunday Closed"
              />
            </div>
          </div>

          {/* Right Column: Counseling Form (7 Cols) */}
          <div className="lg:col-span-7 sticky top-24">
            <CounselingForm />
          </div>
        </div>
      </section>

      {/* ================= REALISTIC 3D EARTH GLOBAL NETWORK SECTION ================= */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-slate-50/70 border-t border-slate-200/80 overflow-hidden">
        {/* Spatial background ambient highlights */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-pink-200/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/70 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-rose-600 mb-3">
              <Globe2 size={13} />
              <span>Worldwide Presence</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
              Global Support Centers
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Atlas Study connects students from India to premier study destinations worldwide with regional admissions desks across UK, Ireland, Canada, and Australia.
            </p>
          </div>

          {/* Realistic 3D Earth Display */}
          <div className="relative mb-12 flex flex-col items-center justify-center">
            <div className="relative h-[420px] sm:h-[480px] w-full max-w-4xl rounded-3xl border border-rose-200/80 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl overflow-hidden flex items-center justify-center">
              <GlobalNetworkCanvas activeCardId={hoveredOffice} className="h-full w-full" />

              {/* Top Status Pill */}
              <div className="absolute top-4 left-4 flex items-center gap-2.5 rounded-full bg-slate-900/85 px-3.5 py-1.5 text-[11px] font-bold text-white shadow-md border border-rose-500/30 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                <span>Interactive 3D Earth Network</span>
              </div>

              {/* Bottom Instructions Overlay */}
              <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 rounded-full bg-slate-900/80 px-3.5 py-1.5 text-[11px] font-medium text-slate-300 border border-slate-700/60 backdrop-blur-md">
                <span>Hover cards below to orient Earth & highlight flight corridors</span>
              </div>
            </div>
          </div>

          {/* 4 Interactive Country Cards Linked to 3D Earth */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {WORLDWIDE_OFFICES.map((office) => {
              const isHovered = hoveredOffice === office.id;

              return (
                <div
                  key={office.id}
                  onMouseEnter={() => setHoveredOffice(office.id)}
                  onMouseLeave={() => setHoveredOffice(null)}
                  className={`group relative rounded-2xl border bg-white p-6 shadow-xs flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isHovered
                      ? "border-rose-500 shadow-xl shadow-rose-500/15 -translate-y-2 ring-2 ring-rose-300/70"
                      : "border-slate-200/90 hover:border-rose-300 hover:shadow-md"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl drop-shadow-xs">{office.flag}</span>
                        <span className="text-sm font-bold text-slate-900">{office.country}</span>
                      </div>
                      {office.badge && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold transition-colors ${
                            isHovered
                              ? "bg-rose-600 text-white"
                              : "bg-rose-50 text-rose-600 border border-rose-200"
                          }`}
                        >
                          {office.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-rose-600 mb-2">{office.city}</div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{office.address}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <div>
                      <strong className="text-slate-700">Tel:</strong> {office.phone}
                    </div>
                    <div className="mt-1">
                      <strong className="text-slate-700">Email:</strong> {office.email}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= ORIGINAL ATLAS LOCATION MAP INTEGRATION ================= */}
          <div className="mt-8">
            <OriginalAtlasMapCard />
          </div>
        </div>
      </section>
    </div>
  );
}

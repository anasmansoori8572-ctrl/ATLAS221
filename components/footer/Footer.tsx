"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronUp,
  MapPin,
  PhoneCall,
  Mail,
  ArrowRight,
  Globe2,
} from "lucide-react";
import FooterCanvas from "@/components/canvas/FooterCanvas";

function LinkedinIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function YoutubeIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const QUICK_LINKS = [
  { name: "Career", href: "#about-section" },
  { name: "Agents", href: "#why-choose-us" },
  { name: "About", href: "#about-section" },
  { name: "Contact", href: "#counseling-section" },
  { name: "News", href: "#countries-section" },
  { name: "Webinars", href: "#test-prep" },
];

const TEST_PREP_LINKS = [
  { name: "GRE", href: "#test-prep" },
  { name: "IELTS", href: "#test-prep" },
  { name: "GMAT", href: "#test-prep" },
  { name: "TOEFL", href: "#test-prep" },
  { name: "SAT", href: "#test-prep" },
  { name: "PTE", href: "#test-prep" },
  { name: "DUOLINGO", href: "#test-prep" },
];

const SUPPORT_LINKS = [
  { name: "Pay Online", href: "#counseling-section" },
  { name: "Career", href: "#about-section" },
  { name: "FAQ's", href: "#why-choose-us" },
  { name: "Appointment", href: "#counseling-section" },
  { name: "Contact", href: "#counseling-section" },
];

const GALLERY_ITEMS = [
  { id: 1, title: "Visa Approval", image: "/assets/atlas/source-images/home/footer-1.jpg" },
  { id: 2, title: "Student Success", image: "/assets/atlas/source-images/home/footer-2.jpg" },
  { id: 3, title: "University Campus", image: "/assets/atlas/source-images/home/footer-3.jpg" },
  { id: 4, title: "Alumni Meet", image: "/assets/atlas/source-images/home/footer-4.jpg" },
  { id: 5, title: "Global Flight", image: "/assets/atlas/source-images/home/footer-5.jpg" },
  { id: 6, title: "Graduation Day", image: "/assets/atlas/source-images/home/footer-6.jpg" },
];

function GalleryThumbnail({ item }: { item: typeof GALLERY_ITEMS[0] }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (-(y - rect.height / 2) / (rect.height / 2)) * 12;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      className="group relative aspect-square w-full overflow-hidden rounded-xl border border-rose-200/80 bg-white shadow-xs transition-all duration-300 hover:border-rose-400 hover:shadow-md cursor-pointer"
      style={{
        perspective: "600px",
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
            hovered ? "scale(1.08)" : "scale(1)"
          }`,
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-500 group-hover:scale-115"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-2">
          <span className="text-[10px] font-extrabold text-white truncate drop-shadow-xs">
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-linear-to-b from-white via-rose-50/50 to-rose-100/40 text-slate-800 pt-16">
      {/* Background Soft 3D Sparkle Canvas */}
      <FooterCanvas />

      {/* Top Ambient Glow Bulbs */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-rose-200/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-12 h-[420px] w-[420px] rounded-full bg-pink-200/25 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* COLUMN 1: BRAND LOGO & MISSION (4 COLS) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div className="relative h-12 w-44">
              <Image
                src="/atlaslogo.png"
                alt="Atlas Study Consultants"
                fill
                sizes="176px"
                className="object-contain object-left"
                priority
              />
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal pr-4">
              Atlas Study Consultants is a leading study-abroad consultancy dedicated to empowering ambitious students to secure university admissions and maximum scholarships across UK, USA, Canada, Australia, Ireland, and Europe.
            </p>

            {/* Social Icons Row */}
            <div className="mt-2 flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-slate-600 shadow-2xs transition-all duration-300 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:scale-110"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-slate-600 shadow-2xs transition-all duration-300 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:scale-110"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-slate-600 shadow-2xs transition-all duration-300 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:scale-110"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-slate-600 shadow-2xs transition-all duration-300 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:scale-110"
              >
                <TwitterIcon size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-white text-slate-600 shadow-2xs transition-all duration-300 hover:border-rose-500 hover:bg-rose-600 hover:text-white hover:scale-110"
              >
                <YoutubeIcon size={16} />
              </a>
            </div>
          </div>

          {/* COLUMN 2: QUICK LINKS (2 COLS) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <h4 className="text-sm font-extrabold tracking-tight text-slate-900 uppercase">
              Quick Links
            </h4>
            <div className="h-0.5 w-8 rounded-full bg-rose-600 mb-1" />
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-rose-600"
                  >
                    <span className="text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity">--</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: TEST PREP (2 COLS) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <h4 className="text-sm font-extrabold tracking-tight text-slate-900 uppercase">
              Test Prep
            </h4>
            <div className="h-0.5 w-8 rounded-full bg-rose-600 mb-1" />
            <ul className="flex flex-col gap-2">
              {TEST_PREP_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-rose-600"
                  >
                    <span className="text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity">--</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: SUPPORT LINKS (2 COLS) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <h4 className="text-sm font-extrabold tracking-tight text-slate-900 uppercase">
              Support Links
            </h4>
            <div className="h-0.5 w-8 rounded-full bg-rose-600 mb-1" />
            <ul className="flex flex-col gap-2">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-rose-600"
                  >
                    <span className="text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity">--</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: OUR GALLERY (2 COLS) */}
          <div className="lg:col-span-2 flex flex-col items-start gap-3">
            <h4 className="text-sm font-extrabold tracking-tight text-slate-900 uppercase">
              Our Gallery
            </h4>
            <div className="h-0.5 w-8 rounded-full bg-rose-600 mb-1" />
            <div className="grid grid-cols-3 gap-2 w-full pt-1">
              {GALLERY_ITEMS.map((item) => (
                <GalleryThumbnail key={item.id} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM SUB-FOOTER RIBBON ================= */}
      <div className="relative w-full border-t border-rose-600/20 bg-linear-to-r from-rose-700 via-red-600 to-rose-700 py-4 px-6 md:px-10 lg:px-16 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs font-semibold text-rose-50 text-center sm:text-left">
            © 2026 Atlas Study Consultants. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-semibold text-rose-100">
            <a href="#counseling-section" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-rose-300/60">•</span>
            <a href="#counseling-section" className="hover:text-white transition-colors">
              Term Of Use
            </a>
            <span className="text-rose-300/60">•</span>
            <a href="#counseling-section" className="hover:text-white transition-colors">
              Support
            </a>
          </div>

          {/* Smooth 3D Back-to-Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/30 bg-slate-900/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-rose-600 hover:scale-110 active:scale-95"
          >
            <ChevronUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

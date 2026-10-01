"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Mail,
  Clock,
  Phone,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Globe2,
  BookOpen,
  Award,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Building2,
  Palmtree,
  Presentation,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ABOUT_MENU = [
  { name: "About Atlas Study", href: "/about", desc: "Our 14+ year legacy, mission, and leadership since 2010" },
  { name: "Our Team", href: "/team", desc: "Meet Mr. Rakim Sultan, Mr. Zaid Sultan & admissions counselors" },
  { name: "FAQ’s", href: "/faq", desc: "Answers to admissions, visa processes, costs, and timelines" },
  { name: "404 Error Page", href: "/error", desc: "Custom 404 error experience" },
];

const TEST_PREP_MENU = [
  { name: "Preparation Overview", href: "/coaching", desc: "Comprehensive coaching methodology & diagnostic labs", icon: BookOpen },
  { name: "IELTS", href: "/test-prep/ielts", desc: "Guaranteed Band 7.5+ Training with 1-on-1 speaking", icon: Award },
  { name: "GRE", href: "/test-prep/gre", desc: "Master Quantitative & Verbal reasoning shortcuts", icon: Sparkles },
  { name: "GMAT", href: "/test-prep/gmat", desc: "GMAT Focus Edition prep for top Business Schools", icon: GraduationCap },
  { name: "TOEFL", href: "/test-prep/toefl", desc: "TOEFL iBT 2-hour format with official ETS materials", icon: BookOpen },
  { name: "SAT", href: "/test-prep/sat", desc: "Digital SAT adaptive modules & Ivy League mentors", icon: Award },
  { name: "PTE", href: "/test-prep/pte", desc: "AI-scoring & fast 48-hour results computer lab", icon: Sparkles },
  { name: "DUOLINGO", href: "/test-prep/duolingo", desc: "Fast-track 1-hour DET preparation & video interview", icon: GraduationCap },
];

const VISA_MENU = [
  { name: "Visa Overview", href: "/visa", desc: "98%+ Success rate & 5-step documentation methodology", badge: "Overview", icon: ShieldCheck },
  { name: "Student Visa", href: "/visa/student", desc: "UK CAS, US F-1, Canada SDS & Australia Subclass 500", badge: "Popular", icon: GraduationCap },
  { name: "Residence Visa", href: "/visa/residence", desc: "Canada Express Entry/PNP & Australia PR pathways", badge: "PR", icon: Globe2 },
  { name: "Business Visa", href: "/visa/business", desc: "Corporate delegation & global commercial travel", badge: "B2B", icon: Building2 },
  { name: "Tourist Visa", href: "/visa/tourist", desc: "Schengen, UK, US B1/B2 & holiday visitor visas", badge: "Travel", icon: Palmtree },
  { name: "Conference Visa", href: "/visa/conference", desc: "Academic symposiums & international congresses", badge: "Academic", icon: Presentation },
  { name: "Medical Visa", href: "/visa/medical", desc: "Overseas hospital treatment & attendant visas", badge: "Healthcare", icon: HeartPulse },
];

const COUNTRIES_MENU = [
  { name: "Countries Overview", href: "/countries", flag: "🌐", desc: "Explore all 25+ global education destinations" },
  { name: "United States", href: "/countries/usa", flag: "🇺🇸", desc: "Top Ivy League universities & 3-year STEM OPT" },
  { name: "United Kingdom", href: "/countries/uk", flag: "🇬🇧", desc: "Russell Group, 1-year Masters & Graduate Route" },
  { name: "Canada", href: "/countries/canada", flag: "🇨🇦", desc: "DLI colleges, 3-year PGWP & direct PR pathways" },
  { name: "Australia", href: "/countries/australia", flag: "🇦🇺", desc: "Go8 universities, 485 PSW & high minimum wages" },
  { name: "Ireland", href: "/countries/ireland", flag: "🇮🇪", desc: "European Silicon Valley & 2-year post-study stayback" },
  { name: "Germany", href: "/countries/germany", flag: "🇩🇪", desc: "Zero tuition fees at top public universities & TU9" },
  { name: "France", href: "/countries/france", flag: "🇫🇷", desc: "Grandes Écoles, CAF housing subsidy & 5-year visa" },
  { name: "Italy", href: "/countries/italy", flag: "🇮🇹", desc: "100% regional DSU scholarships & €6k-8k stipend" },
  { name: "New Zealand", href: "/countries/new-zealand", flag: "🇳🇿", desc: "100% universities QS ranked in top 3% worldwide" },
  { name: "UAE / Dubai", href: "/countries/uae", flag: "🇦🇪", desc: "Top UK/Aus branch campuses & 0% tax earnings" },
  { name: "China", href: "/countries/china", flag: "🇨🇳", desc: "MOE approved English MBBS & CSC full scholarships" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (menuName: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSection = (name: string) => {
    setMobileSectionOpen(mobileSectionOpen === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full font-sans transition-all duration-300">
      {/* ================= 1. TOP UTILITY MARQUEE & CONTACT BAR ================= */}
      <div className="w-full bg-slate-950 text-rose-100 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Left: Location Ticker */}
          <div className="flex items-center gap-2 overflow-hidden max-w-[65%] sm:max-w-xl">
            <MapPin size={12} className="shrink-0 text-rose-400" />
            <div className="relative overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee text-[11px] font-medium text-slate-300">
                1st Floor, MLC Building, 111-A/19, Ashok Nagar, G.T Road, Near Hotel Kanha Continental, Kanpur, UP &nbsp;•&nbsp; Mon - Sat: 10:00 AM to 6:30 PM &nbsp;•&nbsp; 14+ Years of Trusted Overseas Consulting &nbsp;•&nbsp; ₹2 Crores+ Scholarships
              </div>
            </div>
          </div>

          {/* Right: Direct Contacts */}
          <div className="flex items-center gap-4 text-[11px] font-medium shrink-0">
            <a
              href="mailto:admissions@atlasstudy.in"
              className="hidden md:flex items-center gap-1.5 text-slate-300 transition-colors hover:text-rose-400"
            >
              <Mail size={12} className="text-rose-400" />
              <span>admissions@atlasstudy.in</span>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock size={12} className="text-rose-400" />
              <span>Mon - Sat: 10.00 to 18.00</span>
            </div>

            <Link
              href="/contact#contact"
              className="rounded-full bg-linear-to-r from-rose-600 to-pink-600 px-3.5 py-1 text-[11px] font-bold text-white shadow-xs transition-all hover:scale-105 hover:from-rose-500 hover:to-pink-500"
            >
              Appointment &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN FULL-WIDTH TOP STICKY NAVBAR ================= */}
      <div
        className={cn(
          "w-full bg-white/95 backdrop-blur-md border-b transition-all duration-300",
          scrolled ? "border-slate-200 shadow-md bg-white/98 py-2.5" : "border-slate-200/80 shadow-xs py-3.5"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-transform hover:scale-[1.02]">
            <Image
              src="/atlaslogo.png"
              alt="Atlas Study Consultants"
              width={145}
              height={36}
              priority
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
            <Link
              href="/"
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                pathname === "/"
                  ? "text-rose-600 bg-rose-50"
                  : "text-slate-700 hover:text-rose-600 hover:bg-slate-50"
              )}
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("about")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "group relative inline-flex items-center gap-1 text-sm font-medium transition-colors py-1 cursor-pointer",
                  pathname.startsWith("/about") || pathname.startsWith("/team") || pathname.startsWith("/faq")
                    ? "text-rose-600 font-semibold"
                    : "text-slate-700 hover:text-rose-600"
                )}
              >
                <span>About</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    activeDropdown === "about" ? "rotate-180 text-rose-600" : "text-slate-400"
                  )}
                />
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
              </button>

              {activeDropdown === "about" && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150">
                    {ABOUT_MENU.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-rose-50/60"
                      >
                        <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Test Prep Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("testprep")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "group relative inline-flex items-center gap-1 text-sm font-medium transition-colors py-1 cursor-pointer",
                  pathname.startsWith("/test-prep") || pathname.startsWith("/coaching") || pathname.startsWith("/ielts") || pathname.startsWith("/gre")
                    ? "text-rose-600 font-semibold"
                    : "text-slate-700 hover:text-rose-600"
                )}
              >
                <span>Test Prep</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    activeDropdown === "testprep" ? "rotate-180 text-rose-600" : "text-slate-400"
                  )}
                />
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
              </button>

              {activeDropdown === "testprep" && (
                <div className="absolute -left-20 top-full pt-2 w-[560px] z-50">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                        Standardized Test Coaching
                      </span>
                      <Link
                        href="/coaching"
                        className="text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1"
                      >
                        View All Courses &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {TEST_PREP_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-rose-50/60"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                            <item.icon size={15} />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 block">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 block">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visa Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("visa")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "group relative inline-flex items-center gap-1 text-sm font-medium transition-colors py-1 cursor-pointer",
                  pathname.startsWith("/visa")
                    ? "text-rose-600 font-semibold"
                    : "text-slate-700 hover:text-rose-600"
                )}
              >
                <span>Visa Services</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    activeDropdown === "visa" ? "rotate-180 text-rose-600" : "text-slate-400"
                  )}
                />
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
              </button>

              {activeDropdown === "visa" && (
                <div className="absolute -left-20 top-full pt-2 w-[520px] z-50">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                        Immigration & Visa Assistance
                      </span>
                      <Link
                        href="/visa"
                        className="text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1"
                      >
                        Visa Overview &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {VISA_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-start justify-between rounded-xl p-2.5 transition-colors hover:bg-rose-50/60"
                        >
                          <div className="flex items-start gap-2.5">
                            <item.icon size={15} className="text-rose-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 block">
                                {item.name}
                              </span>
                              <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 block">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full shrink-0 ml-1">
                            {item.badge}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Countries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("countries")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "group relative inline-flex items-center gap-1 text-sm font-medium transition-colors py-1 cursor-pointer",
                  pathname.startsWith("/countries")
                    ? "text-rose-600 font-semibold"
                    : "text-slate-700 hover:text-rose-600"
                )}
              >
                <span>Countries</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    activeDropdown === "countries" ? "rotate-180 text-rose-600" : "text-slate-400"
                  )}
                />
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
              </button>

              {activeDropdown === "countries" && (
                <div className="absolute -left-48 top-full pt-2 w-[640px] z-50">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-150">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-rose-600">
                        Study Abroad Destinations
                      </span>
                      <Link
                        href="/countries"
                        className="text-xs font-bold text-slate-600 hover:text-rose-600 flex items-center gap-1"
                      >
                        All 25+ Countries &rarr;
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {COUNTRIES_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-rose-50/60"
                        >
                          <span className="text-xl shrink-0">{item.flag}</span>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-rose-600 block truncate">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scholarships */}
            <Link
              href="/scholarship"
              className={cn(
                "group relative text-sm font-medium transition-colors py-1",
                pathname === "/scholarship"
                  ? "text-rose-600 font-semibold"
                  : "text-slate-700 hover:text-rose-600"
              )}
            >
              <span>Scholarships</span>
              <span className="absolute -top-2.5 -right-3.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              className={cn(
                "group relative text-sm font-medium transition-colors py-1",
                pathname.startsWith("/blog")
                  ? "text-rose-600 font-semibold"
                  : "text-slate-700 hover:text-rose-600"
              )}
            >
              <span>Blog</span>
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={cn(
                "group relative text-sm font-medium transition-colors py-1",
                pathname === "/contact"
                  ? "text-rose-600 font-semibold"
                  : "text-slate-700 hover:text-rose-600"
              )}
            >
              <span>Contact</span>
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-linear-to-r from-rose-500 to-pink-600 transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Phone support box with circle icon */}
            <a
              href="tel:+919956902444"
              className="hidden md:flex items-center gap-2.5 transition-transform hover:scale-102"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-600 transition-colors hover:bg-rose-100">
                <Phone size={15} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  ENQUIRIES
                </span>
                <span className="text-xs font-bold text-slate-900 hover:text-rose-600 transition-colors">
                  +91 9956902444
                </span>
              </div>
            </a>

            {/* Book Free Counseling CTA Button */}
            <Link
              href="/contact#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 shadow-[0_8px_25px_-5px_rgba(225,29,72,0.45)] hover:shadow-[0_10px_35px_-5px_rgba(219,39,119,0.55)] hover:scale-[1.03] transition-all duration-300"
            >
              <span>Book Free Counseling</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 transition-colors hover:bg-rose-50 hover:text-rose-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= 3. MOBILE OFF-CANVAS DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/atlaslogo.png"
                    alt="Atlas Study"
                    width={130}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-5 flex flex-col gap-1">
                <Link
                  href="/"
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50 hover:text-rose-600"
                >
                  <span>Home</span>
                </Link>

                {/* About Accordion */}
                <div>
                  <button
                    onClick={() => toggleMobileSection("about")}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50"
                  >
                    <span>About Us</span>
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", mobileSectionOpen === "about" && "rotate-180 text-rose-600")}
                    />
                  </button>
                  {mobileSectionOpen === "about" && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-rose-200 pl-3">
                      {ABOUT_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Test Prep Accordion */}
                <div>
                  <button
                    onClick={() => toggleMobileSection("testprep")}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50"
                  >
                    <span>Test Preparation</span>
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", mobileSectionOpen === "testprep" && "rotate-180 text-rose-600")}
                    />
                  </button>
                  {mobileSectionOpen === "testprep" && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-rose-200 pl-3">
                      {TEST_PREP_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visa Accordion */}
                <div>
                  <button
                    onClick={() => toggleMobileSection("visa")}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50"
                  >
                    <span>Visa Services</span>
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", mobileSectionOpen === "visa" && "rotate-180 text-rose-600")}
                    />
                  </button>
                  {mobileSectionOpen === "visa" && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-rose-200 pl-3">
                      {VISA_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Countries Accordion */}
                <div>
                  <button
                    onClick={() => toggleMobileSection("countries")}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50"
                  >
                    <span>Countries We Offer</span>
                    <ChevronDown
                      size={16}
                      className={cn("transition-transform", mobileSectionOpen === "countries" && "rotate-180 text-rose-600")}
                    />
                  </button>
                  {mobileSectionOpen === "countries" && (
                    <div className="ml-4 mt-1 grid grid-cols-2 gap-1 border-l-2 border-rose-200 pl-3">
                      {COUNTRIES_MENU.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 flex items-center gap-1.5"
                        >
                          <span>{item.flag}</span>
                          <span className="truncate">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/scholarship"
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50 hover:text-rose-600"
                >
                  <span>Scholarships</span>
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-600">
                    ₹2 Cr+
                  </span>
                </Link>

                <Link
                  href="/blog"
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50 hover:text-rose-600"
                >
                  <span>Blog & Updates</span>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-rose-50 hover:text-rose-600"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>

            {/* Drawer Bottom Support Info */}
            <div className="border-t border-slate-100 p-5 bg-slate-50 flex flex-col gap-3">
              <a
                href="tel:+919956902444"
                className="flex items-center gap-3 rounded-xl bg-white p-3 border border-slate-200 shadow-xs"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 block">Call Admissions</span>
                  <span className="text-xs font-bold text-slate-900">+91 9956902444</span>
                </div>
              </a>

              <Link
                href="/contact#contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-slate-900 via-rose-600 to-pink-600 p-3 text-xs font-bold text-white shadow-md text-center"
              >
                <span>Book Free Counseling</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

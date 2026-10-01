import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import CounselingForm from "@/components/shared/CounselingForm";
import { Calendar, User, ArrowLeft, CheckCircle2, Tag } from "lucide-react";

interface BlogPostData {
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt?: string;
  content: string[];
  takeaways: string[];
}

const POSTS_DATA: Record<string, BlogPostData> = {
  "admission-open": {
    title: "Your Pathway to Success: Admission Open for Exciting New Opportunities",
    category: "ADMISSION OPEN",
    date: "September 2026",
    author: "Atlas Editorial Team",
    image: "/assets/atlas/source-images/blog/9814.png",
    content: [
      "Global universities across the United Kingdom, United States, Canada, Australia, Ireland, and Europe have officially announced open admissions for upcoming intakes.",
      "International education opens unmatched pathways for personal development, cross-cultural immersion, and high-paying global employment. Early applicants benefit from wider course choices, faster offer letter turnaround, and maximum allocation from institutional merit scholarship funds.",
      "At Atlas Study Consultants, we combine over a decade of domain expertise with direct partner university linkages to ensure your Statement of Purpose (SOP), Letters of Recommendation (LORs), and financial portfolios stand out during university review committee evaluations.",
    ],
    takeaways: [
      "Target early application deadlines for maximum scholarship eligibility.",
      "Prepare official academic transcripts and English language proficiency scorecards (IELTS, TOEFL, PTE, Duolingo).",
      "Connect with certified Atlas Study mentors for 1-on-1 profile shortlisting and error-free application processing.",
    ],
  },
  "uk-graduate-route-visa-guide": {
    title: "UK 2-Year Graduate Route Visa: Comprehensive Eligibility & Application Guide",
    category: "VISA UPDATES",
    date: "August 2026",
    author: "Admissions Team",
    image: "/assets/atlas/source-images/blog/4417.png",
    content: [
      "The UK Graduate Route visa continues to provide international students with an outstanding opportunity to gain valuable international workplace experience. Eligible students who complete an undergraduate or master's degree from a recognized UK higher education institution can work or look for work for 2 full years without requiring employer sponsorship (3 years for PhD graduates).",
      "This post-study work visa allows complete flexibility in career pathways, permitting self-employment, internships, full-time contracts, and seamless transitions to the Skilled Worker visa once sponsorship criteria are fulfilled.",
      "Our dedicated UK compliance advisors at Atlas Study assist graduating scholars with visa timing, maintenance funds documentation, CAS validation, and strategic career mapping across London, Manchester, Birmingham, and Edinburgh.",
    ],
    takeaways: [
      "Must hold a valid Student Visa at the time of application from within the UK.",
      "No minimum salary threshold or job offer required to receive the 2-year Graduate Route visa.",
      "Direct pathway to transition into a 5-year Skilled Worker Visa (leading to Indefinite Leave to Remain / ILR).",
    ],
  },
  "ielts-vs-pte-vs-duolingo": {
    title: "IELTS vs PTE vs Duolingo: Which English Test Should You Choose for Study Abroad?",
    category: "TEST PREPARATION",
    date: "July 2026",
    author: "Test Prep Faculty",
    excerpt: "A direct breakdown of scoring scales, test difficulty, preparation timelines, and university acceptance.",
    image: "/assets/atlas/source-images/test-prep/IELTS.jpg",
    content: [
      "Choosing the right English proficiency exam is the critical first hurdle for Indian students planning their study abroad journey. While IELTS Academic remains the gold standard with ubiquitous global acceptance, PTE Academic and Duolingo English Test (DET) have gained massive popularity for their rapid computer scoring and convenient test dates.",
      "IELTS Academic is preferred by virtually all top universities in the UK, Australia, Canada, USA, and Europe, offering both paper-based and computer-delivered formats. PTE Academic is known for fast turnaround times (typically 24 to 48 hours) and purely AI-based speaking evaluation.",
      "Atlas Study's certified coaching center provides rigorous mock tests, interactive speaking evaluation, and personalized score enhancement blueprints for all 3 formats.",
    ],
    takeaways: [
      "IELTS: 100% acceptance across all global university admissions and visa departments.",
      "PTE: Ideal for candidates seeking rapid test results and comfortable with computer-based audio recording.",
      "Duolingo: Budget-friendly and testable from home, accepted by hundreds of US and select UK/Canadian institutions.",
    ],
  },
  "italy-dsu-regional-scholarships": {
    title: "How to Study in Italy 100% Free: Complete Guide to DSU & ER.GO Regional Scholarships",
    category: "SCHOLARSHIPS",
    date: "June 2026",
    author: "Scholarship Desk",
    image: "/assets/atlas/source-images/countries/country-2.jpg",
    content: [
      "Italy has emerged as one of the premier study destinations for international students, offering high-ranking historic public universities with English-taught Bachelor's and Master's degrees in Engineering, Economics, Computer Science, and Design.",
      "Through regional scholarship schemes like DSU (Tuscany / Lombardy / Milan), ER.GO (Emilia-Romagna / Bologna), and Laziodisco (Rome), eligible international students can study with 100% tuition fee waivers.",
      "In addition to zero tuition fees, eligible students receive free student housing accommodation or rental subsidies, complimentary university canteen meals, and a direct annual bank stipend up to €8,000 to cover living expenses.",
    ],
    takeaways: [
      "Scholarships awarded based on family economic status (ISEE Parificato) rather than purely academic scores.",
      "Includes 100% tuition waiver + free university meals + accommodation stipend.",
      "Atlas Study provides full end-to-end guidance for Italian Embassy legalizations, CIMEA/DOV, and regional scholarship dossiers.",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_DATA[slug];
  if (!post) {
    return {
      title: "Blog Article | Atlas Study",
    };
  }
  return {
    title: `${post.title} | Atlas Study Blog`,
    description: post.content[0],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS_DATA[slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full">
      <PageHeader
        badge={post.category}
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Article" },
        ]}
      />

      <article className="relative w-full py-16 px-6 md:px-10 lg:px-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-rose-600" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-rose-600" />
              {post.author}
            </span>
          </div>

          <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-[28px] bg-slate-900 shadow-xl mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-6 text-sm sm:text-base leading-relaxed text-slate-700">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}

            <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/50 p-6">
              <h3 className="text-base font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Tag size={16} className="text-rose-600" />
                Key Action Points for Applicants
              </h3>
              <ul className="flex flex-col gap-2.5">
                {post.takeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* Counseling Form Section */}
      <section className="relative w-full py-20 px-6 md:px-10 lg:px-16 bg-gradient-to-b from-white via-rose-50/40 to-white">
        <div className="mx-auto max-w-4xl">
          <CounselingForm />
        </div>
      </section>
    </main>
  );
}

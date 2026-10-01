import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import KnowledgeOrbCanvas from "@/components/canvas/KnowledgeOrbCanvas";
import BlogMotionExperience from "@/components/blog/BlogMotionExperience";

export const metadata: Metadata = {
  title: "Blog & Global Education Insights — Admissions, Visas & Scholarships | Atlas Study",
  description:
    "Latest news, admissions deadlines, visa policy updates, and study abroad guides from Atlas Study Consultants.",
};

export default function BlogPage() {
  return (
    <main className="w-full">
      <PageHeader
        badge="NEWS & UPDATES"
        title="Read Our Latest"
        titleHighlight="Insights & Guides"
        description="Stay updated with the latest international admissions announcements, visa policy updates, scholarship alerts, and student success stories."
        breadcrumbs={[{ label: "Blog" }]}
        canvas={<KnowledgeOrbCanvas className="h-72 sm:h-80 w-full" />}
      />

      {/* Main 3D Editorial Blog Experience */}
      <BlogMotionExperience />
    </main>
  );
}

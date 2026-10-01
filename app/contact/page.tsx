import type { Metadata } from "next";
import ContactMotionExperience from "@/components/contact/ContactMotionExperience";

export const metadata: Metadata = {
  title: "Contact Us — Worldwide Offices & Counseling | Atlas Study",
  description:
    "Get in touch with Atlas Study Consultants. Visit our Kanpur head office or connect with our international counselor network.",
};

export default function ContactPage() {
  return (
    <main className="w-full">
      <ContactMotionExperience />
    </main>
  );
}

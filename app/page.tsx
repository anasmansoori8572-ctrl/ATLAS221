import Hero from "@/components/hero/Hero";
// import JourneySection from "@/components/sections/JourneySection";
import StudentsSection from "@/components/sections/StudentsSection";
import AboutSection from "@/components/sections/AboutSection";
import CountriesSection from "@/components/sections/CountriesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TeamSection from "@/components/sections/TeamSection";
import TestPrepSection from "@/components/sections/TestPrepSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import CounselingSection from "@/components/sections/CounselingSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <CountriesSection />
      {/* <JourneySection /> */}
      <AboutSection />
      <ReviewsSection />
      <StudentsSection />
      {/* <CountriesSection /> */}
      <WhyChooseUsSection />
      <TestPrepSection />
      <TeamSection />
      <CounselingSection />
    </main>
  );
}

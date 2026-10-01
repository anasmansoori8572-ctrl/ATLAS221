import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/index.php", destination: "/" },
      { source: "/about.php", destination: "/about" },
      { source: "/team.php", destination: "/team" },
      { source: "/faq.php", destination: "/faq" },
      { source: "/contact.php", destination: "/contact" },
      { source: "/scholarship.php", destination: "/scholarship" },
      { source: "/blog.php", destination: "/blog" },
      { source: "/blog-details.php", destination: "/blog/admission-open" },
      { source: "/error.php", destination: "/error" },
      { source: "/coaching.php", destination: "/coaching" },
      { source: "/gre.php", destination: "/test-prep/gre" },
      { source: "/ielts.php", destination: "/test-prep/ielts" },
      { source: "/gmat.php", destination: "/test-prep/gmat" },
      { source: "/toefl.php", destination: "/test-prep/toefl" },
      { source: "/sat.php", destination: "/test-prep/sat" },
      { source: "/pte.php", destination: "/test-prep/pte" },
      { source: "/duolingo.php", destination: "/test-prep/duolingo" },
      { source: "/visa.php", destination: "/visa" },
      { source: "/visa-details.php", destination: "/visa/student" },
      { source: "/visa-details-2.php", destination: "/visa/residence" },
      { source: "/visa-details-3.php", destination: "/visa/business" },
      { source: "/visa-details-4.php", destination: "/visa/tourist" },
      { source: "/visa-details-5.php", destination: "/visa/conference" },
      { source: "/visa-details-6.php", destination: "/visa/medical" },
      { source: "/countries.php", destination: "/countries" },
      { source: "/countries-details.php", destination: "/countries/usa" },
      { source: "/countries-details-2.php", destination: "/countries/australia" },
      { source: "/countries-details-3.php", destination: "/countries/canada" },
      { source: "/countries-details-4.php", destination: "/countries/uae" },
      { source: "/countries-details-5.php", destination: "/countries/uk" },
      { source: "/countries-details-6.php", destination: "/countries/new-zealand" },
      { source: "/countries-details-7.php", destination: "/countries/ireland" },
      { source: "/countries-details-8.php", destination: "/countries/france" },
      { source: "/countries-details-9.php", destination: "/countries/italy" },
      { source: "/countries-details-10.php", destination: "/countries/germany" },
      { source: "/countries-details-11.php", destination: "/countries/china" },
    ];
  },
};

export default nextConfig;

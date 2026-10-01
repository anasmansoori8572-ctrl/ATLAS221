import type { Metadata } from "next";
import Script from "next/script";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";
import AtlasFaviconBackground from "@/components/3d/AtlasFaviconBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas Study — Your Gateway To Studying Abroad",
  description:
    "End-to-end guidance for university admissions, test preparation (IELTS, GRE, GMAT), and visa processing for top global destinations.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="antialiased font-sans"
    >
      <body className="min-h-screen flex flex-col bg-background selection:bg-rose-500 selection:text-white relative">
        {/* Global 3D Favicon Background (Excludes homepage '/') */}
        <AtlasFaviconBackground />

        <SmoothScroll>
          <Header />
          <div className="flex-1 relative z-10">{children}</div>
          <Footer />
        </SmoothScroll>
        <Script
          src="http://localhost:3001/widget.js"
          data-widget-id="pFJPjGA94oM5KUHg5Kl9F"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

import HeroCanvas from "@/components/canvas/HeroCanvas";
import HeroUI from "@/components/hero/HeroUI";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-rose-50 via-white to-pink-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(225,29,72,0.06),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_52%,rgba(244,63,94,0.28)_0%,rgba(236,72,153,0.22)_24%,rgba(244,114,182,0.13)_42%,rgba(253,164,175,0.05)_58%,transparent_72%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_52%,rgba(225,29,72,0.12)_0%,transparent_38%)]" />
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <HeroUI />
    </section>
  );
}

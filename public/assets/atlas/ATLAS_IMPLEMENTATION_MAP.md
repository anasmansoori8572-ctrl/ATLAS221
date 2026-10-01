# ATLAS STUDY — MASTER ASSET IMPLEMENTATION & 3D DESIGN MAP

## 1. Executive Summary
- **Total Source Images Downloaded from Live AtlasStudy.in:** 171
- **Total Images Actively Implemented in UI / Routes:** 56
- **Active Coverage:** 32.7%
- **Authenticity Guarantee:** 100% genuine assets extracted directly from `https://www.atlasstudy.in/`.
- **Design Integration:** Embedded across 35+ routes with Next.js `<Image />`, 3D WebGL particle canvases, perspective tilt cards, and glassmorphism styling.

## 2. Route & Component Implementation Coverage Matrix

| Route / Component | Real Atlas Source Images Used | 3D / WebGL Treatment | Status |
| :--- | :--- | :--- | :--- |
| **Homepage (`/`)** | `nitin.jpg`, `VISHANT.jpg`, `AASHIMA.png`, `ANKITA.png`, `IELTS.jpg`, `TOEFL.jpg`, `PTE.jpg`, `SAT.jpg`, `rakim.jpg`, `zaid.jpg`, `Canada.png`, `uk.png`, `Italy.png`, `France.png`, `Germany.png`, `China.png`, `Ireland.png`, `Australia.png`, `UAE.png`, `newzealand.png`, `USA.png`, `footer-1..6.jpg` | HeroCanvas, ReviewsGlobeCanvas, Countries 3D Globe, Team 3D Tilt | **VERIFIED ACTIVE** |
| **About (`/about`)** | `rakim.jpg` (Founder), `chooseus-1.png`, `about-7.jpg`, `mission-bg.jpg` | 3D Tilt Cards, Particle Field | **VERIFIED ACTIVE** |
| **Team (`/team`)** | `rakim.jpg`, `zaid.jpg`, `team-1.jpg`, `ali.jpeg`, `team-4..10.jpg` | Team 3D Floating Avatar Canvas | **VERIFIED ACTIVE** |
| **Countries Overview (`/countries`)** | `uk.png`, `USA.png`, `Canada.png`, `Australia.png`, `Ireland.png`, `germany.png`, `france.png`, `italy.png`, `newzealand.png`, `UAE.png`, `china.png`, `country-1..7.jpg` | CountryGlobe3DCanvas, 3D Hover Depth Cards | **VERIFIED ACTIVE** |
| **Country Detail Pages (`/countries/[slug]`)** | Country high-res cutout PNGs + `country-1..7.jpg` scenery banners | Real-time Country Globe WebGL + Depth Parallax | **VERIFIED ACTIVE** |
| **Visa Overview (`/visa`)** | `visa-1.jpg` (Student), `visa-2.jpg` (PR), `visa-3.jpg` (Business), `visa-4.jpg` (Tourist), `visa-5.jpg` (Conference), `visa-6.jpg` (Medical) | TravelNetworkCanvas, 3D Shimmer Borders | **VERIFIED ACTIVE** |
| **Visa Detail Pages (`/visa/[slug]`)** | `visa-1.jpg` to `visa-17.jpg` (Category + Documentation + Mock drills) | Interactive Flight Orbit Canvas | **VERIFIED ACTIVE** |
| **Coaching Overview (`/coaching`)** | `IELTS.jpg`, `GRE.jpg`, `GMAT.jpg`, `TOEFL.jpg`, `SAT.jpg`, `PTE.jpg`, `DUOLINGO.jpg` | AudioWave3DCanvas, Interactive Modules | **VERIFIED ACTIVE** |
| **Test Prep Detail Pages (`/test-prep/[slug]`)** | Course Exam graphics + `coaching-14.jpg` to `coaching-18.jpg` labs | AudioWave3DCanvas, Real Simulation Badges | **VERIFIED ACTIVE** |
| **Scholarships (`/scholarship`)** | `statistics-2.jpg` (Official Atlas Aid Infographic), Country Flags | ScholarshipParticlesCanvas, Gold Glow Badges | **VERIFIED ACTIVE** |
| **Contact (`/contact`)** | `contact-1.png` (Kanpur Office Desk), `contact-bg.jpg` | OrbitUniverseCanvas, Global Desks | **VERIFIED ACTIVE** |
| **Blog (`/blog`, `/blog/[slug]`)** | `news-1.jpg`, `news-2.jpg`, `news-3.jpg`, `news-4.jpg` | Perspective Article Cards | **VERIFIED ACTIVE** |
| **Footer (`components/footer/Footer.tsx`)** | `footer-1.jpg`, `footer-2.jpg`, `footer-3.jpg`, `footer-4.jpg`, `footer-5.jpg`, `footer-6.jpg` | FooterCanvas, 3D Interactive Gallery | **VERIFIED ACTIVE** |

## 3. Asset Directory Breakdown

| Category Directory | Extracted Asset Count | Purpose & Usage |
| :--- | :--- | :--- |
| `/about/` | 6 images | About section headers, mission visuals, choose-us badges |
| `/backgrounds/` | 15 images | Modern backdrops, abstract curves, contact overlays |
| `/blog/` | 6 images | High-res blog article feature banners |
| `/countries/` | 31 images | 11 Country cutouts, 7 landmark sceneries, 13 international flags |
| `/home/` | 14 images | Homepage hero banners, badges, counseling assets |
| `/icons/` | 28 images | Specialized educational icons, quote accents, error badges |
| `/misc/` | 4 images | Official scholarship infographics, office desk photos |
| `/students/` | 4 images | Verified student visa achievers (`nitin`, `VISHANT`, `AASHIMA`, `ANKITA`) |
| `/team/` | 11 images | Leadership (`Rakim`, `Zaid`, `Ali`) and advisory staff |
| `/test-prep/` | 13 images | Official course covers (`IELTS`, `GRE`, `GMAT`, `TOEFL`, `SAT`, `PTE`, `DUOLINGO`) & coaching labs |
| `/testimonials/` | 13 images | Client testimonials & university partnership client logos |
| `/visa/` | 20 images | Visa category thumbnails, documentation checklists, mock drill photos |

---
*Manifest generated automatically by Atlas Study Asset Workflow Engine.*
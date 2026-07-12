# NexArch — Marketing Site (Next.js)

Next.js 14 (App Router) + TypeScript + Tailwind implementation of the NexArch public landing
page described in `Nexarch_SRS.docx`. This repo covers the **Public Website** half of the SRS;
the Administration Platform (RBAC, CMS, GA4 dashboard backend) is a separate application that
would consume/manage the content this site renders.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build && npm run start   # production build
```

## Project structure

```
app/
  layout.tsx        Root layout: fonts, global <Metadata>, Organization + Service JSON-LD
  page.tsx           Home page — composes all landing sections, page-level <Metadata>
  sitemap.ts         Generates /sitemap.xml (App Router convention)
  robots.ts          Generates /robots.txt (App Router convention)
  globals.css        Tailwind layers + the reveal/pulse-line/marquee animation system

components/
  Header.tsx         Sticky nav + mobile drawer (client)
  Hero.tsx           H1, typing effect, signature "pulse-to-growth" SVG motif (client)
  TrustMarquee.tsx   Auto-scrolling practice-name strip (server)
  Platform.tsx       3 feature cards mapped to SRS modules: CRM, GA4 dashboard, CMS/SEO
  Process.tsx        4-step onboarding timeline with scroll-filled connector line (client)
  Results.tsx        Case-study card, animated counters, quote (client)
  Counter.tsx         IntersectionObserver-driven number counter (client)
  Testimonials.tsx    Scroll-snap carousel (client)
  CTABanner.tsx       Mid-page conversion banner
  FAQ.tsx             Accordion + FAQPage JSON-LD for rich-result eligibility (client)
  FinalCTA.tsx        Bottom conversion section
  Footer.tsx          Nav, contact, newsletter form (client)
  ChatFab.tsx          Floating chat affordance (client, non-functional placeholder)
  Reveal.tsx           Generic scroll-reveal wrapper (client)

lib/
  site.ts             Single source of truth for name/description/contact/social — reused by
                       metadata, JSON-LD, and every component that prints contact info
  useReveal.ts         IntersectionObserver hook backing the reveal/animation system

public/
  logo.png            NexArch logo (white background — sits in header/footer inside a white chip)
  media/              Drop hero-video.mp4 here (falls back to the poster image otherwise)
  site.webmanifest
```

## SEO implementation

- **Metadata API** (`app/layout.tsx`, `app/page.tsx`): title template, description, keywords,
  canonical URL, Open Graph, Twitter Card, robots directives.
- **Structured data**: `Organization` + `Service` JSON-LD in the root layout, `FAQPage` JSON-LD
  in `FAQ.tsx` (eligible for FAQ rich results as long as the accordion content matches what's
  visible on the page, which it does here).
- **`app/sitemap.ts`** and **`app/robots.ts`**: generated at `/sitemap.xml` and `/robots.txt`
  using Next's typed App Router conventions — no separate `next-sitemap` dependency needed.
- **Semantic structure**: exactly one `<h1>` (in the hero), sequential `<h2>`s per section,
  `<nav>`, `<main>`, `<footer>` landmarks, descriptive `alt` text on every image.
- **Performance**: `next/font` self-hosts Google Fonts (no render-blocking font requests),
  `next/image` for automatic AVIF/WebP + responsive `srcset`, and reduced-motion is respected
  throughout the animation system (`globals.css`).

## Before deploying

1. **Replace placeholder contact/social info** in `lib/site.ts` — phone, email, and social URLs
   are currently placeholders from the design mockup.
2. **Add real OG/Twitter image** at `public/og-image.png` (1200×630) — referenced in
   `lib/site.ts` but not yet supplied.
3. **Add a transparent-background logo** if possible — the current logo PNG has a solid white
   background, which is why it's wrapped in a white chip in the header/footer.
4. **Add `public/media/hero-video.mp4`** or remove the `<video>` element in `Hero.tsx` if you'd
   rather ship the poster image only.
5. **Set `siteConfig.url`** in `lib/site.ts` to the real production domain before generating the
   sitemap/robots/canonical URLs.
6. Swap the placeholder testimonial/case-study photography for real, licensed practice imagery.

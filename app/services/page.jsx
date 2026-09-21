import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `Services — ${siteConfig.name}`,
  description: "Explore our three ways to work with us."
};

const tiers = [
  {
    title: "Presence",
    target: "For general dentists placing single implants, or practices not yet ready to run paid advertising.",
    body: "Website care, Google Business Profile management, local search optimization, and a review system that runs through your own front desk — with every response written by us within 24 hours. Twelve posts a month across two platforms, three of them video. The foundation, built properly."
  },
  {
    title: "Case Flow",
    target: "For implant-focused practices ready to generate consultations, not just visibility.",
    body: "Everything in Presence, plus advertising built as three separate campaigns — single implant, full arch, and implant dentures target different patients and shouldn't share a budget. Dedicated landing pages, five-minute response to every enquiry, and a sixty-day follow-up sequence for the patients who need more time to decide, which in full-arch is most of them."
  },
  {
    title: "Authority",
    target: "For full-arch surgeons and dedicated implant centers competing on reputation as much as on reach.",
    body: "Everything in Case Flow, plus a monthly recording session that becomes your personal-brand content, two patient story films a quarter, a seminar or webinar funnel built once and run monthly, and a consultation framework built with your front desk so booked leads convert to accepted cases at a higher rate."
  }
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="top" className="bg-white pt-24">
        {/* Hero Section */}
        <section className="relative w-full min-h-[450px] bg-graphite flex items-center pt-20 pb-16 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline>
            
            <source src="/media/services.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay over the background video */}
          <div className="absolute inset-0 bg-graphite/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('/media/noise.png')] opacity-10 mix-blend-overlay z-0"></div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
            <Reveal variant="up">
              <span className="font-mono text-[11px] text-clinical uppercase mb-4 block tracking-wider">
                What we actually do
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Three Ways to <br /> Work With Us
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                No à la carte menu, no custom scopes negotiated line by line. Three fixed programs, each with a stated set of deliverables, so you know exactly what you're getting and we know exactly what we're delivering. Advertising spend is separate in every case — you fund your own campaigns directly with Google and Meta; we never mark it up or sit between you and your ad accounts.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services List Section */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, idx) =>
            <Reveal key={tier.title} variant="up" delay={idx * 100}>
              <div className="lift-card h-full bg-white p-8 md:p-10 rounded-[2rem] border border-lightgray shadow-card flex flex-col overflow-hidden">
                <h3 className="text-2xl font-display font-bold text-graphite mb-2">
                  {tier.title}
                </h3>
                <p className="text-graphite font-medium text-[15px] leading-relaxed mb-4 pb-4 border-b border-lightgray">
                  {tier.target}
                </p>
                <p className="text-clinical text-[15px] leading-relaxed mb-8 flex-grow">
                  {tier.body}
                </p>
              </div>
            </Reveal>
            )}
          </div>
          
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <Reveal variant="up">
              <h3 className="text-2xl font-display font-bold text-graphite mb-4">On pricing</h3>
              <p className="text-clinical text-[16px] leading-relaxed mb-8">
                We don't publish rates on this page, for the same reason a surgeon doesn't publish a price for "an implant" without seeing the case — the right tier depends on your current volume, market, and whether you're already running ads. You'll have a number in writing after the first call, not after three follow-ups.
              </p>
              <a
                href="/contact"
                className="btn-primary inline-flex bg-graphite hover:bg-black text-white font-bold py-3.5 px-7 rounded-full shadow-sm">
                Not sure which fits? Book a Consultation
              </a>
            </Reveal>
          </div>
        </section>

        <Process />
      </main>
      <Footer />
    </>
  );
}

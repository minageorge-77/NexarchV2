
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import TrustMarquee from "@/components/TrustMarquee";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `About Us — ${siteConfig.name}`,
  description: "Built for Dental Implant Practices. Discover our mission and values."
};

const values = [
{
  title: "Data Over Intuition",
  description: "Marketing shouldn't be guesswork. We build systems that track every dollar spent back to booked implant consultations.",
  icon:
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />

},
{
  title: "Exclusively Dental",
  description: "We don't work with roofers or lawyers. Our entire infrastructure is optimized specifically for high-value full-arch and single implant cases.",
  icon:
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />

},
{
  title: "Partnership Growth",
  description: "Your success is our success. We operate as an extension of your practice, continually refining campaigns to lower acquisition costs.",
  icon:
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />

}];


export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="top" className="bg-white pt-24">
        {/* Hero Section */}
        <section className="relative w-full min-h-[450px] bg-graphite flex items-center pt-20 pb-16 overflow-hidden bg-[url('/nexarch%20bg.png')] bg-cover bg-center bg-fixed">
          {/* Dark Overlay over the fixed background image */}
          <div className="absolute inset-0 bg-graphite/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('/media/noise.png')] opacity-10 mix-blend-overlay z-0"></div>
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
            <Reveal variant="up">
              <span className="font-mono text-[11px] text-cloud uppercase mb-4 block tracking-wider">
                Our Mission
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Built for Dental <br /> Implant Practices
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                We bridge the gap between world-class clinical care and modern digital acquisition, turning specialized practices into market leaders.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <Reveal variant="up">
            <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite mb-6 leading-tight">
              The Engine Behind Clinical Growth
            </h2>
            <p className="text-cloud text-lg leading-relaxed mb-6">
              Most dental practices possess incredible clinical skills but lack the infrastructure to predictably attract $20k+ implant cases. They rely on disjointed agencies, fragmented software, and intuition rather than hard data.
            </p>
            <p className="text-cloud text-lg leading-relaxed">
              NexArch was founded to solve this. We combine elite patient marketing with a powerful backend platform—giving practice owners a single system that handles everything from the first ad click to the scheduled consultation. We don't just generate leads; we engineer growth.
            </p>
          </Reveal>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6 bg-white border-y border-lightgray">
          <div className="max-w-6xl mx-auto">
            <Reveal variant="up" className="text-center mb-16">
              <span className="font-mono text-[11px] text-graphite uppercase mb-4 block tracking-wider">
                Our Principles
              </span>
              <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite leading-tight">
                How We Operate
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, idx) =>
              <Reveal key={value.title} variant="up" delay={100 * (idx + 1)}>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto bg-[#f7f7f7] rounded-full flex items-center justify-center text-graphite mb-6">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {value.icon}
                      </svg>
                    </div>
                    <h3 className="text-xl font-display font-bold text-graphite mb-3">
                      {value.title}
                    </h3>
                    <p className="text-cloud text-base leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        <TrustMarquee />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>);

}
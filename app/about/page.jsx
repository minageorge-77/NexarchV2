
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
              <span className="font-mono text-[11px] text-gold uppercase mb-4 block tracking-wider font-bold">
                Result-Driven Marketing For Dental Masters
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Built For The <br /> Implant Surgeon
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                NexArch is a marketing agency built for one kind of dentist: the implant surgeon. We don&apos;t claim numbers — we partner with dentists, bringing marketing specialty and mastery to complement their dentistry mastery.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <Reveal variant="up">
            <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite mb-6 leading-tight">
              Patients Decide In Minutes What You Spent Decades Building. <br />
              <span className="text-gold">Give Them Better Evidence.</span>
            </h2>
            <p className="text-clinical text-lg leading-relaxed mb-6">
              Most dental implant practices possess world-class clinical skills but lack the dedicated marketing mastery required to consistently reflect their expertise online.
            </p>
            <p className="text-clinical text-lg leading-relaxed">
              NexArch bridges that gap as your specialized growth partner. We combine high-impact patient acquisition with custom digital infrastructure, giving implant surgeons the spotlight and evidence their mastery deserves.
            </p>
          </Reveal>
        </section>

        <TrustMarquee />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>);

}

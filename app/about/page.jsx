import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `About Us — ${siteConfig.name}`,
  description: "Who's behind this."
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
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
            <Reveal variant="up">
              <span className="font-mono text-[11px] text-gold uppercase mb-4 block tracking-wider font-bold">
                Who's behind this
              </span>
              <h1 className="text-white text-[32px] md:text-[48px] font-display font-extrabold tracking-tight uppercase leading-tight mb-6 max-w-4xl mx-auto">
                Built by People Who've <br /> Done the Delivery Work
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                NexArch exists because implant dentistry — from a first single case to a full arch — is a specific enough problem that it deserved a team built around it, not a generalist agency's side offering. [Founder name] leads strategy and client relationships. [Founder name] leads creative and campaign execution. [Partner name], a practicing [dentist / specialist], keeps the clinical side of every recommendation honest — the difference between a campaign that reads well and one that reflects how a consultation and a treatment plan actually happen in your chair.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Sub-block */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <Reveal variant="up" className="text-center">
            <h2 className="text-[28px] md:text-[36px] font-display font-bold text-graphite leading-tight mb-6">
              How we work
            </h2>
            <p className="text-clinical text-lg leading-relaxed max-w-2xl mx-auto">
              Every account is run by people, not a dashboard on autopilot. Fixed deliverables, stated response times, and a monthly report you can actually act on. No quarterly surprises about what was supposedly included.
            </p>
          </Reveal>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-clinical/10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal variant="up">
              <h2 className="text-[32px] md:text-[42px] font-display font-bold text-graphite mb-8 leading-tight">
                Meet the team on a call.
              </h2>
              <a
                href="/contact"
                className="btn-primary inline-flex bg-graphite hover:bg-black text-white font-bold py-4 px-9 rounded-full shadow-sm text-lg">
                Book a Consultation
              </a>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

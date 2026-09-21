import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `Approach — ${siteConfig.name}`,
  description: "How we think about this."
};

export default function ApproachPage() {
  return (
    <>
      <Header />
      <main id="top" className="bg-white pt-24">
        {/* Hero Section */}
        <section className="relative w-full min-h-[450px] bg-graphite flex items-center pt-20 pb-16 overflow-hidden bg-[url('/testimonials.png')] bg-cover bg-center bg-fixed">
          {/* Dark Overlay over the fixed background image */}
          <div className="absolute inset-0 bg-graphite/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('/media/noise.png')] opacity-10 mix-blend-overlay z-0"></div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
            <Reveal variant="up">
              <span className="font-mono text-[11px] text-clinical uppercase mb-4 block tracking-wider">
                How we think about this
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                The Math We <br /> Built This On
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto font-medium">
                We didn't start as a general marketing agency and narrow down to implants. We started with the economics of a full-arch case and built an agency around what that number actually requires.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-24 px-6 max-w-4xl mx-auto space-y-20">
          
          <Reveal variant="up">
            <div className="space-y-6">
              <h2 className="text-[28px] md:text-[36px] font-display font-bold text-graphite leading-tight">
                The numbers that set the strategy
              </h2>
              <div className="space-y-5 text-clinical text-lg leading-relaxed">
                <p>
                  A single implant patient is typically worth a few hundred to a couple thousand dollars in acquisition cost against a treatment value of a few thousand. A completed full-arch case runs $15,000–$40,000, with most falling between $20,000 and $30,000 — against an acquisition cost usually in the $1,000–$2,000 range. That gap is why full-arch deserves campaigns, landing pages, and follow-up sequences built specifically for it, rather than folded into a general “dental implants” ad group alongside single-tooth cases with entirely different economics.
                </p>
                <p>
                  It's also why response time matters more here than almost any other category of local marketing. A patient considering a $25,000 procedure who doesn't hear back within minutes doesn't wait around — they call the next practice on the list. Most of what looks like “the ads aren't working” is actually the follow-up.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up">
            <div className="space-y-6">
              <h2 className="text-[28px] md:text-[36px] font-display font-bold text-graphite leading-tight">
                What we track, and why it's different from a lead count
              </h2>
              <div className="space-y-5 text-clinical text-lg leading-relaxed">
                <p>
                  A lead is not a case. We report the full path — enquiry, booked consultation, consultation attended, case accepted — because a practice that closes 25% of consultations and one that closes 50% have identical marketing and completely different businesses. Most agencies stop reporting at the lead. We don't, because the number that pays your bills is the one at the end of that chain, not the beginning.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up">
            <div className="space-y-6">
              <h2 className="text-[28px] md:text-[36px] font-display font-bold text-graphite leading-tight">
                Where we're starting
              </h2>
              <div className="space-y-5 text-clinical text-lg leading-relaxed">
                <p>
                  NexArch is working with its first practices now. If the honest state of things matters to you before you commit — it should — ask us directly on the call what that means for you: closer attention, direct access to the people doing the work, and a say in how the reporting and process get built.
                </p>
              </div>
            </div>
          </Reveal>

        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-clinical/10">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal variant="up">
              <h2 className="text-[32px] md:text-[42px] font-display font-bold text-graphite mb-8 leading-tight">
                Talk through your numbers.
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

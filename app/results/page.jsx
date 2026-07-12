
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatFab from "@/components/ChatFab";
import ResultsComponent from "@/components/Results";
import CTABanner from "@/components/CTABanner";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `Results — ${siteConfig.name}`,
  description: "See the live results and ROI our platform delivers to implant practices."
};














import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

// Fetch function
async function getTestimonials() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ status: "published" }).sort({ order: 1, createdAt: -1 }).lean();
    
    return testimonials.map(t => ({
      ...JSON.parse(JSON.stringify(t)),
      metrics: t.rating === 5 ? { value: "5.0", label: "Rating" } : null
    }));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}

export default async function ResultsPage() {
  const caseStudies = await getTestimonials();

  return (
    <>
      <Header />
      <main id="top" className="bg-surface-warm pt-24">
        {/* Hero Section */}
        <section className="relative w-full min-h-[400px] bg-primary-deep flex items-center pt-20 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/media/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
            <Reveal variant="up">
              <span className="font-mono text-[11px] text-lime uppercase mb-4 block tracking-wider">
                Live Results
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Pipeline You <br /> Can Measure
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                We don't sell impressions or clicks. We sell a system that predictably scales high-value implant production.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Global Stats via Reused Component */}
        <ResultsComponent />

        {/* Case Studies Grid */}
        <section className="py-24 px-6 max-w-6xl mx-auto border-t border-outline-variant">
          <Reveal variant="up" className="text-center mb-16">
            <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-primary leading-tight">
              Practice Transformations
            </h2>
            <p className="text-on-surface-variant mt-4 max-w-xl mx-auto text-lg">
              Real numbers from practices leveraging our technology-enabled growth platform.
            </p>
          </Reveal>

          {caseStudies.length === 0 ?
          <div className="text-center py-20">
              <p className="text-on-surface-variant text-lg">No results available at the moment.</p>
            </div> :

          <div className="grid md:grid-cols-3 gap-8">
              {caseStudies.map((study, idx) =>
            <Reveal key={study._id} variant="up" delay={100 * (idx % 3 + 1)}>
                  <div className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] p-8 shadow-card h-full flex flex-col">
                    {study.metrics &&
                <div className="mb-6">
                        <span className="text-[40px] font-display font-extrabold text-lime-dark block leading-none mb-2">
                          {study.metrics.value}
                        </span>
                        <span className="font-mono text-xs text-outline uppercase tracking-wider block">
                          {study.metrics.label}
                        </span>
                      </div>
                }
                    
                    <div className="flex-grow mb-6">
                      <p className="text-on-surface-variant text-[15px] leading-relaxed">
                        "{study.content}"
                      </p>
                    </div>
                    
                    <div className="pt-6 border-t border-outline-variant">
                      <h4 className="font-display font-bold text-on-surface">{study.clientName}</h4>
                      <span className="text-sm text-on-surface-variant">{study.clientTitle}{study.company ? `, ${study.company}` : ''}</span>
                    </div>
                  </div>
                </Reveal>
            )}
            </div>
          }
        </section>

        <CTABanner />
        <FinalCTA />
      </main>
      <Footer />
      <ChatFab />
    </>);

}
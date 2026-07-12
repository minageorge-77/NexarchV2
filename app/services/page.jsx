
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatFab from "@/components/ChatFab";
import Process from "@/components/Process";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: `Services — ${siteConfig.name}`,
  description: "Explore our technology-enabled dental growth platform services."
};









import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";

// Fetch function
async function getServices() {
  try {
    await connectDB();
    const services = await Service.find({ status: "published" }).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getServices();

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
                Our Services
              </span>
              <h1 className="text-white text-[40px] md:text-[56px] font-display font-extrabold tracking-tight uppercase leading-none mb-6">
                Engineered for <br /> Implant Growth
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                A unified suite of tools and strategies designed to attract, qualify, and convert high-value dental implant cases.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Services List Section */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          {services.length === 0 ?
          <div className="text-center py-20">
              <p className="text-on-surface-variant text-lg">No services available at the moment.</p>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) =>
            <Reveal key={service._id} variant="up" delay={idx % 2 === 0 ? 100 : 200}>
                  <div className="lift-card h-full bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] border border-outline-variant shadow-card flex flex-col">
                    <h3 className="text-2xl font-display font-bold text-on-surface mb-4">
                      {service.title}
                    </h3>
                    <p className="text-on-surface-variant text-[15px] leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="pt-6 border-t border-outline-variant">
                      <span className="font-mono text-[11px] uppercase text-outline mb-4 block tracking-wider">
                        Core Features
                      </span>
                      <ul className="space-y-3">
                        {service.features?.map((feature, fIdx) =>
                    <li key={fIdx} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-on-surface text-sm font-medium">{feature}</span>
                          </li>
                    )}
                      </ul>
                    </div>
                  </div>
                </Reveal>
            )}
            </div>
          }
        </section>

        <Process />
        <FinalCTA />
      </main>
      <Footer />
      <ChatFab />
    </>);

}
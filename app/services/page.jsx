
import { siteConfig } from "@/lib/site";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
              <span className="font-mono text-[11px] text-cloud uppercase mb-4 block tracking-wider">
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
              <p className="text-cloud text-lg">No services available at the moment.</p>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, idx) =>
            <Reveal key={service._id} variant="up" delay={idx % 2 === 0 ? 100 : 200}>
                  <div className="lift-card h-full bg-white p-8 md:p-10 rounded-[2rem] border border-lightgray shadow-card flex flex-col overflow-hidden">
                    {service.imageUrl && (
                      <div className="relative w-full h-48 md:h-56 -mt-8 -mx-8 md:-mt-10 md:-mx-10 mb-8 overflow-hidden bg-[#f7f7f7] shrink-0" style={{ width: 'calc(100% + 4rem)' }}>
                        <Image 
                          src={service.imageUrl} 
                          alt={service.title} 
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-105" 
                        />
                      </div>
                    )}
                    <h3 className="text-2xl font-display font-bold text-graphite mb-4">
                      {service.title}
                    </h3>
                    <p className="text-cloud text-[15px] leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    
                    <div className="pt-6 border-t border-lightgray">
                      <span className="font-mono text-[11px] uppercase text-cloud mb-4 block tracking-wider">
                        Core Features
                      </span>
                      <ul className="space-y-3">
                        {service.features?.map((feature, fIdx) =>
                    <li key={fIdx} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-graphite flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-graphite text-sm font-medium">{feature}</span>
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
    </>);

}
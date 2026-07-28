import Reveal from "./Reveal";
import { siteConfig } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section id="contact" className="py-24 px-5 bg-graphite relative overflow-hidden">
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-40 opacity-20"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true">
        
        <path
          d="M0 120 L120 120 L140 70 L160 150 L180 40 L200 120 L280 120 C 340 120 360 90 420 80 C 480 70 500 40 560 30 C 620 20 650 8 800 4"
          stroke="#8a9299"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round" />
        
      </svg>
      <Reveal className="relative max-w-md md:max-w-lg mx-auto text-center">
        <span className="font-mono text-[11px] uppercase text-cloud">Let&apos;s talk numbers</span>
        <h2 className="text-white text-[30px] md:text-[40px] font-display font-extrabold mt-3 mb-4 leading-tight">
          What are your implant growth goals for the next 90 days?
        </h2>
        <p className="text-white/80 mb-8">
          Tell us where the practice stands today. We&apos;ll tell you, honestly, whether NexArch is the right fit.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="btn-primary inline-flex bg-white hover:bg-lightgray text-graphite font-bold py-4 px-9 rounded-full">
          
          Book a Consultation
        </a>
      </Reveal>
    </section>);

}
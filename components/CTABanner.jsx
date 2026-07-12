import Image from "next/image";
import Reveal from "./Reveal";

export default function CTABanner() {
  return (
    <section className="py-24 px-5 bg-surface">
      <Reveal variant="zoom" className="max-w-md md:max-w-3xl mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-lift relative h-96">
          <Image
            alt="Modern clinical office interior"
            fill
            className="object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6Al0jXlvU2Vq2VaWgcyq3PIAyq_F5dFaprR8oarOZIy2QGUolilhVv-kr9txQM8lU287xpWyIBbH1ai2Fpznx1wmxlJWA-rYs3jQPENfH0e1kn9SoL9h1RvpGP5sc25tYTrVrhIbVnrOMa1v4lCV6o-vSrfAQ8TCrGcEhDaXvtVLZAdd4p4p2LEHWocJ9J2LWkTYwERIYAv1j05B1c4Li7Xpc_Sl04BkdSgpAY8AOYN17vUgMFvuVsA" />
          
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <span className="font-mono text-[11px] text-on-primary-variant uppercase">Ready when you are</span>
            <h2 className="text-white text-[28px] md:text-[36px] font-display font-bold mt-2 mb-2 leading-tight">
              A growth platform,
              <br />
              not just a website
            </h2>
            <p className="text-white/85 text-[15px] max-w-sm mb-6">
              NexArch builds the technology infrastructure for scalable implant patient acquisition — and stays
              accountable to the numbers every month.
            </p>
            <a
              href="#contact"
              className="btn-primary inline-flex bg-lime hover:bg-lime-dark text-white font-bold py-3.5 px-7 rounded-full">
              
              Start the conversation
            </a>
          </div>
        </div>
      </Reveal>
    </section>);

}
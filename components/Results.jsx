"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { useReveal } from "@/lib/useReveal";











export default function Results() {
  const { ref: lineRef, visible: lineVisible } = useReveal(0.4);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${baseURL}/testimonials`);
        if (res.ok) {
          const data = await res.json();
          // Find the first testimonial that has metrics, or just take the first one
          const withMetrics = data.data?.find((t) => t.metrics?.value) || data.data?.[0];
          if (withMetrics) {
            setFeatured(withMetrics);
          }
        }
      } catch (error) {
        console.error("Failed to fetch featured testimonial:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return <section id="results" className="py-24 px-5 bg-white min-h-[500px]"></section>;
  }

  // Fallback to static text if no data exists
  const clinicName = featured?.clinicName || "Summit Implant & Oral Surgery";
  const location = featured?.location || "Buda, TX";
  const quote = featured?.content || "We stopped guessing which channel worked. NexArch showed us the number for every dollar, every location, every month.";
  const authorName = featured?.clientName || "Dr. Amara Smith";
  const highlightLabel = featured?.metrics?.label || "Implant Leads";
  const highlightValue = parseInt(featured?.metrics?.value?.replace(/[^0-9]/g, '') || "412", 10) || 412;

  return (
    <section id="results" className="py-24 px-5 bg-white">
      <Reveal variant="zoom" className="max-w-md md:max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-lightgray">
          <div className="relative h-64 md:h-80">
            <Image
              alt="Modern dental implant surgical suite"
              fill
              className="object-cover"
              src="/results.png" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="font-mono text-[10px] text-white/80 uppercase">
                Featured Case Study
              </span>
              <h3 className="text-white text-xl font-display font-bold">{clinicName} {location && `— ${location}`}</h3>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="text-[34px] md:text-[44px] font-display font-extrabold text-graphite leading-none">
                  <Counter target={highlightValue} />
                </p>
                <p className="font-mono text-[10px] text-cloud uppercase mt-2">{highlightLabel}</p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-[34px] md:text-[44px] font-display font-extrabold text-graphite leading-none">
                  <Counter target={158} />
                </p>
                <p className="font-mono text-[10px] text-cloud uppercase mt-2">Consultations</p>
              </div>
              <div className="text-center hidden sm:block">
                <p className="text-[34px] md:text-[44px] font-display font-extrabold text-graphite leading-none">
                  <Counter target={48920} currency />
                </p>
                <p className="font-mono text-[10px] text-cloud uppercase mt-2">Monthly production</p>
              </div>
            </div>

            <svg
              ref={lineRef}
              className="w-full h-14 mb-8"
              viewBox="0 0 400 60"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true">
              
              <path
                className="pulse-path"
                data-drawn={lineVisible}
                d="M0 48 L60 44 L100 50 L140 30 L190 34 L230 14 L280 18 L330 6 L400 4"
                stroke="#ced1cd"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round" />
              
            </svg>

            <blockquote className="border-l-4 border-lightgray pl-5 italic text-cloud text-[15px] leading-relaxed mb-8">
              &ldquo;{quote}&rdquo;
              <footer className="not-italic font-semibold text-graphite mt-2">
                — {authorName}, {clinicName}
              </footer>
            </blockquote>

            <a
              href="/contact"
              className="btn-primary bg-graphite hover:bg-black text-white font-bold py-4 px-8 rounded-full block text-center w-full">
              
              What are your goals?
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal
        delay={600}
        className="max-w-md md:max-w-3xl mx-auto mt-8 flex justify-between px-2 text-[11px] font-mono font-bold text-graphite uppercase tracking-wider text-center">
        
        <a className="w-1/2 p-3 hover:bg-[#f7f7f7] rounded-lg transition-colors" href="/results">
          Acquisition practices
        </a>
        <a
          className="w-1/2 p-3 hover:bg-[#f7f7f7] rounded-lg transition-colors border-l border-lightgray"
          href="/results">
          
          Startup practices
        </a>
      </Reveal>
    </section>);

}
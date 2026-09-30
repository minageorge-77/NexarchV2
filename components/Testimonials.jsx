"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";









export default function Testimonials() {
  const trackRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`/api/testimonials`);
        if (res.ok) {
          const data = await res.json();
          // Filter out those without content
          setTestimonials(data.data?.filter((t) => t.content) || []);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".testi-card");
    const amount = (card?.offsetWidth ?? 300) + 20;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (loading) {
    return <section className="py-24 bg-graphite min-h-[400px]"></section>;
  }

  if (testimonials.length === 0) {
    return null; // Hide section if no testimonials
  }

  return (
    <section className="relative py-24 bg-graphite bg-[url('/testimonials.png')] bg-cover bg-center bg-fixed overflow-hidden" aria-label="Testimonials">
      <div className="absolute inset-0 bg-graphite/85 backdrop-blur-[1px]" aria-hidden="true" />

      <div className="relative z-10">
        <div className="max-w-md md:max-w-4xl lg:max-w-5xl mx-auto px-5">
          <Reveal className="flex items-end justify-between mb-8">
            <div>
              <span className="font-mono text-[11px] uppercase text-white/80">In their words</span>
              <h2 className="text-[26px] md:text-[34px] font-display font-extrabold text-white mt-2 leading-tight">
                Practices like yours, growing
              </h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <button
                aria-label="Previous testimonial"
                onClick={() => scrollBy(-1)}
                className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-graphite transition-colors">
                
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => scrollBy(1)}
                className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-graphite transition-colors">
                
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div ref={trackRef} className="testimonial-track flex gap-6 overflow-x-auto px-5 pb-4 max-w-md md:max-w-4xl lg:max-w-5xl mx-auto snap-x">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="testi-card shrink-0 w-[90%] sm:w-[80%] md:w-[58%] lg:w-[52%] bg-white rounded-2xl p-7 sm:p-9 shadow-card border border-lightgray flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    {t.imageUrl ? (
                      <Image
                        src={t.imageUrl}
                        alt={t.clientName}
                        width={112}
                        height={112}
                        unoptimized={true}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shrink-0 border border-lightgray"
                      />
                    ) : (
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-lightgray flex items-center justify-center text-graphite font-display font-bold text-3xl shrink-0">
                        {t.clientName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-display font-bold text-xl sm:text-2xl text-graphite leading-snug">
                        {t.clientName}
                      </p>
                      {([t.clientTitle, t.company].filter(Boolean).length > 0 || t.clinicName) && (
                        <p className="font-mono text-xs sm:text-sm text-clinical uppercase tracking-wider mt-1.5">
                          {[t.clientTitle, t.company].filter(Boolean).join(" · ") || t.clinicName}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-graphite/90 font-semibold text-lg sm:text-[19px] leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>);

}

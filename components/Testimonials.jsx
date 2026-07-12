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
        const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${baseURL}/testimonials`);
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
    return <section className="py-24 bg-surface-warm min-h-[400px]"></section>;
  }

  if (testimonials.length === 0) {
    return null; // Hide section if no testimonials
  }

  return (
    <section className="py-24 bg-surface-warm overflow-hidden" aria-label="Testimonials">
      <div className="max-w-md md:max-w-3xl mx-auto px-5">
        <Reveal className="flex items-end justify-between mb-8">
          <div>
            <span className="font-mono text-[11px] uppercase text-lime-dark">In their words</span>
            <h2 className="text-[26px] md:text-[34px] font-display font-extrabold text-primary mt-2 leading-tight">
              Practices like yours, growing
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              aria-label="Previous testimonial"
              onClick={() => scrollBy(-1)}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-lowest transition-colors">
              
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => scrollBy(1)}
              className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container-lowest transition-colors">
              
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div ref={trackRef} className="testimonial-track flex gap-5 overflow-x-auto px-5 pb-4 max-w-md md:max-w-3xl mx-auto snap-x">
          {testimonials.map((t) =>
          <div
            key={t._id}
            className="testi-card shrink-0 w-[85%] sm:w-[70%] md:w-[48%] bg-surface-container-lowest rounded-2xl p-7 shadow-card border border-outline-variant">
            
              <div className="flex items-center gap-3 mb-4">
                {t.avatarUrl ?
              <Image
                src={t.avatarUrl}
                alt={t.clientName}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover" /> :


              <div className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">
                    {t.clientName.charAt(0)}
                  </div>
              }
                <div>
                  <p className="font-display font-bold text-sm text-on-surface">{t.clientName}</p>
                  <p className="font-mono text-[10px] text-outline uppercase">{t.clinicName}</p>
                </div>
              </div>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">&ldquo;{t.content}&rdquo;</p>
            </div>
          )}
        </div>
      </Reveal>
    </section>);

}
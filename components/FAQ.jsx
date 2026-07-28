"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
{
  q: "How fast will we see results?",
  a: "Most practices see qualified implant leads within the first two to three weeks of launch, with booked consultations following as the CRM and dashboard reporting come online. We report on a 90-day view because that's how long it takes to see a clean trend in implant case acceptance."
},
{
  q: "Do you require a long-term contract?",
  a: "No. We run on a 90-day initial term so both sides can evaluate performance against baseline, then move to month-to-month. Retention is built on results, not a signature."
},
{
  q: "Will you work with a competing implant practice in my area?",
  a: "No. We hold one client per service area to avoid bidding against ourselves in local search and paid media."
},
{
  q: "Who can access our data and dashboard?",
  a: "Access is role-based. You decide who on your team sees analytics, who can manage services and testimonials, and who has full administrative control — nothing is shared beyond what you authorize."
}];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a
      }
    }))
  };

  return (
    <section id="faq" className="py-24 px-5 bg-[#f7f7f7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="max-w-md md:max-w-2xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="font-mono text-[11px] uppercase text-cloud">Questions</span>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-graphite mt-3 leading-tight">
            Before you book the call
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.q} delay={100 * (i + 1)}>
                <div className="bg-white rounded-2xl border border-lightgray overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : i)}>
                    
                    <span className="font-display font-bold text-graphite">{faq.q}</span>
                    <svg
                      className="faq-chevron w-5 h-5 text-graphite shrink-0 ml-4"
                      data-open={isOpen}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true">
                      
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </button>
                  <div className="faq-panel px-5" style={{ maxHeight: isOpen ? "300px" : 0 }}>
                    <p className="text-cloud text-[15px] pb-5 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}
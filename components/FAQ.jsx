"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How fast will we see results?",
    a: "Campaign build takes two to six weeks depending on tier. Most practices see qualified enquiries within the first few weeks of launch; we report on a 90-day view because that's how long it takes to see a clean trend in consultation and case-acceptance rates, not just lead volume."
  },
  {
    q: "Do you require a long-term contract?",
    a: "Case Flow and Presence run an initial six-month term; Authority runs twelve, reflecting the setup involved. After the initial term, it's month-to-month with thirty days' notice either way."
  },
  {
    q: "Who can access our reporting?",
    a: "You control who on your team sees what — that's set up during onboarding, not handed to you as a fixed default."
  },
  {
    q: "What's not included?",
    a: "Ad spend itself (paid directly by you to Google and Meta), and anything outside the fixed deliverable list for your tier. If you want more than what's included, it's a clearly priced add-on — never a renegotiated retainer."
  }
];


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
    <section id="faq" className="relative py-24 px-5 bg-graphite bg-[url('/results.png')] bg-cover bg-center bg-fixed overflow-hidden">
      <div className="absolute inset-0 bg-graphite/85 backdrop-blur-[1px]" aria-hidden="true" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="relative z-10 max-w-md md:max-w-2xl mx-auto">
        <Reveal className="text-center mb-12">
          <span className="font-mono text-[23px] uppercase text-white/80">FAQ</span>
          <h2 className="text-[28px] md:text-[36px] font-display font-extrabold text-white mt-3 leading-tight">
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
                    <p className="text-clinical text-[15px] pb-5 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}

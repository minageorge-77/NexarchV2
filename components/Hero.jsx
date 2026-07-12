"use client";

import { useEffect, useRef, useState } from "react";

const phrases = [
"MORE IMPLANT PATIENTS BOOKED",
"PIPELINE YOU CAN MEASURE",
"GROWTH BUILT LIKE INFRASTRUCTURE"];


export default function Hero() {
  const [text, setText] = useState("");
  const pulseRef = useRef(null);
  const dotRef = useRef(null);
  const [drawn, setDrawn] = useState(false);
  const [dotShown, setDotShown] = useState(false);

  // Typing effect cycles through value propositions
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    const tick = () => {
      const current = phrases[phraseIndex];
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
      setText(current.substring(0, charIndex));

      let speed = isDeleting ? 40 : 75;
      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 450;
      }
      timeoutId = setTimeout(tick, speed);
    };

    timeoutId = setTimeout(tick, 900);
    return () => clearTimeout(timeoutId);
  }, []);

  // Draw-in animation for the signature pulse-to-growth line
  useEffect(() => {
    const t = setTimeout(() => {
      setDrawn(true);
      setTimeout(() => setDotShown(true), 2000);
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full min-h-[640px] md:min-h-[720px] bg-primary-deep overflow-hidden flex items-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://lh3.googleusercontent.com/aida-public/AB6AXuDZSb1lgXDwN1fllq1wsxlo4DOwQzake34AmX-HfS1vCdGlPZbv6sOB3Jdcc_BwGtHvWSpQ3_TFDOgXX-h0M3Vm-hqJcGJ3wMWaaCP2AqlxFZEh07Zwua_974SvxqJWs8Bs947aECYUD8dS8GmwNCnbgwJWFlj-gyFbBfe0OBcqwt2hO97Tgk2kzxivCFY60_-0KlMYfexqtWuFgTtPGVSSRgw78vEKbVivJCXJ18olM3D0cJar8qLmVw">
        
        <source src="/media/hero-video.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0"
        style={{
          background:
          "linear-gradient(180deg, rgba(4,48,30,0.55) 0%, rgba(4,48,30,0.74) 55%, rgba(4,48,30,0.95) 100%)"
        }} />
      

      {/* Signature pulse-to-growth line: heartbeat resolving into an ascending chart */}
      <svg
        className="absolute left-0 right-0 bottom-0 w-full h-[220px] md:h-[280px] opacity-[0.35]"
        viewBox="0 0 800 220"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true">
        
        <path
          ref={pulseRef}
          className="pulse-path"
          data-drawn={drawn}
          d="M0 150 L110 150 L130 90 L150 190 L170 60 L190 150 L260 150 C 320 150 340 120 400 108 C 460 96 480 60 540 48 C 600 36 630 20 690 14 L800 6"
          stroke="url(#pulseGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round" />
        
        <circle ref={dotRef} className="pulse-dot" data-shown={dotShown} cx="690" cy="14" r="6" fill="#78C626" />
        <defs>
          <linearGradient id="pulseGrad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#BEE8CE" />
            <stop offset="0.55" stopColor="#4C9A4E" />
            <stop offset="1" stopColor="#78C626" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 w-full max-w-[1100px] mx-auto flex flex-col items-center text-center px-6 pt-16">
        <span className="reveal reveal-up delay-100 font-mono text-[11px] text-on-primary-variant uppercase mb-5" data-visible="true">
          Technology-Enabled Dental Growth Platform
        </span>
        <div className="min-h-[110px] md:min-h-[150px] flex items-end justify-center mb-3 w-full">
          <h1 className="text-white text-[30px] leading-[1.12] md:text-[56px] font-display font-extrabold tracking-tight uppercase max-w-3xl">
            <span className="typing-cursor">{text}</span>
          </h1>
        </div>
        <p className="text-white/85 text-base md:text-lg font-medium mb-9 max-w-md md:max-w-xl">
          NexArch runs the acquisition engine for dental implant practices — attracting, qualifying, and
          converting high-value implant patients, with a dashboard that proves it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md">
          <a
            href="#contact"
            className="btn-primary bg-lime hover:bg-lime-dark text-white font-bold py-4 px-7 rounded-full text-center w-full sm:w-auto">
            
            Book a Consultation
          </a>
          <a
            href="#results"
            className="btn-ghost bg-transparent border-2 border-white/70 text-white font-bold py-4 px-7 rounded-full hover:bg-white/10 text-center w-full sm:w-auto">
            
            See Live Results
          </a>
        </div>

        <a
          href="#platform"
          className="animate-cueBounce mt-14 flex flex-col items-center gap-2 text-on-primary-variant">
          
          <span className="font-mono text-[10px] uppercase">Scroll to see the numbers</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </a>
      </div>
    </section>);

}
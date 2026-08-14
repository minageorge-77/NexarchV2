"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { useReveal } from "@/lib/useReveal";











export default function Results() {
  const { ref: lineRef, visible: lineVisible } = useReveal(0.4);
  const [featured, setFeatured] = useState(null);
  const [stats, setStats] = useState({
    implantLeads: 412,
    implantLeadsLabel: "Implant Leads",
    consultations: 158,
    consultationsLabel: "Consultations",
    monthlyProduction: 48920,
    monthlyProductionLabel: "Monthly production",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dynamic stats from database
        const statsRes = await fetch("/api/stats");
        if (statsRes.ok) {
          const statsJson = await statsRes.json();
          if (statsJson.data) {
            setStats(statsJson.data);
          }
        }

        // Fetch testimonials
        const testimonialsRes = await fetch("/api/testimonials");
        if (testimonialsRes.ok) {
          const testimonialsJson = await testimonialsRes.json();
          const withMetrics = testimonialsJson.data?.find((t) => t.metrics?.value) || testimonialsJson.data?.[0];
          if (withMetrics) {
            setFeatured(withMetrics);
          }
        }
      } catch (error) {
        console.error("Failed to fetch results data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <section id="results" className="py-24 px-5 bg-white min-h-[500px]"></section>;
  }

  // Dynamic values with safe fallbacks
  const clinicName = stats?.featuredClinicName || featured?.clinicName || "Summit Implant & Oral Surgery";
  const location = stats?.featuredLocation || featured?.location || "Buda, TX";
  const photoUrl = stats?.featuredImageUrl || "/results.png";

  return (
    <section id="results" className="py-24 px-5 bg-white">
      <Reveal variant="zoom" className="max-w-md md:max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-lightgray">
          <div className="relative h-64 md:h-80">
            <Image
              alt={`${clinicName} surgical suite`}
              fill
              className="object-cover"
              src={photoUrl}
              sizes="(max-width: 768px) 100vw, 768px"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="font-mono text-[10px] text-white/80 uppercase">
                Featured Case Study
              </span>
              <h3 className="text-white text-xl font-display font-bold">{clinicName} {location && `— ${location}`}</h3>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
              <div className="text-center px-1">
                <p className="text-[20px] xs:text-[26px] sm:text-[34px] md:text-[44px] font-display font-extrabold text-graphite leading-none">
                  <Counter target={stats.implantLeads || 412} />
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] text-clinical uppercase mt-2 tracking-tight sm:tracking-normal">{stats.implantLeadsLabel || "Implant Leads"}</p>
              </div>
              <div className="text-center px-1 border-x border-lightgray/50 sm:border-0">
                <p className="text-[20px] xs:text-[26px] sm:text-[34px] md:text-[44px] font-display font-extrabold text-graphite leading-none">
                  <Counter target={stats.consultations || 158} />
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] text-clinical uppercase mt-2 tracking-tight sm:tracking-normal">{stats.consultationsLabel || "Consultations"}</p>
              </div>
              <div className="text-center px-1">
                <p className="text-[20px] xs:text-[26px] sm:text-[34px] md:text-[44px] font-display font-extrabold text-graphite leading-none truncate">
                  <Counter target={stats.monthlyProduction || 48920} currency />
                </p>
                <p className="font-mono text-[9px] sm:text-[10px] text-clinical uppercase mt-2 tracking-tight sm:tracking-normal">{stats.monthlyProductionLabel || "Monthly production"}</p>
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
        
        <a className="w-1/2 p-3 hover:bg-clinical/10 rounded-lg transition-colors" href="/results">
          Acquisition practices
        </a>
        <a
          className="w-1/2 p-3 hover:bg-clinical/10 rounded-lg transition-colors border-l border-lightgray"
          href="/results">
          
          Startup practices
        </a>
      </Reveal>
    </section>);

}

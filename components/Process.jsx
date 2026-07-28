"use client";

import { useReveal } from "@/lib/useReveal";
import Reveal from "./Reveal";

const steps = [
{
  num: "01",
  title: "Audit & baseline",
  body: "We pull your last 12 months of implant leads, spend, and case acceptance to find out what's actually converting today."
},
{
  num: "02",
  title: "Build the platform",
  body: "Your website, patient CRM, and GA4-powered dashboard go live, wired directly into your front-desk workflow."
},
{
  num: "03",
  title: "Launch & optimize",
  body: "Campaigns go live across search and social. We review cost-per-consultation weekly and reallocate spend fast."
},
{
  num: "04",
  title: "Scale & report",
  body: "A monthly dashboard report ties spend to booked implant cases — so budget decisions are made on numbers, not vibes.",
  accent: true
}];


export default function Process() {
  const { ref, visible } = useReveal(0.2);

  return (
    <section id="process" className="py-24 px-5 bg-white">
      <div className="max-w-md md:max-w-3xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="font-mono text-[11px] uppercase text-cloud">How it works</span>
          <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite mt-3 leading-tight">
            Four steps, ninety days
          </h2>
          <p className="text-cloud mt-4">
            No lock-in mystery. Here&apos;s the actual sequence every practice goes through with us.
          </p>
        </Reveal>

        <div ref={ref} className="relative pl-10 md:pl-14">
          <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-[2px] bg-lightgray" />
          <div
            className="absolute left-[15px] md:left-[19px] top-2 w-[2px] bg-graphite transition-[height] duration-[1600ms] ease-out"
            style={{ height: visible ? "100%" : "0%" }} />
          

          {steps.map((step, i) =>
          <div key={step.num} className={`relative ${i < steps.length - 1 ? "mb-14" : ""}`}>
              <span
              className={`absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full text-white font-mono text-xs flex items-center justify-center ${
              step.accent ? "bg-graphite" : "bg-cloud"}`
              }>
              
                {step.num}
              </span>
              <h3 className="text-lg font-display font-bold text-graphite mb-1">{step.title}</h3>
              <p className="text-cloud text-[15px] leading-relaxed">{step.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}
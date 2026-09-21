"use client";

import { useReveal } from "@/lib/useReveal";
import Reveal from "./Reveal";

const steps = [
{
  num: "01",
  title: "Audit",
  body: "We look at your last twelve months of implant enquiries, spend, and case acceptance to establish an honest baseline before recommending anything."
},
{
  num: "02",
  title: "Build",
  body: "Campaign architecture, tracking, landing pages, and (for Authority clients) the personal-brand content system go live — typically two to six weeks depending on tier."
},
{
  num: "03",
  title: "Launch",
  body: "Campaigns go live across search and social. We watch cost-per-consultation weekly in the first month, not monthly, while the account finds its footing."
},
{
  num: "04",
  title: "Report and adjust",
  body: "A monthly report ties spend to booked and accepted cases. Adjustments are made on that basis, on a fixed reporting cadence, not ad hoc.",
  accent: true
}];


export default function Process() {
  const { ref, visible } = useReveal(0.2);

  return (
    <section id="process" className="py-24 px-5 bg-white">
      <div className="max-w-md md:max-w-3xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="font-mono text-[11px] uppercase text-clinical">How it works</span>
          <h2 className="text-[30px] md:text-[42px] font-display font-extrabold text-graphite mt-3 leading-tight">
            Four steps to predictable growth
          </h2>
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
              step.accent ? "bg-graphite" : "bg-clinical"}`
              }>
              
                {step.num}
              </span>
              <h3 className="text-lg font-display font-bold text-graphite mb-1">{step.title}</h3>
              <p className="text-clinical text-[15px] leading-relaxed">{step.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

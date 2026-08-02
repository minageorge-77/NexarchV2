"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("You're on the list — thanks!");
    e.currentTarget.reset();
  };

  return (
    <footer className="bg-graphite border-t border-white/10 text-cloud">
      <div className="max-w-md md:max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex items-center justify-center">
                <Image src="/nexarchLogo.png" alt={`${siteConfig.name} emblem`} width={56} height={56} className="h-12 w-auto object-contain" />
              </span>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                NexArch
              </span>
            </div>
            <p className="text-[14px] mt-4 leading-relaxed max-w-xs">
              A technology-enabled growth platform built for dental implant practices who want a number attached to
              every dollar spent.
            </p>
            <div className="flex gap-3 mt-6">
              {siteConfig.sameAs.map((url) =>
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social link"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" strokeWidth={2} />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a className="hover:text-white transition-colors" href="#platform">Platform</a></li>
              <li><a className="hover:text-white transition-colors" href="#process">Process</a></li>
              <li><a className="hover:text-white transition-colors" href="#results">Results</a></li>
              <li><a className="hover:text-white transition-colors" href="#faq">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-white mb-4">Company</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a className="hover:text-white transition-colors" href="/about">About</a></li>
              <li><a className="hover:text-white transition-colors" href="/results">Case studies</a></li>
              <li><a className="hover:text-white transition-colors" href="/contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-white mb-4">Stay in the loop</h4>
            <p className="text-[14px] mb-4">One email a month — real numbers from real practices, no fluff.</p>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@practice.com"
                className="min-w-0 flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-[14px] text-white placeholder-white/50 focus:outline-none focus:border-lightgray" />
              
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-white hover:bg-lightgray text-graphite w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors">
                
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              </button>
            </form>
            <p className="text-[12px] text-white mt-2 h-4">{message}</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px]">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-3 font-mono uppercase">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">{siteConfig.phoneDisplay}</a>
            <span className="opacity-30">·</span>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
          </div>
          <div>
            Designed by{" "}
            <a
              href="https://www.linkedin.com/in/mina-george-08b563320/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline transition-colors font-medium">
              Mina George
            </a>
          </div>
        </div>
      </div>
    </footer>);

}
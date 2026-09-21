"use client";

import Image from "next/image";
import { siteConfig } from "@/lib/site";

function getSocialIcon(url) {
  if (url.includes("instagram")) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (url.includes("linkedin")) {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    );
  }
  if (url.includes("youtube")) {
    return (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
    </svg>
  );
}

function getSocialLabel(url) {
  if (url.includes("instagram")) return "Instagram";
  if (url.includes("linkedin")) return "LinkedIn";
  if (url.includes("youtube")) return "YouTube";
  return "Social link";
}

export default function Footer() {
  return (
    <footer className="bg-graphite border-t border-white/10 text-clinical">
      <div className="max-w-md md:max-w-5xl mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 mb-12">
          <div>
            <div className="flex items-center mb-2">
              <Image src="/nexarchLogo.png" alt={`${siteConfig.name} emblem`} width={140} height={140} className="h-24 md:h-28 w-auto object-contain" />
            </div>
            <p className="text-[14px] mt-4 leading-relaxed max-w-xs">
              NexArch works with implant practices — single case to full arch — nothing else, and nothing padded around it.
            </p>
            <div className="flex gap-3 mt-6">
              {siteConfig.sameAs.map((url) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={getSocialLabel(url)}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                  {getSocialIcon(url)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-white mb-4">Explore</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a className="hover:text-white transition-colors" href="/services">Services</a></li>
              <li><a className="hover:text-white transition-colors" href="/approach">Approach</a></li>
              <li><a className="hover:text-white transition-colors" href="/contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-white mb-4">Company</h4>
            <ul className="space-y-3 text-[14px]">
              <li><a className="hover:text-white transition-colors" href="/about">About</a></li>
              <li><a className="hover:text-white transition-colors" href="/contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-white mb-4">Direct Contact</h4>
            <div className="space-y-4 text-[14px]">
              <div>
                <h5 className="font-mono text-[11px] uppercase text-white/60 mb-1">Phone</h5>
                <a href={`tel:${siteConfig.phone}`} className="text-white hover:text-gold transition-colors font-medium">
                  +1 208 247 4141
                </a>
              </div>
              <div>
                <h5 className="font-mono text-[11px] uppercase text-white/60 mb-1">Address</h5>
                <p className="text-white/80 leading-relaxed">
                  30 North Gould Street<br />
                  Suite 100<br />
                  Sheridan, WY 82801<br />
                  United States
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px]">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-3 font-mono uppercase">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">{siteConfig.phoneDisplay}</a>
            <span className="opacity-30">·</span>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">{siteConfig.email}</a>
          </div>
        </div>
      </div>
    </footer>);

}

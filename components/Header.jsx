"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Admin" }
];

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" }
];

export default function Header({ isAdmin = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full h-16 flex items-center justify-between px-5 md:px-10 transition-all duration-300 text-on-primary ${
        isAdmin || scrolled ? "bg-primary-deep shadow-md" : "bg-transparent"}`
        }>
        
        <a href={isAdmin ? "/admin" : "/"} className="flex items-center gap-2" aria-label={`${siteConfig.name} home`}>
          <span className="bg-white rounded-lg p-1.5 shadow-sm flex items-center justify-center">
            <Image src="/logo.png" alt={`${siteConfig.name} logo`} width={32} height={32} className="h-8 w-8 object-contain" priority />
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            NEX<span className="text-lime">ARCH</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase" aria-label="Primary">
          {(isAdmin ? adminNavLinks : navLinks).map((link) =>
          <a key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </a>
          )}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href={`tel:${siteConfig.phone}`}
            aria-label="Call Us"
            className="hidden sm:flex hover:text-lime transition-colors">
            
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2} />
              
            </svg>
          </a>
          {!isAdmin && (
            <a
              href="/contact"
              className="hidden md:inline-flex items-center bg-lime hover:bg-lime-dark text-white font-bold text-[12px] uppercase tracking-wide py-2.5 px-5 rounded-full btn-primary">
              
              Book a Consultation
            </a>
          )}
          <button
            aria-label="Open Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="hover:text-lime transition-colors">
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
        </div>
      </header>

      <div
        className="menu-backdrop fixed inset-0 bg-ink/60 backdrop-blur-sm z-[65]"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true" />
      
      <aside
        className="mobile-menu fixed top-0 right-0 h-full w-[78%] max-w-xs bg-primary-deep text-white z-[70] shadow-2xl flex flex-col p-8"
        data-open={menuOpen}
        aria-hidden={!menuOpen}>
        
        <button
          aria-label="Close Menu"
          onClick={() => setMenuOpen(false)}
          className="self-end mb-10 text-white/80 hover:text-lime transition-colors">
          
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </button>
        <nav className="flex flex-col gap-6 font-display text-2xl font-bold" aria-label="Mobile">
          {(isAdmin ? adminNavLinks : navLinks).map((link) =>
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          )}
          {!isAdmin && (
            <a href="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          )}
        </nav>
        <div className="mt-auto pt-8 border-t border-white/15">
          <a href={`tel:${siteConfig.phone}`} className="font-mono text-sm text-on-primary-variant block mb-1">
            {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="font-mono text-sm text-on-primary-variant">
            {siteConfig.email}
          </a>
        </div>
      </aside>
    </>);

}
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Sign-in" }
];

const adminNavLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" }
];

export default function Header({ isAdmin = false, hideNav = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full h-20 md:h-24 flex items-center justify-between px-5 md:px-10 transition-all duration-300 text-white ${
          isHome
            ? (scrolled ? "bg-graphite shadow-md" : "bg-black/20 backdrop-blur-md")
            : "bg-graphite shadow-md"
        }`}>
        
        <a href={isAdmin ? "/admin" : "/"} className="flex items-center py-1 flex-shrink-0" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/nexarchLogo-white.png"
            alt={`${siteConfig.name} emblem`}
            width={220}
            height={55}
            className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-200"
            priority
          />
        </a>

        {!hideNav && (
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6 md:gap-7 lg:gap-9 xl:gap-11 font-mono text-sm md:text-[13.5px] lg:text-[14.5px] xl:text-[15px] font-medium tracking-wider uppercase px-2 lg:px-4" aria-label="Primary">
            {(isAdmin ? adminNavLinks : navLinks.filter((l) => l.href !== "/admin")).map((link) => (
              <a key={link.href} className="nav-link py-1" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          {!isAdmin && (
            <a
              href="/contact"
              className="hidden lg:inline-flex items-center bg-gold hover:bg-gold/90 text-graphite font-bold text-[12px] uppercase tracking-wide py-2.5 px-5 rounded-full btn-primary shadow-sm">
              Book a Consultation
            </a>
          )}
          <button
            aria-label="Open Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="hover:text-gold transition-colors">
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
        </div>
      </header>

      <div
        className="menu-backdrop fixed inset-0 bg-graphite/60 backdrop-blur-sm z-[65]"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true" />
      
      <aside
        className="mobile-menu fixed top-0 right-0 h-full w-[78%] max-w-xs bg-graphite text-white z-[70] shadow-2xl flex flex-col p-8"
        data-open={menuOpen}
        aria-hidden={!menuOpen}>
        
        <button
          aria-label="Close Menu"
          onClick={() => setMenuOpen(false)}
          className="self-end mb-10 text-white/80 hover:text-gold transition-colors">
          
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        </button>
        {!hideNav && (
          <nav className="flex flex-col gap-8 font-display text-2xl font-bold" aria-label="Mobile">
            {(isAdmin ? adminNavLinks : navLinks).map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-gold transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
        )}
        <div className="mt-auto pt-8 border-t border-white/15">
          <a href={`tel:${siteConfig.phone}`} className="font-mono text-sm text-clinical hover:text-gold transition-colors block mb-1">
            {siteConfig.phoneDisplay}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="font-mono text-sm text-clinical hover:text-gold transition-colors">
            {siteConfig.email}
          </a>
        </div>
      </aside>
    </>);

}

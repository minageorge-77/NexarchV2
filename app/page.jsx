
import { siteConfig } from "@/lib/site";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Platform from "@/components/Platform";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata = {
  title: `NexArch — Dental Implant Marketing Platform for Implant Practices`,
  description: "NexArch is the dental implant marketing platform for implant-focused practices. Search marketing, paid advertising, landing pages, lead follow-up, and case-flow tracking built as one connected system.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "NexArch — Dental Implant Marketing Platform",
    description: "From your first implant case to full arch. Search marketing, advertising, and lead follow-up built specifically for dental implant practices.",
    url: "https://nexarch.co"
  }
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="top">
        <Hero />
        <Platform />
        <Process />
        <Results />
        <Testimonials />
        <CTABanner />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}


import { siteConfig } from "@/lib/site";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import Platform from "@/components/Platform";
import Process from "@/components/Process";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import ChatFab from "@/components/ChatFab";

export const metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  }
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="top">
        <Hero />
        <TrustMarquee />
        <Platform />
        <Process />
        <Results />
        <Testimonials />
        <CTABanner />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ChatFab />
    </>);

}

import { Suspense } from "react";
import Providers from "@/components/Providers";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { archivoExpanded } from "@/lib/fonts";
import AnalyticsTracker from "@/components/AnalyticsTracker";



export const metadata = {
  metadataBase: new URL("https://nexarch.co"),
  title: {
    default: `NexArch — Dental Implant Marketing Platform`,
    template: `%s | NexArch`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexarch.co",
    siteName: siteConfig.name,
    title: `NexArch — Dental Implant Marketing Platform`,
    description: siteConfig.description,
    images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: `NexArch — Dental Implant Marketing Platform`
    }]

  },
  twitter: {
    card: "summary_large_image",
    site: "@nexarchmarketing",
    title: `NexArch — Dental Implant Marketing Platform`,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  manifest: "/site.webmanifest"
};

export const viewport = {
  themeColor: "#04301E",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: "https://nexarch.co",
    logo: "https://nexarch.co/nexarchLogo-cropped.png",
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "30 North Gould Street, Suite 100",
      addressLocality: "Sheridan",
      addressRegion: "WY",
      postalCode: "82801",
      addressCountry: "US"
    },
    sameAs: siteConfig.sameAs,
    "@id": "https://nexarch.co/#organization"
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dental Implant Marketing",
    serviceType: "Dental Implant Marketing & Patient Acquisition",
    provider: {
      "@id": "https://nexarch.co/#organization"
    },
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    description: "Search marketing, paid advertising, landing pages, lead follow-up, and case-flow tracking for dental implant practices.",
    audience: {
      "@type": "Audience",
      audienceType: "Dental implant practices and full-arch surgeons"
    }
  };

  return (
    <html lang="en" className={`${archivoExpanded.variable} font-sans`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>);

}


import { Suspense } from "react";
import Providers from "@/components/Providers";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { archivoExpanded } from "@/lib/fonts";
import AnalyticsTracker from "@/components/AnalyticsTracker";



export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`
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
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} - ${siteConfig.tagline}`
    }]

  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
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
    url: siteConfig.url,
    logo: `${siteConfig.url}/nexarchLogo-cropped.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: siteConfig.sameAs,
    "@id": `${siteConfig.url}/#organization`
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Dental Implant Marketing & Growth Platform",
    provider: {
      "@id": `${siteConfig.url}/#organization`
    },
    areaServed: "US",
    description: siteConfig.description,
    audience: {
      "@type": "Audience",
      audienceType: "Dental implant practices"
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

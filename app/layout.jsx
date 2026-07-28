
import Providers from "@/components/Providers";
import "./globals.css";
import { siteConfig } from "@/lib/site";



export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
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
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt: `${siteConfig.name} — ${siteConfig.tagline}`
    }]

  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage]
  },
  icons: {
    icon: "/nexarchLogo.png",
    shortcut: "/nexarchLogo.png",
    apple: "/nexarchLogo.png"
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
    logo: `${siteConfig.url}/nexarchLogo.png`,
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@400;700;800;900&family=Archivo:wght@100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
        
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>);

}
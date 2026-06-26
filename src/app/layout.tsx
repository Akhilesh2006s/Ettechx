import type { Metadata, Viewport } from "next";
import "../index.css";

// Global SEO defaults live here so every page inherits sensible sharing + crawling hints.
// Individual routes override with route-specific titles/descriptions/canonicals via `export const metadata`.

const SITE_URL = "https://www.eduexpoglobal.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "EDU EXPO GLOBAL 2026",
  // Default title template (pages provide specific title string)
  title: {
    default: "EDU EXPO GLOBAL 2026",
    template: "%s | EDU EXPO GLOBAL 2026",
  },
  description:
    "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
  alternates: {
    canonical: SITE_URL,
  },
  // OpenGraph improves click-through when pages are shared on WhatsApp/LinkedIn/Facebook.
  openGraph: {
    type: "website",
    siteName: "EDU EXPO GLOBAL 2026",
    url: SITE_URL,
    title: "EDU EXPO GLOBAL 2026 | India’s Leading EdTech Expo & Conference",
    description:
      "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
    images: [
      {
        // Using an existing production asset (no placeholder) for stable social previews.
        url: "/expo.jpeg",
      },
    ],
  },
  // Twitter cards increase engagement and ensure large rich previews.
  twitter: {
    card: "summary_large_image",
    title: "EDU EXPO GLOBAL 2026 | India’s Leading EdTech Expo & Conference",
    description:
      "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
    images: ["/expo.jpeg"],
  },
  icons: {
    // Favicon requirement: use the existing brand asset.
    icon: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
};

// Mobile-friendly meta viewport is a ranking + UX baseline (Core Web Vitals).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Schema is JSON-LD: it helps Google understand entities (brand/site/event) and
      // can unlock rich results (especially for Events).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EDU EXPO GLOBAL 2026",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/eduexpoglobal/",
      "https://www.instagram.com/eduexpoglobal/",
      "https://www.youtube.com/@eduexpoglobal",
      "https://www.facebook.com/eduexpoglobal/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EDU EXPO GLOBAL 2026",
    url: SITE_URL,
    // WebSite schema can enable a sitelinks search box when Google chooses to show it.
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // CRITICAL: Event schema for event-related queries.
  // This helps Google show Event rich results and understand dates/location/registration.
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "EDU EXPO GLOBAL 2026 - India’s Leading EdTech Expo & Conference",
    startDate: "2026-09-22",
    endDate: "2026-09-23",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: SITE_URL,
    image: [`${SITE_URL}/expo.jpeg`],
    description:
      "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
    location: {
      "@type": "Place",
      name: "Yashobhoomi Convention Centre",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressRegion: "Delhi",
        addressCountry: "IN",
        streetAddress: "Yashobhoomi Convention Centre",
      },
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/register`,
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      validFrom: "2026-03-26",
      category: "Free",
    },
    organizer: {
      "@type": "Organization",
      name: "EDU EXPO GLOBAL 2026",
      url: SITE_URL,
    },
  };

  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={eventSchema} />
      </head>
      <body>{children}</body>
    </html>
  );
}


import type { Metadata } from "next";
import HomeClient from "./home/HomeClient";

export const metadata: Metadata = {
  // Why metadata matters:
  // - Title/description directly influence SERP snippet quality and CTR.
  // - Canonical prevents duplicate-content issues (same page reachable via multiple URLs).
  title: "EDU EXPO GLOBAL 2026 | India’s Leading EdTech Expo & Conference",
  description:
    "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
  alternates: {
    canonical: "https://www.eduexpoglobal.com",
  },
  openGraph: {
    title: "EDU EXPO GLOBAL 2026 | India’s Leading EdTech Expo & Conference",
    description:
      "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
    url: "https://www.eduexpoglobal.com",
    images: [{ url: "https://www.eduexpoglobal.com/expo.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDU EXPO GLOBAL 2026 | India’s Leading EdTech Expo & Conference",
    description:
      "EDU EXPO GLOBAL 2026 is India’s premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
    images: ["https://www.eduexpoglobal.com/expo.jpeg"],
  },
};

export default function Page() {
  return <HomeClient />;
}


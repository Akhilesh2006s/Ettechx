import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Enquire for EDU EXPO GLOBAL 2026 | Book Your EdTech Expo Pass",
  description:
    "Enquire for EDU EXPO GLOBAL 2026, India’s leading EdTech expo. Join educators, startups & innovators for conferences, workshops and networking.",
  alternates: { canonical: "https://www.eduexpoglobal.com/register" },
  openGraph: {
    title: "Enquire for EDU EXPO GLOBAL 2026 | Book Your EdTech Expo Pass",
    description:
      "Enquire for EDU EXPO GLOBAL 2026, India’s leading EdTech expo. Join educators, startups & innovators for conferences, workshops and networking.",
    url: "https://www.eduexpoglobal.com/register",
    images: [{ url: "https://www.eduexpoglobal.com/expo.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enquire for EDU EXPO GLOBAL 2026 | Book Your EdTech Expo Pass",
    description:
      "Enquire for EDU EXPO GLOBAL 2026, India’s leading EdTech expo. Join educators, startups & innovators for conferences, workshops and networking.",
    images: ["https://www.eduexpoglobal.com/expo.jpeg"],
  },
};

export default function Page() {
  return <RegisterClient />;
}


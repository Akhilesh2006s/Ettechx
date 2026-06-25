import type { Metadata } from "next";
import ExpoClient from "./ExpoClient";

export const metadata: Metadata = {
  title: "EdTech Expo India | Exhibit & Discover Innovation",
  description:
    "Explore the EduExpoGlobal Expo featuring leading EdTech companies, startups, and innovations transforming education in India.",
  alternates: { canonical: "https://www.eduexpoglobal.com/expo" },
  openGraph: {
    title: "EdTech Expo India | Exhibit & Discover Innovation",
    description:
      "Explore the EduExpoGlobal Expo featuring leading EdTech companies, startups, and innovations transforming education in India.",
    url: "https://www.eduexpoglobal.com/expo",
    images: [{ url: "https://www.eduexpoglobal.com/expo.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EdTech Expo India | Exhibit & Discover Innovation",
    description:
      "Explore the EduExpoGlobal Expo featuring leading EdTech companies, startups, and innovations transforming education in India.",
    images: ["https://www.eduexpoglobal.com/expo.jpeg"],
  },
};

export default function Page() {
  return <ExpoClient />;
}


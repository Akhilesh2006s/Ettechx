import type { Metadata } from "next";
import ConferenceClient from "./ConferenceClient";

export const metadata: Metadata = {
  title: "Education Conference India | EdTech Leaders & Insights",
  description: "Attend EDU EXPO GLOBAL 2026 conference with industry leaders discussing trends, innovation, and the future of education.",
  alternates: { canonical: "https://www.eduexpoglobal.com/conference" },
  openGraph: {
    title: "Education Conference India | EdTech Leaders & Insights",
    description:
      "Attend EDU EXPO GLOBAL 2026 conference with industry leaders discussing trends, innovation, and the future of education.",
    url: "https://www.eduexpoglobal.com/conference",
    images: [{ url: "https://www.eduexpoglobal.com/Conference.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Education Conference India | EdTech Leaders & Insights",
    description:
      "Attend EDU EXPO GLOBAL 2026 conference with industry leaders discussing trends, innovation, and the future of education.",
    images: ["https://www.eduexpoglobal.com/Conference.jpeg"],
  },
};

export default function Page() {
  return <ConferenceClient />;
}


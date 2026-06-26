import type { Metadata } from "next";
import SpeakersClient from "./SpeakersClient";

export const metadata: Metadata = {
  title: "All Speakers | EDU EXPO GLOBAL 2026",
  description:
    "Discover keynote speakers and thought leaders at EDU EXPO GLOBAL 2026 shaping the future of education and technology.",
  alternates: { canonical: "https://www.eduexpoglobal.com/speakers" },
  openGraph: {
    title: "All Speakers | EDU EXPO GLOBAL 2026",
    description:
      "Discover keynote speakers and thought leaders at EDU EXPO GLOBAL 2026 shaping the future of education and technology.",
    url: "https://www.eduexpoglobal.com/speakers",
  },
};

export default function Page() {
  return <SpeakersClient />;
}


import type { Metadata } from "next";
import SpeakersClient from "./SpeakersClient";

export const metadata: Metadata = {
  title: "All Speakers | EduExpoGlobal",
  description:
    "Discover keynote speakers and thought leaders at EduExpoGlobal shaping the future of education and technology.",
  alternates: { canonical: "https://www.eduexpoglobal.com/speakers" },
  openGraph: {
    title: "All Speakers | EduExpoGlobal",
    description:
      "Discover keynote speakers and thought leaders at EduExpoGlobal shaping the future of education and technology.",
    url: "https://www.eduexpoglobal.com/speakers",
  },
};

export default function Page() {
  return <SpeakersClient />;
}


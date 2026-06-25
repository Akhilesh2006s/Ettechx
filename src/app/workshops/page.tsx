import type { Metadata } from "next";
import WorkshopsClient from "./WorkshopsClient";

export const metadata: Metadata = {
  title: "EdTech Workshops | Hands-on Learning & Training",
  description: "Join expert-led workshops on AI, digital learning, and emerging technologies at EduExpoGlobal.",
  alternates: { canonical: "https://www.eduexpoglobal.com/workshops" },
  openGraph: {
    title: "EdTech Workshops | Hands-on Learning & Training",
    description:
      "Join expert-led workshops on AI, digital learning, and emerging technologies at EduExpoGlobal.",
    url: "https://www.eduexpoglobal.com/workshops",
    images: [{ url: "https://www.eduexpoglobal.com/Workshop.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EdTech Workshops | Hands-on Learning & Training",
    description:
      "Join expert-led workshops on AI, digital learning, and emerging technologies at EduExpoGlobal.",
    images: ["https://www.eduexpoglobal.com/Workshop.jpeg"],
  },
};

export default function Page() {
  return <WorkshopsClient />;
}


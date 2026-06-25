import type { Metadata } from "next";
import SpringSummitClient from "./SpringSummitClient";

export const metadata: Metadata = {
  title: "Spring EdTech Summit | EduExpoGlobal India",
  description: "Join the EduExpoGlobal Spring Summit with expert sessions, networking, and innovation in education technology.",
  alternates: { canonical: "https://www.eduexpoglobal.com/spring-summit" },
  openGraph: {
    title: "Spring EdTech Summit | EduExpoGlobal India",
    description:
      "Join the EduExpoGlobal Spring Summit with expert sessions, networking, and innovation in education technology.",
    url: "https://www.eduexpoglobal.com/spring-summit",
    images: [{ url: "https://www.eduexpoglobal.com/expo.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spring EdTech Summit | EduExpoGlobal India",
    description:
      "Join the EduExpoGlobal Spring Summit with expert sessions, networking, and innovation in education technology.",
    images: ["https://www.eduexpoglobal.com/expo.jpeg"],
  },
};

export default function Page() {
  return <SpringSummitClient />;
}


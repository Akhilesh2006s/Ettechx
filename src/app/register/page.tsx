import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Enquire for ET Tech X | Book Your EdTech Expo Pass",
  description:
    "Enquire for ET Tech X, India’s leading EdTech expo. Join educators, startups & innovators for conferences, workshops and networking.",
  alternates: { canonical: "https://www.ettechx.com/register" },
  openGraph: {
    title: "Enquire for ET Tech X | Book Your EdTech Expo Pass",
    description:
      "Enquire for ET Tech X, India’s leading EdTech expo. Join educators, startups & innovators for conferences, workshops and networking.",
    url: "https://www.ettechx.com/register",
    images: [{ url: "https://www.ettechx.com/expo.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enquire for ET Tech X | Book Your EdTech Expo Pass",
    description:
      "Enquire for ET Tech X, India’s leading EdTech expo. Join educators, startups & innovators for conferences, workshops and networking.",
    images: ["https://www.ettechx.com/expo.jpeg"],
  },
};

export default function Page() {
  return <RegisterClient />;
}


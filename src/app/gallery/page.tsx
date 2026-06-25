import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery | EduExpoGlobal",
  description: "Explore EduExpoGlobal gallery moments from awards, conferences, and expo events across editions.",
  alternates: { canonical: "https://www.eduexpoglobal.com/gallery" },
  openGraph: {
    title: "Gallery | EduExpoGlobal",
    description: "Explore EduExpoGlobal gallery moments from awards, conferences, and expo events across editions.",
    url: "https://www.eduexpoglobal.com/gallery",
  },
};

export default function Page() {
  return <GalleryClient />;
}


import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import StatsSection from "@/components/StatsSection";
import SpeakersSection from "@/components/SpeakersSection";
import SponsorsSection from "@/components/SponsorsSection";
import GalleryPreviewSection from "@/components/GalleryPreviewSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AnnualEventsSection from "@/components/AnnualEventsSection";
import CTASection from "@/components/CTASection";
import KeepInTouchSection from "@/components/KeepInTouchSection";
import Footer from "@/components/Footer";
import PopupAd from "@/components/PopupAd";
import { applyPageSeo } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    applyPageSeo({
      title: "EDU EXPO GLOBAL 2026 | India's Leading EdTech Expo & Conference",
      description:
        "EDU EXPO GLOBAL 2026 is India's premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
      canonical: "https://www.eduexpoglobal.com",
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "EDU EXPO GLOBAL 2026 | India's Leading EdTech Expo & Conference",
        description:
          "EDU EXPO GLOBAL 2026 is India's premier EdTech expo connecting educators, startups, and innovators through conferences, workshops, and exhibitions.",
        url: "https://www.eduexpoglobal.com",
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <PopupAd />
      <Navbar />
      <main>
        <article>
          <HeroSection />
          <AboutSection />
          <EventsSection />
          <StatsSection />
          <SpeakersSection />
          <SponsorsSection />
          <GalleryPreviewSection />
          <TestimonialsSection />
          <AnnualEventsSection />
          <CTASection />
          <KeepInTouchSection />
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

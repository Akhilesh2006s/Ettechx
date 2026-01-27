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

const Index = () => {
  useEffect(() => {
    // Update document title for SEO
    document.title = "Et Tech X - India's Premier Educational Technology Expo & Conference 2025";
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

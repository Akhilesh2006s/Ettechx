import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { featuredSpeakers, type Speaker } from "@/lib/speakersData";
import Link from "next/link";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

const SpeakersSection = () => {
  return (
    <section id="speakers" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Meet The Experts
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Keynote{" "}
            <span className="text-gradient-secondary">Speakers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn from industry pioneers and thought leaders shaping the future of education technology
          </p>
        </motion.div>

        {/* Featured Speakers Carousel (homepage only) */}
        <FeaturedSpeakersCarousel />

        {/* Note: Full speakers route is intentionally not linked here until it is implemented in App Router. */}
      </div>
    </section>
  );
};

export default SpeakersSection;

const FeaturedSpeakersCarousel = () => {
  // Base slides (groups of speakers)
  const baseSlides: Speaker[][] = useMemo(() => {
    const chunks: Speaker[][] = [];
    for (let i = 0; i < featuredSpeakers.length; i += 3) {
      chunks.push(featuredSpeakers.slice(i, i + 3));
    }
    return chunks;
  }, []);

  const totalSlides = baseSlides.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    if (totalSlides <= 1) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  if (totalSlides === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {baseSlides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {slide.map((speaker) => (
                <motion.div
                  key={speaker.name}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div
                    className={`relative bg-card rounded-2xl border ${speaker.borderAccent} overflow-hidden shadow-card transition-all duration-500 hover:shadow-elevated`}
                  >
                    {/* Colorful accent background */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${speaker.accentColor} opacity-90`}
                    />

                    {/* Decorative shapes */}
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute top-16 left-4 w-8 h-8 rounded-full bg-white/10 blur-lg" />

                    {/* Content */}
                    <div className="relative pt-12 pb-6 px-6">
                      {/* Profile Image */}
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${speaker.accentColor} p-1`}
                        >
                          <div className="w-full h-full rounded-full overflow-hidden bg-card">
                            <img
                              src={speaker.image}
                              alt={speaker.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">
                          {speaker.name}
                        </h3>
                        {(speaker.designation || speaker.organization) && (
                          <div className="text-muted-foreground text-sm mb-4">
                            {speaker.designation && <p>{speaker.designation}</p>}
                            {speaker.organization && <p>{speaker.organization}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel controls */}
      {totalSlides > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous speakers"
          >
            ‹
          </Button>
          <div className="flex gap-2">
            {baseSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (totalSlides <= 1) return;
                  setActiveIndex(index);
                }}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex
                    ? "bg-secondary"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next speakers"
          >
            ›
          </Button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/speakers" aria-label="View all speakers">
            View All Speakers
          </Link>
        </Button>
      </div>
    </div>
  );
};

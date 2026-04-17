"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { loadGalleryData, iconMap, type GalleryYear, defaultGalleryData } from "@/lib/galleryData";
import { fetchGalleryData } from "@/lib/galleryApi";
import { resolveMediaUrl, resolveMediaFallbackUrl } from "@/lib/mediaUrl";

export default function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryYear[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadData();
  }, []);

  const loadData = async () => {
    let finalData = [...defaultGalleryData];

    try {
      const apiData = await fetchGalleryData();
      if (apiData && apiData.length > 0) {
        const apiYearIds = new Set(apiData.map((y) => y.year));
        const additionalDefaultYears = defaultGalleryData.filter((y) => !apiYearIds.has(y.year));
        finalData = [...apiData, ...additionalDefaultYears];
      }
    } catch (error) {
      console.error("Failed to load from API, using defaults:", error);
    }

    try {
      const localData = loadGalleryData();
      if (localData && localData.length > 0) {
        const finalYearIds = new Set(finalData.map((y) => y.year));
        const additionalLocalYears = localData.filter((y) => !finalYearIds.has(y.year));
        if (additionalLocalYears.length > 0) {
          finalData = [...finalData, ...additionalLocalYears];
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
    }

    setGalleryData(finalData);
    if (finalData.length > 0) {
      setExpandedYear(finalData[0].year);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <section className="relative min-h-screen py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16 relative">
              <Link href="/admin/login" className="absolute top-0 right-0 group" title="Admin Login">
                <motion.div
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 flex items-center justify-center transition-all duration-300"
                >
                  <Lock className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </motion.div>
              </Link>

              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Event Gallery
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Our <span className="text-gradient-primary">Gallery</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore moments from ET Tech X events through the years
              </p>
            </div>

            <div className="space-y-8">
              {galleryData.map((yearData, yearIndex) => (
                <motion.div
                  key={yearData.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: yearIndex * 0.1 }}
                  className="border border-border rounded-2xl bg-card shadow-card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedYear(expandedYear === yearData.year ? null : yearData.year)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{yearData.displayName}</h2>
                    {expandedYear === yearData.year ? (
                      <ChevronUp className="w-6 h-6 text-primary" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>

                  {expandedYear === yearData.year && (
                    <div className="p-6 space-y-12">
                      {yearData.categories.map((category, catIndex) => {
                        const IconComponent = iconMap[category.icon as keyof typeof iconMap];

                        return (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                          >
                            <div className={`flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r ${category.color}`}>
                              <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                                {IconComponent && <IconComponent className="w-6 h-6 text-primary" />}
                              </div>
                              <h3 className="font-display text-xl font-bold text-foreground">{category.name}</h3>
                              <span className="ml-auto text-sm text-muted-foreground">{category.images.length} photos</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                              {category.images.map((image, imgIndex) => {
                                const getBorderColor = () => {
                                  if (category.name === "Awards") return "border-gold/40 hover:border-gold/60";
                                  if (category.name === "Conference") return "border-primary/40 hover:border-primary/60";
                                  if (category.name === "Expo") return "border-accent/40 hover:border-accent/60";
                                  return "border-border";
                                };

                                const getBgGradient = () => {
                                  if (category.name === "Awards") return "bg-gradient-to-br from-gold/5 to-gold/10";
                                  if (category.name === "Conference") return "bg-gradient-to-br from-primary/5 to-primary/10";
                                  if (category.name === "Expo") return "bg-gradient-to-br from-accent/5 to-accent/10";
                                  return "bg-card";
                                };

                                return (
                                  <motion.div
                                    key={imgIndex}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: imgIndex * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`group relative cursor-pointer rounded-lg overflow-hidden border-2 ${getBorderColor()} ${getBgGradient()} shadow-md hover:shadow-lg aspect-square transition-all duration-300`}
                                    onClick={() => setSelectedImage(resolveMediaUrl(image.src))}
                                  >
                                    <img
                                      src={resolveMediaUrl(image.src)}
                                      alt={image.alt}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                      loading="lazy"
                                      decoding="async"
                                      onError={(e) => {
                                        const img = e.currentTarget;
                                        if (img.dataset.mediaFallbackTried !== "1") {
                                          img.dataset.mediaFallbackTried = "1";
                                          img.src = resolveMediaFallbackUrl(image.src);
                                        } else {
                                          img.src = "/placeholder.svg";
                                        }
                                      }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-6xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-lg z-10"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={resolveMediaUrl(selectedImage)}
              alt="Gallery Image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.dataset.mediaFallbackTried !== "1") {
                  img.dataset.mediaFallbackTried = "1";
                  img.src = resolveMediaFallbackUrl(selectedImage);
                } else {
                  img.src = "/placeholder.svg";
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}


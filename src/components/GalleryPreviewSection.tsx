import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image as ImageIcon, X } from "lucide-react";
import { GalleryImage, defaultGalleryData, type GalleryYear } from "@/lib/galleryData";
import { fetchGalleryData } from "@/lib/galleryApi";
import { resolveMediaUrl } from "@/lib/mediaUrl";

const GalleryPreviewSection = () => {
  const [previewImages, setPreviewImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [latestYearName, setLatestYearName] = useState<string>("");

  useEffect(() => {
    const loadPreviewImages = async () => {
      let data: GalleryYear[] = [];

      try {
        // Prefer backend data (includes latest uploads from admin)
        data = await fetchGalleryData();
      } catch (error) {
        console.error("Failed to load gallery data from API, using defaults:", error);
      }

      if (!data || data.length === 0) {
        data = defaultGalleryData;
      }

      if (data.length > 0) {
        const latestYear = data[0];
        setLatestYearName(latestYear.displayName);

        const allImages: GalleryImage[] = [];
        latestYear.categories.forEach((category) => {
          allImages.push(...category.images);
        });

        setPreviewImages(allImages.slice(0, 8));
      }
    };

    void loadPreviewImages();
  }, []);


  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Media Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-primary">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore moments from the 7th Edition of EduExpoGlobal and previous
            landmark events.
          </p>
        </motion.div>

        {previewImages.length === 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center py-12 mb-8"
            >
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">
                Gallery items will appear here once uploaded by admin
              </p>
            </motion.div>
            
            <div className="text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="/gallery" aria-label="View all gallery images">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Photos Grid (preview from latest year) */}
            <div className="mb-10">
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {latestYearName || "7th Edition of EduExpoGlobal"}
                </h3>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {previewImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative cursor-pointer rounded-xl overflow-hidden border border-border bg-card shadow-md aspect-square"
                    onClick={() => setSelectedImage(resolveMediaUrl(image.src))}
                  >
                    <img
                      src={resolveMediaUrl(image.src)}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-2 text-white">
                        <ImageIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">View Image</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="rounded-full px-8">
                <a href="/gallery" aria-label="View all gallery images">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Modal for viewing image */}
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
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default GalleryPreviewSection;

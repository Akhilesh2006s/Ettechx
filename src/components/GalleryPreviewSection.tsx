import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  uploadedAt: string;
  description?: string;
  photoHeading?: string;
  videoHeading?: string;
}

const GalleryPreviewSection = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = () => {
    const stored = localStorage.getItem("gallery_items");
    if (stored) {
      const items = JSON.parse(stored);
      // Show only first 4 items (1 row)
      setGalleryItems(items.slice(0, 4));
    }
  };

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
            Explore photos and videos from Et Tech X events, conferences, and exhibitions
          </p>
        </motion.div>

        {galleryItems.length === 0 ? (
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
            
            {/* View All Button - Always visible */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Link to="/gallery">
                <Button variant="hero" size="lg" className="group">
                  View All Gallery
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            {/* Carousel-style horizontal scroll of latest items */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative mb-8"
            >
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                {galleryItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -8 }}
                    className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-card flex flex-col min-w-[200px] sm:min-w-[240px] max-w-xs snap-start"
                  >
                    {item.type === "image" ? (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.photoHeading || "Gallery"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-2 text-white mb-2">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Photo</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full aspect-video overflow-hidden bg-muted">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.videoHeading || "Video thumbnail"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Video className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-2 text-white mb-2">
                            <Video className="w-4 h-4" />
                            <span className="text-sm font-medium">Video</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-4 bg-card">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-1">
                        {item.type === "image" 
                          ? (item.photoHeading || "Photo") 
                          : (item.videoHeading || "Video")}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Link to="/gallery">
                <Button variant="hero" size="lg" className="group">
                  View All Gallery
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default GalleryPreviewSection;

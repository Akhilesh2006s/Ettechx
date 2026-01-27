import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video, Image as ImageIcon, X } from "lucide-react";

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
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = () => {
    const stored = localStorage.getItem("gallery_items");
    if (stored) {
      const items: GalleryItem[] = JSON.parse(stored);
      // Keep a small sample for home page: up to 4 photos and 4 videos
      const photos = items.filter((item) => item.type === "image").slice(0, 4);
      const videos = items.filter((item) => item.type === "video").slice(0, 4);
      setGalleryItems([...photos, ...videos]);
    }
  };

  // Convert video URL to embed format
  const getVideoEmbedUrl = (url: string): string => {
    // If already an embed URL, return as is
    if (url.includes("/embed/") || url.includes("youtube.com/embed") || url.includes("player.vimeo.com")) {
      return url;
    }
    
    // YouTube watch URL conversion
    if (url.includes("youtube.com/watch") || url.includes("youtu.be/")) {
      let videoId = "";
      if (url.includes("youtube.com/watch")) {
        const match = url.match(/[?&]v=([^&]+)/);
        videoId = match ? match[1] : "";
      } else if (url.includes("youtu.be/")) {
        const match = url.match(/youtu.be\/([^?]+)/);
        videoId = match ? match[1] : "";
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    // Vimeo URL conversion
    if (url.includes("vimeo.com/")) {
      const match = url.match(/vimeo.com\/(\d+)/);
      if (match) {
        return `https://player.vimeo.com/video/${match[1]}`;
      }
    }
    
    // Return original URL if no conversion needed
    return url;
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
            {/* Photos Row (preview) */}
            {galleryItems.some((item) => item.type === "image") && (
              <div className="mb-10">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Photos
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {galleryItems
                      .filter((item) => item.type === "image")
                      .map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -8 }}
                          className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-card flex flex-col min-w-[200px] sm:min-w-[240px] max-w-xs snap-start"
                          onClick={() => setSelectedItem(item)}
                        >
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

                          {/* Content Section */}
                          <div className="p-4 bg-card">
                            <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-1">
                              {item.photoHeading || "Photo"}
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
              </div>
            )}

            {/* Videos Row (preview) */}
            {galleryItems.some((item) => item.type === "video") && (
              <div className="mb-8">
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Videos
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
                    {galleryItems
                      .filter((item) => item.type === "video")
                      .map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -8 }}
                          className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-card flex flex-col min-w-[200px] sm:min-w-[240px] max-w-xs snap-start"
                          onClick={() => setSelectedItem(item)}
                        >
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

                          {/* Content Section */}
                          <div className="p-4 bg-card">
                            <h3 className="font-display text-lg font-bold text-foreground mb-2 line-clamp-1">
                              {item.videoHeading || "Video"}
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
              </div>
            )}

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

      {/* Modal for viewing items */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
              {/* Sticky header with close button */}
              <div className="flex items-start justify-between gap-4 p-6 border-b border-border sticky top-0 bg-card z-10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                    {selectedItem.type === "image" 
                      ? (selectedItem.photoHeading || "Photo") 
                      : (selectedItem.videoHeading || "Video")}
                  </h2>
                  {selectedItem.description && (
                    <p className="text-muted-foreground">
                      {selectedItem.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="ml-4 w-10 h-10 rounded-full bg-white text-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-md shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Scrollable body */}
              <div className="overflow-y-auto">
                {selectedItem.type === "image" ? (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.photoHeading || "Gallery"}
                    className="w-full h-auto"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={getVideoEmbedUrl(selectedItem.url)}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default GalleryPreviewSection;

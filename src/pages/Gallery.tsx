import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Video, Image as ImageIcon, Lock, Trash2, X } from "lucide-react";

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

const Gallery = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    document.title = "Gallery - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadGalleryItems();
  }, []);

  const loadGalleryItems = () => {
    const stored = localStorage.getItem("gallery_items");
    if (stored) {
      setGalleryItems(JSON.parse(stored));
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = galleryItems.filter((item) => item.id !== id);
    setGalleryItems(updated);
    localStorage.setItem("gallery_items", JSON.stringify(updated));
    toast({
      title: "Deleted",
      description: "Item removed from gallery",
    });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16 relative">
              {/* Subtle Admin Login Button - Top Right */}
              <Link
                to="/admin/login"
                className="absolute top-0 right-0 group"
                title="Admin Login"
              >
                <motion.div
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 flex items-center justify-center transition-all duration-300 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </motion.div>
              </Link>

              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Media Gallery
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Our <span className="text-gradient-primary">Gallery</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore photos and videos from Et Tech X events, conferences, and exhibitions
              </p>
            </div>

            {/* Gallery Content */}
            {galleryItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                  No items yet
                </h3>
                <p className="text-muted-foreground">
                  Gallery items will appear here once uploaded by admin
                </p>
              </motion.div>
            ) : (
              <div className="space-y-12">
                {/* Photos Row */}
                {galleryItems.some((item) => item.type === "image") && (
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        Photos
                      </h2>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {galleryItems
                        .filter((item) => item.type === "image")
                        .map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ scale: 1.03, y: -6 }}
                            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-card flex flex-col"
                            onClick={() => setSelectedItem(item)}
                          >
                            {/* Delete Button - Only visible to admins */}
                            {isAuthenticated && (
                              <button
                                onClick={(e) => handleDelete(item.id, e)}
                                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                                title="Delete item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}

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
                    </motion.div>
                  </div>
                )}

                {/* Videos Row */}
                {galleryItems.some((item) => item.type === "video") && (
                  <div>
                    <div className="flex items-baseline justify-between mb-4">
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        Videos
                      </h2>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      {galleryItems
                        .filter((item) => item.type === "video")
                        .map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            whileHover={{ scale: 1.03, y: -6 }}
                            className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border bg-card shadow-card flex flex-col"
                            onClick={() => setSelectedItem(item)}
                          >
                            {/* Delete Button - Only visible to admins */}
                            {isAuthenticated && (
                              <button
                                onClick={(e) => handleDelete(item.id, e)}
                                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                                title="Delete item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}

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
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

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
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute -top-12 right-0 z-10 w-10 h-10 rounded-full bg-white text-foreground flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="p-6 border-b border-border">
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
              
              {/* Modal Content */}
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
                    src={selectedItem.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;

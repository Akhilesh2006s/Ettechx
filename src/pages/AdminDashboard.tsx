import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LogOut, Upload, Image as ImageIcon, Video, X, Trash2 } from "lucide-react";

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

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [photoHeading, setPhotoHeading] = useState("");
  const [photoDescription, setPhotoDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoHeading, setVideoHeading] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    document.title = "Admin Dashboard - Et Tech X";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
    loadGalleryItems();
  }, [isAuthenticated, navigate]);

  const loadGalleryItems = () => {
    const stored = localStorage.getItem("gallery_items");
    if (stored) {
      setGalleryItems(JSON.parse(stored));
    }
  };

  const saveGalleryItems = (items: GalleryItem[]) => {
    localStorage.setItem("gallery_items", JSON.stringify(items));
    setGalleryItems(items);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive",
        });
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      const newItem: GalleryItem = {
        id: Date.now().toString(),
        type: "image",
        url: base64String,
        uploadedAt: new Date().toISOString(),
        photoHeading: photoHeading.trim() || undefined,
        description: photoDescription.trim() || undefined,
      };

      const updated = [...galleryItems, newItem];
      saveGalleryItems(updated);
      setSelectedImage(null);
      setImagePreview("");
      setPhotoHeading("");
      setPhotoDescription("");
      // Reset file input
      const fileInput = document.getElementById("imageFile") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      toast({
        title: "Success",
        description: "Image added to gallery",
      });
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    // Extract YouTube video ID
    let videoId = "";
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(youtubeRegex);
    
    if (match && match[1]) {
      videoId = match[1];
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      type: "video",
      url: `https://www.youtube.com/embed/${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      uploadedAt: new Date().toISOString(),
      videoHeading: videoHeading.trim() || undefined,
      description: videoDescription.trim() || undefined,
    };

    const updated = [...galleryItems, newItem];
    saveGalleryItems(updated);
    setVideoUrl("");
    setVideoHeading("");
    setVideoDescription("");
    toast({
      title: "Success",
      description: "Video added to gallery",
    });
  };

  const handleDelete = (id: string) => {
    const updated = galleryItems.filter((item) => item.id !== id);
    saveGalleryItems(updated);
    toast({
      title: "Deleted",
      description: "Item removed from gallery",
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-4xl font-bold text-foreground mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Manage gallery photos and videos
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Add Image Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-8 rounded-3xl bg-gradient-card border border-border shadow-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Add Image
                  </h2>
                </div>
                <form onSubmit={handleAddImage} className="space-y-4">
                  <div>
                    <Label htmlFor="imageFile" className="mb-2">
                      Select Image File
                    </Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="h-12 bg-background/50 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                    />
                    {imagePreview && (
                      <div className="mt-4 rounded-lg overflow-hidden border border-border">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="photoHeading" className="mb-2">
                      Photo Heading
                    </Label>
                    <Input
                      id="photoHeading"
                      type="text"
                      placeholder="Enter photo heading"
                      value={photoHeading}
                      onChange={(e) => setPhotoHeading(e.target.value)}
                      className="h-12 bg-background/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="photoDescription" className="mb-2">
                      Description
                    </Label>
                    <textarea
                      id="photoDescription"
                      placeholder="Enter photo description"
                      value={photoDescription}
                      onChange={(e) => setPhotoDescription(e.target.value)}
                      className="w-full min-h-[100px] px-4 py-3 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full group"
                    disabled={!selectedImage}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </form>
              </motion.div>

              {/* Add Video Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 rounded-3xl bg-gradient-card border border-border shadow-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Video className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Add YouTube Video
                  </h2>
                </div>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div>
                    <Label htmlFor="videoUrl" className="mb-2">
                      YouTube Video URL
                    </Label>
                    <Input
                      id="videoUrl"
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="h-12 bg-background/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoHeading" className="mb-2">
                      Video Heading
                    </Label>
                    <Input
                      id="videoHeading"
                      type="text"
                      placeholder="Enter video heading"
                      value={videoHeading}
                      onChange={(e) => setVideoHeading(e.target.value)}
                      className="h-12 bg-background/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoDescription" className="mb-2">
                      Description
                    </Label>
                    <textarea
                      id="videoDescription"
                      placeholder="Enter video description"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      className="w-full min-h-[100px] px-4 py-3 rounded-lg bg-background/50 border border-border focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none"
                    />
                  </div>
                  <Button type="submit" variant="accent" className="w-full group">
                    <Upload className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </form>
              </motion.div>
            </div>

            {/* Gallery Items List */}
            {galleryItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 p-8 rounded-3xl bg-gradient-card border border-border shadow-card"
              >
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Gallery Items ({galleryItems.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="relative group rounded-xl overflow-hidden border border-border bg-card"
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt="Gallery"
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                      ) : (
                        <div className="relative w-full h-48 bg-muted">
                          <img
                            src={item.thumbnail || "/placeholder.svg"}
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <Video className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="p-3 bg-card">
                        <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-1">
                          {item.type === "image" 
                            ? (item.photoHeading || "Photo") 
                            : (item.videoHeading || "Video")}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.type === "image" ? "Image" : "Video"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

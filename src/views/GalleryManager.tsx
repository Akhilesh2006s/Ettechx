import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronUp, 
  Image as ImageIcon, FolderPlus, LogOut 
} from "lucide-react";
import { 
  loadGalleryData, 
  saveGalleryData, 
  GalleryYear, 
  GalleryCategory, 
  iconMap,
  defaultGalleryData
} from "@/lib/galleryData";
import {
  fetchGalleryData,
  saveGalleryData as saveGalleryDataApi,
  uploadImage as uploadImageApi,
  deleteImage as deleteImageApi,
  deleteYear as deleteYearApi,
} from "@/lib/galleryApi";
import { resolveMediaUrl, resolveMediaFallbackUrl } from "@/lib/mediaUrl";

const GalleryManager = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [galleryData, setGalleryData] = useState<GalleryYear[]>([]);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [editingYear, setEditingYear] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<{ yearId: string; categoryName: string } | null>(null);
  
  // Form states
  const [yearDisplayName, setYearDisplayName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  useEffect(() => {
    document.title = "Gallery Manager - Admin - EduExpoGlobal";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
    loadData();
  }, [isAuthenticated, navigate]);

  const loadData = async () => {
    let apiData: GalleryYear[] = [];
    
    try {
      // Try API first
      apiData = await fetchGalleryData();
    } catch (error) {
      console.error('Failed to load from API, using defaults:', error);
    }
    
    // Always merge with default data to ensure all old data is shown
    if (apiData && apiData.length > 0) {
      // Merge API data with default data (avoid duplicates by checking year IDs)
      const apiYearIds = new Set(apiData.map(y => y.year));
      const additionalDefaultYears = defaultGalleryData.filter(y => !apiYearIds.has(y.year));
      const mergedData = [...apiData, ...additionalDefaultYears];
      setGalleryData(mergedData);
    } else {
      // No API data, use localStorage or default data
      const localData = loadGalleryData();
      const dataToUse = localData.length > 0 ? localData : defaultGalleryData;
      setGalleryData(dataToUse);
    }
  };

  const migrateDefaultData = async () => {
    if (confirm("This will load all default gallery data into the backend. This will add them to your existing gallery. Continue?")) {
      try {
        // Get current gallery data from API
        const currentData = await fetchGalleryData();
        
        // Merge with default data (avoid duplicates by checking year IDs)
        const existingYearIds = new Set(currentData.map(y => y.year));
        const defaultYearsToAdd = defaultGalleryData.filter(y => !existingYearIds.has(y.year));
        
        // Combine: keep existing years, add new default years
        const mergedData = [...currentData, ...defaultYearsToAdd];
        
        await saveGalleryDataApi(mergedData);
        setGalleryData(mergedData);
        toast({
          title: "Success",
          description: `Loaded ${defaultYearsToAdd.length} default gallery years with ${defaultYearsToAdd.reduce((sum, y) => sum + y.categories.reduce((catSum, c) => catSum + c.images.length, 0), 0)} images`,
        });
      } catch (error) {
        console.error('Failed to migrate data:', error);
        toast({
          title: "Error",
          description: "Failed to load default gallery data. Make sure the server is running.",
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const saveData = async (data: GalleryYear[]) => {
    try {
      // Try API first
      await saveGalleryDataApi(data);
      setGalleryData(data);
      toast({
        title: "Success",
        description: "Gallery updated successfully",
      });
    } catch (error) {
      // Fallback to localStorage
      console.error('Failed to save to API, using localStorage:', error);
      saveGalleryData(data);
      setGalleryData(data);
      toast({
        title: "Saved (Local)",
        description: "Gallery saved locally. API unavailable.",
        variant: "default",
      });
    }
  };

  // Year Management
  const addNewYear = () => {
    const yearId = `year-${Date.now()}`;
    const newYear: GalleryYear = {
      year: yearId,
      displayName: "New Year",
      categories: [],
    };
    const updated = [newYear, ...galleryData];
    saveData(updated);
    setExpandedYear(yearId);
    setEditingYear(yearId);
    setYearDisplayName("New Year");
  };

  const updateYearName = (yearId: string) => {
    const updated = galleryData.map(y => 
      y.year === yearId ? { ...y, displayName: yearDisplayName } : y
    );
    saveData(updated);
    setEditingYear(null);
  };

  const deleteYear = async (yearId: string) => {
    if (confirm("Are you sure you want to delete this year and all its contents?")) {
      try {
        await deleteYearApi(yearId);
        const updated = galleryData.filter(y => y.year !== yearId);
        setGalleryData(updated);
        toast({
          title: "Success",
          description: "Year deleted successfully",
        });
      } catch (error) {
        // Fallback: just remove from local state
        const updated = galleryData.filter(y => y.year !== yearId);
        saveData(updated);
      }
    }
  };

  // Category Management
  const addCategory = (yearId: string) => {
    const newCategory: GalleryCategory = {
      name: "New Category",
      icon: "Store",
      color: "from-accent/20 to-accent/5",
      images: [],
    };
    const updated = galleryData.map(y => {
      if (y.year === yearId) {
        return { ...y, categories: [...y.categories, newCategory] };
      }
      return y;
    });
    saveData(updated);
    setEditingCategory({ yearId, categoryName: "New Category" });
    setCategoryName("New Category");
  };

  const updateCategoryName = (yearId: string, oldName: string) => {
    const updated = galleryData.map(y => {
      if (y.year === yearId) {
        return {
          ...y,
          categories: y.categories.map(c =>
            c.name === oldName ? { ...c, name: categoryName } : c
          ),
        };
      }
      return y;
    });
    saveData(updated);
    setEditingCategory(null);
  };

  const deleteCategory = (yearId: string, categoryName: string) => {
    if (confirm(`Are you sure you want to delete category "${categoryName}"?`)) {
      const updated = galleryData.map(y => {
        if (y.year === yearId) {
          return {
            ...y,
            categories: y.categories.filter(c => c.name !== categoryName),
          };
        }
        return y;
      });
      saveData(updated);
    }
  };

  // Image Management
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = async (yearId: string, categoryName: string) => {
    // File upload is the only supported way to add an image
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    let imageSrc = "";

    try {
      toast({
        title: "Uploading...",
        description: "Please wait while we upload your image",
      });

      const result = await uploadImageApi(selectedFile, yearId, categoryName);
      imageSrc = result.url;

      toast({
        title: "Uploaded",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image.",
        variant: "destructive",
      });
      return;
    }

    const updated = galleryData.map(y => {
      if (y.year === yearId) {
        return {
          ...y,
          categories: y.categories.map(c => {
            if (c.name === categoryName) {
              return {
                ...c,
                images: [
                  ...c.images,
                  {
                    src: imageSrc,
                    alt: newImageAlt || selectedFile?.name || `${categoryName} image`,
                  },
                ],
              };
            }
            return c;
          }),
        };
      }
      return y;
    });
    await saveData(updated);
    
    // Reset form
    setNewImageAlt("");
    setSelectedFile(null);
    setFilePreview("");
    
    // Reset file input
    const fileInput = document.getElementById(`file-input-${yearId}-${categoryName}`) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const deleteImage = async (yearId: string, categoryName: string, imageIndex: number) => {
    const yearData = galleryData.find(y => y.year === yearId);
    const category = yearData?.categories.find(c => c.name === categoryName);
    const imageToDelete = category?.images[imageIndex];
    
    // Delete file from server if it's a server path
    if (imageToDelete?.src && imageToDelete.src.startsWith('/gallery/')) {
      try {
        await deleteImageApi(imageToDelete.src);
      } catch (error) {
        console.error('Failed to delete image file:', error);
        // Continue with removing from data even if file deletion fails
      }
    }
    
    const updated = galleryData.map(y => {
      if (y.year === yearId) {
        return {
          ...y,
          categories: y.categories.map(c => {
            if (c.name === categoryName) {
              return {
                ...c,
                images: c.images.filter((_, idx) => idx !== imageIndex),
              };
            }
            return c;
          }),
        };
      }
      return y;
    });
    await saveData(updated);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen py-24">
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="font-display text-4xl font-bold text-foreground">
                  Gallery Manager
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage years, categories, and images
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={migrateDefaultData} variant="outline" className="gap-2">
                  <FolderPlus className="w-4 h-4" />
                  Load All Default Gallery Data
                </Button>
                <Button onClick={addNewYear} variant="hero" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Year
                </Button>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Years */}
            <div className="space-y-6">
              {galleryData.map((yearData) => (
                <div
                  key={yearData.year}
                  className="border border-border rounded-2xl bg-card shadow-card overflow-hidden"
                >
                  {/* Year Header */}
                  <div className="px-6 py-4 bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      {editingYear === yearData.year ? (
                        <>
                          <Input
                            value={yearDisplayName}
                            onChange={(e) => setYearDisplayName(e.target.value)}
                            className="max-w-xs"
                            placeholder="Year Name"
                          />
                          <Button
                            size="sm"
                            onClick={() => updateYearName(yearData.year)}
                            className="gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingYear(null)}
                            aria-label="Cancel year edit"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <h2 className="font-display text-2xl font-bold text-foreground">
                            {yearData.displayName}
                          </h2>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingYear(yearData.year);
                              setYearDisplayName(yearData.displayName);
                            }}
                            aria-label={`Edit year ${yearData.displayName}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addCategory(yearData.year)}
                        className="gap-2"
                      >
                        <FolderPlus className="w-4 h-4" />
                        Add Category
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setExpandedYear(expandedYear === yearData.year ? null : yearData.year)
                        }
                        aria-label={expandedYear === yearData.year ? "Collapse year" : "Expand year"}
                      >
                        {expandedYear === yearData.year ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteYear(yearData.year)}
                        className="text-destructive hover:text-destructive"
                        aria-label={`Delete year ${yearData.displayName}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Categories */}
                  {expandedYear === yearData.year && (
                    <div className="p-6 space-y-8">
                      {yearData.categories.map((category, categoryIndex) => {
                        const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                        const isEditing =
                          editingCategory?.yearId === yearData.year &&
                          editingCategory?.categoryName === category.name;

                        return (
                          <div
                            key={`${yearData.year}-${category.name}-${categoryIndex}`}
                            className="border border-border rounded-xl p-6 bg-muted/20"
                          >
                            {/* Category Header */}
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                {IconComponent && (
                                  <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-primary" />
                                  </div>
                                )}
                                {isEditing ? (
                                  <>
                                    <Input
                                      value={categoryName}
                                      onChange={(e) => setCategoryName(e.target.value)}
                                      className="max-w-xs"
                                      placeholder="Category Name"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        updateCategoryName(yearData.year, category.name)
                                      }
                                    >
                                      <Save className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingCategory(null)}
                                      aria-label="Cancel category edit"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <h3 className="font-display text-xl font-bold">
                                      {category.name}
                                    </h3>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => {
                                        setEditingCategory({
                                          yearId: yearData.year,
                                          categoryName: category.name,
                                        });
                                        setCategoryName(category.name);
                                      }}
                                      aria-label={`Edit category ${category.name}`}
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {category.images.length} photos
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => deleteCategory(yearData.year, category.name)}
                                  className="text-destructive hover:text-destructive"
                                  aria-label={`Delete category ${category.name}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Add Image Form */}
                            <div className="mb-6 p-4 bg-card rounded-lg border border-border">
                              <Label className="text-sm font-medium mb-3 block">
                                Add New Image
                              </Label>
                              
                              {/* File Upload */}
                              <div className="space-y-4">
                                <div>
                                  <Label
                                    htmlFor={`file-input-${yearData.year}-${category.name}`}
                                    className="text-xs text-muted-foreground mb-2 block"
                                  >
                                    Upload from Computer
                                  </Label>
                                  <div className="flex gap-2">
                                    <div className="flex-1">
                                      <Input
                                        id={`file-input-${yearData.year}-${category.name}`}
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp,image/bmp,image/avif,image/heic,image/heif,.jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,.JPG,.JPEG,.PNG,.GIF,.WEBP,.BMP,.AVIF,.HEIC,.HEIF"
                                        onChange={handleFileSelect}
                                        className="cursor-pointer"
                                      />
                                      <p className="text-xs text-muted-foreground mt-1">
                                        JPG, JPEG, PNG, GIF, WebP, BMP, AVIF, HEIC (Max 5MB)
                                      </p>
                                    </div>
                                    {filePreview && (
                                      <div className="w-20 h-20 rounded-lg overflow-hidden border border-border">
                                        <img
                                          src={filePreview}
                                          alt="Preview"
                                          className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Alt Text */}
                                <div className="flex gap-2">
                                  <Label
                                    htmlFor={`alt-input-${yearData.year}-${category.name}`}
                                    className="sr-only"
                                  >
                                    Alt text or description
                                  </Label>
                                  <Input
                                    id={`alt-input-${yearData.year}-${category.name}`}
                                    placeholder="Alt text / description (optional)"
                                    value={newImageAlt}
                                    onChange={(e) => setNewImageAlt(e.target.value)}
                                    className="flex-1"
                                  />
                                  <Button
                                    onClick={() => addImage(yearData.year, category.name)}
                                    className="gap-2"
                                  >
                                    <Plus className="w-4 h-4" />
                                    Add Image
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                              {category.images.map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="group relative aspect-square rounded-lg overflow-hidden border border-border"
                                >
                                  <img
                                    src={resolveMediaUrl(image.src)}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
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
                                  <button
                                    onClick={() =>
                                      deleteImage(yearData.year, category.name, imgIndex)
                                    }
                                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-lg"
                                    aria-label="Delete image"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}

                      {yearData.categories.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>No categories yet. Click "Add Category" to get started.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {galleryData.length === 0 && (
                <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                  <p className="text-muted-foreground text-lg mb-4">No years added yet</p>
                  <Button onClick={addNewYear} variant="hero" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Your First Year
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryManager;

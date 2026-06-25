import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterViewer from "@/components/NewsletterViewer";
import { 
  Plus, Trash2, Edit2, Save, X, Eye, EyeOff,
  Mail, ArrowLeft, LogOut, CheckCircle, Upload
} from "lucide-react";
import {
  fetchNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
  publishNewsletter,
  uploadBannerImage,
  type Newsletter,
  type NewsletterArticle,
} from "@/lib/newsletterApi";
import { resolveMediaUrl } from "@/lib/mediaUrl";

const NewsletterManager = () => {
  const { isAuthenticated, isReady, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUploadingFeatured, setIsUploadingFeatured] = useState<{ [key: number]: boolean }>({});
  const [isUploadingAdditional, setIsUploadingAdditional] = useState<{ [key: number]: boolean }>({});
  const [isUploadingAd, setIsUploadingAd] = useState(false);
  const [isUploadingYoutubeThumb, setIsUploadingYoutubeThumb] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Newsletter>>({
    bannerImageUrl: "",
    issueNumber: "",
    month: "",
    year: new Date().getFullYear().toString(),
    mainBannerHeading: "",
    mainBannerDescription: "",
    mainBannerCtaText: "",
    mainBannerCtaLink: "",
    article1: { image: "", title: "", description: "", link: "" },
    article2: { image: "", title: "", description: "", link: "" },
    article3: { image: "", title: "", description: "", link: "" },
    ad: { enabled: false, image: "", link: "" },
    articles: [],
    youtube: { enabled: false, thumbnail: "", title: "", link: "" },
    feedbackLink: "",
    officeAddress: "",
    contactNumber: "",
    websiteLink: "",
    disclaimerText: "",
    instagramLink: "",
    linkedinLink: "",
    youtubeChannelLink: "",
    isPublished: false,
  });

  const loadNewsletters = useCallback(async () => {
    try {
      const data = await fetchNewsletters();
      setNewsletters(data);
    } catch (error) {
      console.error('Failed to load newsletters:', error);
      toast({
        title: "Error",
        description: "Failed to load newsletters. Make sure the server is running.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    document.title = "Newsletter Manager - Admin - EduExpoGlobal";
    if (isReady && !isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    void loadNewsletters();
  }, [isAuthenticated, isReady, navigate, loadNewsletters]);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleNewNewsletter = () => {
    setSelectedNewsletter(null);
    setIsEditing(true);
    setShowPreview(false);
    // Clear file selection
    setBannerFile(null);
    setBannerPreview("");
    setFormData({
      bannerImageUrl: "",
      issueNumber: "",
      month: "",
      year: new Date().getFullYear().toString(),
      mainBannerHeading: "",
      mainBannerDescription: "",
      mainBannerCtaText: "",
      mainBannerCtaLink: "",
      article1: { image: "", title: "", description: "", link: "" },
      article2: { image: "", title: "", description: "", link: "" },
      article3: { image: "", title: "", description: "", link: "" },
      ad: { enabled: false, image: "", link: "" },
      articles: [],
      youtube: { enabled: false, thumbnail: "", title: "", link: "" },
      feedbackLink: "",
      officeAddress: "",
      contactNumber: "",
      websiteLink: "",
      disclaimerText: "",
      instagramLink: "",
      linkedinLink: "",
      youtubeChannelLink: "",
      isPublished: false,
    });
  };

  const handleEditNewsletter = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsEditing(true);
    setShowPreview(false);
    setFormData(newsletter);
    // Clear any file selection when editing
    setBannerFile(null);
    setBannerPreview("");
  };

  const handleSaveNewsletter = async () => {
    const requiredFields: Array<{ key: keyof Newsletter; label: string }> = [
      { key: "bannerImageUrl", label: "Banner Image" },
      { key: "issueNumber", label: "Issue Number" },
      { key: "month", label: "Month" },
      { key: "year", label: "Year" },
      { key: "mainBannerHeading", label: "Main Banner Heading" },
      { key: "mainBannerDescription", label: "Main Banner Description" },
      { key: "mainBannerCtaText", label: "CTA Text" },
      { key: "mainBannerCtaLink", label: "CTA Link" },
      { key: "feedbackLink", label: "Feedback Link" },
      { key: "officeAddress", label: "Office Address" },
      { key: "contactNumber", label: "Contact Number" },
      { key: "websiteLink", label: "Website Link" },
      { key: "disclaimerText", label: "Disclaimer Text" },
      { key: "instagramLink", label: "Instagram Link" },
      { key: "linkedinLink", label: "LinkedIn Link" },
      { key: "youtubeChannelLink", label: "YouTube Channel Link" },
    ];

    for (const field of requiredFields) {
      const value = (formData[field.key] as string | undefined)?.toString().trim();
      if (!value) {
        toast({
          title: "Missing Required Field",
          description: `${field.label} is required`,
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      if (selectedNewsletter?._id) {
        await updateNewsletter(selectedNewsletter._id, formData as Newsletter);
        toast({
          title: "Success",
          description: "Newsletter updated successfully",
        });
      } else {
        await createNewsletter(formData as Newsletter);
        toast({
          title: "Success",
          description: "Newsletter created successfully",
        });
      }
      await loadNewsletters();
      setIsEditing(false);
      setSelectedNewsletter(null);
    } catch (error) {
      console.error('Failed to save newsletter:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save newsletter",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNewsletter = async (id: string) => {
    if (confirm("Are you sure you want to delete this newsletter?")) {
      try {
        await deleteNewsletter(id);
        toast({
          title: "Success",
          description: "Newsletter deleted successfully",
        });
        await loadNewsletters();
        if (selectedNewsletter?._id === id) {
          setSelectedNewsletter(null);
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Failed to delete newsletter:', error);
        toast({
          title: "Error",
          description: "Failed to delete newsletter.",
          variant: "destructive",
        });
      }
    }
  };

  const handlePublishToggle = async (id: string, isPublished: boolean) => {
    try {
      await publishNewsletter(id, !isPublished);
      toast({
        title: "Success",
        description: isPublished ? "Newsletter unpublished" : "Newsletter published",
      });
      await loadNewsletters();
    } catch (error) {
      console.error('Failed to update newsletter status:', error);
      toast({
        title: "Error",
        description: "Failed to update newsletter status.",
        variant: "destructive",
      });
    }
  };

  const addArticle = () => {
    setFormData({
      ...formData,
      articles: [
        ...(formData.articles || []),
        { image: "", title: "", description: "", link: "" }
      ]
    });
  };

  const removeArticle = (index: number) => {
    setFormData({
      ...formData,
      articles: formData.articles?.filter((_, i) => i !== index) || []
    });
  };

  const updateArticle = (index: number, field: keyof NewsletterArticle, value: string) => {
    const articles = [...(formData.articles || [])];
    articles[index] = { ...articles[index], [field]: value };
    setFormData({ ...formData, articles });
  };

  const handleBannerFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadBanner = async () => {
    if (!bannerFile) {
      toast({
        title: "Error",
        description: "Please select an image file first",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingBanner(true);
    try {
      toast({
        title: "Uploading...",
        description: "Please wait while we upload your banner image",
      });

      const result = await uploadBannerImage(bannerFile);
      setFormData({ ...formData, bannerImageUrl: result.url });
      
      toast({
        title: "Success",
        description: "Banner image uploaded successfully",
      });

      // Clear file and preview after successful upload
      setBannerFile(null);
      setBannerPreview("");
      // Reset file input
      const fileInput = document.getElementById('banner-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Failed to upload banner:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload banner image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const handleUploadFeaturedArticleImage = async (num: number, file: File) => {
    setIsUploadingFeatured((prev) => ({ ...prev, [num]: true }));
    try {
      toast({
        title: "Uploading...",
        description: `Uploading image for Featured Article ${num}`,
      });

      const result = await uploadBannerImage(file);
      const key = `article${num}` as keyof typeof formData;
      const current = (formData[key] as NewsletterArticle) || { image: "", title: "", description: "", link: "" };
      setFormData({ ...formData, [key]: { ...current, image: result.url } });

      toast({
        title: "Success",
        description: `Image uploaded for Featured Article ${num}`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingFeatured((prev) => ({ ...prev, [num]: false }));
    }
  };

  const handleUploadAdditionalArticleImage = async (index: number, file: File) => {
    setIsUploadingAdditional((prev) => ({ ...prev, [index]: true }));
    try {
      toast({
        title: "Uploading...",
        description: `Uploading image for Article ${index + 1}`,
      });

      const result = await uploadBannerImage(file);
      const articles = [...(formData.articles || [])];
      articles[index] = { ...articles[index], image: result.url };
      setFormData({ ...formData, articles });

      toast({
        title: "Success",
        description: `Image uploaded for Article ${index + 1}`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAdditional((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleUploadAdImage = async (file: File) => {
    setIsUploadingAd(true);
    try {
      toast({
        title: "Uploading...",
        description: "Uploading advertisement image",
      });
      const result = await uploadBannerImage(file);
      setFormData({ ...formData, ad: { ...formData.ad, image: result.url } });
      toast({ title: "Success", description: "Advertisement image uploaded" });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingAd(false);
    }
  };

  const handleUploadYoutubeThumbnail = async (file: File) => {
    setIsUploadingYoutubeThumb(true);
    try {
      toast({
        title: "Uploading...",
        description: "Uploading YouTube thumbnail",
      });
      const result = await uploadBannerImage(file);
      setFormData({ ...formData, youtube: { ...formData.youtube, thumbnail: result.url } });
      toast({ title: "Success", description: "YouTube thumbnail uploaded" });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload thumbnail",
        variant: "destructive",
      });
    } finally {
      setIsUploadingYoutubeThumb(false);
    }
  };

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Newsletter Manager</h1>
              <p className="text-muted-foreground">Create and manage newsletters</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/admin")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </motion.div>

          {!isEditing ? (
            <>
              {/* Newsletters List */}
              <div className="mb-6">
                <Button onClick={handleNewNewsletter} className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Newsletter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newsletters.map((newsletter) => (
                  <motion.div
                    key={newsletter._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-lg border border-border p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          Issue {newsletter.issueNumber}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {newsletter.month} {newsletter.year}
                        </p>
                      </div>
                      {newsletter.isPublished && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {newsletter.mainBannerHeading}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditNewsletter(newsletter)}
                        className="flex items-center gap-1"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedNewsletter(newsletter);
                          setShowPreview(true);
                        }}
                        className="flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePublishToggle(newsletter._id!, newsletter.isPublished || false)}
                        className="flex items-center gap-1"
                      >
                        {newsletter.isPublished ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        {newsletter.isPublished ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteNewsletter(newsletter._id!)}
                        className="flex items-center gap-1 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {newsletters.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-card rounded-lg border border-border"
                >
                  <Mail className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No newsletters yet. Create your first newsletter!</p>
                </motion.div>
              )}

              {/* Preview Modal */}
              {showPreview && selectedNewsletter && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Preview Newsletter</h2>
                      <Button variant="ghost" onClick={() => setShowPreview(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <NewsletterViewer newsletter={selectedNewsletter} />
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Form */}
              <div className="bg-card rounded-lg border border-border p-6 space-y-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Newsletter Form</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center gap-2"
                    >
                      {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      {showPreview ? "Hide" : "Show"} Preview
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Header Section */}
                <div className="space-y-4 border-b border-border pb-4">
                  <h3 className="text-lg font-semibold">Header</h3>
                  
                  {/* Banner Image Upload */}
                  <div className="space-y-3">
                    <Label>Banner Image</Label>
                    
                    {/* Current/Preview Image */}
                    {(formData.bannerImageUrl || bannerPreview) && (
                      <div className="relative w-full h-48 rounded-lg border border-border overflow-hidden bg-muted">
                        <img
                          src={bannerPreview || resolveMediaUrl(formData.bannerImageUrl)}
                          alt="Banner preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {/* Upload Section */}
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          id="banner-file-input"
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,image/*"
                          onChange={handleBannerFileSelect}
                          className="cursor-pointer"
                        />
                      </div>
                      {bannerFile && (
                        <Button
                          type="button"
                          onClick={handleUploadBanner}
                          disabled={isUploadingBanner}
                          className="flex items-center gap-2"
                        >
                          <Upload className="w-4 h-4" />
                          {isUploadingBanner ? "Uploading..." : "Upload"}
                        </Button>
                      )}
                    </div>
                    
                    {formData.bannerImageUrl && (
                      <p className="text-xs text-muted-foreground break-all">
                        Uploaded URL: {formData.bannerImageUrl}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label>Issue Number</Label>
                      <Input
                        value={formData.issueNumber}
                        onChange={(e) => setFormData({ ...formData, issueNumber: e.target.value })}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <Label>Month</Label>
                      <Input
                        value={formData.month}
                        onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                        placeholder="January"
                      />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2024"
                      />
                    </div>
                  </div>
                </div>

                {/* Main Banner */}
                <div className="space-y-4 border-b border-border pb-4">
                  <h3 className="text-lg font-semibold">Main Banner</h3>
                  <div>
                    <Label>Heading</Label>
                    <Input
                      value={formData.mainBannerHeading}
                      onChange={(e) => setFormData({ ...formData, mainBannerHeading: e.target.value })}
                      placeholder="Join Us at EduExpoGlobal 2026"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.mainBannerDescription}
                      onChange={(e) => setFormData({ ...formData, mainBannerDescription: e.target.value })}
                      placeholder="Description..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>CTA Text</Label>
                      <Input
                        value={formData.mainBannerCtaText}
                        onChange={(e) => setFormData({ ...formData, mainBannerCtaText: e.target.value })}
                        placeholder="Register Now"
                      />
                    </div>
                    <div>
                      <Label>CTA Link</Label>
                      <Input
                        value={formData.mainBannerCtaLink}
                        onChange={(e) => setFormData({ ...formData, mainBannerCtaLink: e.target.value })}
                        placeholder="/register"
                      />
                    </div>
                  </div>
                </div>

                {/* Featured Articles */}
                {[1, 2, 3].map((num) => {
                  const article = formData[`article${num}` as keyof typeof formData] as NewsletterArticle;
                  return (
                    <div key={num} className="space-y-4 border-b border-border pb-4">
                      <h3 className="text-lg font-semibold">Featured Article {num}</h3>
                      <div>
                        <Label>Image</Label>
                        {article?.image && (
                          <div className="mb-2 w-full h-28 rounded border border-border overflow-hidden bg-muted">
                            <img src={resolveMediaUrl(article.image)} alt={article.title || `Featured Article ${num}`} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex gap-2 items-center">
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                void handleUploadFeaturedArticleImage(num, f);
                                e.currentTarget.value = "";
                              }
                            }}
                            className="max-w-xs cursor-pointer"
                          />
                          {isUploadingFeatured[num] && (
                            <span className="text-sm text-muted-foreground">Uploading...</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={article?.title || ""}
                          onChange={(e) => setFormData({ ...formData, [`article${num}`]: { ...article, title: e.target.value } })}
                          placeholder="Article Title"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={article?.description || ""}
                          onChange={(e) => setFormData({ ...formData, [`article${num}`]: { ...article, description: e.target.value } })}
                          placeholder="Description..."
                        />
                      </div>
                      <div>
                        <Label>Link</Label>
                        <Input
                          value={article?.link || ""}
                          onChange={(e) => setFormData({ ...formData, [`article${num}`]: { ...article, link: e.target.value } })}
                          placeholder="/article"
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Additional Articles */}
                <div className="space-y-4 border-b border-border pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Additional Articles</h3>
                    <Button variant="outline" size="sm" onClick={addArticle}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {formData.articles?.map((article, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Article {index + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeArticle(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>Article Image</Label>
                        {article.image && (
                          <div className="w-full h-24 rounded border border-border overflow-hidden bg-muted">
                            <img src={resolveMediaUrl(article.image)} alt={article.title || `Article ${index + 1}`} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex gap-2 items-center">
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                void handleUploadAdditionalArticleImage(index, f);
                                e.currentTarget.value = "";
                              }
                            }}
                            className="max-w-xs cursor-pointer"
                          />
                          {isUploadingAdditional[index] && (
                            <span className="text-sm text-muted-foreground">Uploading...</span>
                          )}
                        </div>
                      </div>
                      <Input
                        placeholder="Title"
                        value={article.title}
                        onChange={(e) => updateArticle(index, 'title', e.target.value)}
                      />
                      <textarea
                        className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Description"
                        value={article.description}
                        onChange={(e) => updateArticle(index, 'description', e.target.value)}
                      />
                      <Input
                        placeholder="Link"
                        value={article.link}
                        onChange={(e) => updateArticle(index, 'link', e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Optional Sections */}
                <div className="space-y-4 border-b border-border pb-4">
                  <h3 className="text-lg font-semibold">Optional Sections</h3>
                  
                  {/* Ad */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.ad?.enabled || false}
                        onChange={(e) => setFormData({ ...formData, ad: { ...formData.ad, enabled: e.target.checked } })}
                      />
                      <Label>Enable Advertisement</Label>
                    </div>
                    {formData.ad?.enabled && (
                      <>
                        <div className="space-y-2">
                          <Label>Ad Image</Label>
                          {formData.ad?.image && (
                            <div className="w-full h-28 rounded border border-border overflow-hidden bg-muted">
                              <img src={resolveMediaUrl(formData.ad.image)} alt="Ad preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex gap-2 items-center">
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  void handleUploadAdImage(f);
                                  e.currentTarget.value = "";
                                }
                              }}
                              className="max-w-xs cursor-pointer"
                            />
                            {isUploadingAd && (
                              <span className="text-sm text-muted-foreground">Uploading...</span>
                            )}
                          </div>
                        </div>
                        <Input
                          placeholder="Ad Link"
                          value={formData.ad?.link || ""}
                          onChange={(e) => setFormData({ ...formData, ad: { ...formData.ad, link: e.target.value } })}
                        />
                      </>
                    )}
                  </div>

                  {/* YouTube */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.youtube?.enabled || false}
                        onChange={(e) => setFormData({ ...formData, youtube: { ...formData.youtube, enabled: e.target.checked } })}
                      />
                      <Label>Enable YouTube Video</Label>
                    </div>
                    {formData.youtube?.enabled && (
                      <>
                        <div className="space-y-2">
                          <Label>YouTube Thumbnail</Label>
                          {formData.youtube?.thumbnail && (
                            <div className="w-full h-28 rounded border border-border overflow-hidden bg-muted">
                              <img src={resolveMediaUrl(formData.youtube.thumbnail)} alt="YouTube thumbnail preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex gap-2 items-center">
                            <Input
                              type="file"
                              accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.avif,.heic,.heif,image/*"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  void handleUploadYoutubeThumbnail(f);
                                  e.currentTarget.value = "";
                                }
                              }}
                              className="max-w-xs cursor-pointer"
                            />
                            {isUploadingYoutubeThumb && (
                              <span className="text-sm text-muted-foreground">Uploading...</span>
                            )}
                          </div>
                        </div>
                        <Input
                          placeholder="Video Title"
                          value={formData.youtube?.title || ""}
                          onChange={(e) => setFormData({ ...formData, youtube: { ...formData.youtube, title: e.target.value } })}
                        />
                        <Input
                          placeholder="Video Link"
                          value={formData.youtube?.link || ""}
                          onChange={(e) => setFormData({ ...formData, youtube: { ...formData.youtube, link: e.target.value } })}
                        />
                      </>
                    )}
                  </div>
                </div>

                {/* Contact & Footer */}
                <div className="space-y-4 border-b border-border pb-4">
                  <h3 className="text-lg font-semibold">Contact & Footer</h3>
                  <div>
                    <Label>Feedback Link</Label>
                    <Input
                      value={formData.feedbackLink}
                      onChange={(e) => setFormData({ ...formData, feedbackLink: e.target.value })}
                      placeholder="/feedback"
                    />
                  </div>
                  <div>
                    <Label>Office Address</Label>
                    <textarea
                      className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.officeAddress}
                      onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                      placeholder="Address..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Contact Number</Label>
                      <Input
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        placeholder="+91..."
                      />
                    </div>
                    <div>
                      <Label>Website Link</Label>
                      <Input
                        value={formData.websiteLink}
                        onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Disclaimer Text</Label>
                    <textarea
                      className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.disclaimerText}
                      onChange={(e) => setFormData({ ...formData, disclaimerText: e.target.value })}
                      placeholder="Disclaimer..."
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label>Instagram Link</Label>
                      <Input
                        value={formData.instagramLink}
                        onChange={(e) => setFormData({ ...formData, instagramLink: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label>LinkedIn Link</Label>
                      <Input
                        value={formData.linkedinLink}
                        onChange={(e) => setFormData({ ...formData, linkedinLink: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label>YouTube Channel Link</Label>
                      <Input
                        value={formData.youtubeChannelLink}
                        onChange={(e) => setFormData({ ...formData, youtubeChannelLink: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSaveNewsletter}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : selectedNewsletter ? "Update Newsletter" : "Create Newsletter"}
                </Button>
              </div>

              {/* Preview */}
              {showPreview && (
                <div className="bg-card rounded-lg border border-border p-6 max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4">Preview</h2>
                  <NewsletterViewer newsletter={formData as Newsletter} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewsletterManager;

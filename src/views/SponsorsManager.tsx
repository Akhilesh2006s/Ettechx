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
import { 
  Plus, Trash2, Edit2, Save, X, 
  Image as ImageIcon, Building2, ArrowLeft, LogOut
} from "lucide-react";
import {
  fetchSponsorsData,
  saveSponsorsData,
  uploadSponsorLogo,
  deleteSponsorLogo,
  deleteSponsor,
  type Sponsor,
} from "@/lib/sponsorsApi";
import { resolveMediaUrl, resolveMediaFallbackUrl } from "@/lib/mediaUrl";

// Default sponsors data from SponsorsSection
const defaultSponsors: Sponsor[] = [
  {
    id: "sponsor-1",
    name: "SCHOOL SERV (INDIA) SOLUTIONS PRIVATE LIMITED",
    path: "/logos/School Serv.jpg",
    type: "image",
    tier: "gold",
  },
  {
    id: "sponsor-2",
    name: "MyClassboard Educational Solutions Private Limited",
    path: "/logos/MCB.jpg",
    type: "image",
    tier: "silver",
  },
  {
    id: "sponsor-3",
    name: "PEARSON INDIA EDUCATION SERVICES PRIVATE",
    path: "/logos/Pearson.jpg",
    type: "image",
    tier: "silver",
  },
  {
    id: "sponsor-4",
    name: "EVO11VE PRIVATE LIMITED",
    path: "/logos/Evo11ve.jpg",
    type: "image",
    tier: "silver",
  },
  {
    id: "sponsor-5",
    name: "PARAN PARA EDUCATION POLICY PRIVATE LIMITED",
    path: "/logos/paranpara.jpg",
    type: "image",
    tier: "silver",
  },
  {
    id: "sponsor-6",
    name: "Ryan Edunation (no stall)",
    path: "/logos/Ryan Edunation.jpg",
    type: "image",
    tier: "k12",
  },
  {
    id: "sponsor-7",
    name: "Possibility Edutech Pvt Ltd (no stall)",
    path: "/logos/possibility.JPG",
    type: "image",
    tier: "k12",
  },
  {
    id: "sponsor-8",
    name: "Altus Learning Pvt Ltd (no stall)",
    path: "/logos/Altus Learning Pvt Ltd.JPG",
    type: "image",
    tier: "k12",
  },
  {
    id: "sponsor-9",
    name: "jubilee hills public school",
    path: "/logos/JHPS K12.jpg",
    type: "image",
    tier: "k12",
  },
  {
    id: "sponsor-10",
    name: "Amrita Vishwa Vidyapeetham",
    path: "/logos/Amrita University.png",
    type: "image",
    tier: "university",
  },
];

const normalizeTier = (tier: string): Sponsor["tier"] => {
  const value = tier.toLowerCase().replace(/[\s_-]+/g, "");
  if (value === "gold") return "gold";
  if (value === "silver") return "silver";
  if (value === "k12") return "k12";
  if (value === "university") return "university";
  if (value === "media" || value === "mediapartner") return "media";
  return "silver";
};

const SponsorsManager = () => {
  const { isAuthenticated, isReady, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sponsorsData, setSponsorsData] = useState<Sponsor[]>([]);
  const [editingSponsor, setEditingSponsor] = useState<string | null>(null);
  
  // Form states
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorPath, setSponsorPath] = useState("");
  const [sponsorType, setSponsorType] = useState<"image" | "pdf" | "svg">("image");
  const [sponsorTier, setSponsorTier] = useState<"gold" | "silver" | "k12" | "university" | "media">("silver");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  const loadData = useCallback(async () => {
    try {
      const data = await fetchSponsorsData();
      if (data && data.length > 0) {
        setSponsorsData(
          data.map((sponsor) => ({
            ...sponsor,
            tier: normalizeTier(sponsor.tier),
          }))
        );
      } else {
        setSponsorsData([]);
      }
    } catch (error) {
      console.error('Failed to load sponsors data:', error);
      setSponsorsData([]);
      toast({
        title: "Server Not Running",
        description: "Make sure the backend server is running on port 3001. Run 'npm start' in the server directory.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    document.title = "Sponsors Manager - Admin - Et Tech X";
    if (isReady && !isAuthenticated) {
      navigate("/admin/login");
      return;
    }
    void loadData();
  }, [isAuthenticated, isReady, navigate, loadData]);

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const saveData = async (data: Sponsor[]) => {
    try {
      await saveSponsorsData(data);
      setSponsorsData(data);
      toast({
        title: "Success",
        description: "Sponsors updated successfully",
      });
    } catch (error) {
      console.error('Failed to save sponsors data:', error);
      toast({
        title: "Server Not Running",
        description: "Make sure the backend server is running on port 3001. Run 'npm start' in the server directory.",
        variant: "destructive",
      });
    }
  };

  const migrateDefaultSponsors = async () => {
    if (confirm("This will load all default sponsors into the backend. This will add them to your existing sponsors. Continue?")) {
      try {
        const currentSponsors = await fetchSponsorsData();
        const existingIds = new Set(currentSponsors.map(s => s.id));
        const defaultToAdd = defaultSponsors.filter(s => !existingIds.has(s.id));
        const merged = [...currentSponsors, ...defaultToAdd];
        await saveSponsorsData(merged);
        setSponsorsData(merged);
        toast({
          title: "Success",
          description: `Loaded ${defaultToAdd.length} default sponsors`,
        });
      } catch (error) {
        console.error('Failed to migrate sponsors:', error);
        toast({
          title: "Error",
          description: "Failed to load default sponsors. Make sure the server is running.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file",
          description: "Please choose an image file for sponsor logo.",
          variant: "destructive",
        });
        setSelectedFile(null);
        setFilePreview("");
        e.target.value = "";
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSponsor = async () => {
    if (!sponsorName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sponsor name",
        variant: "destructive",
      });
      return;
    }

    let imagePath = sponsorPath;

    // If file is selected, upload it first
    if (selectedFile) {
      try {
        toast({
          title: "Uploading...",
          description: "Please wait while we upload the logo",
        });
        
        const result = await uploadSponsorLogo(selectedFile);
        imagePath = result.url;
        
        toast({
          title: "Uploaded",
          description: "Logo uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: error instanceof Error ? error.message : "Failed to upload logo. Using URL.",
          variant: "destructive",
        });
        imagePath = filePreview || sponsorPath;
      }
    } else if (!imagePath && !filePreview) {
      toast({
        title: "Error",
        description: "Please select a logo file or enter a logo URL",
        variant: "destructive",
      });
      return;
    } else {
      imagePath = filePreview || sponsorPath;
    }

    const newSponsor: Sponsor = {
      id: `sponsor-${Date.now()}`,
      name: sponsorName,
      path: imagePath,
      type: sponsorType,
      tier: sponsorTier,
    };

    const updated = [...sponsorsData, newSponsor];
    await saveData(updated);
    
    // Reset form
    setSponsorName("");
    setSponsorPath("");
    setSponsorType("image");
    setSponsorTier("silver");
    setSelectedFile(null);
    setFilePreview("");
  };

  const startEditSponsor = (sponsorId: string) => {
    const sponsor = sponsorsData.find(s => s.id === sponsorId);
    if (sponsor) {
      setEditingSponsor(sponsorId);
      setSponsorName(sponsor.name);
      setSponsorPath(sponsor.path);
      setSponsorType(sponsor.type);
      setSponsorTier(normalizeTier(sponsor.tier));
      setSelectedFile(null);
      setFilePreview("");
    }
  };

  const saveEditSponsor = async () => {
    if (!editingSponsor || !sponsorName.trim()) {
      return;
    }

    let imagePath = sponsorPath;

    // If file is selected, upload it first
    if (selectedFile) {
      try {
        toast({
          title: "Uploading...",
          description: "Please wait while we upload the logo",
        });
        
        const result = await uploadSponsorLogo(selectedFile);
        imagePath = result.url;
        
        toast({
          title: "Uploaded",
          description: "Logo uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: error instanceof Error ? error.message : "Failed to upload logo. Using URL.",
          variant: "destructive",
        });
        imagePath = filePreview || sponsorPath;
      }
    } else if (filePreview) {
      imagePath = filePreview;
    }

    const updated = sponsorsData.map(s => {
      if (s.id === editingSponsor) {
        return {
          ...s,
          name: sponsorName,
          path: imagePath,
          type: sponsorType,
          tier: sponsorTier,
        };
      }
      return s;
    });

    await saveData(updated);
    setEditingSponsor(null);
    
    // Reset form
    setSponsorName("");
    setSponsorPath("");
    setSponsorType("image");
    setSponsorTier("silver");
    setSelectedFile(null);
    setFilePreview("");
  };

  const cancelEditSponsor = () => {
    setEditingSponsor(null);
    setSponsorName("");
    setSponsorPath("");
    setSponsorType("image");
    setSponsorTier("silver");
    setSelectedFile(null);
    setFilePreview("");
  };

  const deleteSponsorHandler = async (sponsorId: string) => {
    if (confirm("Are you sure you want to delete this sponsor?")) {
      const sponsor = sponsorsData.find(s => s.id === sponsorId);
      if (sponsor) {
        // Try to delete logo if it's in our storage
        if (sponsor.path.startsWith('/sponsors/') || sponsor.path.startsWith('/logos/')) {
          try {
            await deleteSponsorLogo(sponsor.path);
          } catch (error) {
            console.error('Failed to delete logo:', error);
          }
        }

        try {
          await deleteSponsor(sponsorId);
          const updated = sponsorsData.filter(s => s.id !== sponsorId);
          setSponsorsData(updated);
          toast({
            title: "Success",
            description: "Sponsor deleted successfully",
          });
        } catch (error) {
          // Fallback: just remove from local state
          const updated = sponsorsData.filter(s => s.id !== sponsorId);
          await saveData(updated);
        }
      }
    }
  };

  // Group sponsors by tier
  const groupedSponsors = {
    gold: sponsorsData.filter(s => normalizeTier(s.tier) === "gold"),
    silver: sponsorsData.filter(s => normalizeTier(s.tier) === "silver"),
    k12: sponsorsData.filter(s => normalizeTier(s.tier) === "k12"),
    university: sponsorsData.filter(s => normalizeTier(s.tier) === "university"),
    media: sponsorsData.filter(s => normalizeTier(s.tier) === "media"),
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
              <h1 className="text-4xl font-bold text-foreground mb-2">Sponsors Manager</h1>
              <p className="text-muted-foreground">Manage sponsors and partners</p>
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

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex gap-3 flex-wrap"
          >
            <Button
              onClick={migrateDefaultSponsors}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Load All Default Sponsors
            </Button>
          </motion.div>

          {/* Add/Edit Sponsor Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-card rounded-lg border border-border p-6"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sponsor-name">Name *</Label>
                <Input
                  id="sponsor-name"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="Sponsor name"
                />
              </div>
              
              <div>
                <Label htmlFor="sponsor-tier">Tier *</Label>
                <select
                  id="sponsor-tier"
                  value={sponsorTier}
                  onChange={(e) => setSponsorTier(e.target.value as Sponsor['tier'])}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="k12">K12</option>
                  <option value="university">University</option>
                  <option value="media">Media Partner</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="sponsor-type">Type *</Label>
                <select
                  id="sponsor-type"
                  value={sponsorType}
                  onChange={(e) => setSponsorType(e.target.value as Sponsor['type'])}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="image">Image</option>
                  <option value="pdf">PDF</option>
                  <option value="svg">SVG</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="sponsor-logo">Logo</Label>
                <div className="flex gap-2">
                  <Input
                    id="sponsor-logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1"
                  />
                  <Input
                    value={sponsorPath}
                    onChange={(e) => setSponsorPath(e.target.value)}
                    placeholder="Or enter logo URL"
                    className="flex-1"
                  />
                </div>
                {filePreview && (
                  <div className="mt-2">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              {editingSponsor ? (
                <>
                  <Button onClick={saveEditSponsor}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={cancelEditSponsor}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={addSponsor}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Sponsor
                </Button>
              )}
            </div>
          </motion.div>

          {/* Sponsors List by Tier */}
          <div className="space-y-8">
            {Object.entries(groupedSponsors).map(([tier, sponsors]) => (
              sponsors.length > 0 && (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-lg border border-border p-6"
                >
                  <h3 className="text-2xl font-bold text-foreground mb-4 capitalize">
                    {tier === "media" ? "Media Partners" : `${tier} Partners`} ({sponsors.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sponsors.map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="bg-background rounded-lg border border-border p-4 flex items-start gap-3"
                      >
                        {sponsor.type === "image" ? (
                          <img
                            src={resolveMediaUrl(sponsor.path)}
                            alt={sponsor.name}
                            className="w-16 h-16 object-contain rounded border border-border"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.dataset.mediaFallbackTried !== "1") {
                                img.dataset.mediaFallbackTried = "1";
                                img.src = resolveMediaFallbackUrl(sponsor.path);
                              } else {
                                img.src = "/placeholder.svg";
                              }
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 flex items-center justify-center bg-muted rounded border border-border">
                            <ImageIcon className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">{sponsor.name}</h4>
                          <p className="text-sm text-muted-foreground capitalize">{sponsor.tier} • {sponsor.type}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditSponsor(sponsor.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteSponsorHandler(sponsor.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            ))}
            
            {sponsorsData.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-card rounded-lg border border-border"
              >
                <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No sponsors yet. Add your first sponsor!</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SponsorsManager;

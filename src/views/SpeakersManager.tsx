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
  Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronUp, 
  Image as ImageIcon, UserPlus, ArrowLeft, LogOut, Users
} from "lucide-react";
import {
  fetchSpeakersData,
  saveSpeakersData,
  uploadSpeakerImage,
  deleteSpeakerImage,
  deleteGroup,
  type Speaker,
  type SpeakerGroup,
} from "@/lib/speakersApi";
import { speakerGroups as defaultSpeakerGroups } from "@/lib/speakersData";

const accentStyles = [
  {
    accentColor: "from-primary to-deep-purple",
    bgAccent: "bg-primary/10",
    borderAccent: "border-primary/30",
  },
  {
    accentColor: "from-secondary to-gold",
    bgAccent: "bg-secondary/10",
    borderAccent: "border-secondary/30",
  },
  {
    accentColor: "from-accent to-teal",
    bgAccent: "bg-accent/10",
    borderAccent: "border-accent/30",
  },
  {
    accentColor: "from-deep-purple to-primary",
    bgAccent: "bg-deep-purple/10",
    borderAccent: "border-deep-purple/30",
  },
  {
    accentColor: "from-gold to-secondary",
    bgAccent: "bg-gold/10",
    borderAccent: "border-gold/30",
  },
  {
    accentColor: "from-teal to-accent",
    bgAccent: "bg-teal/10",
    borderAccent: "border-teal/30",
  },
];

const getAccentStyle = (index: number) => accentStyles[index % accentStyles.length];

const SpeakersManager = () => {
  const { isAuthenticated, isReady, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [speakersData, setSpeakersData] = useState<SpeakerGroup[]>([]);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [editingSpeaker, setEditingSpeaker] = useState<{ groupId: string; speakerIndex: number } | null>(null);
  
  // Form states
  const [groupLabel, setGroupLabel] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerDesignation, setSpeakerDesignation] = useState("");
  const [speakerOrganization, setSpeakerOrganization] = useState("");
  const [speakerImageUrl, setSpeakerImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");

  const loadData = useCallback(async () => {
    try {
      const data = await fetchSpeakersData();
      if (data && data.length > 0) {
        setSpeakersData(data);
      } else {
        // No data yet, but API is working
        setSpeakersData([]);
      }
    } catch (error) {
      console.error('Failed to load speakers data:', error);
      setSpeakersData([]);
      toast({
        title: "Server Not Running",
        description: "Make sure the backend server is running on port 3001. Run 'npm start' in the server directory.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    document.title = "Speakers Manager - Admin - EduExpoGlobal";
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

  const saveData = async (data: SpeakerGroup[]) => {
    try {
      await saveSpeakersData(data);
      setSpeakersData(data);
      toast({
        title: "Success",
        description: "Speakers updated successfully",
      });
    } catch (error) {
      console.error('Failed to save speakers data:', error);
      toast({
        title: "Server Not Running",
        description: "Make sure the backend server is running on port 3001. Run 'npm start' in the server directory.",
        variant: "destructive",
      });
    }
  };

  const migrateDefaultSpeakers = async () => {
    if (confirm("This will load all default speakers into the backend. This will add them to your existing speakers. Continue?")) {
      try {
        // Get current speakers from API
        const currentGroups = await fetchSpeakersData();
        
        // Merge with default speakers (avoid duplicates by checking group IDs)
        const existingGroupIds = new Set(currentGroups.map(g => g.id));
        const defaultGroupsToAdd = defaultSpeakerGroups.filter(g => !existingGroupIds.has(g.id));
        
        // Combine: keep existing groups, add new default groups
        const mergedGroups = [...currentGroups, ...defaultGroupsToAdd];
        
        await saveSpeakersData(mergedGroups);
        setSpeakersData(mergedGroups);
        toast({
          title: "Success",
          description: `Loaded ${defaultGroupsToAdd.length} default speaker groups with ${defaultGroupsToAdd.reduce((sum, g) => sum + g.speakers.length, 0)} speakers`,
        });
      } catch (error) {
        console.error('Failed to migrate speakers:', error);
        toast({
          title: "Error",
          description: "Failed to load default speakers. Make sure the server is running.",
          variant: "destructive",
        });
      }
    }
  };

  // Group Management
  const addNewGroup = () => {
    const groupId = `group-${Date.now()}`;
    const newGroup: SpeakerGroup = {
      id: groupId,
      label: "New Group",
      speakers: [],
    };
    const updated = [newGroup, ...speakersData];
    saveData(updated);
    setExpandedGroup(groupId);
    setEditingGroup(groupId);
    setGroupLabel("New Group");
  };

  const updateGroupLabel = (groupId: string) => {
    const updated = speakersData.map(g => 
      g.id === groupId ? { ...g, label: groupLabel } : g
    );
    saveData(updated);
    setEditingGroup(null);
  };

  const deleteGroupHandler = async (groupId: string) => {
    if (confirm("Are you sure you want to delete this group and all its speakers?")) {
      try {
        await deleteGroup(groupId);
        const updated = speakersData.filter(g => g.id !== groupId);
        setSpeakersData(updated);
        toast({
          title: "Success",
          description: "Group deleted successfully",
        });
      } catch (error) {
        // Fallback: just remove from local state
        const updated = speakersData.filter(g => g.id !== groupId);
        saveData(updated);
      }
    }
  };

  // Speaker Management
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpeaker = async (groupId: string) => {
    if (!speakerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a speaker name",
        variant: "destructive",
      });
      return;
    }

    let imageSrc = speakerImageUrl;

    // If file is selected, upload it first
    if (selectedFile) {
      try {
        toast({
          title: "Uploading...",
          description: "Please wait while we upload the image",
        });
        
        const result = await uploadSpeakerImage(selectedFile);
        imageSrc = result.url;
        
        toast({
          title: "Uploaded",
          description: "Image uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: error instanceof Error ? error.message : "Failed to upload image. Using URL.",
          variant: "destructive",
        });
        // Fallback to preview or URL
        imageSrc = filePreview || speakerImageUrl;
      }
    } else if (!imageSrc && !filePreview) {
      toast({
        title: "Error",
        description: "Please select an image file or enter an image URL",
        variant: "destructive",
      });
      return;
    } else {
      imageSrc = filePreview || speakerImageUrl;
    }

    const group = speakersData.find(g => g.id === groupId);
    const accentIndex = group ? group.speakers.length : 0;
    const accent = getAccentStyle(accentIndex);

    const newSpeaker: Speaker = {
      name: speakerName,
      designation: speakerDesignation,
      organization: speakerOrganization,
      image: imageSrc,
      ...accent,
    };

    const updated = speakersData.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          speakers: [...g.speakers, newSpeaker],
        };
      }
      return g;
    });

    await saveData(updated);
    
    // Reset form
    setSpeakerName("");
    setSpeakerDesignation("");
    setSpeakerOrganization("");
    setSpeakerImageUrl("");
    setSelectedFile(null);
    setFilePreview("");
  };

  const startEditSpeaker = (groupId: string, speakerIndex: number) => {
    const group = speakersData.find(g => g.id === groupId);
    if (group && group.speakers[speakerIndex]) {
      const speaker = group.speakers[speakerIndex];
      setEditingSpeaker({ groupId, speakerIndex });
      setSpeakerName(speaker.name);
      setSpeakerDesignation(speaker.designation);
      setSpeakerOrganization(speaker.organization);
      setSpeakerImageUrl(speaker.image);
      setSelectedFile(null);
      setFilePreview("");
    }
  };

  const saveEditSpeaker = async () => {
    if (!editingSpeaker || !speakerName.trim()) {
      return;
    }

    let imageSrc = speakerImageUrl;

    // If file is selected, upload it first
    if (selectedFile) {
      try {
        toast({
          title: "Uploading...",
          description: "Please wait while we upload the image",
        });
        
        const result = await uploadSpeakerImage(selectedFile);
        imageSrc = result.url;
        
        toast({
          title: "Uploaded",
          description: "Image uploaded successfully",
        });
      } catch (error) {
        toast({
          title: "Upload Failed",
          description: error instanceof Error ? error.message : "Failed to upload image. Using URL.",
          variant: "destructive",
        });
        imageSrc = filePreview || speakerImageUrl;
      }
    } else if (filePreview) {
      imageSrc = filePreview;
    }

    const updated = speakersData.map(g => {
      if (g.id === editingSpeaker.groupId) {
        const updatedSpeakers = [...g.speakers];
        updatedSpeakers[editingSpeaker.speakerIndex] = {
          ...updatedSpeakers[editingSpeaker.speakerIndex],
          name: speakerName,
          designation: speakerDesignation,
          organization: speakerOrganization,
          image: imageSrc,
        };
        return {
          ...g,
          speakers: updatedSpeakers,
        };
      }
      return g;
    });

    await saveData(updated);
    setEditingSpeaker(null);
    
    // Reset form
    setSpeakerName("");
    setSpeakerDesignation("");
    setSpeakerOrganization("");
    setSpeakerImageUrl("");
    setSelectedFile(null);
    setFilePreview("");
  };

  const cancelEditSpeaker = () => {
    setEditingSpeaker(null);
    setSpeakerName("");
    setSpeakerDesignation("");
    setSpeakerOrganization("");
    setSpeakerImageUrl("");
    setSelectedFile(null);
    setFilePreview("");
  };

  const deleteSpeaker = async (groupId: string, speakerIndex: number) => {
    if (confirm("Are you sure you want to delete this speaker?")) {
      const group = speakersData.find(g => g.id === groupId);
      if (group) {
        const speaker = group.speakers[speakerIndex];
        // Try to delete image if it's in our storage
        if (speaker.image.startsWith('/speakers/')) {
          try {
            await deleteSpeakerImage(speaker.image);
          } catch (error) {
            console.error('Failed to delete image:', error);
          }
        }

        const updated = speakersData.map(g => {
          if (g.id === groupId) {
            return {
              ...g,
              speakers: g.speakers.filter((_, idx) => idx !== speakerIndex),
            };
          }
          return g;
        });

        await saveData(updated);
      }
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
              <h1 className="text-4xl font-bold text-foreground mb-2">Speakers Manager</h1>
              <p className="text-muted-foreground">Manage speakers and groups</p>
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
              onClick={addNewGroup}
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Add New Group
            </Button>
            <Button
              onClick={migrateDefaultSpeakers}
              variant="outline"
              className="flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Load All Default Speakers
            </Button>
          </motion.div>

          {/* Groups List */}
          <div className="space-y-4">
            {speakersData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-card rounded-lg border border-border"
              >
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No speaker groups yet. Add your first group!</p>
              </motion.div>
            ) : (
              speakersData.map((group) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-lg border border-border overflow-hidden"
                >
                  {/* Group Header */}
                  <div className="p-4 flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3 flex-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                      >
                        {expandedGroup === group.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      
                      {editingGroup === group.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={groupLabel}
                            onChange={(e) => setGroupLabel(e.target.value)}
                            className="max-w-xs"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => updateGroupLabel(group.id)}
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingGroup(null);
                              setGroupLabel("");
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold text-foreground">{group.label}</h3>
                          <span className="text-sm text-muted-foreground">
                            ({group.speakers.length} speaker{group.speakers.length !== 1 ? 's' : ''})
                          </span>
                        </>
                      )}
                    </div>
                    
                    {editingGroup !== group.id && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingGroup(group.id);
                            setGroupLabel(group.label);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteGroupHandler(group.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Group Content */}
                  {expandedGroup === group.id && (
                    <div className="p-4 space-y-4">
                      {/* Add Speaker Form */}
                      <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          {editingSpeaker?.groupId === group.id ? 'Edit Speaker' : 'Add New Speaker'}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="speaker-name">Name *</Label>
                            <Input
                              id="speaker-name"
                              value={speakerName}
                              onChange={(e) => setSpeakerName(e.target.value)}
                              placeholder="Speaker name"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="speaker-designation">Designation</Label>
                            <Input
                              id="speaker-designation"
                              value={speakerDesignation}
                              onChange={(e) => setSpeakerDesignation(e.target.value)}
                              placeholder="Designation"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Label htmlFor="speaker-organization">Organization</Label>
                            <Input
                              id="speaker-organization"
                              value={speakerOrganization}
                              onChange={(e) => setSpeakerOrganization(e.target.value)}
                              placeholder="Organization"
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Label htmlFor="speaker-image">Image</Label>
                            <div className="flex gap-2">
                              <Input
                                id="speaker-image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="flex-1"
                              />
                              <Input
                                value={speakerImageUrl}
                                onChange={(e) => setSpeakerImageUrl(e.target.value)}
                                placeholder="Or enter image URL"
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
                        
                        <div className="flex gap-2">
                          {editingSpeaker?.groupId === group.id ? (
                            <>
                              <Button onClick={saveEditSpeaker}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                              </Button>
                              <Button variant="outline" onClick={cancelEditSpeaker}>
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button onClick={() => addSpeaker(group.id)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Add Speaker
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Speakers List */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">Speakers ({group.speakers.length})</h4>
                        {group.speakers.length === 0 ? (
                          <p className="text-muted-foreground text-sm">No speakers in this group yet.</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {group.speakers.map((speaker, index) => (
                              <div
                                key={index}
                                className="bg-background rounded-lg border border-border p-4 flex items-start gap-3"
                              >
                                <img
                                  src={speaker.image}
                                  alt={speaker.name}
                                  className="w-16 h-16 rounded-full object-cover border-2 border-border"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                                  }}
                                />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-foreground truncate">{speaker.name}</h5>
                                  {speaker.designation && (
                                    <p className="text-sm text-muted-foreground truncate">{speaker.designation}</p>
                                  )}
                                  {speaker.organization && (
                                    <p className="text-xs text-muted-foreground truncate">{speaker.organization}</p>
                                  )}
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startEditSpeaker(group.id, index)}
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteSpeaker(group.id, index)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SpeakersManager;

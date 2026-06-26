import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { allSpeakers as defaultSpeakers, type Speaker } from "@/lib/speakersData";
import { useAuth } from "@/context/useAuth";
import { fetchSpeakersData, type SpeakerGroup } from "@/lib/speakersApi";

const Speakers = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "All Speakers - EDU EXPO GLOBAL 2026";
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadSpeakers();
  }, []);

  const loadSpeakers = async () => {
    setIsLoading(true);
    try {
      // Try to load from API first
      const groups = await fetchSpeakersData();
      if (groups && groups.length > 0) {
        // Flatten all groups to get all speakers
        const allSpeakersFromApi = groups.flatMap(group => group.speakers);
        // If API has speakers, use them; otherwise merge with defaults
        if (allSpeakersFromApi.length > 0) {
          // Merge API speakers with default speakers (avoid duplicates by name)
          const apiSpeakerNames = new Set(allSpeakersFromApi.map(s => s.name));
          const additionalDefaultSpeakers = defaultSpeakers.filter(s => !apiSpeakerNames.has(s.name));
          setSpeakers([...allSpeakersFromApi, ...additionalDefaultSpeakers]);
        } else {
          setSpeakers(defaultSpeakers);
        }
      } else {
        // Fallback to default speakers
        setSpeakers(defaultSpeakers);
      }
    } catch (error) {
      console.error('Failed to load speakers from API, using default:', error);
      // Fallback to default speakers
      setSpeakers(defaultSpeakers);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen overflow-hidden bg-gradient-hero py-24">
        {/* Background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            {/* Back Button */}
            <Link to="/">
              <Button
                variant="ghost"
                className="mb-6 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                  Meet The Experts
                </span>
                {isAuthenticated ? (
                  <Link to="/admin/speakers">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Manage Speakers
                    </Button>
                  </Link>
                ) : (
                  <Link to="/admin/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Login to Add Speakers
                    </Button>
                  </Link>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                All Keynote{" "}
                <span className="text-gradient-secondary">Speakers</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Learn from industry pioneers and thought leaders shaping the future of education technology
              </p>
            </motion.div>

            {/* All Speakers Grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading speakers...</p>
              </div>
            ) : speakers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No speakers available yet.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {speakers.map((speaker, index) => (
                <motion.div
                  key={`${speaker.name}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div
                    className={`relative bg-card rounded-2xl border ${speaker.borderAccent} overflow-hidden shadow-card transition-all duration-500 hover:shadow-elevated`}
                  >
                    {/* Colorful accent background */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${speaker.accentColor} opacity-90`}
                    />

                    {/* Decorative shapes */}
                    <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute top-16 left-4 w-8 h-8 rounded-full bg-white/10 blur-lg" />

                    {/* Content */}
                    <div className="relative pt-12 pb-6 px-6">
                      {/* Profile Image */}
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-br ${speaker.accentColor} p-1`}
                        >
                          <div className="w-full h-full rounded-full overflow-hidden bg-card">
                            <img
                              src={speaker.image}
                              alt={speaker.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center">
                        <h3 className="font-display text-xl font-bold text-foreground mb-1">
                          {speaker.name}
                        </h3>
                        {(speaker.designation || speaker.organization) && (
                          <div className="text-muted-foreground text-sm mb-4">
                            {speaker.designation && <p>{speaker.designation}</p>}
                            {speaker.organization && <p>{speaker.organization}</p>}
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </motion.div>
                ))}
              </motion.div>
            )}

          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Speakers;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";
import { resolveMediaUrl, resolveMediaFallbackUrl } from "@/lib/mediaUrl";

interface LogoFile {
  name: string;
  path: string;
  type: "image" | "pdf" | "svg";
  tier: "gold" | "silver" | "k12" | "university" | "other";
}

const Partners = () => {
  const [logoFiles, setLogoFiles] = useState<LogoFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Our Partners - EduExpoGlobal";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadLogos();
  }, []);

  const loadLogos = async () => {
    // Main partners organized by tier
    const mainPartners: LogoFile[] = [
      // Gold Partners
      {
        name: "SCHOOL SERV (INDIA) SOLUTIONS PRIVATE LIMITED",
        path: "/logos/School Serv.jpg",
        type: "image",
        tier: "gold",
      },
      
      // Silver Partners
      {
        name: "MyClassboard Educational Solutions Private Limited",
        path: "/logos/MCB.jpg",
        type: "image",
        tier: "silver",
      },
      {
        name: "PEARSON INDIA EDUCATION SERVICES PRIVATE",
        path: "/logos/Pearson.jpg",
        type: "image",
        tier: "silver",
      },
      {
        name: "EVO11VE PRIVATE LIMITED",
        path: "/logos/Evo11ve.jpg",
        type: "image",
        tier: "silver",
      },
      {
        name: "RANKGURU TECHNOLOGY SOLUTIONS PRIVATE LIMITED",
        path: "/logos/Logic Logo_black - Prachi M.png",
        type: "image",
        tier: "silver",
      },
      {
        name: "PARAN PARA EDUCATION POLICY PRIVATE LIMITED",
        path: "/logos/paranpara.jpg",
        type: "image",
        tier: "silver",
      },

      // K12 Partners (no stall)
      {
        name: "Ryan Edunation (no stall)",
        path: "/logos/Ryan Edunation.jpg",
        type: "image",
        tier: "k12",
      },
      {
        name: "Possibility Edutech Pvt Ltd (no stall)",
        path: "/logos/possibility.JPG",
        type: "image",
        tier: "k12",
      },
      {
        name: "Altus Learning Pvt Ltd (no stall)",
        path: "/logos/Altus Learning Pvt Ltd.JPG",
        type: "image",
        tier: "k12",
      },
      
      // K12 Partners
      {
        name: "jubilee hills public school",
        path: "/logos/JHPS K12.jpg",
        type: "image",
        tier: "k12",
      },
      
      // University Partners
      {
        name: "Amrita Vishwa Vidyapeetham",
        path: "/logos/Amrita University.png",
        type: "image",
        tier: "university",
      },
    ];

    setLogoFiles(mainPartners);
    setLoading(false);
  };

  const getTierStyles = (tier: string) => {
    switch (tier) {
      case "gold":
        return {
          bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
          border: "border-amber-300/50 dark:border-amber-700/50",
          hover: "hover:border-amber-400 hover:shadow-amber-200/50 dark:hover:shadow-amber-900/20",
          badge: "bg-gradient-to-r from-amber-500 to-orange-500",
        };
      case "silver":
        return {
          bg: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
          border: "border-slate-300/50 dark:border-slate-700/50",
          hover: "hover:border-slate-400 hover:shadow-slate-200/50 dark:hover:shadow-slate-900/20",
          badge: "bg-gradient-to-r from-slate-400 to-slate-500",
        };
      case "k12":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
          border: "border-green-300/50 dark:border-green-700/50",
          hover: "hover:border-green-400 hover:shadow-green-200/50 dark:hover:shadow-green-900/20",
          badge: "bg-gradient-to-r from-green-500 to-emerald-500",
        };
      case "university":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
          border: "border-blue-300/50 dark:border-blue-700/50",
          hover: "hover:border-blue-400 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20",
          badge: "bg-gradient-to-r from-blue-500 to-indigo-500",
        };
      default:
        return {
          bg: "bg-card",
          border: "border-border",
          hover: "hover:border-primary/30",
          badge: "bg-primary",
        };
    }
  };

  const renderLogo = (logo: LogoFile, tier?: string) => {
    const styles = tier ? getTierStyles(tier) : getTierStyles("other");
    
    if (logo.type === "pdf") {
      return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center rounded-xl p-6 border-2 ${styles.bg} ${styles.border} ${styles.hover} transition-all duration-300`}>
          <FileText className="w-12 h-12 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground text-center mb-3 font-medium">{logo.name}</p>
          <a
            href={logo.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primary hover:underline font-semibold"
          >
            <Download className="w-4 h-4" />
            View PDF
          </a>
        </div>
      );
    }

    return (
      <div className={`relative w-full h-full flex items-center justify-center rounded-xl p-6 border-2 ${styles.bg} ${styles.border} ${styles.hover} transition-all duration-300 group`}>
        {tier && tier !== "other" && (
          <div className={`absolute -top-3 -right-3 px-3 py-1 ${styles.badge} text-white text-xs font-bold rounded-full shadow-lg z-10`}>
            {tier.toUpperCase()}
          </div>
        )}
        <img
          src={resolveMediaUrl(logo.path)}
          alt={logo.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.mediaFallbackTried !== "1") {
              img.dataset.mediaFallbackTried = "1";
              img.src = resolveMediaFallbackUrl(logo.path);
            } else {
              img.src = "/placeholder.svg";
            }
          }}
        />
      </div>
    );
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
            <div className="text-center mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Partners
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Trusted by <span className="text-gradient-primary">Industry Leaders</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Proudly supported by leading companies shaping the future of education technology
              </p>
            </div>


            {/* Logos by Tier */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading partners...</p>
              </div>
            ) : (
              <div className="space-y-20">
                {/* Gold Partners Section */}
                {logoFiles.filter((logo) => logo.tier === "gold").length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground">Gold Partner</h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base">Our premier partners</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                      {logoFiles
                        .filter((logo) => logo.tier === "gold")
                        .map((logo, index) => (
                          <motion.div
                            key={`gold-${logo.name}-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03, y: -6 }}
                            className="h-48"
                          >
                            {renderLogo(logo, "gold")}
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}

                {/* Silver Partners Section */}
                {logoFiles.filter((logo) => logo.tier === "silver").length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full" />
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground">Silver Partner</h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base">Our valued partners</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                      {logoFiles
                        .filter((logo) => logo.tier === "silver")
                        .map((logo, index) => (
                          <motion.div
                            key={`silver-${logo.name}-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{ scale: 1.03, y: -6 }}
                            className="h-44"
                          >
                            {renderLogo(logo, "silver")}
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}

                {/* K12 Partners Section */}
                {logoFiles.filter((logo) => logo.tier === "k12").length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground">K12 Partner</h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base">K-12 education partners</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {logoFiles
                        .filter((logo) => logo.tier === "k12")
                        .map((logo, index) => (
                          <motion.div
                            key={`k12-${logo.name}-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{ scale: 1.03, y: -6 }}
                            className="h-44"
                          >
                            {renderLogo(logo, "k12")}
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}

                {/* University Partners Section */}
                {logoFiles.filter((logo) => logo.tier === "university").length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="text-center mb-10">
                      <div className="inline-flex items-center gap-3 mb-4">
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground">University Partner</h3>
                        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base">Higher education partners</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {logoFiles
                        .filter((logo) => logo.tier === "university")
                        .map((logo, index) => (
                          <motion.div
                            key={`university-${logo.name}-${index}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                            whileHover={{ scale: 1.03, y: -6 }}
                            className="h-44"
                          >
                            {renderLogo(logo, "university")}
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Other Exhibitors Section */}
            {!loading && logoFiles.filter((logo) => logo.tier === "other").length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16"
              >
                <div className="text-center mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Other Exhibitors
                  </h2>
                  <div className="h-1 w-24 bg-gradient-primary mx-auto rounded-full" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {logoFiles
                    .filter((logo) => logo.tier === "other")
                    .map((logo, index) => (
                      <motion.div
                        key={`other-${logo.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="h-32"
                      >
                        {renderLogo(logo, "other")}
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

export default Partners;

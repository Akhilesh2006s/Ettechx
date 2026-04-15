import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { fetchSponsorsData, type Sponsor } from "@/lib/sponsorsApi";
import { resolveMediaUrl, resolveMediaFallbackUrl } from "@/lib/mediaUrl";

interface PartnerLogo {
  name: string;
  path: string;
  type: "image" | "pdf" | "svg";
  tier: "gold" | "silver" | "k12" | "university" | "media";
}

const normalizeTier = (tier: string): PartnerLogo["tier"] => {
  const value = tier.toLowerCase().replace(/[\s_-]+/g, "");
  if (value === "gold") return "gold";
  if (value === "silver") return "silver";
  if (value === "k12") return "k12";
  if (value === "university") return "university";
  if (value === "media" || value === "mediapartner") return "media";
  return "silver";
};

// Default partners (fallback)
const defaultPartners: PartnerLogo[] = [
  // Gold Partners
  {
    name: "SCHOOL SERV (INDIA) SOLUTIONS PRIVATE LIMITED",
    path: "/logos/School Serv.jpg",
    type: "image",
    tier: "gold",
  },

  // Silver Partners (ONLY using files from LOGO(s)/image)
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
    name: "PARAN PARA EDUCATION POLICY PRIVATE LIMITED",
    path: "/logos/paranpara.jpg",
    type: "image",
    tier: "silver",
  },

  // K12 Partners (no stall) - from attached image folder
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

  // K12 Partner
  {
    name: "jubilee hills public school",
    path: "/logos/JHPS K12.jpg",
    type: "image",
    tier: "k12",
  },

  // University Partner
  {
    name: "Amrita Vishwa Vidyapeetham",
    path: "/logos/Amrita University.png",
    type: "image",
    tier: "university",
  },
];

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
    case "media":
      return {
        bg: "bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20",
        border: "border-purple-300/50 dark:border-purple-700/50",
        hover: "hover:border-purple-400 hover:shadow-purple-200/50 dark:hover:shadow-purple-900/20",
        badge: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
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

const renderLogo = (partner: PartnerLogo) => {
  const styles = getTierStyles(partner.tier);
  
  if (partner.type === "pdf") {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center rounded-xl p-6 border-2 ${styles.bg} ${styles.border} ${styles.hover} transition-all duration-300`}>
        <FileText className="w-12 h-12 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground text-center mb-3 font-medium">{partner.name}</p>
        <a
          href={partner.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline font-semibold"
        >
          View PDF
        </a>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center rounded-xl p-6 border-2 ${styles.bg} ${styles.border} ${styles.hover} transition-all duration-300 group`}>
      <div className={`absolute -top-3 -right-3 px-3 py-1 ${styles.badge} text-white text-xs font-bold rounded-full shadow-lg z-10`}>
        {partner.tier.toUpperCase()}
      </div>
      <img
        src={resolveMediaUrl(partner.path)}
        alt={partner.name}
        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          const img = e.currentTarget;
          if (img.dataset.mediaFallbackTried !== "1") {
            img.dataset.mediaFallbackTried = "1";
            img.src = resolveMediaFallbackUrl(partner.path);
          } else {
            img.src = "/placeholder.svg";
          }
        }}
      />
    </div>
  );
};

const SponsorsSection = () => {
  const [partners, setPartners] = useState<PartnerLogo[]>(defaultPartners);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    setIsLoading(true);
    try {
      const apiSponsors = await fetchSponsorsData();
      if (apiSponsors && apiSponsors.length > 0) {
        // Convert API sponsors to PartnerLogo format
        const converted = apiSponsors.map(s => ({
          name: s.name,
          path: s.path,
          type: s.type,
          tier: normalizeTier(s.tier),
        }));
        // Merge with defaults (avoid duplicates by name)
        const apiNames = new Set(converted.map(p => p.name));
        const additionalDefaults = defaultPartners.filter(p => !apiNames.has(p.name));
        setPartners([...converted, ...additionalDefaults]);
      } else {
        setPartners(defaultPartners);
      }
    } catch (error) {
      console.error('Failed to load sponsors from API, using defaults:', error);
      setPartners(defaultPartners);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proudly supported by leading companies shaping the future of education technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="space-y-16">
            {/* Gold Partners Section */}
            {partners.filter((p) => p.tier === "gold").length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
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
                  {partners
                    .filter((p) => p.tier === "gold")
                    .map((partner, index) => (
                      <motion.div
                        key={`gold-${partner.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="h-48"
                      >
                        {renderLogo(partner)}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Silver Partners Section */}
            {partners.filter((p) => p.tier === "silver").length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
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
                  {partners
                    .filter((p) => p.tier === "silver")
                    .map((partner, index) => (
                      <motion.div
                        key={`silver-${partner.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="h-44"
                      >
                        {renderLogo(partner)}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* K12 Partners Section */}
            {partners.filter((p) => p.tier === "k12").length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
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
                  {partners
                    .filter((p) => p.tier === "k12")
                    .map((partner, index) => (
                      <motion.div
                        key={`k12-${partner.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="h-44"
                      >
                        {renderLogo(partner)}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* University Partners Section */}
            {partners.filter((p) => p.tier === "university").length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
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
                  {partners
                    .filter((p) => p.tier === "university")
                    .map((partner, index) => (
                      <motion.div
                        key={`university-${partner.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="h-44"
                      >
                        {renderLogo(partner)}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Media Partners Section */}
            {partners.filter((p) => p.tier === "media").length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full" />
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">Media Partner</h3>
                    <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full" />
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">Our media and ecosystem partners</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {partners
                    .filter((p) => p.tier === "media")
                    .map((partner, index) => (
                      <motion.div
                        key={`media-${partner.name}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="h-44"
                      >
                        {renderLogo(partner)}
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Note: Partners directory route is intentionally not linked here until it is implemented in App Router. */}
      </div>
    </section>
  );
};

export default SponsorsSection;

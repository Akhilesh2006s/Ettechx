import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";

interface PartnerLogo {
  name: string;
  path: string;
  type: "image" | "pdf" | "svg";
  tier: "gold" | "silver" | "k12" | "university";
}

const partners: PartnerLogo[] = [
  // Gold Partners
  { name: "SCHOOL SERV (INDIA) SOLUTIONS PRIVATE LIMITED", path: "/logos/Schoolserv_Logo - Vinod Kakumanu.png", type: "image", tier: "gold" },
  
  // Silver Partners
  { name: "MyClassboard Educational Solutions Private Limited", path: "/logos/My Envelope .zip - 2 - Mahaveer Uniforms.png", type: "image", tier: "silver" },
  { name: "PEARSON INDIA EDUCATION SERVICES PRIVATE", path: "/logos/PEARSON_LOGO_PURPLE_RGB - EEGPL INDIA.png", type: "image", tier: "silver" },
  { name: "EVO11VE PRIVATE LIMITED", path: "/logos/EZROOTS-MAIN-LOGO - No name - EZROOTS.png", type: "image", tier: "silver" },
  { name: "RANKGURU TECHNOLOGY SOLUTIONS PRIVATE LIMITED", path: "/logos/Logic Logo_black - Prachi M.png", type: "image", tier: "silver" },
  { name: "PARAN PARA EDUCATION POLICY PRIVATE LIMITED", path: "/logos/Primary Logo - Barbie Batra.jpg", type: "image", tier: "silver" },
  
  // K12 Partners
  { name: "Ryan Edunation", path: "/logos/ryan-group-logo_1628517995 - Sachin Gupta.png", type: "image", tier: "k12" },
  { name: "Possibility Edutech Pvt Ltd", path: "/logos/PrinceBoard - Pallav Singh.png", type: "image", tier: "k12" },
  { name: "Altus Learning Pvt Ltd", path: "/logos/Asliprep logo.png", type: "image", tier: "k12" },
  { name: "jubilee hills public school", path: "/logos/JHPS AD LOGO white - Sachin Gupta.png", type: "image", tier: "k12" },
  
  // University Partners
  { name: "Amrita Vishwa Vidyapeetham", path: "/logos/abhi creations logo - Abhi Creations.jpeg", type: "image", tier: "university" },
];

const renderLogo = (partner: PartnerLogo) => {
  if (partner.type === "pdf") {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg p-4">
        <FileText className="w-12 h-12 text-muted-foreground mb-2" />
        <p className="text-xs text-muted-foreground text-center mb-2 line-clamp-2">{partner.name}</p>
        <a
          href={partner.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View PDF
        </a>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors">
      <img
        src={partner.path}
        alt={partner.name}
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="flex flex-col items-center justify-center text-center p-4">
                <FileText class="w-8 h-8 text-muted-foreground mb-2" />
                <p class="text-xs text-muted-foreground">${partner.name}</p>
              </div>
            `;
          }
        }}
      />
    </div>
  );
};

const SponsorsSection = () => {
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Gold Partners Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
          >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2">Gold Partner</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
              </div>
              {partners
                .filter((p) => p.tier === "gold")
                .map((partner, index) => (
                  <motion.div
                    key={`gold-${partner.name}-${index}`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="h-40"
                  >
                    {renderLogo(partner)}
                  </motion.div>
                ))}
            </motion.div>

            {/* Silver Partners Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2">Silver Partner</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-slate-400 to-slate-500 mx-auto rounded-full" />
              </div>
              {partners
                .filter((p) => p.tier === "silver")
                .map((partner, index) => (
                  <motion.div
                    key={`silver-${partner.name}-${index}`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="h-40"
                  >
                    {renderLogo(partner)}
                  </motion.div>
                ))}
            </motion.div>

            {/* K12 Partners Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="space-y-4"
                  >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2">K12 Partner</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
                      </div>
              {partners
                .filter((p) => p.tier === "k12")
                .map((partner, index) => (
                  <motion.div
                    key={`k12-${partner.name}-${index}`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="h-40"
                  >
                    {renderLogo(partner)}
                  </motion.div>
                ))}
            </motion.div>

            {/* University Partners Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2">University Partner</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
                    </div>
              {partners
                .filter((p) => p.tier === "university")
                .map((partner, index) => (
                  <motion.div
                    key={`university-${partner.name}-${index}`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="h-40"
                  >
                    {renderLogo(partner)}
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Tier Labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <span className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold">
            Gold Partner
          </span>
          <span className="px-6 py-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-full text-sm font-semibold">
            Silver Partner
          </span>
          <span className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
            K12 Partner
          </span>
          <span className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
            University Partner
          </span>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link to="/partners">
            <Button variant="hero" size="lg" className="group">
              View All Partners
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;

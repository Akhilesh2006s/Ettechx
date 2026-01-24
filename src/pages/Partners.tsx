import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download } from "lucide-react";

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
    document.title = "Our Partners - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    loadLogos();
  }, []);

  const loadLogos = async () => {
    // Main partners organized by tier
    const mainPartners: LogoFile[] = [
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

      // Other exhibitors - remaining logos
      const otherExhibitors: LogoFile[] = [
        { name: "Xperientials", path: "/logos/Xperientials LOGO-cl - Sai Kiran.jpg", type: "image", tier: "other" },
        { name: "WOL3D", path: "/logos/WOL3D Logo Branding Main_File - Marketing WOL3D.png", type: "image", tier: "other" },
      { name: "VELOCIITY", path: "/logos/VELOCIITY LOGO - KAVERI RAMAN.jpeg", type: "image", tier: "other" },
      { name: "Utsaah Learning", path: "/logos/Utsaah Learning Pvt Ltd - Utsaah Learning Private Limited.png", type: "image", tier: "other" },
        { name: "UNICARD", path: "/logos/UNICARD_LOGO-1 - Sachin Gupta.png", type: "image", tier: "other" },
        { name: "TRUCOLORS - PREPSTER", path: "/logos/TRUCOLORS - PREPSTER LOGO - Process Coordinator.png", type: "image", tier: "other" },
        { name: "TM logo", path: "/logos/TM logo - Sain Prbs.jpg", type: "image", tier: "other" },
        { name: "The Edu Bulletin", path: "/logos/The Edu Bulletin Logo - Tanmay - S D Promo.png", type: "image", tier: "other" },
      { name: "Tecvivid", path: "/logos/Tecvivid Logo - Final-04 - Account Tecvivid.png", type: "image", tier: "other" },
      { name: "Teckybot", path: "/logos/Teckybot TM - tecky bot.png", type: "image", tier: "other" },
      { name: "Tech Ocean", path: "/logos/Tech Ocean Logo - Tech Ocean.png", type: "image", tier: "other" },
      { name: "Takyon-360", path: "/logos/Takyon-360-Logo - Linda R.png", type: "image", tier: "other" },
      { name: "Suraasa (Day)", path: "/logos/Suraasa Logo - Primary (Day) - Mischelle Tressa Denniz.jpg", type: "image", tier: "other" },
      { name: "stogo", path: "/logos/stogo_logo-01 - Linda R.png", type: "image", tier: "other" },
      { name: "STEMx INDIA", path: "/logos/STEMx  INDIA-min - Gajula Umaparvathi.png", type: "image", tier: "other" },
        { name: "SL Consultancy", path: "/logos/SL Consultancy-2 - prakash gadipa.png", type: "image", tier: "other" },
      { name: "Skolors", path: "/logos/Skolors Logo 1000 px - sandeep kalangi.png", type: "image", tier: "other" },
      { name: "shubhanga", path: "/logos/shubhanga Main Logo - Rahul Borawane.png", type: "image", tier: "other" },
      { name: "Seth Jaipuria Schools", path: "/logos/Seth Jaipuria Schools_Logo (1) - EEGPL INDIA.jpg", type: "image", tier: "other" },
        { name: "Sephora", path: "/logos/Sephora logo_page-0001 - Sephora Info HR.png", type: "image", tier: "other" },
        { name: "SCHOOLFIRST", path: "/logos/SCHOOLFIRST LOGO - Ranjith Padidala.png", type: "image", tier: "other" },
      { name: "S LOGO", path: "/logos/S LOGO - sandeep kalangi.png", type: "image", tier: "other" },
      { name: "Red Flags", path: "/logos/Red Flags - Pallav Singh.png", type: "image", tier: "other" },
        { name: "PRAHALAD ID CARDS", path: "/logos/PRAHALAD ID CARDS LOGO - Prahalad ID Cards.png", type: "image", tier: "other" },
      { name: "Onyx", path: "/logos/Onyx - Pallav Singh.svg", type: "svg", tier: "other" },
      { name: "NT LOGO", path: "/logos/NT LOGO - MURALI KRISHNA SUNKARA.jpeg", type: "image", tier: "other" },
      { name: "NovoWellness", path: "/logos/NovoWellness_logo - Vathsal Vuppala.png", type: "image", tier: "other" },
      { name: "Nischals", path: "/logos/Nischals - Pallav Singh.avif", type: "image", tier: "other" },
      { name: "Neotouch", path: "/logos/Neotouch Logo png - Durai Kandasamy.png", type: "image", tier: "other" },
      { name: "navars", path: "/logos/navars logo (1) - accounts Navars.png", type: "image", tier: "other" },
      { name: "MCB LOGO", path: "/logos/MCB LOGO - Ashok G.png", type: "image", tier: "other" },
      { name: "MAX-PRINT", path: "/logos/MAX-PRINT-LOGO - MAX PRINT TECH.jpg", type: "image", tier: "other" },
      { name: "Mapinger", path: "/logos/Mapinger - keerthi latha Chitturi.png", type: "image", tier: "other" },
        { name: "MAGIC MOON PUBLISHERS", path: "/logos/MAGIC MOON PUBLISHERS PRIVATE LIMITED - Magic Moon Publishers Private Limited.png", type: "image", tier: "other" },
      { name: "Logo_full", path: "/logos/Logo_full - EEGPL INDIA - Sachin Gupta.png", type: "image", tier: "other" },
        { name: "logo3X2-5", path: "/logos/logo3X2-5 - Pankajkumar Dubey.png", type: "image", tier: "other" },
      { name: "logo-dark", path: "/logos/logo-dark - Pallav Singh.png", type: "image", tier: "other" },
      { name: "Logo V3", path: "/logos/Logo V3 - Satish Sawra.png", type: "image", tier: "other" },
      { name: "Logo V1", path: "/logos/Logo V1 - Satish Sawra.png", type: "image", tier: "other" },
      { name: "logo", path: "/logos/logo - Sachin Gupta.png", type: "image", tier: "other" },
        { name: "logo harshavardhan", path: "/logos/logo - harshavardhan mikebags.png", type: "image", tier: "other" },
      { name: "LoGo", path: "/logos/LoGo - chandrika K.jpeg", type: "image", tier: "other" },
      { name: "Logo Anushree", path: "/logos/Logo - Anushree Flygraduate.svg", type: "svg", tier: "other" },
      { name: "Learn FROM Maps", path: "/logos/Learn FROM Maps-14 - Manohar Damaraju.png", type: "image", tier: "other" },
      { name: "Lalitha & CO", path: "/logos/Lalitha & CO - Pallav Singh.webp", type: "image", tier: "other" },
      { name: "Kalorex", path: "/logos/Kalorex Logo - EEGPL INDIA.png", type: "image", tier: "other" },
      { name: "IMG_6040", path: "/logos/IMG_6040 - Edu Furnitures.png", type: "image", tier: "other" },
      { name: "Ingenio", path: "/logos/Ingenio_logo_edit_2021 08 13_final_WHITE - Ingenio Studio.png", type: "image", tier: "other" },
      { name: "IGNITOR Learning", path: "/logos/IGNITOR Learning - Mathew Vipin Thomas.png", type: "image", tier: "other" },
      { name: "ICT360", path: "/logos/ICT360 - MOHAMMED HASAN QURESHI.png", type: "image", tier: "other" },
      { name: "HB logo", path: "/logos/HB logo - Sai Kiran.jpg", type: "image", tier: "other" },
        { name: "Gin Final Logo", path: "/logos/Gin Final Logo New APP API ERP - lucky K.png", type: "image", tier: "other" },
      { name: "grademeai", path: "/logos/grademeailogo - snehith grademe-ai.png", type: "image", tier: "other" },
      { name: "FotonVR", path: "/logos/FotonVR logo - Rajvi Thakkar.png", type: "image", tier: "other" },
      { name: "exposoft", path: "/logos/exposoft-logo-orange - Linda R.png", type: "image", tier: "other" },
      { name: "Etute", path: "/logos/Etute Logo_company - Ashwith thimmaiah.png", type: "image", tier: "other" },
      { name: "EP LOGO", path: "/logos/EP LOGO - MURALI KRISHNA SUNKARA.png", type: "image", tier: "other" },
      { name: "eltrive", path: "/logos/eltrive logo 20 - varapula bhargavi.png", type: "image", tier: "other" },
      { name: "Eduten", path: "/logos/Eduten logo vertical - Avan Goel.jpg", type: "image", tier: "other" },
      { name: "EduTech Era", path: "/logos/EduTech Era logo _ India - Info Edutech Era.png", type: "image", tier: "other" },
      { name: "EduFun", path: "/logos/EduFun_logo - Sachin Gupta.png", type: "image", tier: "other" },
      { name: "EDlogo", path: "/logos/EDlogo - EDMISSIONS WORLD PVT LTD.jpg", type: "image", tier: "other" },
      { name: "Dynos", path: "/logos/Dynos_logo_blue - ContentTeam Mail.png", type: "image", tier: "other" },
      { name: "download", path: "/logos/download - Sachin Gupta.png", type: "image", tier: "other" },
        { name: "DOC-20250520-WA0018", path: "/logos/DOC-20250520-WA0018. - TUMMALA VEENA.png", type: "image", tier: "other" },
      { name: "CuriousEd", path: "/logos/CuriousEd_LOGO - curioused.png", type: "image", tier: "other" },
        { name: "coschool", path: "/logos/coschool-pdf - Jaswanth Valiveti.png", type: "image", tier: "other" },
      { name: "Central books", path: "/logos/Central books logo - EEGPL INDIA.png", type: "image", tier: "other" },
      { name: "cognospace", path: "/logos/cognospace-logo-PNG (1) (1) - Operations CognoSpace.png", type: "image", tier: "other" },
        { name: "cbs hub", path: "/logos/cbs hub central books 3 logos.png", type: "image", tier: "other" },
      { name: "caprics", path: "/logos/caprics_New_Logo_2025 - Bavithra.png", type: "image", tier: "other" },
        { name: "CANON", path: "/logos/CANON LOGO - Sandeep Reddy.png", type: "image", tier: "other" },
      { name: "BLUE AND GRAY LOGO", path: "/logos/BLUE AND GRAY LOGO - Alok.png", type: "image", tier: "other" },
        { name: "ai-ready-school", path: "/logos/ai-ready-school - Chiranjeevi Maddala.png", type: "image", tier: "other" },
        { name: "alpaks", path: "/logos/alpaks logo - Alpaks Kids World.png", type: "image", tier: "other" },
      { name: "46. EDUTEN INDIA", path: "/logos/46. EDUTEN INDIA - Sachin Gupta.png", type: "image", tier: "other" },
    ];

    setLogoFiles([...mainPartners, ...otherExhibitors]);
    setLoading(false);
  };

  const renderLogo = (logo: LogoFile) => {
    if (logo.type === "pdf") {
      return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg p-4">
          <FileText className="w-12 h-12 text-muted-foreground mb-2" />
          <p className="text-xs text-muted-foreground text-center mb-2">{logo.name}</p>
          <a
            href={logo.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Download className="w-3 h-3" />
            View PDF
          </a>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full flex items-center justify-center bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-colors">
        <img
          src={logo.path}
          alt={logo.name}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center p-4">
                  <FileText class="w-8 h-8 text-muted-foreground mb-2" />
                  <p class="text-xs text-muted-foreground">${logo.name}</p>
                </div>
              `;
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

            {/* Tier Labels */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
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
            </div>

            {/* Logos by Tier */}
            {loading ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading partners...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Gold Partners Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Gold Partner</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {logoFiles
                      .filter((logo) => logo.tier === "gold")
                      .map((logo, index) => (
                        <motion.div
                          key={`gold-${logo.name}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="h-40"
                        >
                          {renderLogo(logo)}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>

                {/* Silver Partners Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">Silver Partner</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-slate-400 to-slate-500 mx-auto rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {logoFiles
                      .filter((logo) => logo.tier === "silver")
                      .map((logo, index) => (
                        <motion.div
                          key={`silver-${logo.name}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="h-40"
                        >
                          {renderLogo(logo)}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>

                {/* K12 Partners Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">K12 Partner</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {logoFiles
                      .filter((logo) => logo.tier === "k12")
                      .map((logo, index) => (
                        <motion.div
                          key={`k12-${logo.name}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="h-40"
                        >
                          {renderLogo(logo)}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>

                {/* University Partners Column */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">University Partner</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full" />
                  </div>
                  <div className="space-y-4">
                    {logoFiles
                      .filter((logo) => logo.tier === "university")
                      .map((logo, index) => (
                        <motion.div
                          key={`university-${logo.name}-${index}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -4 }}
                          className="h-40"
                        >
                          {renderLogo(logo)}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
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
                        {renderLogo(logo)}
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

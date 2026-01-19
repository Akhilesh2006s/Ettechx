import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Store, Users, Calendar, MapPin, Package } from "lucide-react";
import expoImage from "@/assets/events/expo-image.jpg";

const Expo = () => {
  useEffect(() => {
    document.title = "Expo - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const expoHighlights = [
    { title: "50+ Exhibitors", description: "Leading EdTech companies showcasing innovations" },
    { title: "Product Launches", description: "Be the first to see cutting-edge solutions" },
    { title: "Live Demos", description: "Experience products and technologies firsthand" },
    { title: "B2B Networking", description: "Connect with suppliers and partners" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-secondary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/8 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
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

            {/* Hero Section */}
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-card border border-border shadow-card relative overflow-hidden mb-12">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-secondary to-gold" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-gold to-secondary flex items-center justify-center mb-6"
                  >
                    <Store className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    <span className="text-gradient-secondary">Expo</span> Exhibition
                  </h1>
                  <p className="text-muted-foreground text-lg mb-6">
                    Explore cutting-edge EdTech products and solutions from leading innovators. 
                    Discover the latest technologies transforming education.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-gold" />
                      <span>March 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-gold" />
                      <span>New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-gold" />
                      <span>5000+ Visitors</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/register">
                      <Button variant="glow" size="lg" className="group">
                        Visit Expo
                        <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/exhibitor">
                      <Button variant="heroOutline" size="lg">
                        Become Exhibitor
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="w-full md:w-96 h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={expoImage}
                    alt="Expo Exhibition"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Expo Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Expo Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {expoHighlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {highlight.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-gold/10 to-secondary/10 border border-gold/20"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Store className="w-6 h-6 text-gold" />
                What to Expect
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span>Interactive product demonstrations and showcases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span>Exclusive product launches and announcements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span>Direct access to EdTech solution providers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold mt-1">•</span>
                  <span>Networking opportunities with industry leaders</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Expo;

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, MapPin, Users, Award, Mic2, Wrench, Store, ArrowRight } from "lucide-react";

const AutumnConference = () => {
  useEffect(() => {
    document.title = "Et Tech X Conference - Autumn Edition - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const features = [
    { icon: Award, title: "Awards Gala", description: "Celebrating excellence in EdTech achievements" },
    { icon: Mic2, title: "Expert Panels", description: "Deep-dive discussions with industry leaders" },
    { icon: Wrench, title: "Masterclasses", description: "Advanced training and skill development" },
    { icon: Store, title: "Exhibition", description: "Showcase of cutting-edge EdTech products" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen overflow-hidden bg-gradient-hero py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-gold/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/8 blur-3xl" />

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
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-secondary via-coral to-gold" />
              
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 mb-6">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-sm font-semibold text-secondary">
                    Autumn Edition
                  </span>
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Et Tech X <span className="text-gradient-secondary">Conference</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-6">
                  Culminate the year with awards, exhibitions, and future-forward discussions on education technology.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="font-medium">September 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="font-medium">Mumbai, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-secondary" />
                    <span className="font-medium">5000+ Attendees</span>
                  </div>
                </div>
                
                <Link to="/register">
                  <Button variant="glow" size="lg" className="group">
                    Register for Autumn Conference
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Event Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {feature.description}
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
              className="p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-gold/10 border border-secondary/20"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Why Attend Autumn Conference?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Join 5000+ education leaders, innovators, and policymakers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Attend prestigious awards ceremony recognizing EdTech excellence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Participate in masterclasses and advanced training programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Explore the largest EdTech exhibition in India</span>
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

export default AutumnConference;

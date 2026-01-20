import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import FloatingShapes from "./FloatingShapes";
import SocialLinks from "./SocialLinks";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Users, value: "50+", label: "EdTech Exhibitors", color: "primary" },
    { icon: Calendar, value: "2", label: "Annual Events", color: "secondary" },
    { icon: MapPin, value: "10+", label: "Cities Covered", color: "accent" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <FloatingShapes />
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Logo/Brand at Top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3">
              <span className="text-foreground">ET TECH</span>{" "}
              <span className="text-gradient-primary">X</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-medium">
              Educational and Training Resources & Tech Expo
            </p>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">
              India's Leading Educational Expo
            </span>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-4xl mb-10"
          >
            {/* Decorative elements behind image */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-full h-full rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-sm" />
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full rounded-2xl md:rounded-3xl bg-gradient-to-br from-accent/20 to-gold/20 blur-sm" />
            
            {/* Main Image Container */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-border/50">
              <img
                src={heroImage}
                alt="EdTech innovation showcasing students and professionals using advanced learning technology with VR headsets and digital displays"
                className="w-full h-auto object-cover max-h-[280px] sm:max-h-[350px] md:max-h-[450px] lg:max-h-[500px]"
                loading="eager"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              
              {/* Floating badge on image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 p-3 md:p-4 rounded-lg md:rounded-xl glass-strong"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Next Event</p>
                    <p className="text-xs text-muted-foreground">March 2025, New Delhi</p>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-accent flex items-center justify-center">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-accent-foreground" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating stats card - Desktop only */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -left-4 lg:-left-8 top-1/4 p-3 md:p-4 rounded-xl bg-card border border-border shadow-card hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-display text-base md:text-lg font-bold text-secondary">5000+</p>
                  <p className="text-xs text-muted-foreground">Attendees</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card - Right side Desktop only */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -right-4 lg:-right-8 top-1/3 p-3 md:p-4 rounded-xl bg-card border border-border shadow-card hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-display text-base md:text-lg font-bold text-primary">10+</p>
                  <p className="text-xs text-muted-foreground">Cities</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium mb-6"
          >
            Shaping the Future of Learning
          </motion.h2>

          {/* Social Links */}
          <SocialLinks />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Join the premier destination for EdTech innovation featuring world-class 
            <span className="text-secondary"> Awards</span>,
            <span className="text-primary"> Conferences</span>,
            <span className="text-accent"> Workshops</span>, and
            <span className="text-gold"> Expo</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/register">
            <Button variant="hero" size="xl" className="group">
              Register Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            </Link>
            <Link to="/exhibitor">
            <Button variant="heroOutline" size="xl">
                Become an Exhibitor
            </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  stat.color === 'primary' ? 'bg-primary/10' : 
                  stat.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10'
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === 'primary' ? 'text-primary' : 
                    stat.color === 'secondary' ? 'text-secondary' : 'text-accent'
                  }`} />
                </div>
                <div className="text-left">
                  <div className={`font-display text-2xl font-bold ${
                    stat.color === 'primary' ? 'text-primary' : 
                    stat.color === 'secondary' ? 'text-secondary' : 'text-accent'
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

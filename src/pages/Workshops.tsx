import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Wrench, Users, Calendar, MapPin, BookOpen } from "lucide-react";
import workshopsImage from "@/assets/events/workshops-image.jpg";

const Workshops = () => {
  useEffect(() => {
    document.title = "Workshops - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const workshops = [
    { title: "VR/AR in Classroom", description: "Hands-on experience with virtual and augmented reality tools" },
    { title: "AI-Powered Learning", description: "Building intelligent learning systems and platforms" },
    { title: "Gamification Strategies", description: "Creating engaging educational games and activities" },
    { title: "Data Analytics for Education", description: "Using data to improve learning outcomes" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-teal/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-3xl" />

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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-teal to-accent" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-teal flex items-center justify-center mb-6"
                  >
                    <Wrench className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    <span className="text-gradient-accent">Workshops</span>
                  </h1>
                  <p className="text-muted-foreground text-lg mb-6">
                    Hands-on learning experiences to master the latest educational technologies. 
                    Learn by doing with expert-led interactive sessions.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-accent" />
                      <span>March 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span>New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-accent" />
                      <span>Limited Seats</span>
                    </div>
                  </div>
                  
                  <Link to="/register">
                    <Button variant="accent" size="lg" className="group">
                      Register for Workshops
                      <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className="w-full md:w-96 h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={workshopsImage}
                    alt="Workshops"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Workshop List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Available Workshops
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workshops.map((workshop, index) => (
                  <motion.div
                    key={workshop.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {workshop.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {workshop.description}
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
              className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-teal/10 border border-accent/20"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Wrench className="w-6 h-6 text-accent" />
                Workshop Benefits
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Interactive, hands-on learning experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Small group sessions for personalized attention</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Take home practical skills and knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">•</span>
                  <span>Certificates of completion</span>
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

export default Workshops;

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Mic2, Users, Calendar, MapPin, Clock } from "lucide-react";
import conferenceImage from "@/assets/events/conference-image.jpg";

const Conference = () => {
  useEffect(() => {
    document.title = "Conference - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sessions = [
    { title: "Future of AI in Education", time: "10:00 AM - 11:30 AM" },
    { title: "Digital Transformation in Schools", time: "12:00 PM - 1:30 PM" },
    { title: "EdTech Investment Trends", time: "2:30 PM - 4:00 PM" },
    { title: "Global Education Policies", time: "4:30 PM - 6:00 PM" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-electric/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />

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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-electric to-primary" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-electric flex items-center justify-center mb-6"
                  >
                    <Mic2 className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    <span className="text-gradient-primary">Conference</span> Sessions
                  </h1>
                  <p className="text-muted-foreground text-lg mb-6">
                    Thought leadership sessions featuring global EdTech experts and industry pioneers. 
                    Gain insights from the brightest minds shaping the future of education technology.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>March 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span>2000+ Attendees</span>
                    </div>
                  </div>
                  
                  <Link to="/register">
                    <Button variant="hero" size="lg" className="group">
                      Register for Conference
                      <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className="w-full md:w-96 h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={conferenceImage}
                    alt="Conference Sessions"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Session Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Conference Schedule
              </h2>
              <div className="space-y-4">
                {sessions.map((session, index) => (
                  <motion.div
                    key={session.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-foreground mb-1">
                        {session.title}
                      </h3>
                      <p className="text-muted-foreground">{session.time}</p>
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
              className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-electric/10 border border-primary/20"
            >
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" />
                Conference Highlights
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Keynote speeches from global EdTech leaders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Panel discussions on emerging trends and challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Networking sessions with industry experts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Q&A sessions with thought leaders</span>
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

export default Conference;

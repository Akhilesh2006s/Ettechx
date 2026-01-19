import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Award, Trophy, Star, Users, Calendar, MapPin } from "lucide-react";
import awardsImage from "@/assets/events/awards-image.jpg";

const Awards = () => {
  useEffect(() => {
    document.title = "Awards - Et Tech X";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const awardCategories = [
    { name: "Innovation in EdTech", description: "Recognizing groundbreaking technological solutions" },
    { name: "Excellence in Teaching", description: "Celebrating outstanding educators and teaching methods" },
    { name: "Student Achievement", description: "Honoring exceptional student accomplishments" },
    { name: "Institutional Excellence", description: "Acknowledging outstanding educational institutions" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero py-24">
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-gold to-secondary" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-gold flex items-center justify-center mb-6"
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                    <span className="text-gradient-secondary">Awards</span> Ceremony
                  </h1>
                  <p className="text-muted-foreground text-lg mb-6">
                    Celebrating excellence and innovation in educational technology with prestigious recognition. 
                    Join us in honoring the trailblazers shaping the future of education.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <span>March 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-secondary" />
                      <span>New Delhi</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-secondary" />
                      <span>500+ Attendees</span>
                    </div>
                  </div>
                  
                  <Link to="/register">
                    <Button variant="hero" size="lg" className="group">
                      Register for Awards
                      <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className="w-full md:w-96 h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={awardsImage}
                    alt="Awards Ceremony"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Award Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-center">
                Award Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awardCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-foreground mb-2">
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.description}
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
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Star className="w-6 h-6 text-secondary" />
                Event Highlights
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Prestigious award categories recognizing innovation and excellence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Networking opportunities with industry leaders and award winners</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Gala dinner and celebration ceremony</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-secondary mt-1">•</span>
                  <span>Media coverage and recognition across EdTech platforms</span>
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

export default Awards;

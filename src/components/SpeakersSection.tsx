import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";
import speaker1 from "@/assets/speakers/speaker-1.jpg";
import speaker2 from "@/assets/speakers/speaker-2.jpg";
import speaker3 from "@/assets/speakers/speaker-3.jpg";
import speaker4 from "@/assets/speakers/speaker-4.jpg";
import speaker5 from "@/assets/speakers/speaker-5.jpg";
import speaker6 from "@/assets/speakers/speaker-6.jpg";

const SpeakersSection = () => {
  const speakers = [
    {
      name: "Rajesh Sharma",
      title: "CEO, EduNext Technologies",
      image: speaker1,
      accentColor: "from-primary to-deep-purple",
      bgAccent: "bg-primary/10",
      borderAccent: "border-primary/30",
    },
    {
      name: "Priya Menon",
      title: "Chief Learning Officer, TechEd India",
      image: speaker2,
      accentColor: "from-secondary to-gold",
      bgAccent: "bg-secondary/10",
      borderAccent: "border-secondary/30",
    },
    {
      name: "Vikram Patel",
      title: "Director, National Education Policy",
      image: speaker3,
      accentColor: "from-accent to-teal",
      bgAccent: "bg-accent/10",
      borderAccent: "border-accent/30",
    },
    {
      name: "Ananya Krishnan",
      title: "Founder, LearnSmart AI",
      image: speaker4,
      accentColor: "from-deep-purple to-primary",
      bgAccent: "bg-deep-purple/10",
      borderAccent: "border-deep-purple/30",
    },
    {
      name: "Dr. Suresh Nair",
      title: "Innovation Head, IIT Delhi",
      image: speaker5,
      accentColor: "from-gold to-secondary",
      bgAccent: "bg-gold/10",
      borderAccent: "border-gold/30",
    },
    {
      name: "Dr. Kavitha Rao",
      title: "Education Policy Advisor, MHRD",
      image: speaker6,
      accentColor: "from-teal to-accent",
      bgAccent: "bg-teal/10",
      borderAccent: "border-teal/30",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="speakers" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Meet The Experts
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Keynote{" "}
            <span className="text-gradient-secondary">Speakers</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn from industry pioneers and thought leaders shaping the future of education technology
          </p>
        </motion.div>

        {/* Speakers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {speakers.map((speaker) => (
            <motion.div
              key={speaker.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className={`relative bg-card rounded-2xl border ${speaker.borderAccent} overflow-hidden shadow-card transition-all duration-500 hover:shadow-elevated`}>
                {/* Colorful accent background */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${speaker.accentColor} opacity-90`} />
                
                {/* Decorative shapes */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                <div className="absolute top-16 left-4 w-8 h-8 rounded-full bg-white/10 blur-lg" />

                {/* Content */}
                <div className="relative pt-16 pb-6 px-6">
                  {/* Profile Image */}
                  <div className="relative w-28 h-28 mx-auto mb-5">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${speaker.accentColor} p-1`}>
                      <div className="w-full h-full rounded-full overflow-hidden bg-card">
                        <img
                          src={speaker.image}
                          alt={speaker.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {speaker.title}
                    </p>

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      <button className={`w-9 h-9 rounded-full ${speaker.bgAccent} flex items-center justify-center transition-all duration-300 hover:scale-110`}>
                        <Linkedin className="w-4 h-4 text-foreground/70" />
                      </button>
                      <button className={`w-9 h-9 rounded-full ${speaker.bgAccent} flex items-center justify-center transition-all duration-300 hover:scale-110`}>
                        <Twitter className="w-4 h-4 text-foreground/70" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            View All Speakers
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpeakersSection;

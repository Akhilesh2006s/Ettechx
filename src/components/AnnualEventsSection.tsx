import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const event = {
  season: "7th Edition",
  title: "EDU EXPO GLOBAL 2026",
  date: "22, 23 September 2026",
  location: "Yashobhoomi, Dwaraka, New Delhi",
  description:
    "Join the 7th Edition EDU EXPO GLOBAL 2026 at Yashobhoomi, Dwaraka, New Delhi for two power-packed days of awards, exhibitions, and future-forward discussions on education technology.",
  gradient: "from-secondary via-coral to-gold",
  accentColor: "secondary",
  link: "/conference",
};

const AnnualEventsSection = () => {
  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-gradient-to-b from-accent/5 via-background to-primary/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Event Calendar
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            <span className="text-primary">One</span> Event,{" "}
            <span className="text-secondary">Endless</span>{" "}
            <span className="text-accent">Possibilities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mark your calendar for India&apos;s most anticipated EdTech gathering
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="group relative"
          >
            <Link to={event.link} className="block h-full">
              <div className="relative h-full p-8 md:p-10 rounded-3xl bg-gradient-card border border-border overflow-hidden shadow-card cursor-pointer">
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${event.gradient}`} />

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-secondary/10">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-secondary" />
                  <span className="text-sm font-semibold text-secondary">{event.season}</span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-gradient-primary transition-all duration-300">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-6 mb-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-6">{event.description}</p>

                <div className="flex items-center gap-2 font-semibold text-secondary group-hover:gap-3 transition-all duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>

                <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${event.gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AnnualEventsSection;

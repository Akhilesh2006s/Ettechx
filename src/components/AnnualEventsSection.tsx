import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

const AnnualEventsSection = () => {
  const events = [
    {
      id: 1,
      season: "Spring Edition",
      title: "ET TECH X",
      date: "February 2026",
      location: "Kathmandu, Nepal (Tentative)",
      description:
        "Kickstart the year with ET TECH X in Kathmandu, Nepal (tentative), bringing together EdTech leaders and innovators from across the region.",
      gradient: "from-primary via-electric to-accent",
      accentColor: "primary",
      link: "/spring-summit",
    },
    {
      id: 2,
      season: "Autumn Edition",
      title: "ET TECH X",
      date: "September 22, 23, 24",
      location: "New Delhi, India",
      description:
        "Join ET TECH X in New Delhi for three power-packed days of awards, exhibitions, and future-forward discussions on education technology.",
      gradient: "from-secondary via-coral to-gold",
      accentColor: "secondary",
      link: "/autumn-conference",
    },
  ];

  return (
    <section id="schedule" className="py-24 relative overflow-hidden bg-gradient-to-b from-accent/5 via-background to-primary/5">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

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
            Annual Calendar
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            <span className="text-primary">Two</span> Events,{" "}
            <span className="text-secondary">Endless</span>{" "}
            <span className="text-accent">Possibilities</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mark your calendars for India's most anticipated EdTech gatherings
          </p>
        </motion.div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <Link to={event.link} className="block h-full">
              {/* Card */}
                <div className="relative h-full p-8 md:p-10 rounded-3xl bg-gradient-card border border-border overflow-hidden shadow-card cursor-pointer">
                {/* Gradient accent bar */}
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${event.gradient}`} />

                {/* Season badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                  event.accentColor === "primary" ? "bg-primary/10" : "bg-secondary/10"
                }`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    event.accentColor === "primary" ? "bg-primary" : "bg-secondary"
                  }`} />
                  <span className={`text-sm font-semibold ${
                    event.accentColor === "primary" ? "text-primary" : "text-secondary"
                  }`}>
                    {event.season}
                  </span>
                </div>

                {/* Event title */}
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-gradient-primary transition-all duration-300">
                  {event.title}
                </h3>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-6 mb-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-5 h-5 ${
                      event.accentColor === "primary" ? "text-primary" : "text-secondary"
                    }`} />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-5 h-5 ${
                      event.accentColor === "primary" ? "text-primary" : "text-secondary"
                    }`} />
                    <span className="font-medium">{event.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* CTA Text */}
                <div className={`flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300 ${
                  event.accentColor === "primary" ? "text-primary" : "text-secondary"
                }`}>
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Background decoration */}
                <div className={`absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br ${event.gradient} opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnualEventsSection;

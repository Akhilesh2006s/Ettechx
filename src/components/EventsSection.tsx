import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Mic2, Wrench, Store } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      icon: Award,
      title: "Awards",
      description: "Celebrating excellence and innovation in educational technology with prestigious recognition.",
      bgColor: "bg-secondary/10",
      iconBg: "bg-gradient-to-br from-secondary to-gold",
      textColor: "text-secondary",
      hoverBorder: "hover:border-secondary/40",
      link: "/awards",
    },
    {
      icon: Mic2,
      title: "Conference",
      description: "Thought leadership sessions featuring global EdTech experts and industry pioneers.",
      bgColor: "bg-primary/10",
      iconBg: "bg-gradient-to-br from-primary to-electric",
      textColor: "text-primary",
      hoverBorder: "hover:border-primary/40",
      link: "/conference",
    },
    {
      icon: Wrench,
      title: "Workshops",
      description: "Hands-on learning experiences to master the latest educational technologies.",
      bgColor: "bg-accent/10",
      iconBg: "bg-gradient-to-br from-accent to-teal",
      textColor: "text-accent",
      hoverBorder: "hover:border-accent/40",
      link: "/workshops",
    },
    {
      icon: Store,
      title: "Expo",
      description: "Explore cutting-edge EdTech products and solutions from leading innovators.",
      bgColor: "bg-gold/10",
      iconBg: "bg-gradient-to-br from-gold to-secondary",
      textColor: "text-gold",
      hoverBorder: "hover:border-gold/40",
      link: "/expo",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden bg-gradient-to-br from-secondary/5 via-primary/3 to-gold/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Four Pillars of{" "}
            <span className="text-gradient-primary">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the complete EdTech ecosystem through our comprehensive event series
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative"
            >
              <Link to={event.link} className="block h-full">
                <div className={`h-full rounded-2xl bg-card border border-border ${event.hoverBorder} transition-all duration-500 shadow-card overflow-hidden cursor-pointer`}>
                {/* Colored background accent */}
                <div className={`absolute top-0 right-0 w-40 h-40 ${event.bgColor} rounded-bl-[120px] rounded-tr-2xl opacity-60`} />
                
                  {/* Content */}
                  <div className="p-6 sm:p-8 relative z-10">
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl ${event.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <event.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className={`font-display text-2xl md:text-3xl font-bold mb-3 ${event.textColor} transition-colors duration-300`}>
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
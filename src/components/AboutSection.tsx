import { motion } from "framer-motion";
import { Target, Lightbulb, Globe, TrendingUp } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Bridging the gap between technology and education across India.",
      color: "primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Lightbulb,
      title: "Innovation Hub",
      description: "Showcasing cutting-edge solutions that transform learning experiences.",
      color: "secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Globe,
      title: "Pan-India Reach",
      description: "Connecting educators, startups, and institutions nationwide.",
      color: "accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: TrendingUp,
      title: "Growth Platform",
      description: "Accelerating EdTech ventures through visibility and partnerships.",
      color: "gold",
      bgColor: "bg-gold/10",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-accent/5">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              About Et Tech X
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Shaping the{" "}
              <span className="text-accent">Future</span> of{" "}
              <span className="text-primary">Learning</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Et Tech X is India's premier platform for educational technology innovation.
              We bring together visionaries, educators, startups, and institutions to 
              explore, exhibit, and elevate the future of learning through technology.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With two flagship events annually, we've become the go-to destination 
              for anyone passionate about transforming education through innovation.
            </p>
          </motion.div>

          {/* Right Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl bg-card border border-border hover:border-${feature.color}/30 transition-all duration-300 group shadow-card`}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                </div>
                <h3 className={`font-display text-lg font-semibold text-${feature.color} mb-2`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

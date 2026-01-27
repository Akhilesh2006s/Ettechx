import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Globe2,
  GraduationCap,
  Store,
  Building2,
  FileText,
  FileBarChart2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    icon: Users,
    value: 25000,
    suffix: "+",
    label: "Attendees",
    color: "text-secondary",
    badgeBg: "bg-secondary/10",
  },
  {
    icon: Globe2,
    value: 45,
    suffix: "+",
    label: "Participant Cities",
    color: "text-gold",
    badgeBg: "bg-gold/10",
  },
  {
    icon: GraduationCap,
    value: 3500,
    suffix: "+",
    label: "Academicians",
    color: "text-primary",
    badgeBg: "bg-primary/10",
  },
  {
    icon: Store,
    value: 1000,
    suffix: "+",
    label: "Exhibitors",
    color: "text-accent",
    badgeBg: "bg-accent/10",
  },
  {
    icon: Building2,
    value: 1800,
    suffix: "+",
    label: "Brands",
    color: "text-deep-purple",
    badgeBg: "bg-deep-purple/10",
  },
];

type StatConfig = (typeof stats)[number];

const StatCard = ({ stat, index }: { stat: StatConfig; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId: number;
    const duration = 1600;
    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const current = Math.floor(progress * stat.value);
      setDisplayValue(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, stat.value]);

  const formatted = displayValue.toLocaleString("en-IN");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group rounded-2xl bg-card/90 border border-border shadow-card px-5 py-6 flex flex-col items-center text-center transition-shadow duration-300 hover:border-primary/25 hover:shadow-glow-primary"
    >
      <div
        className={`w-14 h-14 rounded-full ${stat.badgeBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <stat.icon className="w-7 h-7 text-foreground" />
      </div>
      <div
        className={`font-display text-2xl md:text-3xl font-bold mb-1 ${stat.color}`}
      >
        {formatted}
        {stat.suffix}
      </div>
      <div className="text-xs tracking-[0.22em] uppercase text-muted-foreground">
        {stat.label}
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-amber-50/40 to-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-20 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-3xl border border-dashed border-primary/10 bg-card/40 backdrop-blur-md rotate-6" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Statistics
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Impact That{" "}
            <span className="text-gradient-primary">Keeps Growing</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            ET TECH X brings together a powerful community of educators, city
            leaders, academicians, exhibitors, and brands driving the future of
            learning.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Chart + resources */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-center">
          {/* Simple pie chart style card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-card border border-border shadow-card p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Audience Mix
                </h3>
                <p className="text-sm text-muted-foreground">
                  A visual snapshot of who you meet at ET TECH X.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center justify-center flex-shrink-0">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="relative shadow-card overflow-hidden"
                  style={{
                    width: "160px",
                    height: "160px",
                    minWidth: "160px",
                    minHeight: "160px",
                    borderRadius: "50%",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      backgroundImage:
                        "conic-gradient(#22c55e 0 40%, #f97316 40% 60%, #3b82f6 60% 80%, #a855f7 80% 92%, #facc15 92% 100%)",
                    }}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm w-full max-w-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">Attendees</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-400" />
                  <span className="text-muted-foreground">
                    Participant Cities
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-sky-500" />
                  <span className="text-muted-foreground">Academicians</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-violet-500" />
                  <span className="text-muted-foreground">Exhibitors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-muted-foreground">Brands</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Show directory + post show report */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6"
          >
            <div className="mb-2">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                Dive Deeper into the Numbers
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Access detailed event analytics, exhibitor listings, and
                performance insights from our latest edition.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.a
                href="#"
                whileHover={{ y: -4, scale: 1.02 }}
                className="group rounded-2xl bg-card border border-primary/20 shadow-card p-4 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      Show Directory
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2024 – 25 Edition
                    </p>
                  </div>
                </div>
                <Button
                  variant="hero"
                  size="sm"
                  className="w-full justify-between group-hover:shadow-glow-primary"
                >
                  Download Overview
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ y: -4, scale: 1.02 }}
                className="group rounded-2xl bg-card border border-secondary/20 shadow-card p-4 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <FileBarChart2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-foreground">
                      Post Show Report
                    </p>
                    <p className="text-xs text-muted-foreground">
                      2024 Highlights
                    </p>
                  </div>
                </div>
                <Button
                  variant="heroOutline"
                  size="sm"
                  className="w-full justify-between"
                >
                  View Insights
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;


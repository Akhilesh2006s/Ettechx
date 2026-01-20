import { motion } from "framer-motion";

const sponsors = [
  { name: "TechCorp", color: "from-blue-500 to-cyan-500" },
  { name: "EduLearn", color: "from-purple-500 to-pink-500" },
  { name: "InnovateTech", color: "from-orange-500 to-amber-500" },
  { name: "FuturEd", color: "from-teal-500 to-emerald-500" },
  { name: "SmartClass", color: "from-rose-500 to-red-500" },
  { name: "LearnHub", color: "from-indigo-500 to-violet-500" },
  { name: "EduTech Pro", color: "from-green-500 to-lime-500" },
  { name: "CloudLearn", color: "from-sky-500 to-blue-500" },
];

const SponsorsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proudly supported by leading companies shaping the future of education technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor) => (
              <motion.div
                key={sponsor.name}
                whileHover={{ scale: 1.05, y: -4 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center h-24">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center mb-3`}
                  >
                    <span className="text-white font-bold text-xl">
                      {sponsor.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-foreground font-semibold text-sm text-center">
                    {sponsor.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tier Labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <span className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold">
            Gold Partners
          </span>
          <span className="px-6 py-2 bg-gradient-to-r from-slate-400 to-slate-500 text-white rounded-full text-sm font-semibold">
            Silver Partners
          </span>
          <span className="px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-full text-sm font-semibold">
            Bronze Partners
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsSection;

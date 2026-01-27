import { motion } from "framer-motion";
import { Target, Lightbulb, Globe, TrendingUp, Phone, Mail } from "lucide-react";

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

  const partners = [
    {
      name: "Edu Expo Global Private Limited",
      description:
        "Edu Expo Global is a joint initiative shaped by the long-standing association between Kakani Edu Media Pvt. Ltd. (Brainfeed Magazine) and S D Promo Media Pvt. Ltd., bringing together deep expertise in education media and large-format expo execution.",
    },
    {
      name: "Brainfeed Magazine",
      description:
        "Brainfeed is a respected and widely read publication in the Indian education ecosystem, known for its Edu-leader conferences and awards for over a decade. Its monthly magazines reach a readership of nearly 2,00,000 across schools and institutions nationwide.",
    },
    {
      name: "S D Promo Media Private Limited",
      description:
        "S D Promo Media is one of India's leading expo organising companies, with more than a dozen successful expo brands in its portfolio. Their experience in curating high-impact exhibitions makes them a trusted partner for large-scale education and technology events.",
    },
  ];

  const teamMembers = [
    {
      name: "Ms. Ritu Siddiqui",
      role: "Sr. Director",
      phone: "+91-8130990664",
      phoneHref: "tel:+918130990664",
      email: "ritu@ettechx.com",
      avatarColor: "from-purple-400 to-pink-500",
      initial: "R",
    },
    {
      name: "Ms. Simran Kashyap",
      role: "Asst. Manager",
      phone: "+91-9650615197",
      phoneHref: "tel:+919650615197",
      email: "simran@ettechx.com",
      avatarColor: "from-blue-400 to-cyan-500",
      initial: "S",
    },
    {
      name: "Mr. Tanmay Sharma",
      role: "Asst. Manager",
      phone: "+91-98716 76622",
      phoneHref: "tel:+919871676622",
      email: "tanmay@ettechx.com",
      avatarColor: "from-green-400 to-emerald-500",
      initial: "T",
    },
    {
      name: "Mr. Pallav Singh",
      role: "Sr. Director",
      phone: "+91-8130990660",
      phoneHref: "tel:+918130990660",
      email: "pallav@ettechx.com",
      avatarColor: "from-sky-500 to-indigo-500",
      initial: "P",
    },
    {
      name: "Mr. Sachin Gupta",
      role: "Project Director",
      phone: "+91-80088 45432",
      phoneHref: "tel:+918008845432",
      email: "sachin@ettechx.com",
      avatarColor: "from-orange-400 to-amber-500",
      initial: "S",
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

        {/* Organising Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
              Organising Partners
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Powered by Leaders in Education & Events
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Et Tech X is backed by experienced organisations who have been shaping education
              media, conferences, and large-scale expos across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="h-full rounded-2xl bg-card border border-border shadow-card p-6 flex flex-col"
              >
                <h4 className="font-display text-lg font-semibold text-foreground mb-3">
                  {partner.name}
                </h4>
                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Connect With Our Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-3">
              Let&apos;s Keep In Touch
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Connect With Our Team
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Reach out to our dedicated team members for any inquiries, partnerships, or support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="flex flex-col items-center text-center rounded-2xl bg-card border border-border shadow-card px-6 py-8 hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative mb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.avatarColor} flex items-center justify-center text-white shadow-lg`}
                  >
                    <span className="text-xl font-semibold">
                      {member.initial}
                    </span>
                  </div>
                </div>

                <h4 className="font-display text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {member.role}
                </p>

                <div className="space-y-2 text-sm w-full">
                  <a
                    href={member.phoneHref}
                    className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-xs break-all">{member.email}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

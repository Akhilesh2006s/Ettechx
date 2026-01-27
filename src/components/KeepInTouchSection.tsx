import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const contacts = [
  {
    name: "Ms. Ritu Siddiqui",
    initial: "R",
    role: "Sr. Director",
    phoneLabel: "+91-8130990664",
    phoneHref: "tel:+918130990664",
    email: "ritu@ettechx.com",
    avatarColor: "from-emerald-400 to-teal-500",
  },
  {
    name: "Ms. Simran Kashyap",
    initial: "S",
    role: "Asst. Manager",
    phoneLabel: "+91-9650615197",
    phoneHref: "tel:+919650615197",
    email: "simran@ettechx.com",
    avatarColor: "from-sky-400 to-indigo-500",
  },
  {
    name: "Mr. Tanmay Sharma",
    initial: "T",
    role: "Asst. Manager",
    phoneLabel: "+91-98716 76622",
    phoneHref: "tel:+919871676622",
    email: "tanmay@ettechx.com",
    avatarColor: "from-amber-400 to-orange-500",
  },
  {
    name: "Mr. Pallav Singh",
    initial: "P",
    role: "Sr. Director",
    phoneLabel: "+91-8130990660",
    phoneHref: "tel:+918130990660",
    email: "pallav@ettechx.com",
    avatarColor: "from-fuchsia-500 to-violet-500",
  },
  {
    name: "Mr. Sachin Gupta",
    initial: "S",
    role: "Project Director",
    phoneLabel: "+91-80088 45432",
    phoneHref: "tel:+918008845432",
    email: "sachin@ettechx.com",
    avatarColor: "from-orange-400 to-amber-500",
  },
];

const KeepInTouchSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Let&apos;s Keep In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Connect With Our Team
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.email}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex flex-col items-center text-center rounded-3xl bg-card border border-border shadow-card px-8 py-10"
            >
              {/* Avatar */}
              <div className="relative mb-5">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${contact.avatarColor} flex items-center justify-center text-card shadow-glow-primary`}
                >
                  <span className="text-2xl font-semibold">
                    {contact.initial ?? contact.name.charAt(0)}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground">
                {contact.name}
              </h3>
              {contact.role && (
                <p className="text-sm text-muted-foreground mb-2">{contact.role}</p>
              )}

              <div className="space-y-2 text-sm text-muted-foreground">
                <a
                  href={contact.phoneHref}
                  className="flex items-center justify-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{contact.phoneLabel}</span>
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 hover:text-secondary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeepInTouchSection;


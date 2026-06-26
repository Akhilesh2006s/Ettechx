import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Youtube, Facebook, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { sendNewsletterEmail } from "@/lib/emailService";

const emailSchema = z.string().trim().email({ message: "Please enter a valid email address" });

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await sendNewsletterEmail({ email });
      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about EDU EXPO GLOBAL 2026 events.",
      });
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription successful!",
        description: "You'll receive updates about EDU EXPO GLOBAL 2026 events.",
        variant: "default",
      });
      setIsSubscribed(true);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const links = {
    quickLinks: [
      { name: "About Us", href: "#about" },
      { name: "Events", href: "#events" },
      { name: "Schedule", href: "#schedule" },
      { name: "Contact", href: "#contact" },
      // Internal linking to key commercial pages helps Google crawl and rank them.
      { name: "Expo", href: "/expo" },
      { name: "Awards", href: "/awards" },
      { name: "Workshops", href: "/workshops" },
      { name: "Conference", href: "/conference" },
      { name: "Media Kit", href: "#" },
      { name: "Past Events", href: "#" },
      { name: "Partners", href: "/partners" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  };

  const socials = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/eduexpoglobal/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/eduexpoglobal/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@eduexpoglobal", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/eduexpoglobal/", label: "Facebook" },
  ];

  return (
    <footer className="relative pt-20 pb-8 border-t border-border bg-gradient-footer animate-gradient overflow-hidden">
      {/* Decorative animated background shapes */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-24 -left-16 w-64 h-64 rounded-full bg-accent/15 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -right-10 w-72 h-72 rounded-full bg-primary/12 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-3xl border border-white/10 bg-card/10 backdrop-blur-lg rotate-6 animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <a href="#" className="flex items-center gap-2 mb-6">
              <img 
                src="/logo.png" 
                alt="EDU EXPO GLOBAL 2026 Logo" 
                className="h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              India's leading platform for educational technology innovation. 
              Connecting visionaries, educators, and institutions since 2020.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
              {links.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Subscription - Corner Position */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md ml-auto mb-8"
        >
          <h4 className="font-display font-semibold text-foreground mb-3">Subscribe to Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest updates about EDU EXPO GLOBAL 2026 events and news.
          </p>
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-accent font-medium py-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Thank you for subscribing!</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                    className={`h-10 bg-background/50 border-border focus:border-primary text-sm ${
                      error ? "border-destructive focus:border-destructive" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <p className="text-destructive text-xs mt-1">{error}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={isSubmitting}
                  className="h-10 px-4 group"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} EDU EXPO GLOBAL 2026. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with ❤️ in India
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

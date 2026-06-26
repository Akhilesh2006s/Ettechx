import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - EDU EXPO GLOBAL 2026";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "1. Information We Collect",
      content: [
        "We collect information that you provide directly to us, including:",
        "• Personal information (name, email address, phone number, organization)",
        "• Registration information for events and conferences",
        "• Payment information (processed securely through third-party payment processors)",
        "• Communications you send to us",
        "• Information collected automatically when you visit our website, including IP address, browser type, device information, and usage patterns"
      ]
    },
    {
      icon: Eye,
      title: "2. How We Use Your Information",
      content: [
        "We use the information we collect to:",
        "• Process your registrations and manage event participation",
        "• Send you updates, newsletters, and promotional materials (with your consent)",
        "• Improve our website and services",
        "• Respond to your inquiries and provide customer support",
        "• Comply with legal obligations and protect our rights",
        "• Analyze website usage and trends to enhance user experience"
      ]
    },
    {
      icon: Lock,
      title: "3. Information Sharing and Disclosure",
      content: [
        "We do not sell your personal information. We may share your information:",
        "• With service providers who assist us in operating our website and conducting events",
        "• With event partners and sponsors (only with your explicit consent)",
        "• When required by law or to protect our rights and safety",
        "• In connection with a business transfer or merger",
        "• With your explicit consent for any other purpose"
      ]
    },
    {
      icon: Shield,
      title: "4. Data Security",
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information:",
        "• Encryption of sensitive data in transit and at rest",
        "• Regular security assessments and updates",
        "• Limited access to personal information on a need-to-know basis",
        "• Secure payment processing through certified third-party providers",
        "However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security."
      ]
    },
    {
      icon: FileText,
      title: "5. Your Rights and Choices",
      content: [
        "You have the right to:",
        "• Access and receive a copy of your personal information",
        "• Correct inaccurate or incomplete information",
        "• Request deletion of your personal information",
        "• Object to or restrict processing of your information",
        "• Withdraw consent for marketing communications at any time",
        "• Request data portability",
        "To exercise these rights, please contact us at the information provided below."
      ]
    },
    {
      icon: Eye,
      title: "6. Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar tracking technologies to:",
        "• Remember your preferences and settings",
        "• Analyze website traffic and usage patterns",
        "• Provide personalized content and advertisements",
        "• Improve website functionality",
        "You can control cookies through your browser settings, but this may affect website functionality."
      ]
    },
    {
      icon: Lock,
      title: "7. Third-Party Links",
      content: [
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit."
      ]
    },
    {
      icon: Shield,
      title: "8. Children's Privacy",
      content: [
        "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
      ]
    },
    {
      icon: FileText,
      title: "9. International Data Transfers",
      content: [
        "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy."
      ]
    },
    {
      icon: Eye,
      title: "10. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. Your continued use of our services after such changes constitutes acceptance of the updated policy."
      ]
    },
    {
      icon: Lock,
      title: "11. Contact Us",
      content: [
        "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
        "• Email: info@eduexpoglobal.com",
        "• Address: EDU EXPO GLOBAL 2026, India",
        "• Phone: [Contact Number]",
        "We will respond to your inquiry within 30 days."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Legal Document
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Privacy <span className="text-gradient-primary">Policy</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>
            </div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 mb-8 shadow-lg"
            >
              <p className="text-muted-foreground leading-relaxed">
                EDU EXPO GLOBAL 2026 ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, register for events, or use our services. By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                    className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                    <div className="ml-16 space-y-2">
                      {section.content.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className={`text-muted-foreground leading-relaxed ${
                            paragraph.startsWith("•") ? "ml-4" : ""
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
            >
              <p className="text-muted-foreground">
                By using our services, you acknowledge that you have read and understood this Privacy Policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

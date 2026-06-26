import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Scale, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - EDU EXPO GLOBAL 2026";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    {
      icon: FileText,
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using the EDU EXPO GLOBAL 2026 website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        "We reserve the right to modify these terms at any time. Your continued use of our services after changes are posted constitutes acceptance of the modified terms."
      ]
    },
    {
      icon: Scale,
      title: "2. Use of Services",
      content: [
        "You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:",
        "• Use the services in any way that violates any applicable law or regulation",
        "• Transmit any malicious code, viruses, or harmful materials",
        "• Attempt to gain unauthorized access to our systems or networks",
        "• Interfere with or disrupt the services or servers",
        "• Use automated systems to access the services without permission",
        "• Impersonate any person or entity or misrepresent your affiliation",
        "• Collect or harvest information about other users without consent"
      ]
    },
    {
      icon: CheckCircle,
      title: "3. Registration and Accounts",
      content: [
        "To access certain features, you may be required to register for an account. You agree to:",
        "• Provide accurate, current, and complete information during registration",
        "• Maintain and update your information to keep it accurate",
        "• Maintain the security of your account credentials",
        "• Accept responsibility for all activities under your account",
        "• Notify us immediately of any unauthorized access or security breach",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      icon: FileText,
      title: "4. Event Registration and Participation",
      content: [
        "When registering for events:",
        "• Registration is subject to availability and our approval",
        "• You must provide accurate information during registration",
        "• Payment must be completed as specified for paid events",
        "• Cancellation and refund policies apply as stated during registration",
        "• We reserve the right to refuse or cancel registrations at our discretion",
        "• Event details, schedules, and speakers are subject to change without notice"
      ]
    },
    {
      icon: Scale,
      title: "5. Intellectual Property Rights",
      content: [
        "All content on our website and services, including text, graphics, logos, images, and software, is the property of EDU EXPO GLOBAL 2026 or its licensors and is protected by copyright, trademark, and other intellectual property laws.",
        "You may not:",
        "• Reproduce, distribute, or create derivative works without permission",
        "• Use our trademarks or logos without written consent",
        "• Remove or alter any copyright or proprietary notices",
        "• Use our content for commercial purposes without authorization"
      ]
    },
    {
      icon: AlertCircle,
      title: "6. User Content",
      content: [
        "You retain ownership of content you submit, but grant us a license to:",
        "• Use, reproduce, and distribute your content in connection with our services",
        "• Display your content on our website and promotional materials",
        "• Modify and adapt your content as necessary",
        "You represent that you have the right to grant this license and that your content does not violate any third-party rights or laws."
      ]
    },
    {
      icon: XCircle,
      title: "7. Prohibited Activities",
      content: [
        "You are strictly prohibited from:",
        "• Engaging in any fraudulent, abusive, or illegal activity",
        "• Violating any applicable laws or regulations",
        "• Infringing on intellectual property rights",
        "• Harassing, threatening, or harming others",
        "• Spamming or sending unsolicited communications",
        "• Attempting to interfere with service operations",
        "Violations may result in immediate termination of access and legal action."
      ]
    },
    {
      icon: AlertCircle,
      title: "8. Payment Terms",
      content: [
        "For paid services and events:",
        "• All fees are stated in the applicable currency and are non-refundable unless otherwise stated",
        "• Payment must be made through approved payment methods",
        "• We reserve the right to change pricing with notice",
        "• Refunds are subject to our Refund Policy",
        "• You are responsible for any taxes applicable to your transactions"
      ]
    },
    {
      icon: Scale,
      title: "9. Disclaimers and Limitation of Liability",
      content: [
        "Our services are provided 'as is' and 'as available' without warranties of any kind. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.",
        "To the maximum extent permitted by law, we shall not be liable for:",
        "• Any indirect, incidental, or consequential damages",
        "• Loss of profits, data, or business opportunities",
        "• Service interruptions or technical issues",
        "• Third-party actions or content",
        "Our total liability shall not exceed the amount you paid us in the past 12 months."
      ]
    },
    {
      icon: CheckCircle,
      title: "10. Indemnification",
      content: [
        "You agree to indemnify and hold harmless EDU EXPO GLOBAL 2026, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:",
        "• Your use of our services",
        "• Your violation of these Terms",
        "• Your violation of any rights of another party",
        "• Your content or conduct"
      ]
    },
    {
      icon: FileText,
      title: "11. Termination",
      content: [
        "We may terminate or suspend your access to our services immediately, without prior notice, for:",
        "• Violation of these Terms of Service",
        "• Fraudulent or illegal activity",
        "• Request by law enforcement or government agencies",
        "• Extended periods of inactivity",
        "Upon termination, your right to use the services will cease immediately."
      ]
    },
    {
      icon: Scale,
      title: "12. Governing Law and Dispute Resolution",
      content: [
        "These Terms shall be governed by the laws of India, without regard to conflict of law principles.",
        "Any disputes arising from these Terms or our services shall be resolved through:",
        "• Good faith negotiation between the parties",
        "• Mediation if negotiation fails",
        "• Binding arbitration in accordance with applicable arbitration rules",
        "• Jurisdiction in the courts of India"
      ]
    },
    {
      icon: AlertCircle,
      title: "13. Changes to Terms",
      content: [
        "We reserve the right to modify these Terms at any time. We will notify users of material changes by:",
        "• Posting the updated Terms on our website",
        "• Sending email notifications to registered users",
        "• Updating the 'Last Updated' date",
        "Your continued use of our services after changes constitutes acceptance of the modified Terms."
      ]
    },
    {
      icon: CheckCircle,
      title: "14. Contact Information",
      content: [
        "If you have any questions about these Terms of Service, please contact us:",
        "• Email: info@eduexpoglobal.com",
        "• Address: EDU EXPO GLOBAL 2026, India",
        "• Phone: [Contact Number]",
        "We will respond to your inquiries within a reasonable timeframe."
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
                <Scale className="w-8 h-8 text-primary" />
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Legal Document
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Terms of <span className="text-gradient-primary">Service</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Please read these terms carefully before using our services. These terms govern your use of EDU EXPO GLOBAL 2026.
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
                Welcome to EDU EXPO GLOBAL 2026. These Terms of Service ("Terms") constitute a legally binding agreement between you and EDU EXPO GLOBAL 2026 ("we," "our," or "us") regarding your use of our website, services, and participation in our events. By accessing or using our services, you agree to be bound by these Terms.
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
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
            >
              <p className="text-muted-foreground">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                If you do not agree with these terms, please discontinue use of our services immediately.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsOfService;

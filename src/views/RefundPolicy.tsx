import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
  useEffect(() => {
    document.title = "Refund Policy - EDU EXPO GLOBAL 2026";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const sections = [
    {
      icon: RefreshCw,
      title: "1. General Refund Policy",
      content: [
        "EDU EXPO GLOBAL 2026 is committed to providing quality events and services. This Refund Policy outlines the terms and conditions under which refunds may be issued for event registrations, tickets, and other services.",
        "All refund requests are subject to review and approval based on the circumstances and timing of the request."
      ]
    },
    {
      icon: Clock,
      title: "2. Event Registration Refunds",
      content: [
        "Refund eligibility for event registrations depends on the timing of your cancellation request:",
        "• Cancellation 30+ days before event: Full refund minus processing fees (5%)",
        "• Cancellation 15-29 days before event: 75% refund",
        "• Cancellation 7-14 days before event: 50% refund",
        "• Cancellation less than 7 days before event: No refund (except in exceptional circumstances)",
        "• No-show without prior cancellation: No refund",
        "Refund requests must be submitted in writing via email to info@eduexpoglobal.com"
      ]
    },
    {
      icon: CheckCircle,
      title: "3. Refund Processing Time",
      content: [
        "Once your refund request is approved:",
        "• Refunds will be processed within 10-15 business days",
        "• Refunds will be issued to the original payment method used",
        "• Processing fees, if applicable, are non-refundable",
        "• You will receive email confirmation once the refund is processed",
        "Please note that your bank or credit card company may take additional time to reflect the refund in your account."
      ]
    },
    {
      icon: XCircle,
      title: "4. Non-Refundable Items",
      content: [
        "The following are non-refundable:",
        "• Processing fees and transaction charges",
        "• Digital products and downloadable materials",
        "• Services already rendered or consumed",
        "• Special promotional or discounted tickets (unless otherwise stated)",
        "• Third-party vendor fees or charges",
        "• Merchandise purchases (subject to standard return policy)"
      ]
    },
    {
      icon: AlertCircle,
      title: "5. Event Cancellation by EDU EXPO GLOBAL 2026",
      content: [
        "If we cancel an event:",
        "• Full refunds will be automatically issued to all registered participants",
        "• Refunds will be processed within 15 business days of cancellation",
        "• Alternative options may be offered, such as credit for future events",
        "• We are not responsible for any additional costs (travel, accommodation, etc.)",
        "Participants will be notified via email and our website in case of event cancellation."
      ]
    },
    {
      icon: RefreshCw,
      title: "6. Event Postponement or Rescheduling",
      content: [
        "If an event is postponed or rescheduled:",
        "• Your registration will automatically transfer to the new date",
        "• Full refunds are available if you cannot attend the new date",
        "• Refund requests must be submitted within 14 days of the rescheduling announcement",
        "• We will notify all participants via email about the new dates"
      ]
    },
    {
      icon: CheckCircle,
      title: "7. Partial Refunds",
      content: [
        "Partial refunds may be issued in the following circumstances:",
        "• If you attend only part of a multi-day event",
        "• If specific sessions or workshops are cancelled",
        "• If services are partially unavailable due to circumstances beyond our control",
        "Partial refunds are calculated on a pro-rata basis and are subject to our discretion."
      ]
    },
    {
      icon: Clock,
      title: "8. Special Circumstances",
      content: [
        "Refunds may be considered in exceptional circumstances:",
        "• Medical emergencies (with supporting documentation)",
        "• Family emergencies or bereavement",
        "• Natural disasters or travel restrictions",
        "• Visa or travel document issues (with proof)",
        "Requests for special circumstance refunds must be submitted with appropriate documentation and will be reviewed on a case-by-case basis."
      ]
    },
    {
      icon: AlertCircle,
      title: "9. Transfer of Registration",
      content: [
        "Instead of requesting a refund, you may:",
        "• Transfer your registration to another person (subject to approval)",
        "• Transfer your registration to a future event (subject to availability)",
        "• Transfer requests must be submitted at least 7 days before the event",
        "• A transfer fee may apply (typically 10% of the registration fee)",
        "• Transfers are subject to availability and event capacity"
      ]
    },
    {
      icon: XCircle,
      title: "10. Disputed Charges",
      content: [
        "If you believe you have been charged incorrectly:",
        "• Contact us immediately at info@eduexpoglobal.com",
        "• Provide details of the charge and your registration",
        "• We will investigate and respond within 5 business days",
        "• If the charge is found to be incorrect, a full refund will be issued",
        "Please do not initiate a chargeback with your bank before contacting us, as this may delay resolution."
      ]
    },
    {
      icon: CheckCircle,
      title: "11. Refund Request Procedure",
      content: [
        "To request a refund:",
        "1. Send an email to info@eduexpoglobal.com",
        "2. Include your registration confirmation number",
        "3. Provide your full name and contact information",
        "4. State the reason for your refund request",
        "5. Attach any supporting documentation if applicable",
        "You will receive an acknowledgment within 2 business days and a decision within 7 business days."
      ]
    },
    {
      icon: RefreshCw,
      title: "12. Contact Information",
      content: [
        "For refund inquiries and requests:",
        "• Email: info@eduexpoglobal.com",
        "• Subject Line: 'Refund Request - [Your Registration Number]'",
        "• Response Time: Within 2-5 business days",
        "• Phone: [Contact Number] (for urgent matters only)",
        "Please include all relevant information in your initial request to expedite processing."
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
                <RefreshCw className="w-8 h-8 text-primary" />
                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Legal Document
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Refund <span className="text-gradient-primary">Policy</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Our commitment to fair and transparent refund practices for all our events and services.
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
                At EDU EXPO GLOBAL 2026, we understand that circumstances may change, and you may need to cancel your event registration. This Refund Policy explains our procedures for processing refunds, cancellations, and transfers. We aim to be fair and transparent while ensuring the sustainability of our events.
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
                            paragraph.startsWith("•") || paragraph.match(/^\d+\./) ? "ml-4" : ""
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

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-8"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Important Notice</h3>
                  <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                    All refund requests are subject to review and approval. Refund eligibility and amounts are determined based on the specific circumstances, timing, and terms outlined in this policy. We reserve the right to make exceptions on a case-by-case basis. For the fastest processing, please ensure your refund request includes all required information and documentation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center"
            >
              <p className="text-muted-foreground">
                By registering for our events, you acknowledge that you have read and understood this Refund Policy. 
                If you have any questions or concerns, please contact us before making your registration.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefundPolicy;

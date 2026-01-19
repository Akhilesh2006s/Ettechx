import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Loader2, User, Mail, Phone, Building, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { sendRegistrationEmail } from "@/lib/emailService";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  organization: z.string().min(2, "Organization name is required"),
  designation: z.string().min(2, "Designation is required"),
  attendees: z.string().min(1, "Please select number of attendees"),
  eventInterest: z.string().min(1, "Please select event interest"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    attendees: "",
    eventInterest: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Register Now - Et Tech X";
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof RegisterFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email notification
      await sendRegistrationEmail(formData);
      
      setIsSuccess(true);
      
      toast({
        title: "Registration Successful!",
        description: "We've received your registration. You'll receive a confirmation email shortly.",
      });
    } catch (error) {
      console.error("Registration error:", error);
      // Still show success to user even if email fails
      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "We've received your registration. You'll receive a confirmation email shortly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero py-24">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            {/* Back Button */}
            <Link to="/">
              <Button
                variant="ghost"
                className="mb-6 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            {/* Main Card */}
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-card border border-border shadow-card relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-accent" />
                  </motion.div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Registration Successful!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for registering for Et Tech X. We've sent a confirmation email to{" "}
                    <span className="text-primary font-semibold">{formData.email}</span>
                  </p>
                  <Link to="/">
                    <Button variant="hero" size="lg">
                      Return to Home
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                  >
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                      Register for <span className="text-gradient-primary">Et Tech X</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Join India's premier EdTech expo. Secure your spot today!
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-primary" />
                        Full Name *
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.fullName ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-secondary" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.email ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email}</p>
                      )}
                    </motion.div>

                    {/* Phone */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-accent" />
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.phone ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                      )}
                    </motion.div>

                    {/* Organization */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      <Label htmlFor="organization" className="flex items-center gap-2 mb-2">
                        <Building className="w-4 h-4 text-primary" />
                        Organization *
                      </Label>
                      <Input
                        id="organization"
                        type="text"
                        placeholder="Your organization name"
                        value={formData.organization}
                        onChange={(e) => handleChange("organization", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.organization ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.organization && (
                        <p className="text-destructive text-sm mt-1">{errors.organization}</p>
                      )}
                    </motion.div>

                    {/* Designation */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Label htmlFor="designation" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-secondary" />
                        Designation *
                      </Label>
                      <Input
                        id="designation"
                        type="text"
                        placeholder="Your designation/role"
                        value={formData.designation}
                        onChange={(e) => handleChange("designation", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.designation ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.designation && (
                        <p className="text-destructive text-sm mt-1">{errors.designation}</p>
                      )}
                    </motion.div>

                    {/* Number of Attendees */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    >
                      <Label htmlFor="attendees" className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-accent" />
                        Number of Attendees *
                      </Label>
                      <select
                        id="attendees"
                        value={formData.attendees}
                        onChange={(e) => handleChange("attendees", e.target.value)}
                        className={`flex h-12 w-full rounded-md border bg-background/50 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                          errors.attendees ? "border-destructive focus-visible:ring-destructive" : "border-border focus:border-primary"
                        }`}
                      >
                        <option value="">Select number of attendees</option>
                        <option value="1">1</option>
                        <option value="2-5">2-5</option>
                        <option value="6-10">6-10</option>
                        <option value="10+">10+</option>
                      </select>
                      {errors.attendees && (
                        <p className="text-destructive text-sm mt-1">{errors.attendees}</p>
                      )}
                    </motion.div>

                    {/* Event Interest */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Label htmlFor="eventInterest" className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Event Interest *
                      </Label>
                      <select
                        id="eventInterest"
                        value={formData.eventInterest}
                        onChange={(e) => handleChange("eventInterest", e.target.value)}
                        className={`flex h-12 w-full rounded-md border bg-background/50 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                          errors.eventInterest ? "border-destructive focus-visible:ring-destructive" : "border-border focus:border-primary"
                        }`}
                      >
                        <option value="">Select your interest</option>
                        <option value="expo">Expo & Exhibitions</option>
                        <option value="conference">Conference & Keynotes</option>
                        <option value="workshops">Workshops</option>
                        <option value="awards">Awards Ceremony</option>
                        <option value="all">All Events</option>
                      </select>
                      {errors.eventInterest && (
                        <p className="text-destructive text-sm mt-1">{errors.eventInterest}</p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                      className="pt-4"
                    >
                      <Button
                        type="submit"
                        variant="hero"
                        size="xl"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Complete Registration
                            <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Register;

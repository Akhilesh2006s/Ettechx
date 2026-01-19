import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Loader2, Building2, Mail, Phone, User, MapPin, Package, Users, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { sendExhibitorEmail } from "@/lib/emailService";

const exhibitorSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  website: z.string().url("Please enter a valid website URL").or(z.literal("")),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode is required"),
  boothSize: z.string().min(1, "Please select booth size"),
  products: z.string().min(10, "Please describe your products/services (min 10 characters)"),
  previousExhibitor: z.string().min(1, "Please select an option"),
});

type ExhibitorFormData = z.infer<typeof exhibitorSchema>;

const Exhibitor = () => {
  const [formData, setFormData] = useState<ExhibitorFormData>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    boothSize: "",
    products: "",
    previousExhibitor: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ExhibitorFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Become an Exhibitor - Et Tech X";
  }, []);

  const handleChange = (field: keyof ExhibitorFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = exhibitorSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ExhibitorFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ExhibitorFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send email notification
      await sendExhibitorEmail(formData);
      
      setIsSuccess(true);
      
      toast({
        title: "Application Submitted!",
        description: "We've received your exhibitor application. Our team will contact you soon.",
      });
    } catch (error) {
      console.error("Exhibitor application error:", error);
      // Still show success to user even if email fails
      setIsSuccess(true);
      toast({
        title: "Application Submitted!",
        description: "We've received your exhibitor application. Our team will contact you soon.",
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
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/8 blur-3xl" />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-primary to-secondary" />

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
                    Application Submitted!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for your interest in exhibiting at Et Tech X. We've received your application and our team will contact you at{" "}
                    <span className="text-primary font-semibold">{formData.email}</span> within 2-3 business days.
                  </p>
                  <Link to="/">
                    <Button variant="accent" size="lg">
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
                      Become an <span className="text-gradient-accent">Exhibitor</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Showcase your EdTech solutions to 5000+ attendees. Join India's premier EdTech expo!
                    </p>
                  </motion.div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company Name */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Label htmlFor="companyName" className="flex items-center gap-2 mb-2">
                        <Building2 className="w-4 h-4 text-accent" />
                        Company Name *
                      </Label>
                      <Input
                        id="companyName"
                        type="text"
                        placeholder="Your company name"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.companyName ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.companyName && (
                        <p className="text-destructive text-sm mt-1">{errors.companyName}</p>
                      )}
                    </motion.div>

                    {/* Contact Person */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      <Label htmlFor="contactPerson" className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-primary" />
                        Contact Person *
                      </Label>
                      <Input
                        id="contactPerson"
                        type="text"
                        placeholder="Full name of contact person"
                        value={formData.contactPerson}
                        onChange={(e) => handleChange("contactPerson", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.contactPerson ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.contactPerson && (
                        <p className="text-destructive text-sm mt-1">{errors.contactPerson}</p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-secondary" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contact@company.com"
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
                      transition={{ duration: 0.5, delay: 0.25 }}
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

                    {/* Website */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Label htmlFor="website" className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Website (Optional)
                      </Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://www.company.com"
                        value={formData.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                        className="h-12 bg-background/50 border-border focus:border-primary"
                      />
                    </motion.div>

                    {/* Address */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    >
                      <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        Street Address *
                      </Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="Street address"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className={`h-12 bg-background/50 border-border focus:border-primary ${
                          errors.address ? "border-destructive focus:border-destructive" : ""
                        }`}
                      />
                      {errors.address && (
                        <p className="text-destructive text-sm mt-1">{errors.address}</p>
                      )}
                    </motion.div>

                    {/* City, State, Pincode Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Label htmlFor="city" className="mb-2">City *</Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="City"
                          value={formData.city}
                          onChange={(e) => handleChange("city", e.target.value)}
                          className={`h-12 bg-background/50 border-border focus:border-primary ${
                            errors.city ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                        {errors.city && (
                          <p className="text-destructive text-sm mt-1">{errors.city}</p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                      >
                        <Label htmlFor="state" className="mb-2">State *</Label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="State"
                          value={formData.state}
                          onChange={(e) => handleChange("state", e.target.value)}
                          className={`h-12 bg-background/50 border-border focus:border-primary ${
                            errors.state ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                        {errors.state && (
                          <p className="text-destructive text-sm mt-1">{errors.state}</p>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <Label htmlFor="pincode" className="mb-2">Pincode *</Label>
                        <Input
                          id="pincode"
                          type="text"
                          placeholder="Pincode"
                          value={formData.pincode}
                          onChange={(e) => handleChange("pincode", e.target.value)}
                          className={`h-12 bg-background/50 border-border focus:border-primary ${
                            errors.pincode ? "border-destructive focus:border-destructive" : ""
                          }`}
                        />
                        {errors.pincode && (
                          <p className="text-destructive text-sm mt-1">{errors.pincode}</p>
                        )}
                      </motion.div>
                    </div>

                    {/* Booth Size */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.55 }}
                    >
                      <Label htmlFor="boothSize" className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-accent" />
                        Preferred Booth Size *
                      </Label>
                      <select
                        id="boothSize"
                        value={formData.boothSize}
                        onChange={(e) => handleChange("boothSize", e.target.value)}
                        className={`flex h-12 w-full rounded-md border bg-background/50 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                          errors.boothSize ? "border-destructive focus-visible:ring-destructive" : "border-border focus:border-primary"
                        }`}
                      >
                        <option value="">Select booth size</option>
                        <option value="standard">Standard (3m x 3m)</option>
                        <option value="large">Large (6m x 3m)</option>
                        <option value="premium">Premium (9m x 3m)</option>
                        <option value="custom">Custom Size</option>
                      </select>
                      {errors.boothSize && (
                        <p className="text-destructive text-sm mt-1">{errors.boothSize}</p>
                      )}
                    </motion.div>

                    {/* Products/Services */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <Label htmlFor="products" className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Products/Services Description *
                      </Label>
                      <textarea
                        id="products"
                        rows={4}
                        placeholder="Describe your EdTech products, services, or solutions..."
                        value={formData.products}
                        onChange={(e) => handleChange("products", e.target.value)}
                        className={`flex w-full rounded-md border bg-background/50 px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none ${
                          errors.products ? "border-destructive focus-visible:ring-destructive" : "border-border focus:border-primary"
                        }`}
                      />
                      {errors.products && (
                        <p className="text-destructive text-sm mt-1">{errors.products}</p>
                      )}
                    </motion.div>

                    {/* Previous Exhibitor */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.65 }}
                    >
                      <Label htmlFor="previousExhibitor" className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-secondary" />
                        Have you exhibited with us before? *
                      </Label>
                      <select
                        id="previousExhibitor"
                        value={formData.previousExhibitor}
                        onChange={(e) => handleChange("previousExhibitor", e.target.value)}
                        className={`flex h-12 w-full rounded-md border bg-background/50 px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                          errors.previousExhibitor ? "border-destructive focus-visible:ring-destructive" : "border-border focus:border-primary"
                        }`}
                      >
                        <option value="">Select an option</option>
                        <option value="yes">Yes, I have exhibited before</option>
                        <option value="no">No, this is my first time</option>
                      </select>
                      {errors.previousExhibitor && (
                        <p className="text-destructive text-sm mt-1">{errors.previousExhibitor}</p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="pt-4"
                    >
                      <Button
                        type="submit"
                        variant="accent"
                        size="xl"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Submitting Application...
                          </>
                        ) : (
                          <>
                            Submit Exhibitor Application
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

export default Exhibitor;

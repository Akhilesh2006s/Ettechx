import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterViewer from "@/components/NewsletterViewer";
import { fetchLatestNewsletter, type Newsletter } from "@/lib/newsletterApi";
import { Loader2 } from "lucide-react";

const NewsletterPage = () => {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Newsletter - EduExpoGlobal";
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadNewsletter();
  }, []);

  const loadNewsletter = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLatestNewsletter();
      setNewsletter(data);
    } catch (error) {
      console.error("Failed to load newsletter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <section className="relative min-h-screen py-24">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : newsletter ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <NewsletterViewer newsletter={newsletter} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h1 className="text-4xl font-bold text-foreground mb-4">No Newsletter Available</h1>
              <p className="text-muted-foreground">
                There are no published newsletters at this time. Please check back later.
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NewsletterPage;
